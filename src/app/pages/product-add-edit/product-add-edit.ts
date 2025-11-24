import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductApi } from '../../services/product-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import Product from '../../models/Product';

@Component({
  selector: 'app-product-add-edit',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatCard, MatIconModule, MatFormFieldModule, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions],
  templateUrl: './product-add-edit.html',
  styleUrl: './product-add-edit.css',
})
export class ProductAddEdit {

  productService = inject(ProductApi);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);


  productForm : FormGroup;

  isEditMode = false;
  productId: number = 0; // id del producto

  constructor(private fb: FormBuilder){

    // Formulario
    this.productForm = this.fb.group({
      nombre:["", Validators.required],
      marca: ["", Validators.required],
      costo: [null, [Validators.required, Validators.min(0)]],
      cantidadDisponible: [null, [Validators.required, Validators.min(0)]]
    });

    this.route.paramMap.subscribe( params => {
      const id = params.get("id");

      if(id){
        this.isEditMode = true;
        this.productId = +id;  // Convertir a numero

        this.productService.getProductById(this.productId)
         .subscribe(product => {
              this.loadProductData(product); 
           });

        /*//this.productService.getProducts(); //Llamar a los productos

        effect(() => {
         //  this.loadProductData(this.productId);    
       
        })*/
      }
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
    console.log("Form enviado");
    console.log(this.productForm.value);

    if(this.productForm.valid){
      const product: Product = {...this.productForm.value, codigoProducto:this.productId || Date.now()};

      if(this.isEditMode && this.productId !== null){ 
        //Editar un producto
        this.productService.updateProduct(this.productId, product);
        this.snackBar.open("Producto Editado Correctamente");        
        this.router.navigate(["/dashboard"]);

      } else{
        //Agregar producto
        this.productService.addProduct(product);
        this.snackBar.open("Producto Agregado Correctamente");        
        this.router.navigate(["/dashboard"]);
      }
    }
  }
}
