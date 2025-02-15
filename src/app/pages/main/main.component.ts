import { Component } from '@angular/core';
import { ThumbnailComponent } from "../../components/thumbnail/thumbnail.component";
import { PlaylistComponent } from "../../components/playlist/playlist.component";
import { PlayerComponent } from "../../components/player/player.component";

@Component({
  selector: 'app-main',
  imports: [ThumbnailComponent, PlaylistComponent, PlayerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
