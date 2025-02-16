import { Component, inject, Input, OnInit } from '@angular/core';
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
export class AudioTrackBoxComponent implements OnInit {

  private audioService = inject(AudioService);

  @Input() songName: string = '';
  @Input() songId: string = '';

  public isPlaying = false;

  ngOnInit(): void {
    this.audioService.getSongPlayingIndex().subscribe(index => {
      this.isPlaying = index.toString() === this.songId;
    });
  }

  isCurrentSongPlaying() {
    return this.isPlaying;
  }

}
