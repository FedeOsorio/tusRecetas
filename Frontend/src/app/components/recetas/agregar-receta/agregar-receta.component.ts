import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Receta } from 'src/app/models/Receta';

interface RecetaCreada {
  idReceta: number;
  titulo: string;
  categoria: string;
  procedimiento: string;
}

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})
export class AgregarRecetaComponent {

  public ingredientesFormArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient) { this.ingredientesFormArray = this.publicarForm.get('ingredientes') as FormArray }

  get titulo() {
    return this.publicarForm.controls['titulo'];
  }
  get categoria() {
    return this.publicarForm.controls['categoria'];
  }
  get ingredientes() {
    return this.publicarForm.controls['ingredientes'] as FormArray;
  }

  publicarForm = this.formBuilder.group({
    titulo: ['', Validators.required],
    categoria: ['', Validators.required],
    ingredientes: this.formBuilder.array([], Validators.required),
    procedimiento: ['']
  });

  agregarIngrediente() {
    this.ingredientes.push(
      this.formBuilder.group({
        nombre: ['', Validators.required],
        cantidad: ['', Validators.required]
      })
    );
  }

  removerIngrediente(indice: number) {
    this.ingredientesFormArray.removeAt(indice);
  }

  mostrarErrores = false;

  cargarReceta() {
    this.mostrarErrores = true;
    if (this.publicarForm.invalid) {
      return;
    } else {
      const ingredientes = this.publicarForm.controls['ingredientes'].value;
      const receta: Receta = {
        idReceta: 0,
        titulo: this.publicarForm.controls['titulo'].value ?? '',
        categoria: this.publicarForm.controls['categoria'].value ?? '',
        ingredientes: ingredientes.map((ingrediente: any) => {
          return { nombre: ingrediente.nombre, cantidad: ingrediente.cantidad };
        }),
        procedimiento: this.publicarForm.controls['procedimiento'].value ?? '',
      };
      console.log(receta);

      this.http.post<RecetaCreada>('http://localhost:9080/recetas/crear', receta)
        .subscribe(respuesta => {
          console.log('La receta se ha agregado correctamente');
          console.log(respuesta);
        })
      this.publicarForm.reset();
      this.mostrarErrores = false;
      location.reload();
    }
  }
}