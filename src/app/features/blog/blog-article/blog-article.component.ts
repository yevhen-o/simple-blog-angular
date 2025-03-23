import { Component, Input } from '@angular/core';
import { PostInterface } from '@src/app/types/PostInterface';
import { BackButtonHeadingComponent } from '@src/app/components/back-button-heading/back-button-heading.component';
import { TagListComponent } from '@src/app/components/tag-list/tag-list.component';
import { SharedModule } from '@src/app/shared/shared.module';

import {
  countCommas as countCommasFn,
  countDots as countDotsFn,
} from '@src/app/utils';

@Component({
  selector: 'app-blog-article',
  standalone: true,
  imports: [SharedModule, BackButtonHeadingComponent, TagListComponent],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.scss',
})
export class BlogArticleComponent {
  @Input() article!: PostInterface;

  countCommasFn = countCommasFn;
  countDotsFn = countDotsFn;
}
