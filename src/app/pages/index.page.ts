import { Component } from '@angular/core';
import { HeaderComponent } from '../lib/ui/header/header.component';
import { HeroComponent } from '../lib/ui/hero/hero.component';
import { VideoComponent } from '../lib/ui/video/video.component';
import { VideoTranslateComponent } from '../lib/ui/video-translate/video-translate.component';
import { VideoOptionsComponent } from '../lib/ui/video-options/video-options.component';
import { LoadingComponent } from '../lib/ui/loading/loading.component';
import { PlayerComponent } from '../lib/ui/player/player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-loading />
    <div>
      <section>
        <app-header />
      </section>
      <section class="flex pt-20 justify-center h-[calc(100vh_-_70px)] relative">
        <app-video-translate />
      </section>
      <app-player />
    </div>
  `,
  imports: [
    HeaderComponent,
    HeroComponent,
    VideoComponent,
    VideoTranslateComponent,
    VideoOptionsComponent,
    LoadingComponent,
    PlayerComponent
  ],
})
export default class HomeComponent {

}
