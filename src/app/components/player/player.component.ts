import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'component-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit, OnDestroy {

  private audioService = inject(AudioService);

  public audioFiles: File[] = [];
  public currentFileIndex = 0;
  public audioPlayer?: HTMLAudioElement;

  ngOnInit(): void {
    this.audioService.audioFiles$.subscribe(files => {
      this.audioFiles = files;

      if (files.length > 0 && !this.audioPlayer) {
        this.playAudio(this.currentFileIndex);
      }
    });

    this.audioPlayer = new Audio();
    this.audioPlayer.addEventListener('ended', () => {
      this.nextAudio();
    });
  }

  ngOnDestroy(): void {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.src = '';
    }
  }

  playAudio(index: number): void {
    console.log(this.audioPlayer);
    if (!this.audioPlayer) return;
    if (index >= 0 && index < this.audioFiles.length) {
      const file = this.audioFiles[index];
      const objectUrl = URL.createObjectURL(file);

      console.log('Reproduciendo:', file.name, 'URL:', objectUrl);

      this.audioPlayer.src = objectUrl;
      this.audioPlayer.load();

      this.audioPlayer.play().catch(error => {
        console.error('Error al reproducir el archivo:', error);
      });

      this.currentFileIndex = index;
    } else {
      console.warn('No hay archivos disponibles para reproducir.');
    }
  }

  nextAudio(): void {
    this.playAudio(this.currentFileIndex + 1);
  }

  previousAudio(): void {
    this.playAudio(this.currentFileIndex - 1);
  }

}
