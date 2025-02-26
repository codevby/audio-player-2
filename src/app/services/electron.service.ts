import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() { }

  listenForFiles(): Observable<string[]> {
    return from(window.electron.listenForFiles() as Promise<string[]>);
  }
}
