import { supabase } from './supabase';
import { PostAuthorCreateInterface } from '@src/app/types/AuthorInterface';

export const hasAuthorProfile = async (author_id: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('blog-authors')
    .select('id')
    .eq('author_id', author_id)
    .maybeSingle();

  if (error) {
    return false;
  }

  return !!data;
};

export const createAuthorProfile = async (
  data: PostAuthorCreateInterface & {
    image?: File | null;
    author_id: string;
  }
) => {
  if (data.image) {
    //move to image service
    //const imageUrl = await uploadImage(data.image);
    //if (imageUrl) {
    //  data.image_url = imageUrl;
    //}
  }
  delete data.image;

  const { data: result } = await supabase
    .from('blog-authors')
    .insert([data])
    .select();
  return result;
};
