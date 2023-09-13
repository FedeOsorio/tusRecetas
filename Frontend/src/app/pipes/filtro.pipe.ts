import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../models/Receta';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(recetas: Receta[], page: number = 0): Receta[] {
    return recetas.slice(page, page + 8);
  }

}
