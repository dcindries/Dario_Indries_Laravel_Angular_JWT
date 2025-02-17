import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-peticiones',
  templateUrl: './mispeticiones.component.html',
  styleUrls: ['./mispeticiones.component.css']
})
export class MisPeticionesComponent implements OnInit {
  misPeticiones: Peticion[] = [];
  error: any = null;

  constructor(
    private peticionService: PeticionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyPeticiones();
  }

  loadMyPeticiones(): void {
    this.peticionService.listMine().subscribe({
      next: (data: Peticion[]) => {
        this.misPeticiones = data;
      },
      error: (err) => {
        console.error('Error al cargar mis peticiones:', err);
        this.error = err.error;
      }
    });
  }

  deletePeticion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta petición?')) {
      this.peticionService.delete(id).subscribe({
        next: (res) => {
          console.log('Petición eliminada', res);
          this.loadMyPeticiones(); // Recargar la lista tras la eliminación
        },
        error: (err) => {
          console.error('Error al eliminar la petición', err);
        }
      });
    }
  }

  editPeticion(id: number): void {
    this.router.navigate(['/peticion/edit', id]);
  }

  goToCreate(): void {
    this.router.navigate(['/peticion/create']);
  }
}
