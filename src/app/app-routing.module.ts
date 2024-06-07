import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { RegisterComponent } from './componentes/register/register.component';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { authGuard } from './auth.guard';
import { InsumosComponent } from './componentes/insumos/insumos.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path: 'productos', component: ProductosComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] }},
  {path: 'insumos', component: InsumosComponent, canActivate: [authGuard], data: { roles: ['ADMIN'] }},
  {path: 'ordenes', component: OrdenesComponent, canActivate: [authGuard], data: { roles: ['PANADERO'] }},
  {path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard], data: { roles: ['USER'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
