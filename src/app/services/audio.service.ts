import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioFilesSource = new BehaviorSubject<string[]>([]);
  audioFiles$ = this.audioFilesSource.asObservable();

  private songPlayingIndex = new BehaviorSubject<number>(0);

  updateAudioFiles(filesPath: string[]) {
    this.audioFilesSource.next(filesPath);
  }

  getSongPlayingIndex() {
    return this.songPlayingIndex.asObservable();
  }

  setSongPlayingIndex(index: number) {
    this.songPlayingIndex.next(index);
  }

}
