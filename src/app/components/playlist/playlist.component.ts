import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { AudioTrackBoxComponent } from "../audio-track-box/audio-track-box.component";

@Component({
  selector: 'component-playlist',
  imports: [
    CommonModule,
    AudioTrackBoxComponent
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  private audioService = inject(AudioService);

  public isDragging = false;
  public files: File[] = [];
  public filePaths: string[] = [];

  public audioPath = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
    const dragzone = event.target as HTMLElement;
    dragzone.classList.add('dragging-over');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const dragzone = event.target as HTMLElement;
    dragzone.classList.remove('dragging-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles) {
      const newFiles = Array.from(droppedFiles).filter(file => this.isValidAudioFile(file));
      this.files = [...this.files, ...newFiles];

      const filePaths = this.generateFilePaths(this.files);

      this.audioService.updateAudioFiles(filePaths);
    }
  }

  isValidAudioFile(file: File) {
    const validExtensions = ['mp3', 'wav', 'ogg', 'flac', 'm4a'];

    const extension = file.name.split('.').pop()!.toLowerCase();

    return validExtensions.includes(extension);

  }

  generateFilePaths(files: File[]): string[] {
    const filePaths: string[] = [];
    for (const file of files) {
      filePaths.push(URL.createObjectURL(file));
    }
    return filePaths;
  }

}
