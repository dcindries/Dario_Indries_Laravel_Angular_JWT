import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  peticion!: Peticion;
  peticionId!: number;
  error: any = null;

  constructor(
    private route: ActivatedRoute,
    private peticionService: PeticionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtén el ID de la petición de la URL
    this.peticionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPeticion();
  }

  loadPeticion(): void {
    this.peticionService.getById(this.peticionId).subscribe({
      next: (data: Peticion) => {
        this.peticion = data;
      },
      error: (err) => {
        console.error('Error al cargar la petición', err);
        this.error = err.error;
      }
    });
  }

  deletePeticion(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta petición?')) {
      this.peticionService.delete(this.peticionId).subscribe({
        next: (res) => {
          console.log('Petición eliminada', res);
          // Redirige al listado de peticiones tras eliminar
          this.router.navigate(['/peticion']);
        },
        error: (err) => {
          console.error('Error al eliminar la petición', err);
          this.error = err.error;
        }
      });
    }
  }
}
