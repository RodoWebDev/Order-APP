import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },//./login/login.module#LoginPageModule
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'item', loadChildren: './item/item.module#ItemPageModule' },
  { path: 'image', loadChildren: './image/image.module#ImagePageModule' },
  { path: 'signature', loadChildren: './signature/signature.module#SignaturePageModule' },
  { path: 'final', loadChildren: './final/final.module#FinalPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'logout', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
