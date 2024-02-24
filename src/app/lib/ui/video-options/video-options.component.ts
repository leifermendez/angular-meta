import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-video-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-options.component.html',
  styleUrls: ['./video-options.component.css'],
})
export class VideoOptionsComponent {
  globalService = inject(GlobalService)

  download$ = this.globalService.download$;
  whisper$ = this.globalService.whisper$;

  download() {
    this.globalService.download().subscribe();
  }

  whisper() {
    this.globalService.whisper().subscribe();
  }
}
