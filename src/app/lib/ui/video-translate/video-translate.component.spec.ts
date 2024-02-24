import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTranslateComponent } from './video-translate.component';

describe('VideoTranslateComponent', () => {
  let component: VideoTranslateComponent;
  let fixture: ComponentFixture<VideoTranslateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VideoTranslateComponent]
    });
    fixture = TestBed.createComponent(VideoTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
