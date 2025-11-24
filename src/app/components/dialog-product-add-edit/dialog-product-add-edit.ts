import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductApi } from '../../services/product-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Product from '../../models/Product';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
@Component({
  selector: 'app-dialog-product-add-edit',
  imports:[CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './dialog-product-add-edit.html',
  styleUrl: './dialog-product-add-edit.css',
})
export class DialogProductAddEdit {

  productService = inject(ProductApi);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);


  productForm : FormGroup;

  isEditMode = false;
  productId: number = 0; // id del producto

  constructor(
    private fb: FormBuilder,
    // Inyecciones para el formulario
    public dialogRef: MatDialogRef<DialogProductAddEdit>, 
    @Inject(MAT_DIALOG_DATA) public data: Product   // Para injectar datos
  ){

    this.productId = data.codigoProducto;

    if(this.productId!=null){
     this.getProductById(this.productId)
    }


    // Formulario
    this.productForm = this.fb.group({
      nombre:["", Validators.required],
      marca: ["", Validators.required],
      costo: [null, [Validators.required, Validators.min(0)]],
      cantidadDisponible: [null, [Validators.required, Validators.min(0)]]
    });

 
   /* this.route.paramMap.subscribe( params => {
      const id = params.get("id");

      if(id){
        this.isEditMode = true;
        this.productId = +id;  // Convertir a numero

        this.productService.getProductById(this.productId)
         .subscribe(product => {
              this.loadProductData(product); 
           });

        //this.productService.getProducts(); //Llamar a los productos

        effect(() => {
         //  this.loadProductData(this.productId);    
       
        })
      }
    });*/
  }

  getProductById(productId : number){
      this.isEditMode = true;
      this.productService.getProductById(productId)
      .subscribe(product => {
            this.loadProductData(product); 
      });
  }
  loadProductData(product: Product){
  //  const product = this.productService.getProductById(productId);
    if(product){
      /**Asignar valores al formulario */
      this.productForm.patchValue({
        nombre: product.nombre,
        marca: product.marca,
        costo: product.costo,
        cantidadDisponible: product.cantidadDisponible
      })
    }

  }

  onSubmit(){

    if(this.productForm.valid){
      const product: Product = {...this.productForm.value, codigoProducto:this.productId}; // asginar al codigoproducto el productid

      if(this.isEditMode && this.productId !== 0){  // si esta en modo edicion y el product id es distinto de 0, se edita.
        //Editar un producto
        this.productService.updateProduct(this.productId, product);
        this.snackBar.open("Producto Editado Correctamente");        
        this.dialogRef.close();
        //this.router.navigate(["/dashboard"]);

      } else{
        //Agregar producto
        this.productService.addProduct(product);
        this.snackBar.open("Producto Agregado Correctamente");        
        //this.router.navigate(["/dashboard"]);
        this.dialogRef.close();
      }
    }
  }

}
