import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardRecetaComponent } from './components/recetas/card-receta/card-receta.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgregarRecetaComponent } from './components/recetas/agregar-receta/agregar-receta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { FiltroPipe } from './pipes/filtro.pipe';
import { DatosComponent } from './components/profile/datos/datos.component';
import { AyudaPerfilComponent } from './components/profile/ayuda-perfil/ayuda-perfil.component';
import { SearchbarPipe } from './pipes/searchbar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    ProfileComponent,
    RecetasComponent,
    RegistroComponent,
    CardRecetaComponent,
    AgregarRecetaComponent,
    FiltroPipe,
    DatosComponent,
    AyudaPerfilComponent,
    SearchbarPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
