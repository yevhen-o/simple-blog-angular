import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostInterface } from '@src/app/types/PostInterface';
import { getUrl, IDENTIFIERS } from '@src/app/utils';
import { TagListComponent } from '@src/app/components/tag-list/tag-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [CommonModule, TagListComponent, RouterLink],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.scss',
})
export class BlogItemComponent {
  @Input() item!: Pick<
    PostInterface,
    'slug' | 'author' | 'title' | 'image_url' | 'tags'
  >;
  IDENTIFIERS = IDENTIFIERS;
  getUrl = getUrl;
}
