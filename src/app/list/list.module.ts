import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage,
    children: [
      {
        path: 'listed',
        loadChildren: '../listed/listed.module#ListedPageModule'
      },
      {
        path: 'map',
        loadChildren: '../map/map.module#MapPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/list/listed',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
