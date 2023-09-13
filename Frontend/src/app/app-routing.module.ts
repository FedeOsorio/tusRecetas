import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AgregarRecetaComponent } from './components/recetas/agregar-receta/agregar-receta.component';
import { CardRecetaComponent } from './components/recetas/card-receta/card-receta.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'cargar-receta', component: CardRecetaComponent },
  { path: '**', redirectTo: '', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
