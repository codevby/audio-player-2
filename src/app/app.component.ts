import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare const require: any;
const { ipcRenderer } = require('electron');

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'audio-player-angular-electron';

  public windowMaximized = false;


  minimizeWindow() {
    ipcRenderer.send('minimize');
  }

  maximizeWindow() {
    ipcRenderer.send('maximize');
    this.windowMaximized = !this.windowMaximized;
  }

  closeWindow() {
    ipcRenderer.send('close');
  }

}
