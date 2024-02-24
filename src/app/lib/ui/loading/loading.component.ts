import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../services/global.service';
import { VideoComponent } from '../../ui/video/video.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, VideoComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  globalService = inject(GlobalService)
  loading = toSignal(this.globalService.loading$)
  // loading$ = this.globalService.download$;

}
