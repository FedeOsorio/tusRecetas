import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../models/Receta';

@Pipe({
  name: 'searchbar'
})
export class SearchbarPipe implements PipeTransform {

  transform(recetas: Receta[], search: string): Receta[] {
    if (!search) {
      return recetas;
    }
    let recetasFiltradas = recetas.filter(receta => receta.titulo.toLowerCase().includes(search.toLowerCase()) || receta.procedimiento.toLowerCase().includes(search.toLowerCase()) || receta.categoria.toLowerCase().includes(search.toLowerCase()));
    return recetasFiltradas;
  }
}