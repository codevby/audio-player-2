import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioFilesSource = new BehaviorSubject<File[]>([]);
  audioFiles$ = this.audioFilesSource.asObservable();

  updateAudioFiles(files: File[]) {
    this.audioFilesSource.next(files);
  }

}
