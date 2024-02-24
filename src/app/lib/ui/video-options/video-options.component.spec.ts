import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOptionsComponent } from './video-options.component';

describe('VideoOptionsComponent', () => {
  let component: VideoOptionsComponent;
  let fixture: ComponentFixture<VideoOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VideoOptionsComponent]
    });
    fixture = TestBed.createComponent(VideoOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
