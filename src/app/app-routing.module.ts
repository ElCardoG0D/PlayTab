import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tabs/tab1/tab1.module').then( m => m.Tab1PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tabs/tab2/tab2.module').then( m => m.Tab2PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tabs/tab3/tab3.module').then( m => m.Tab3PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tabs/tab4/tab4.module').then( m => m.Tab4PageModule),
    canActivate:[authGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'recover-pw',
    loadChildren: () => import('./recover-pw/recover-pw.module').then( m => m.RecoverPwPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'actividades',
    loadChildren: () => import('./actividades/actividades.module').then( m => m.ActividadesPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'actividad-detalle-modal',
    loadChildren: () => import('./actividad-detalle-modal/actividad-detalle-modal.module').then( m => m.ActividadDetalleModalPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'reset-password', 
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'cambiacomuna',
    loadChildren: () => import('./cambiacomuna/cambiacomuna.module').then( m => m.CambiacomunaPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'adminview',
    loadChildren: () => import('./adminview/adminview.module').then( m => m.AdminviewPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'actividad-det-inscrito-modal',
    loadChildren: () => import('./actividad-det-inscrito-modal/actividad-det-inscrito-modal.module').then( m => m.ActividadDetInscritoModalPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'actividadanfitrion',
    loadChildren: () => import('./actividadanfitrion/actividadanfitrion.module').then( m => m.ActividadanfitrionPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'actividad-anfitrion-detalle',
    loadChildren: () => import('./actividad-anfitrion-detalle/actividad-anfitrion-detalle.module').then( m => m.ActividadAnfitrionDetallePageModule),
    canActivate:[authGuard]
  },
  {
    path: 'cambio-actividad-favorita',
    loadChildren: () => import('./cambio-actividad-favorita/cambio-actividad-favorita.module').then( m => m.CambioActividadFavoritaPageModule),
    canActivate:[authGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
