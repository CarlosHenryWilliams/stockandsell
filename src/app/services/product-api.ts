import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, } from '@angular/core';
import Product from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {

  readonly API_PRODUCTS_URL = "http://localhost:8080/productos";

  http = inject(HttpClient);

  productsSignal = signal<Product[]>([]); 
  // GET ALL PRODUCTS
  getProducts(){
    this.http.get<Product[]>(this.API_PRODUCTS_URL)
    .subscribe(data => this.productsSignal.set(data));
  }
  
  // Devueolve los productos en forma de señal
  get products(){
    return this.productsSignal;
  }

  // GET PRODUCT BY ID
  getProductById(id : number) : Observable<Product>{
    return this.http.get<Product>(`${this.API_PRODUCTS_URL}/${id}`);
   // return this.productsSignal().find( product => product.codigoProducto == id); // get product from the signal
  }


  // ADD PRODUCT
  addProduct(product: Product){
    this.http.post<Product>(this.API_PRODUCTS_URL, product)
    .subscribe( () => this.getProducts()); // Call get products to update productsSignal.
  }
 
  // DELETE PRODUCT
  deleteProduct(id: number) {
    this.http.delete(`${this.API_PRODUCTS_URL}/${id}`)
    .subscribe( () => this.getProducts());
  }

  // UPDATE PRODUCT
  updateProduct(id : number, updatedProduct : Product){
    this.http.put(`${this.API_PRODUCTS_URL}/${id}`, updatedProduct)
    .subscribe( () => this.getProducts());
  }

   /*getProduct(id: number){
    return this.http.get<Product>(`${this.API_PRODUCTS_URL}/${id}`);
  }
*/
}
