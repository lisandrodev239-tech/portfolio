"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
}

export default function ImageUploader({ value, onChange, bucket = "portfolio-images" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      onChange(publicUrl);
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error al subir imagen");
    }
    setUploading(false);
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

  const deleteImage = async () => {
    if (!value) return;
    
    try {
      const fileName = value.split("/").pop();
      if (fileName) {
        await supabase.storage.from(bucket).remove([fileName]);
      }
      onChange("");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div>
      {value ? (
        <div className="relative">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
          <button
            type="button"
            onClick={deleteImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragOver ? "border-[var(--primary)] bg-[var(--primary)]/10" : "border-[var(--border)]"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)] mb-2" />
              <span className="text-sm text-[var(--muted)]">Subiendo...</span>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-[var(--muted)] mb-2" />
              <span className="text-sm text-[var(--muted)]">Click o arrastrar imagen</span>
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