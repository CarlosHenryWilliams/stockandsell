import { Routes } from '@angular/router';
import { ProductAddEdit } from './pages/product-add-edit/product-add-edit';
import { ProductGrid } from './pages/product-grid/product-grid';

export const routes: Routes = [
    {path: 'add-product', component:ProductAddEdit},
    {path: 'dashboard', component:ProductGrid},
    {path: 'edit/:id', component: ProductAddEdit}
    
    // 404 NOT FOUND
]
