import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private localS : LocalStorageService) { }

  ngOnInit() {
    const userId = this.localS.ObtenerId('Id_User');
    console.log('Id:', userId);
  }

}
