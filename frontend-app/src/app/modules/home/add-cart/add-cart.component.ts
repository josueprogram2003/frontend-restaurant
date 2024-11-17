import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.scss'
})
export class AddCartComponent implements OnInit  {

  dishes: any[] = [];
  total:number = 0;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    if (isPlatformBrowser(this.platformId)) {
      const dish = localStorage.getItem('dish');
      if (dish) {
        this.dishes=JSON.parse(dish);
        console.log(this.dishes);
        this.total = this.dishes.reduce((sum, dish) => sum + (dish.promotional_price || 0), 0);
        console.log(this.total);
      } else {
        console.error('No se encontró "dish" en localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  deleteCard(dishToDelete: any): void {
    this.dishes = this.dishes.filter(dish => dish !== dishToDelete);
  
    this.total = this.dishes.reduce((sum, dish) => sum + (dish.promotional_price || 0), 0);
  
    localStorage.setItem('dish', JSON.stringify(this.dishes));
    this.getCart();
  }

}
