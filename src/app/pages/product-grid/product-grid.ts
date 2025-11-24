import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductApi } from '../../services/product-api';
import Product from '../../models/Product';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { DialogProductAddEdit } from '../../components/dialog-product-add-edit/dialog-product-add-edit';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-grid',
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, MatButtonModule, MatCardModule, RouterModule, MatIcon, MatIconModule],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {

  readonly dialog = inject(MatDialog);

 /* addDialog():void{
    this.dialog.open(DialogProductAddEdit,{
      data:{
        codigoProducto : null
      },
    })
  }
  */

  // --- 1. Agregar Producto ---
  addDialog(): void {
    const dialogRef = this.dialog.open(DialogProductAddEdit, {
      data: {
        codigoProducto: null // Valor para indicar que es modo 'Agregar'
      },
    });

    // Suscribirse al cierre
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.snackBar.open("Producto Agregado Correctamente", '', {
          duration: 3000,
        });
      }
    });
  }
  editDialog(productId : number){
      const dialogRef = this.dialog.open(DialogProductAddEdit, {
        data:{
          codigoProducto: productId
        }
      });
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.snackBar.open("Producto Editado Correctamente", '',{
            duration: 3000,
          });
        }
      })
  }


  productService = inject(ProductApi);
  snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ["codigoProducto", "nombre", "marca", "costo", "cantidadDisponible", "acciones"];

  dataSource = new MatTableDataSource<Product>();

  totalItems: number = 0;
  pageSize: number = 10;

  // elemento secundario para la paginacion de mat
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Leer los productos
  products = this.productService.products;

  constructor(){
    // METODO GET
    this.productService.getProducts();

    effect(() =>{ // cada vez que hay un cambio se activa
      const products = this.products();
      this.dataSource.data = products; // la fuente de datos se configuran cada vez que cambian
      this.totalItems = products.length;  // rellenar items totales
    })
  }

  onPageChange(event: any){

    this.pageSize = event.pageSize;
    this.dataSource.paginator = this.paginator;
  }


  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator; // cualquier valor que uso el usuario se establece (itemps per page del paginador)
  }

  deleteProduct(productId: number){
    this.productService.deleteProduct(productId);
    this.snackBar.open("Producto Eliminado Correctamente", '',{
      duration: 3000,
    });
  }
}
