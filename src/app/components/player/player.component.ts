import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('audioPlayer', { static: true })
  private audioPlayer!: ElementRef<HTMLAudioElement>;

  @ViewChild('progressBar', { static: true })
  private progressBar!: ElementRef<HTMLInputElement>;

  @ViewChild('volumeBar', { static: true })
  private volumeBar!: ElementRef<HTMLInputElement>;

  private audioService = inject(AudioService);

  public audioFilesPaths: string[] = [];
  public currentFileIndex = 0;

  public isPlaying = false;
  public currentTime = 0;
  public duration = 0;
  public volume = 1;
  public isRandomActive = false;
  public isRepeatActive = false;

  ngOnInit(): void {
    const audio = this.audioPlayer.nativeElement;

    this.setVolume();

    audio.addEventListener('loadedmetadata', () => {
      this.duration = Math.floor(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(audio.currentTime);
      this.updateProgressBar();

      this.manageSongEnding();
    });

    this.audioService.audioFiles$.subscribe(audioFiles => {
      this.audioFilesPaths = audioFiles.map(audioFile => audioFile.path);

    });

    this.audioService.getSongPlayingIndex().subscribe(index => {
      this.currentFileIndex = index;
      this.currentTime = 0;

      this.updateProgressBar();

      audio.src = this.audioFilesPaths[this.currentFileIndex];

      if (this.isPlaying) {
        this.play();
      }
    });

  }

  manageSongEnding() {
    const audio = this.audioPlayer.nativeElement;

    if (this.isPlaying && this.duration !== 0 && this.currentTime >= this.duration) {

      if (this.isRepeatActive) {
        this.currentTime = 0;
        audio.currentTime = 0;
        audio.play();
      } else {
        if (this.isRandomActive) {
          this.playlistMoveRandom();
        } else {
          this.playlistMove('next');
        }
      }
    }
  }

  play() {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = this.currentTime;
    if (!audio) return;
    audio.pause();
    this.isPlaying = false;
    audio.src = this.audioFilesPaths[this.currentFileIndex];
    audio.load();
    audio.play();
    this.isPlaying = true;
  }

  playPause() {
    const audio = this.audioPlayer.nativeElement;
    audio.src = this.audioFilesPaths[this.currentFileIndex];
    audio.currentTime = this.currentTime;
    if (!this.isPlaying) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
    this.audioService.setIsSongPlaying(this.isPlaying);
  }

  playlistMove(moveTo: string) {
    const audio = this.audioPlayer.nativeElement;

    if (!audio) {
      console.log('audio is null');
      return;
    }

    audio.pause();

    if (moveTo === 'next') {

      this.currentFileIndex++;

      if (this.currentFileIndex >= this.audioFilesPaths.length) {
        this.currentFileIndex = 0;
      }

      audio.src = this.audioFilesPaths[this.currentFileIndex];

    } else if (moveTo === 'previous') {

      this.currentFileIndex--;

      if (this.currentFileIndex < 0) {
        this.currentFileIndex = this.audioFilesPaths.length - 1;
      }

      audio.src = this.audioFilesPaths[this.currentFileIndex];
      this.updateProgressBar();

    }

    this.updateSongPlayingIndex(this.currentFileIndex);

    if (this.isPlaying) {
      audio.play();
      this.isPlaying = true;
    } else {
      this.isPlaying = false;
    }

  }

  playlistMoveRandom() {
    const random = Math.floor(Math.random() * this.audioFilesPaths.length);
    const audio = this.audioPlayer.nativeElement;
    audio.pause();
    this.currentFileIndex = random;
    audio.src = this.audioFilesPaths[this.currentFileIndex];
    audio.load();
    this.updateProgressBar();
    this.updateSongPlayingIndex(this.currentFileIndex);
    audio.play();
  }

  toggleRandom() {
    this.isRandomActive = !this.isRandomActive;
    if (this.isRepeatActive) {
      this.isRepeatActive = false;
    }
  }

  toggleRepeat() {
    this.isRepeatActive = !this.isRepeatActive;
    if (this.isRandomActive) {
      this.isRandomActive = false;
    }
  }

  updateSongPlayingIndex(index: number) {
    this.audioService.setSongPlayingIndex(index);
  }

  seekAudio() {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = this.currentTime;

    this.updateProgressBar();
  }

  private updateProgressBar() {
    const progressBar = this.progressBar.nativeElement;
    const audio = this.audioPlayer.nativeElement;

    const { currentTime, duration } = audio;
    let progress = 0;

    if (this.currentTime != 0) {
      progress = (currentTime / duration) * 100;
    }

    progressBar.style.setProperty('background', `linear-gradient(to right, var(--black-color) ${progress}%,var(--bkg-color) ${progress}%)`);

  }

  setVolume() {
    const audio = this.audioPlayer.nativeElement;

    const volumeBar = this.volumeBar.nativeElement;

    audio.volume = this.volume;

    let progress = (audio.volume / 1) * 100;

    volumeBar.style.setProperty('background', `linear-gradient(to right, var(--black-color) ${progress}%, var(--bkg-color) ${progress}%)`);
  }

}
