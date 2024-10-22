import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})
export class E404Page implements OnInit {

  constructor(private loc : Location) { }

  ngOnInit() {
  }

  volver(){
    this.loc.back();
  }

}
