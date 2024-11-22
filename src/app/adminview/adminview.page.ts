import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.page.html',
  styleUrls: ['./adminview.page.scss'],
})
export class AdminviewPage implements OnInit {

  constructor(private router:Router, private localS : LocalStorageService, private dataBase: DatabaseService, private alertController: AlertController) { }

  ngOnInit() {
  }

  logOut(){
    this.localS.ElimnarUsuario('user');
    this.localS.LimpiarUsuario();
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['./login']);
  }

}
