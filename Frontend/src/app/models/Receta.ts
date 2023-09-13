import { Ingredientes } from "./Ingredientes";

export class Receta {
    constructor(
        public idReceta: number,
        public titulo: string,
        public categoria: string,
        public procedimiento: string,
        public ingredientes: Ingredientes[]
    ) { }
}