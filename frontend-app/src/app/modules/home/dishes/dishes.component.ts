import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../../../shared/services/restaurant.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddDishesComponent } from '../../../shared/components/modal-add-dishes/modal-add-dishes.component';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-dishes',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,RouterModule],
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  restaurant: any;
  dishes:any[]=[];
  dishes_cart:any[]=[];
  user:any;
  service = inject(RestaurantService);
  constructor(private router: Router,private route: ActivatedRoute
    ,@Inject(PLATFORM_ID) private platformId: Object
  ) {}
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    const restaurantString = this.route.snapshot.paramMap.get('restaurant');
    const userString = this.route.snapshot.paramMap.get('user');
    this.user = userString ? JSON.parse(userString) : null;
    console.log(this.user);
    this.restaurant = restaurantString ? JSON.parse(restaurantString) : null;
    this.getCart();
    this.getDishes(this.restaurant.restaurant_id);
  }

  public getDishes(id:number) {
    this.service.findDishesByRestaurant(id).subscribe((data) => {
      this.dishes = data
      this.dishes = this.dishes.map((dish) => {
        const isInCart = this.dishes_cart.some((item) => item.dish_id === dish.dish_id);
        return {
          ...dish, 
          status: isInCart ? 1 : 0 
        };
      });
      console.log(this.dishes);
    });
  }

  openBottomSheet(): void {
    const dialogRef = this.dialog.open(ModalAddDishesComponent, {
      data: this.restaurant.restaurant_id,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDishes(this.restaurant.restaurant_id);
      }
    });
  }

  deleteDish(dish: any) {
    this.service.deleteDishes(dish.dish_id,dish).subscribe((data) => {
      this.getDishes(this.restaurant.restaurant_id);
    })
  }

  updateDishes(dish: any) {
    const dialogRef = this.dialog.open(ModalAddDishesComponent, {
      data:dish,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDishes(this.restaurant.restaurant_id);
      }
    });
  }

  addCart(dish: any) {
    if (isPlatformBrowser(this.platformId)) {
      const existingCart = JSON.parse(localStorage.getItem('dish') || '[]');
  
      existingCart.push(dish);
  
      localStorage.setItem('dish', JSON.stringify(existingCart));

      this.router.navigate(['modules/cart']);
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

  getCart(){
    if (isPlatformBrowser(this.platformId)) {
      const dish = localStorage.getItem('dish');
      if (dish) {
        this.dishes_cart =JSON.parse(dish);
      } else {
        console.error('No se encontró "dish" en localStorage');
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }

}
