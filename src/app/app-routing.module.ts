import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'landing', loadChildren: './landing/landing.module#LandingPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'add-location', loadChildren: './add-location/add-location.module#AddLocationPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  // { path: 'listed', loadChildren: './listed/listed.module#ListedPageModule' },
  // { path: 'map', loadChildren: './map/map.module#MapPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
