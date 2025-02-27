import { Component, OnInit } from '@angular/core';

declare const window: any;

@Component({
  selector: 'component-title-bar',
  imports: [],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.css'
})
export class TitleBarComponent implements OnInit {

  public theme: string = 'dark';

  public windowMaximized = false;

  ngOnInit(): void {
    if (this.theme === 'light') {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
  }

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
