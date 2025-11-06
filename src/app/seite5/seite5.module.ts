import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Seite5PageRoutingModule } from './seite5-routing.module';

import { Seite5Page } from './seite5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Seite5PageRoutingModule
  ],
  declarations: [Seite5Page]
})
export class Seite5PageModule {}
