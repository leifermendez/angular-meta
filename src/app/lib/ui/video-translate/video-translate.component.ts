import { GlobalService } from '../../../services/global.service';
import { AfterContentChecked, AfterContentInit, Component, Directive, ElementRef, Renderer2, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

declare global {
  interface Window { marked: any; }
}

@Directive({
  standalone:true,
  selector:'[markdown]',
})
export class MarkDownDirective implements AfterContentChecked{
  elementRef = inject(ElementRef)
  _window = (globalThis.window as any)


  constructor(){
  }

  ngAfterContentChecked(): void {
    const el = this.elementRef.nativeElement as HTMLElement
    const p =el.innerHTML.split('<p>').map(text => `<p class="py-3">${text}`).join('')
    el.innerHTML = p
  }
  
}

@Component({
  selector: 'app-video-translate',
  standalone: true,
  imports: [CommonModule ,MarkDownDirective],
  templateUrl: './video-translate.component.html',
  styleUrls: ['./video-translate.component.css']
})
export class VideoTranslateComponent {

  @ViewChild('markdown') markdown!:ElementRef;

  rendered2 = inject(Renderer2)
  globalService = inject(GlobalService)

  text = toSignal(this.globalService.text$)

  
}
