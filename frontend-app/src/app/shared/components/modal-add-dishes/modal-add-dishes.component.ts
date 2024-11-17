import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
@Component({
  selector: 'app-modal-add-dishes',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './modal-add-dishes.component.html',
  styleUrl: './modal-add-dishes.component.scss'
})
export class ModalAddDishesComponent implements OnInit{

  readonly dialogRef = inject(MatDialogRef<ModalAddDishesComponent>);
  data = inject(MAT_DIALOG_DATA);
  service = inject(RestaurantService);
  id:number= 0
  nombre: string = '';
  categoria: string = '';
  precio_promocional?: number;
  precio?: number;
  descripcion: string = '';
  restaurant_id: number = 0;
  url:String = '';
  disponibilidad: string = '';
  ngOnInit(): void {
    console.log(this.data);
    if (this.isNotObject()) {
      this.restaurant_id = this.data;
    }else{
      this.id = this.data.dish_id;
      this.restaurant_id = this.data.restaurant_id;
      this.nombre = this.data.name;
      this.categoria = this.data.category;
      this.precio_promocional = this.data.promotional_price;
      this.precio = this.data.price;
      this.descripcion = this.data.description;
      this.url = this.data.image_url;
      this.disponibilidad = this.data.availability;
    }
  }

  isNotObject(): boolean {
    return typeof this.data !== 'object' || this.data === null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    const nuevoPlato = {
      restaurant_id: this.restaurant_id,
      name: this.nombre,
      category: this.categoria,
      price: this.precio,
      promotional_price: this.precio_promocional,
      availability: this.disponibilidad,
      description: this.descripcion,
      available:true,
      image_url: this.url,
    };
    this.service.insertDishes(nuevoPlato).subscribe((data)=>{
      this.dialogRef.close(true);
    })
  }

  editar(): void {
    const editDishes = {
      name: this.nombre,
      category: this.categoria,
      promotional_price: this.precio_promocional,
      price: this.precio,
      availability: this.disponibilidad,
      description: this.descripcion,
      available:true,
      image_url: this.url,
      restaurant_id: this.restaurant_id
    };
    this.service.updateDishes(this.id,editDishes).subscribe((data)=>{
      this.dialogRef.close(true);
    })
  }

}
