import { Component, OnInit } from '@angular/core';
import { InsumosService, Insumo } from '../../services/insumos.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInsumoDialogComponent } from '../../dialogs/add-insumo-dialog/add-insumo-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'costo', 'unidad', 'acciones'];
  dataSource: Insumo[] = [];
  mobileColumns: string[] = ['id', 'nombre', 'unidad', 'acciones'];
  page = 1;
  limit = 10;
  total = 0;
  filterField = 'nombre';
  filterValue = '';
  sortField = 'id';
  sortDirection = 'asc';
  isMobile: boolean = false;


  constructor(private insumosService: InsumosService, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.loadInsumos();

    this.breakpointObserver.observe([Breakpoints.XSmall ,Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.setDisplayedColumns();
      });
  }

  setDisplayedColumns(): void {
    this.displayedColumns = this.isMobile ? this.mobileColumns : ['id', 'nombre', 'costo', 'unidad', 'acciones'];
  }

  loadInsumos(): void {
    this.insumosService.getInsumosPaginado(this.page, this.limit, this.filterField, this.filterValue, this.sortField, this.sortDirection).subscribe(data => {
      this.dataSource = data.data;
      this.total = data.total;
    });
  }

  openAddInsumoDialog(): void {
    const dialogRef = this.dialog.open(AddInsumoDialogComponent, {
      width: '400px',
      data: { insumo: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addInsumo(result);
      }
    });
  }

  addInsumo(insumo: Insumo): void {
    this.insumosService.addInsumo(insumo).subscribe(newInsumo => {
      this.page = 1; // Redirigir a la primera página después de agregar un producto
      this.loadInsumos();
    });
  }
  
  confirmDelete(insumo: Insumo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteInsumo(insumo);
      }
    });
  }

  deleteInsumo(insumo: Insumo): void {
    this.insumosService.deleteInsumo(insumo.id).subscribe(() => {
      this.page = 1; // Redirigir a la primera página después de eliminar un producto
      this.loadInsumos();
    });
  }
  editInsumo(insumo: Insumo): void {
    const dialogRef = this.dialog.open(AddInsumoDialogComponent, {
      width: '400px',
      data: { insumo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInsumo(result);
      }
    });
  }

  updateInsumo(insumo: Insumo): void {
    this.insumosService.updateInsumo(insumo).subscribe(updatedInsumo => {
      this.loadInsumos();
    });
  }

  changePage(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadInsumos();
  }

  onFilterChange(): void {
    this.page = 1; // Reiniciar a la primera página cuando se aplica un filtro
    this.loadInsumos();
  }

  setSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadInsumos();
  }
}
