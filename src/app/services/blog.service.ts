import { supabase } from './supabase';
import { PostInterface } from '../types/PostInterface';

export const getBlogPosts = async () => {
  const { data } = await supabase
    .from('blog-posts')
    .select(
      `
        slug,
        title,
        author_id,
        image_url,
        tags,
        author:author_id (
          first_name,
          last_name
        )
      `
    )
    .order('created_at', { ascending: false });
  return data;
};

export const getBlogBySlug = async (slug: string) => {
  const { data } = await supabase
    .from('blog-posts')
    .select(
      `
      *,
      author:author_id (
        first_name,
        last_name
      )
      `
    )
    .eq('slug', slug)
    .single();
  return data as PostInterface;
};

export const isSlugInUse = async (slug: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('blog-posts')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    return false;
  }

  return !!data;
};

export const postNewBlog = async (
  data: Omit<PostInterface, 'id' | 'created_at' | 'author'> & {
    image?: File | null;
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
    .from('blog-posts')
    .insert([data])
    .select();
  return result;
};
