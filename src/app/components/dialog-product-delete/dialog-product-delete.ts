import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductApi } from '../../services/product-api';
import Product from '../../models/Product';
import { CommonModule } from '@angular/common';
import { DialogProductAddEdit } from '../dialog-product-add-edit/dialog-product-add-edit';

@Component({
  selector: 'app-dialog-product-delete',
  imports:[CommonModule,MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './dialog-product-delete.html',
  styleUrl: './dialog-product-delete.css',
})
export class DialogProductDelete {

  // Injeccion para la api
  productService = inject(ProductApi);
  
  productId: number = 0; // id del producto
  
  constructor(
  // Inyecciones para el formulario
   public dialogRef: MatDialogRef<DialogProductAddEdit>, 
   @Inject(MAT_DIALOG_DATA) public data: Product   // Para injectar datos
  ){
      this.productId = data.codigoProducto;
  }
  

  onSubmit(){
    // Lllamar a la api
    this.productService.deleteProduct(this.productId);
    // Cerrar dialogo
    this.dialogRef.close(true); 
  }
  
}
