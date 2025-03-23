import { Component, inject } from '@angular/core';
import { BlogService } from '@src/app/services/blog.service';
import { PostInterface } from '@src/app/types/PostInterface';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { BlogArticleComponent } from '@src/app/features/blog/blog-article/blog-article.component';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [BlogArticleComponent, CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent {
  private route = inject(ActivatedRoute);
  isLoading = false;
  error: string | null = null;
  post: PostInterface | null = null;

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe({
      next: (data) => {
        this.post = data['post'];
        this.isLoading = false;
      },
      error: (e) => {
        this.error = e.message || 'Failed to load blog posts.';
        this.isLoading = false;
      },
    });
  }
}

export const resolveSingleBlogPosts: ResolveFn<
  Promise<PostInterface | null>
> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const blogService = inject(BlogService);
  try {
    const post = await blogService.getBlogBySlug(activatedRoute.params['slug']);
    return post;
  } catch (error) {
    console.error('Error fetching blog posts in resolver:', error);
    return null;
  }
};
