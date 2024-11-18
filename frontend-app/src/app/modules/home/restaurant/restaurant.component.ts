import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddComponent } from '../../../shared/components/modal-add/modal-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RestaurantService } from '../../../shared/services/restaurant.service';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
export interface PeriodicElement {
  position: number;
  nombre: string;
  direccion: number;
  horario: number;
  descripcion: string;
}

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    MatTableModule,
    ModalAddComponent,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [RestaurantService],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'nombre',
    'direccion',
    'horario',
    'descripcion',
    'categoria',
    'clasificacion',
    'acciones',
  ];
  dataSource?:any;
  restaurants: any[] = [];
  readonly dialog = inject(MatDialog);
  service = inject(RestaurantService);
  dataURL:any;
  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dataURL = params;
      console.log(this.dataURL);
      this.getRestaurants();
    });
  }

  openBottomSheet(): void {
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRestaurants();
      }
    });
  }

  getRestaurants() {
    this.service.getRestaurants().subscribe((res: any[]) => {
      this.dataSource = res;
    });
  }

  deleteRestaurant(restaurant: any) {
    this.service.deleteRestaurant(restaurant.restaurant_id).subscribe((res: any[]) => {
      this.getRestaurants();
    });
  }

  updateRestaurant(restaurant: any) {
    console.log(restaurant);
    const dialogRef = this.dialog.open(ModalAddComponent, {
      data:{restaurant: restaurant, user: this.dataURL},
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRestaurants();
      }
    });
  }

  openDishes(restaurant: any) {
    this.router.navigate(['modules/dishes', { restaurant: JSON.stringify(restaurant), user: JSON.stringify(this.dataURL) }]);
  }
}
