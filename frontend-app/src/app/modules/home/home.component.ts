import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RestaurantComponent,
    MatTabsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showFiller = false;
}
