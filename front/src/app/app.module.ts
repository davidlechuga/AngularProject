import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiaCompletaComponent } from './components/noticia-completa/noticia-completa.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ModalsComponent } from './shared/modals/modals.component';

import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';


@NgModule({
  declarations: [
    AppComponent,
    NoticiaCompletaComponent,
    NavbarComponent,
    FooterComponent,
    ModalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
