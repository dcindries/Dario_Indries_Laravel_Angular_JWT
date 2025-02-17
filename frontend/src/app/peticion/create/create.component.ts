import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  errors: any = null;

  constructor(
    private fb: FormBuilder,
    private peticionService: PeticionService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', Validators.required]
      // Agrega otros campos si es necesario
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createForm.valid) {
      const peticion: Peticion = this.createForm.value;
      this.peticionService.create(peticion).subscribe({
        next: (res) => {
          console.log('Petición creada', res);
        },
        error: (err) => {
          console.error('Error al crear la petición', err);
          this.errors = err.error;
        },
        complete: () => {
          this.createForm.reset();
          this.router.navigate(['/peticion']);
        }
      });
    } else {
      console.log('Formulario no válido', this.createForm.errors);
    }
  }
}
