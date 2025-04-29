import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

declare const window: any;

@Component({
  selector: 'component-thumbnail',
  imports: [],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.css'
})
export class ThumbnailComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) {}

  public audioPathFromFile: string = 'Test';

  ngOnInit(): void {
    this.audioPathFromFile = window.electron.getFilePath();
  }

  onClick() {
    console.log( window.electron.getFilePath() );
  }
}
