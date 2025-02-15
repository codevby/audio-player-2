import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTrackBoxComponent } from './audio-track-box.component';

describe('AudioTrackBoxComponent', () => {
  let component: AudioTrackBoxComponent;
  let fixture: ComponentFixture<AudioTrackBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioTrackBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioTrackBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
