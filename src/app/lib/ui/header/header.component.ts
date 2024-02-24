import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  globalService = inject(GlobalService)
  router = inject(Router)

  update(event:any){
    const url = event.target.value
    this.globalService.url(url)
    this.router.navigate(['/',this.globalService.getId()])
  }

}
