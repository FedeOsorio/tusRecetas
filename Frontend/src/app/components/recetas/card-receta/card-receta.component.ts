import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { catchError, map, Observable, of } from 'rxjs';
import { Receta } from 'src/app/models/Receta';
import { RecetasService } from 'src/app/services/recetas.service';

export interface RecetasResponse {
  idReceta: number;
  titulo: string;
  categoria: string;
  ingredientes: [{ nombre: string, cantidad: string }];
  procedimiento: string;
}

@Component({
  selector: 'app-card-receta',
  templateUrl: './card-receta.component.html',
  styleUrls: ['./card-receta.component.css'],
  animations: [
    // Animación de desvanecimiento
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('440ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class CardRecetaComponent implements OnInit {

  faMagnifying = faMagnifyingGlass

  constructor(public http: HttpClient, private recetaService: RecetasService) { }

  public arrayRecetas: Receta[] = [];

  ngOnInit() {
    this.recetaService.cargarRecetas().subscribe(recetas => {
      this.arrayRecetas = this.transformReceta(recetas);
    });
  }

  page: number = 0;
  valorBusqueda: string = '';
  busqueda: string = '';

  buscarRecetas() {
    this.busqueda = this.valorBusqueda
  }

  transformReceta(resp: RecetasResponse[]): Receta[] {
    const listaRecetas: Receta[] = resp.map(receta => {
      return {
        idReceta: receta.idReceta,
        titulo: receta.titulo,
        categoria: receta.categoria,
        procedimiento: receta.procedimiento,
        ingredientes: receta.ingredientes
      }
    });
    return listaRecetas;
  }

  nextPage() {
    this.page += 8;
  }

  prevPage() {
    if (this.page > 0)
      this.page -= 8;
  }

  public recetaElegida: any = [{
    idReceta: 0,
    titulo: "",
    categoria: "",
    procedimiento: "",
    ingredientes: [] as any[]
  }]

  detalleReceta = false;

  mostrarItemReceta() {
    this.detalleReceta = !this.detalleReceta;
  }

  abrirReceta(idReceta: number) {
    this.recetaService.recetaPorId(idReceta)
      .pipe(
        catchError(error => {
          if (error) {
            console.log(error)
          }
          return of(null);
        }))
      .subscribe(receta => {
        if (receta) {
          this.mostrarItemReceta()
          this.recetaElegida = receta;
          console.log(this.recetaElegida);
        }
      })
  }
}