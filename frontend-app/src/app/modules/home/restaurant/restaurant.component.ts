import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddComponent } from '../../../shared/components/modal-add/modal-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RestaurantService } from '../../../shared/services/restaurant.service';
export interface PeriodicElement {
  position: number;
  nombre: string;
  direccion: number;
  horario: number;
  descripcion: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    nombre: 'Café Central',
    direccion: 101,
    horario: 900,
    descripcion: 'Cafetería tradicional con variedad de postres.',
  },
  {
    position: 2,
    nombre: 'Biblioteca Municipal',
    direccion: 202,
    horario: 800,
    descripcion: 'Biblioteca con sección infantil y de estudio.',
  },
  {
    position: 3,
    nombre: 'Parque los Olivos',
    direccion: 303,
    horario: 600,
    descripcion: 'Parque público con área de juegos y zonas verdes.',
  },
  {
    position: 4,
    nombre: 'Museo de Historia',
    direccion: 404,
    horario: 1000,
    descripcion: 'Museo con exposiciones de historia local y arte.',
  },
  {
    position: 5,
    nombre: 'Restaurante La Plaza',
    direccion: 505,
    horario: 1200,
    descripcion: 'Restaurante de cocina local e internacional.',
  },
  {
    position: 6,
    nombre: 'Gimnasio FitLife',
    direccion: 606,
    horario: 500,
    descripcion: 'Gimnasio con área de pesas y clases de grupo.',
  },
  {
    position: 7,
    nombre: 'Cine Plaza',
    direccion: 707,
    horario: 1000,
    descripcion: 'Cine con varias salas y estrenos de películas.',
  },
  {
    position: 8,
    nombre: 'Centro Comercial Norte',
    direccion: 808,
    horario: 1100,
    descripcion: 'Centro comercial con tiendas y zona de comidas.',
  },
  {
    position: 9,
    nombre: 'Escuela de Música',
    direccion: 909,
    horario: 800,
    descripcion: 'Escuela de música con clases de varios instrumentos.',
  },
  {
    position: 10,
    nombre: 'Estadio Municipal',
    direccion: 1010,
    horario: 1500,
    descripcion: 'Estadio de fútbol con capacidad para eventos deportivos.',
  },
];
@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [MatTableModule, ModalAddComponent, MatFormFieldModule],
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
  ];
  dataSource = ELEMENT_DATA;
  restaurants: any[] = [];
  readonly dialog = inject(MatDialog);
  service = inject(RestaurantService);

  ngOnInit(): void {
    this.getRestaurants();
  }

  openBottomSheet(): void {
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró con:', result);
    });
  }

  getRestaurants() {
    this.service.getRestaurants().subscribe((res: any[]) => {
      this.restaurants = res;
    });
  }
}
