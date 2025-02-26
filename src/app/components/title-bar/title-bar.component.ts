import { Component } from '@angular/core';

declare const window: any;

@Component({
  selector: 'component-title-bar',
  imports: [],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.css'
})
export class TitleBarComponent {

  public windowMaximized = false;

  minimizeWindow() {
    window.electron.minimizeWindow();
  }

  maximizeWindow() {
    window.electron.maximizeWindow();
    this.windowMaximized = !this.windowMaximized;
  }

  closeWindow() {
    window.electron.closeWindow();
  }

}
