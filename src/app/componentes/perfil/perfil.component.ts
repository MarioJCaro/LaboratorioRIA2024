import { Component, OnInit } from '@angular/core';
import { OrderService, Orden, Estado } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DetalleOrdenDialogComponent } from '../../dialogs/detalle-orden-dialog/detalle-orden-dialog.component';
import { VerInsumosTotalesDialogComponent } from '../../dialogs/ver-insumos-totales-dialog/ver-insumos-totales-dialog.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  displayedColumns: string[] = ['id','fecha','estado','total','detalles'];
  mobileColumns: string[] = ['id', 'fecha' ,'estado', 'detalles'];
  dataSource: Orden[] = [];
  page = 1;
  limit = 10;
  total = 0;
  filterField = 'fecha';
  filterValue = '';
  sortField = 'id';
  sortDirection = 'asc';
  isMobile: boolean = false;
  estados: Estado[] = [];
  userId: number | null = null;

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();
    this.loadOrdenes();
    this.estados = this.orderService.getEstados();

    this.breakpointObserver.observe([Breakpoints.XSmall ,Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.setDisplayedColumns();
      });
  }

  getUserIdFromLocalStorage(): number | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.id;
    }
    return null;
  }
  setDisplayedColumns(): void {
    this.displayedColumns = this.isMobile ? this.mobileColumns : ['id','fecha','estado','total','detalles'];
  }

  loadOrdenes(): void {
    this.orderService.getOrdenesPaginado(this.page, this.limit, this.filterField, this.filterValue, this.sortField, this.sortDirection, this.userId as number | undefined).subscribe(data => {
      this.dataSource = data.data;
      this.total = data.total;
      console.log(this.dataSource);
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

  verDetallesOrden(orden: Orden): void {
    const dialogRef = this.dialog.open(DetalleOrdenDialogComponent, {
      width: '450px',
      data: { orden }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOrdenes();
      }
    });
  }
}


