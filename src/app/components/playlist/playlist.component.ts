import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'component-playlist',
  imports: [
    CommonModule,
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  private audioService = inject(AudioService);

  public isDragging = false;
  public files: File[] = [];
  public filePaths: string[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles) {
      const newFiles = Array.from(droppedFiles).filter(file => this.isValidAudioFile(file));
      this.files = [...this.files, ...newFiles];
      this.audioService.updateAudioFiles(this.files);
    }
  }

  isValidAudioFile(file: File) {
    const validExtensions = ['mp3', 'wav', 'ogg', 'flac', 'm4a'];

    const extension = file.name.split('.').pop()!.toLowerCase();

    return validExtensions.includes(extension);

  }

}
