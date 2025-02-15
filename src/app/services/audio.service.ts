import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioFilesSource = new BehaviorSubject<string[]>([]);
  audioFiles$ = this.audioFilesSource.asObservable();

  updateAudioFiles(filesPath: string[]) {
    this.audioFilesSource.next(filesPath);
    console.log(filesPath);
  }

}
