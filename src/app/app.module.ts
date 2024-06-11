import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './componentes/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ProductosComponent } from './componentes/productos/productos.component'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AddProductDialogComponent } from './dialogs/add-product-dialog/add-product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { RegisterComponent } from './componentes/register/register.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatIcon} from '@angular/material/icon';
import { InsumosComponent } from './componentes/insumos/insumos.component';
import { AddInsumoDialogComponent } from './dialogs/add-insumo-dialog/add-insumo-dialog.component';
import { ConfDelInsumoDialogComponent } from './dialogs/conf-del-insumo-dialog/conf-del-insumo-dialog.component';
import { ViewInsumosDialogComponent } from './dialogs/view-insumos-dialog/view-insumos-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    AddProductDialogComponent,
    ConfirmDialogComponent,
    RegisterComponent,
    OrdenesComponent,
    CatalogoComponent,
    SidebarComponent,
    InsumosComponent,
    AddInsumoDialogComponent,
    ConfDelInsumoDialogComponent,
    ViewInsumosDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatNavList,
    MatIcon,
    MatOptionModule,
    MatSelectModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
