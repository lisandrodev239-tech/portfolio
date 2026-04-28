-- Verificar y crear políticas de storage
-- Ejecutar en SQL Editor de Supabase

-- Primero, verificar si el bucket existe
SELECT id, name, public FROM storage.buckets WHERE name = 'portfolio-images';

-- Crear políticas si no existen
-- Habilitar RLS en storage.objects si está deshabilitado
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Política para permitir acceso público de lectura
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'portfolio-images');

-- Política para permitir inserción pública
DROP POLICY IF EXISTS "Allow Insert" ON storage.objects;
CREATE POLICY "Allow Insert" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');

-- Política para permitir eliminación
DROP POLICY IF EXISTS "Allow Delete" ON storage.objects;
CREATE POLICY "Allow Delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'portfolio-images');

-- Política para permitir actualización
DROP POLICY IF EXISTS "Allow Update" ON storage.objects;
CREATE POLICY "Allow Update" ON storage.objects 
FOR UPDATE USING (bucket_id = 'portfolio-images');