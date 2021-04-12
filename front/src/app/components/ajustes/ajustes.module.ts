import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesRoutingModule } from './ajustes-routing.module';
import { AjustesComponent } from './ajustes.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AjustesComponent],
  imports: [
    CommonModule,
    AjustesRoutingModule,
    FormsModule

  ], 
  providers: []
})
export class AjustesModule { }
