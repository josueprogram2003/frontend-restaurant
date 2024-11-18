import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.scss',
})
export class ModalAddComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ModalAddComponent>);
  data = inject(MAT_DIALOG_DATA);
  service = inject(RestaurantService);
  id:number= 0
  nombre: string = '';
  categoria: string = '';
  rating: number | null = null;
  horario: string = '';
  direccion: string = '';
  descripcion: string = '';
  ngOnInit(): void {
    if (this.data!=null) {
      console.log(this.data);
      this.id = this.data.restaurant.restaurant_id;
      this.nombre = this.data.restaurant.name;
      this.categoria = this.data.restaurant.category;
      this.rating = this.data.restaurant.rating;
      this.horario = this.data.restaurant.schedule;
      this.direccion = this.data.restaurant.address;
      this.descripcion = this.data.restaurant.description;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    const nuevoRestaurante = {
      restaurant_id: this.id,
      name: this.nombre,
      category: this.categoria,
      rating: this.rating,
      schedule: this.horario,
      address: this.direccion,
      description: this.descripcion,
      status:1,
      image_url: '',
    };
    this.service.insertRestaurant(nuevoRestaurante).subscribe((data)=>{
      console.log(data)
      this.dialogRef.close(true);
    })
  }

  editar(): void {
    const editRestaurante = {
      name: this.nombre,
      category: this.categoria,
      rating: this.rating,
      schedule: this.horario,
      address: this.direccion,
      description: this.descripcion,
      status:1,
      image_url: '',
    };
    this.service.putRestaurant(editRestaurante,this.id).subscribe((data)=>{
      console.log(data)
      this.dialogRef.close(true);
    })
  }
}
