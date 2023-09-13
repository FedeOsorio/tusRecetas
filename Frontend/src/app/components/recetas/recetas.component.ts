import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardRecetaComponent } from './card-receta/card-receta.component';
import { FormGroup } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SesionService } from 'src/app/services/sesion.service';
import { RecetasService } from 'src/app/services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css'],
  animations: [
    trigger('aparecer', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ opacity: 0 }))
      ]),
    ]),
  ],
})

export class RecetasComponent implements OnInit {

  constructor(
    private recetasService: RecetasService,
    private sesionService: SesionService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { this.sesionService.autenticado }

  ocultarPorSesion: boolean = false;
  mostrarPublicar: boolean = false;

  evitarPublicar() {
    alert("Debe iniciar sesión para poder publicar una receta")
  }

  publicarForm!: FormGroup;
  estado = "";
  categorias: Array<any> = ["Vegan", "Tradicional", "Veggie"];

  get sesionIniciada(): boolean {
    return this.sesionService.autenticado;
  }

  @ViewChild(CardRecetaComponent)
  card!: CardRecetaComponent;
  arrayRecetas: any[] = [];

  ngOnInit() {
    this.cargarCategorias()
    this.cargarTitulos();
    console.log(this.categorias);
    this.card = new CardRecetaComponent(this.http, this.recetasService);
    this.recetasService.cargarRecetas().subscribe((data: any) => {
      this.arrayRecetas = data;
    });
  }

  @ViewChildren('checkCategoria', { read: ElementRef }) recetaMarcada: QueryList<ElementRef<HTMLInputElement>> | undefined;
  
  // FILTRADO DESDE EL HOME
  ngAfterViewInit() {
    const elementoVegan = this.recetaMarcada?.find(elemento => elemento.nativeElement.dataset['categoria'] == 'Vegan');
    const elementoTradicional = this.recetaMarcada?.find(elemento => elemento.nativeElement.dataset['categoria'] == 'Tradicional');
    const elementoVeggie = this.recetaMarcada?.find(elemento => elemento.nativeElement.dataset['categoria'] == 'Veggie');

    this.route.queryParams.subscribe(params => {
      const categoriaHome = params['categoria'];
      if (categoriaHome == 'Tradicional' && elementoTradicional) {
        elementoTradicional.nativeElement.checked = true;
        //DEMORA DE MILISEGUNDOS PARA QUE SE FILTREN DESPUÉS DEL CHECK Y NO AL MISMO TIEMPO
        setTimeout(() => {
          this.filtrarRecetas();
        }, 120);
      } else if (categoriaHome == 'Vegan' && elementoVegan) {
        elementoVegan.nativeElement.checked = true;
        //DEMORA DE MILISEGUNDOS PARA QUE SE FILTREN DESPUÉS DEL CHECK Y NO AL MISMO TIEMPO
        setTimeout(() => {
          this.filtrarRecetas();
        }, 120);
      } else if (categoriaHome == 'Veggie' && elementoVeggie) {
        elementoVeggie.nativeElement.checked = true;
        //DEMORA DE MILISEGUNDOS PARA QUE SE FILTREN DESPUÉS DEL CHECK Y NO AL MISMO TIEMPO
        setTimeout(() => {
          this.filtrarRecetas();
        }, 120);
      }
    });
  }

  cargarCategorias() {
    return this.categorias.sort();
  }

  arrayTitulos: any[] = [];

  cargarTitulos() {
    this.recetasService.cargarRecetas().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        const titulos = data[i].titulo.split(' ')[0];
        if (!this.arrayTitulos.includes(titulos)) { 
          this.arrayTitulos.push(titulos);
        }
      }
      this.arrayTitulos.sort();
      console.log(this.arrayTitulos);
    })
  }

  categoriasSeleccionadas: string[] = [];
  titulosSeleccionados: string[] = [];
  ocultarCategoria: boolean = false;

  filtrar() {
    const checkboxesCategoria = document.querySelectorAll('.checkReceta');
    const checkboxesTitulo = document.querySelectorAll('.checkTitulo');

    // Filtramos de recetas según las categorías seleccionadas
    this.categoriasSeleccionadas = [];
    checkboxesCategoria.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.categoriasSeleccionadas.push(checkbox.getAttribute('categoria'));
      }
    });
    if (this.categoriasSeleccionadas.length == 0) {
      this.card.arrayRecetas = this.arrayRecetas;
    } else {
      this.card.arrayRecetas = this.arrayRecetas.filter((receta: any) => {
        return this.categoriasSeleccionadas.some((categoria: any) => {
          return receta.categoria.includes(categoria);
        });
      });
    }

    // Filtrado de recetas según los títulos seleccionados
    this.titulosSeleccionados = [];
    checkboxesTitulo.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.titulosSeleccionados.push(checkbox.getAttribute('titulo'));
      }
    });
    if (this.titulosSeleccionados.length != 0) {
      this.card.arrayRecetas = this.card.arrayRecetas.filter((receta: any) => {
        return this.titulosSeleccionados.some((titulo: any) => {
          return receta.titulo.includes(titulo);
        });
      });
    }
  }

  marcarCheckbox(event: any) {
    this.filtrar();
  }

  filtrarTitulos() {
    const checkboxes = document.querySelectorAll('.checkTitulo');

    this.titulosSeleccionados = [];
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.titulosSeleccionados.push(checkbox.getAttribute('titulo'));
        console.log(this.titulosSeleccionados);
      }
    });
    if (this.titulosSeleccionados.length == 0) {
      this.card.arrayRecetas = this.arrayRecetas;
    } else {
      this.card.arrayRecetas = this.arrayRecetas.filter((arrayRecetas: any) => {
        return this.titulosSeleccionados.some((titulo: any) => {
          return arrayRecetas.titulo.includes(titulo);
        });
      });
    }
  }

  filtrarRecetas() {
    const checkboxes = document.querySelectorAll('.checkReceta');

    this.categoriasSeleccionadas = [];
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.categoriasSeleccionadas.push(checkbox.getAttribute('categoria'));
        console.log(this.categoriasSeleccionadas);
      }
    });

    if (this.categoriasSeleccionadas.length == 0) {
      this.card.arrayRecetas = this.arrayRecetas;
    } else {
      this.card.arrayRecetas = this.arrayRecetas.filter((arrayRecetas: any) => {
        return this.categoriasSeleccionadas.some((categoria: any) => {
          return arrayRecetas.categoria.includes(categoria);
        });
      });
    }
  }

  limpiarUrl() {
    this.router.navigate([], { queryParams: {} });
  }

  // BARRA DE BÚSQUEDA
  searchValue: string = '';

  buscarReceta() {
    let botonBuscar = document.querySelector('.searchRecetaButton') as HTMLButtonElement;
    let barraBusqueda = document.querySelector('.searchRecetaBar') as HTMLInputElement;
    let searchValue = barraBusqueda.value.toLowerCase();
    document.querySelectorAll(".itemCard").forEach(item => {
      let cardTitle = item.querySelector('.itemTitle') as HTMLHeadingElement;
      if (cardTitle.textContent) {
        cardTitle.textContent.toLowerCase();
      }
      (cardTitle.textContent?.toLowerCase()?.includes(searchValue)) ? item.classList.remove("filtro") : item.classList.add("filtro");
    });
  }

}