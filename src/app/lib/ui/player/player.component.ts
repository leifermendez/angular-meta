import { GlobalService } from './../../../services/global.service';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  globalService = inject(GlobalService)
  stateDownload = toSignal(this.globalService.download$)
  stateWhisper = toSignal(this.globalService.whisper$)
  videoInfo = toSignal(this.globalService.video$)
  url = toSignal(this.globalService.url$)

  download(){
    this.globalService.download().subscribe()
  }
  
  whisper(){
    this.globalService.whisper().subscribe()
  }

}
