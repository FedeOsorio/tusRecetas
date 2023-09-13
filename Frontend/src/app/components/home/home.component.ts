import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Query } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toTradicionales(): void {
    this.router.navigate(['/recetas'], { queryParams: { categoria: 'Tradicional' } });
  }
  toVeggie(): void {
    this.router.navigate(['/recetas'], { queryParams: { categoria: 'Veggie' } });
  }
  toVegan(): void {
    this.router.navigate(['/recetas'], { queryParams: { categoria: 'Vegan' } });
  }
}