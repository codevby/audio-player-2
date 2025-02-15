import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'component-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {

  private audioService = inject(AudioService);

  public audioFilesPaths: string[] = [];
  public currentFileIndex = 0;

  ngOnInit(): void {
    this.audioService.audioFiles$.subscribe(filesPaths => {
      this.audioFilesPaths = filesPaths;
    });
  }

}
