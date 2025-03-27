import {
  Component,
  Input,
  ViewContainerRef,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-template #portalContent
    ><ng-content></ng-content
  ></ng-template>`,
})
export class PortalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('portalContent', { static: true })
  portalContent!: TemplateRef<any>;

  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {
    this.createPortal();
  }

  ngOnDestroy(): void {
    this.destroyPortal();
  }

  private createPortal(): void {
    const config = new OverlayConfig({
      hasBackdrop: false, // You can add a backdrop if needed
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(), // Or custom position
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    this.overlayRef = this.overlay.create(config);
    const portal = new TemplatePortal(
      this.portalContent,
      this.viewContainerRef
    );
    this.overlayRef.attach(portal);
  }

  private destroyPortal(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
