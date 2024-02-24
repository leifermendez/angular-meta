import { GlobalService } from '../../../services/global.service';
import {
  Component,
  ElementRef,
  HostListener,
  Pipe,
  PipeTransform,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, tap, map } from 'rxjs';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent {
  globalService = inject(GlobalService);
  @HostListener('window:resize')
  public detectResize(): void {
    this.width.set(this.element.nativeElement.offsetWidth);
  }

  url$ = this.globalService.url$.pipe(
    map((v) => v.split('v=').pop())
  );

  width = signal(0);

  constructor(private readonly element: ElementRef) {}
}
