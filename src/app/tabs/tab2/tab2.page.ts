import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(private alertController: AlertController, private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  enviarPagAct(){
    this.router.navigate(['./actividades']);
  }

}