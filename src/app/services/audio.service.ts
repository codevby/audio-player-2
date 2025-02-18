import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AudioFile } from '../interfaces/audioFile.interface';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioFilesSource = new BehaviorSubject<AudioFile[]>([]);
  audioFiles$ = this.audioFilesSource.asObservable();

  private songPlayingIndex = new BehaviorSubject<number>(0);

  private isSongPlaying = new BehaviorSubject<boolean>(false);
  isSongPlaying$ = this.isSongPlaying.asObservable();

  updateAudioFiles(audioFiles: AudioFile[]) {
    this.audioFilesSource.next(audioFiles);
  }

  getAudioFilesPaths() {
    return this.audioFilesSource.asObservable();
  }

  getSongPlayingIndex() {
    return this.songPlayingIndex.asObservable();
  }

  setSongPlayingIndex(index: number) {
    this.songPlayingIndex.next(index);
  }

  getIsSongPlaying() {
    return this.isSongPlaying.asObservable();
  }

  setIsSongPlaying(isPlaying: boolean) {
    this.isSongPlaying.next(isPlaying);
  }

  removeSong(index: number) {
    this.audioFilesSource.value.splice(index, 1)
    this.audioFilesSource.next(this.audioFilesSource.value);
  }
}
