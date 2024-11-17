import { AddCartComponent } from './add-cart/add-cart.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DishesComponent } from './dishes/dishes.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'restaurant',
        component: RestaurantComponent,
      },
      {
        path: 'dishes',
        component: DishesComponent,
      },
      {
        path: 'cart',
        component: AddCartComponent,
      }
    ]
  },
];
