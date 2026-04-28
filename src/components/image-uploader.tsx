"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, AlertCircle, CheckCircle, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<"url" | "upload">("url");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (value && (value.startsWith("http://") || value.startsWith("https://"))) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError("Ingresa una URL válida");
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      setError("Por favor seleccioná una imagen");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5MB");
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      // Convertir a base64 y usar como data URL
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
        setSuccess(true);
        setUploading(false);
        setTimeout(() => setSuccess(false), 3000);
      };
      reader.onerror = () => {
        setError("Error al leer archivo");
        setUploading(false);
      };
      reader.readAsDataURL(file);
      
    } catch (err) {
      setError("Error al procesar imagen");
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const deleteImage = () => {
    onChange("");
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
          <span>¡Imagen guardada!</span>
        </div>
      )}

      {/* Toggle entre URL y Upload */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-3 py-1 text-sm rounded ${mode === "url" ? "bg-[var(--primary)] text-white" : "bg-[var(--secondary)]"}`}
        >
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-3 py-1 text-sm rounded ${mode === "upload" ? "bg-[var(--primary)] text-white" : "bg-[var(--secondary)]"}`}
        >
          Subir archivo
        </button>
      </div>

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
      ) : mode === "url" ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
          />
          {value && (
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="btn-primary w-full"
            >
              Guardar URL
            </button>
          )}
          <p className="text-xs text-[var(--muted)]">
            Podés usar URLs de cualquier hosting: Imgur, Cloudinary, GitHub, etc.
          </p>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer transition-all ${
            dragOver 
              ? "border-[var(--primary)] bg-[var(--primary)]/10" 
              : "border-[var(--border)]"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)] mb-2" />
              <span className="text-sm text-[var(--muted)]">Procesando...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-10 h-10 text-[var(--muted)] mb-2" />
              <span className="text-sm text-[var(--muted)]">Click o arrastrá una imagen</span>
              <span className="text-xs text-[var(--muted)] mt-1">Se guarda como base64</span>
            </>
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}