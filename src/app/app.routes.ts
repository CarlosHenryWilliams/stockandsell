import { Routes } from '@angular/router';
import { ProductAddEdit } from './pages/product-add-edit/product-add-edit';
import { ProductGrid } from './pages/product-grid/product-grid';
import { ProductList } from './pages/product-list/product-list';

export const routes: Routes = [
    {path: 'add-product', component:ProductAddEdit},
    {path: 'dashboard', component:ProductGrid},
    {path: 'list', component:ProductList}
    
    // 404 NOT FOUND
]
