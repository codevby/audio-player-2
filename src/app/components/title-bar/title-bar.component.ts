import { Component } from '@angular/core';

declare const window: any;
const { ipcRenderer } = window.require('electron');

@Component({
  selector: 'component-title-bar',
  imports: [],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.css'
})
export class TitleBarComponent {

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
