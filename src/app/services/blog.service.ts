import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { supabase } from './supabase';
import { PostInterface } from '@src/app/types/PostInterface';

const BLOG_POSTS_KEY = makeStateKey<PostInterface[]>('blogPosts');

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  async getBlogPosts() {
    if (this.transferState.hasKey(BLOG_POSTS_KEY)) {
      const posts = this.transferState.get(BLOG_POSTS_KEY, []);
      this.transferState.remove(BLOG_POSTS_KEY);
      return posts;
    }

    const { data } = await supabase
      .from('blog-posts')
      .select(
        `
      slug,
      title,
      created_at,
      content,
      author_id,
      image_url,
      tags,
      author:author_id (
        first_name,
        last_name,
        author_id
      )
    `
      )
      .order('created_at', { ascending: false });

    if (data) {
      if (isPlatformServer(this.platformId)) {
        this.transferState.set(
          BLOG_POSTS_KEY,
          data as unknown as PostInterface[]
        );
      }
      return data as unknown as PostInterface[];
    }
    return null;
  }

  async getBlogBySlug(slug: string) {
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
  }

  async isSlugInUse(slug: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('blog-posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      return false;
    }

    return !!data;
  }

  async postNewBlog(
    data: Omit<PostInterface, 'id' | 'created_at' | 'author'> & {
      image?: File | null;
    }
  ) {
    if (data.image) {
      //move to image service
      //const imageUrl = await uploadImage(data.image);
      //if (imageUrl) {
      //  data.image_url = imageUrl;
      //}
    }
    delete data.image;
    console.log('data', data);
    const { data: result } = await supabase
      .from('blog-posts')
      .insert([data])
      .select();
    return result;
  }
}
