"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, X, Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
}

export default function ImageUploader({ value, onChange, bucket = "portfolio-images" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      setError("Por favor seleccioná una imagen (JPG, PNG, etc.)");
      return;
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5MB");
      return;
    }
    
    setUploading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // Error específico de Supabase
        if (uploadError.message.includes("row-level security")) {
          throw new Error("Error de permisos. Verificá las políticas del bucket en Supabase.");
        }
        if (uploadError.message.includes("bucket")) {
          throw new Error("Bucket no encontrado. Creá el bucket 'portfolio-images' en Supabase.");
        }
        throw new Error(uploadError.message);
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onChange(urlData.publicUrl);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al subir imagen";
      setError(errorMessage);
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    } else {
      setError("Arrastrá solo imágenes");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const deleteImage = async () => {
    if (!value) return;
    
    try {
      const urlParts = value.split(`/storage/v1/object/public/${bucket}/`);
      const fileName = urlParts[1];
      if (fileName) {
        await supabase.storage.from(bucket).remove([fileName]);
      }
      onChange("");
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div>
      {error && (
        <div className="flex items-center gap-2 p-3 mb-3 text-sm text-red-600 bg-red-50 rounded-lg">
          <AlertCircle size={16} />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
            <X size={14} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-3 mb-3 text-sm text-green-600 bg-green-50 rounded-lg">
          <CheckCircle size={16} />
          <span>¡Imagen subida exitosamente!</span>
        </div>
      )}
      
      {value ? (
        <div className="relative group">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <button
              type="button"
              onClick={deleteImage}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer transition-all ${
            dragOver 
              ? "border-[var(--primary)] bg-[var(--primary)]/10 scale-[1.02]" 
              : "border-[var(--border)] hover:border-[var(--primary)]/50"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)] mb-2" />
              <span className="text-sm text-[var(--muted)]">Subiendo imagen...</span>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-[var(--muted)] mb-2" />
              <span className="text-sm text-[var(--muted)]">Click o arrastrá una imagen</span>
              <span className="text-xs text-[var(--muted)] mt-1">Máx 5MB (JPG, PNG, WEBP)</span>
            </>
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}