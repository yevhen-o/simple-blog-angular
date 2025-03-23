import { supabase } from './supabase';
import { environment } from '@src/environments/environment';

const supabaseUrl = environment.supabaseUrl;

export const uploadImage = async (file: File): Promise<string | null> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/blog-images/${fileName}`;
};
