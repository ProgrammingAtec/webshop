import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
  }

}
