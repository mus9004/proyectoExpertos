import { EditorComponent } from './componentes/paginas/editor/editor.component';
import { PerfilComponent } from './componentes/paginas/perfil/perfil.component';
import { ContenedorComponent } from './componentes/paginas/contenedor/contenedor.component';
import { RegistroComponent } from './componentes/paginas/registro/registro.component';
import { LoginComponent } from './componentes/paginas/login/login.component';
import { LandingComponent } from './componentes/paginas/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'contenedor', component: ContenedorComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'editor', component: EditorComponent},
  {path: '**', component: LandingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
