import { Component, OnInit } from '@angular/core';
import { OrderService, Orden } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOrdenDialogComponent } from '../../dialogs/add-orden-dialog/add-orden-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.scss'
})
export class OrdenesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cliente', 'celular','fecha','estado','detalles'];
  mobileColumns: string[] = ['id', 'fecha' ,'estado', 'detalles'];
  dataSource: Orden[] = [];
  page = 1;
  limit = 10;
  total = 0;
  filterField = 'cliente';
  filterValue = '';
  sortField = 'id';
  sortDirection = 'asc';
  isMobile: boolean = false;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadOrdenes();

    this.breakpointObserver.observe([Breakpoints.XSmall ,Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.setDisplayedColumns();
      });
  }

  setDisplayedColumns(): void {
    this.displayedColumns = this.isMobile ? this.mobileColumns : ['id', 'cliente', 'celular','fecha','estado','detalles'];
  }

  loadOrdenes(): void {
    this.orderService.getOrdenesPaginado(this.page, this.limit, this.filterField, this.filterValue, this.sortField, this.sortDirection).subscribe(data => {
      this.dataSource = data.data;
      this.total = data.total;
    });
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddOrdenDialogComponent, {
      width: '400px',
      data: { producto: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addOrden(result);
      }
    });
  }

  addOrden(orden: Orden): void {
    this.orderService.addOrden(orden).subscribe(newProduct => {
      this.page = 1; // Redirigir a la primera página después de agregar un producto
      this.loadOrdenes();
    });
  }
  
  confirmDelete(orden: Orden): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrden(orden);
      }
    });
  }

  deleteOrden(orden: Orden): void {
    this.orderService.deleteOrden(orden.id).subscribe(() => {
      this.page = 1; // Redirigir a la primera página después de eliminar un producto
      this.loadOrdenes();
    });
  }

  editOrder(orden: Orden): void {
    const dialogRef = this.dialog.open(AddOrdenDialogComponent, {
      width: '400px',
      data: { orden }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateOrder(result);
      }
    });
  }

  updateOrder(orden: Orden): void {
    this.orderService.updateOrden(orden).subscribe(updatedProduct => {
      this.loadOrdenes();
    });
  }

  changePage(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadOrdenes();
  }

  onFilterChange(): void {
    this.page = 1; // Reiniciar a la primera página cuando se aplica un filtro
    this.loadOrdenes();
  }

  setSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadOrdenes();
  }
}

