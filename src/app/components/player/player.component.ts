import { Component, inject, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

@Component({
  selector: 'component-player',
  imports: [
    CommonModule,
    FormsModule,
    TimeFormatPipe
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {

  private audioService = inject(AudioService);

  public audioFilesPaths: string[] = [];
  public currentFileIndex = 0;

  public isPlaying = false;
  public currentTime = 0;
  public duration = 0;

  ngOnInit(): void {
    const audio = document.getElementById('audio-player') as HTMLAudioElement;

    audio.addEventListener('loadedmetadata', () => {
      this.duration = Math.floor(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(audio.currentTime);
    });

    this.audioService.audioFiles$.subscribe(filesPaths => {
      this.audioFilesPaths = filesPaths;
    });
  }

  playPause() {
    const audio = document.getElementById('audio-player') as HTMLAudioElement;
    audio.src = this.audioFilesPaths[this.currentFileIndex];
    audio.currentTime = this.currentTime;
    if (!this.isPlaying) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  playlistMove(moveTo: string) {
    const audio = document.getElementById('audio-player') as HTMLAudioElement;
    audio.pause();

    if (moveTo === 'next') {

      this.currentFileIndex++;

      if (this.currentFileIndex >= this.audioFilesPaths.length) {
        this.currentFileIndex = 0;
      }

      audio.src = this.audioFilesPaths[this.currentFileIndex];

      if (this.isPlaying) {
        audio.play();
        this.isPlaying = true;
      } else {
        this.isPlaying = false;
      }

    } else if (moveTo === 'previous') {

      this.currentFileIndex--;

      if (this.currentFileIndex < 0) {
        this.currentFileIndex = this.audioFilesPaths.length - 1;
      }

      audio.src = this.audioFilesPaths[this.currentFileIndex];

      if (this.isPlaying) {
        audio.play();
        this.isPlaying = true;
      } else {
        this.isPlaying = false;
      }


    }
  }

  seekAudio() {
    const audio = document.getElementById('audio-player') as HTMLAudioElement;
    audio.currentTime = this.currentTime;
  }

}
