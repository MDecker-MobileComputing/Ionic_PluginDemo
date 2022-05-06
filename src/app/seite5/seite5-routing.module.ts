import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Seite5Page } from './seite5.page';

const routes: Routes = [
  {
    path: '',
    component: Seite5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seite5PageRoutingModule {}
