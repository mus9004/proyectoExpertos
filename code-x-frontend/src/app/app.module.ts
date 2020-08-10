import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './componentes/paginas/landing/landing.component';
import { LoginComponent } from './componentes/paginas/login/login.component';
import { RegistroComponent } from './componentes/paginas/registro/registro.component';

import { SidebarComponent } from './componentes/elementos/sidebar/sidebar.component';
import { NavbarComponent } from './componentes/elementos/navbar/navbar.component';
import { ContenedorComponent } from './componentes/paginas/contenedor/contenedor.component';
import { PerfilComponent } from './componentes/paginas/perfil/perfil.component';
import { EditorComponent } from './componentes/paginas/editor/editor.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './componentes/elementos/modal/modal.component';





@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegistroComponent,
    SidebarComponent,
    NavbarComponent,
    ContenedorComponent,
    PerfilComponent,
    EditorComponent,
    ModalComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
 


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
