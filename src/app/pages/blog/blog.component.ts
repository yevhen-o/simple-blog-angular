import { Component, inject } from '@angular/core';
import { ListWrapperComponent } from '@src/app/components/list-wrapper/list-wrapper.component';
import { BlogItemComponent } from '@src/app/features/blog/blog-item/blog-item.component';
import { BlogService } from '@src/app/services/blog.service';
import { PostInterface } from '@src/app/types/PostInterface';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ListWrapperComponent, BlogItemComponent, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  private route = inject(ActivatedRoute);
  isLoading = false;
  error: string | null = null;
  posts: PostInterface[] = [];

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe({
      next: (data) => {
        this.posts = data['posts'];
        this.isLoading = false;
      },
      error: (e) => {
        this.error = e.message || 'Failed to load blog posts.';
        this.isLoading = false;
      },
    });
  }
}

export const resolveBlogPosts: ResolveFn<
  Promise<PostInterface[] | null>
> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const blogService = inject(BlogService);
  try {
    const posts = await blogService.getBlogPosts();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts in resolver:', error);
    return null;
  }
};
