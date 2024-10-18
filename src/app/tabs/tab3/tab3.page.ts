import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(private router:Router, private localS : LocalStorageService) { }

  ngOnInit() {
    const userId = this.localS.ObtenerId('Id_User');
    console.log('Id:', userId);
  }

  logOut(){
    this.localS.ElimnarId('Id_User');
    this.router.navigate(['./login']);
  }

}
