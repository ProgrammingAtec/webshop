import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '../shared/injectionTokens/window.token';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    console.log('window: ', this.window);
  }

}
