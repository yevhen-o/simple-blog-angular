import { Component, OnInit } from '@angular/core';
import { ListWrapperComponent } from '@src/app/components/list-wrapper/list-wrapper.component';
import { BlogItemComponent } from '@src/app/features/blog/blog-item/blog-item.component';
import { getBlogPosts } from '@src/app/services';
import { PostInterface } from '@src/app/types/PostInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ListWrapperComponent, BlogItemComponent, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  posts: PostInterface[] = [];
  isLoading = false;
  error: string | null = null;

  async ngOnInit() {
    this.isLoading = true;
    try {
      const posts = await getBlogPosts();
      if (posts) {
        this.posts = posts as unknown as PostInterface[];
      } else {
        this.error = 'No posts found.';
      }
    } catch (e: any) {
      this.error = e.message || 'Failed to load blog posts.';
    } finally {
      this.isLoading = false;
    }
  }
}
