import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-audio-track-box',
  imports: [
    CommonModule
  ],
  templateUrl: './audio-track-box.component.html',
  styleUrl: './audio-track-box.component.css'
})
export class AudioTrackBoxComponent implements OnInit, AfterViewInit {

  private audioService = inject(AudioService);
  private videoElement!: HTMLVideoElement;

  @Input() songName: string = '';
  @Input() songId: string = '';

  public currentTrack = false;
  public isPlaying = false;

  ngOnInit(): void {
    this.audioService.getSongPlayingIndex().subscribe(index => {
      this.currentTrack = index.toString() === this.songId;
      console.log('hi')
    });

    this.audioService.getIsSongPlaying().subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });
  }

  ngAfterViewInit(): void {
    this.videoElement = document.getElementById('playing-animation') as HTMLVideoElement;
  }

  isCurrentSongPlaying() {
    return this.currentTrack;
  }

  changeSong(songId: string) {
    this.audioService.setSongPlayingIndex(Number(songId));
    console.log(songId);
  }

}
