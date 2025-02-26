import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'component-thumbnail',
  imports: [],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.css'
})
export class ThumbnailComponent implements OnInit {

  public theme: string = 'dark';

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

}
