import { Injectable } from '@angular/core';
import { Receta } from '../models/Receta';
import { HttpClient } from '@angular/common/http';
import { RecetasResponse } from '../components/recetas/card-receta/card-receta.component';
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(private http: HttpClient) { }

  recetasCompletas() {
    return this.http.get<RecetasResponse[]>("http://localhost:9080/recetas")
  }

  recetaPorId(recetaId: number) {
    return this.http.get<Receta[]>(`http://localhost:9080/recetas/${recetaId}`)
  }

  cargarRecetas(): Observable<RecetasResponse[]> {
    return this.recetasCompletas().pipe(
      map((recetas: RecetasResponse[]) => {
        return recetas.sort((a, b) => b.idReceta - a.idReceta);
      })
    );
  }
}
