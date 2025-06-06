import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { AudioTrackBoxComponent } from "../audio-track-box/audio-track-box.component";
import { AudioFile } from '../../interfaces/audioFile.interface';
import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'component-playlist',
  imports: [
    CommonModule,
    AudioTrackBoxComponent
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {

  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  private audioService = inject(AudioService);
  private ElectronService = inject(ElectronService);

  public isDragging = false;
  public files: File[] = [];
  public filePaths: string[] = [];

  public audioPath = '';

  ngOnInit(): void {

    this.audioService.audioFiles$.subscribe(audioFiles => {
      this.files = audioFiles.map(audioFile => audioFile.name);
      this.filePaths = audioFiles.map(audioFile => audioFile.path);
    });
  }

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

    const dragzone = event.target as HTMLElement;
    dragzone.classList.remove('dragging-over');

    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles) {
      const newFiles = Array.from(droppedFiles).filter(file => this.isValidAudioFile(file));
      this.files = [...this.files, ...newFiles];

      const audioFiles: AudioFile[] = [];
      const filePaths = this.generateFilePaths(this.files);

      for (let i = 0; i < this.files.length; i++) {
        audioFiles.push({
          name: this.files[i],
          path: filePaths[i]
        });
      }

      this.audioService.updateAudioFiles(audioFiles);
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

  addSong() {
    if (!this.fileInput) {
      console.log('fileInput is undefined');
      return;
    }
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = [...input.files];
      this.updateAudioFiles(files);
    }
  }

  updateAudioFiles(files: File[]) {
    const newFiles = Array.from(files).filter(file => this.isValidAudioFile(file));
    this.files = [...this.files, ...newFiles];

    const audioFiles: AudioFile[] = [];
    const filePaths = this.generateFilePaths(this.files);

    for (let i = 0; i < this.files.length; i++) {
      audioFiles.push({
        name: this.files[i],
        path: filePaths[i]
      });
    }

    this.audioService.updateAudioFiles(audioFiles);
  }

}
