import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  peticionId!: number;
  errors: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private peticionService: PeticionService
  ) {
    this.editForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      destinatario: ['', Validators.required],
      categoria_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.peticionId = Number(this.route.snapshot.paramMap.get('id'));
    this.peticionService.getById(this.peticionId).subscribe((data: Peticion) => {
      this.editForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.peticionService.update(this.peticionId, this.editForm.value).subscribe({
        next: (res) => {
          console.log('Petición actualizada', res);
        },
        error: (err) => {
          console.error('Error al actualizar la petición', err);
          this.errors = err.error;
        },
        complete: () => {
          this.router.navigate(['/peticion']);
        }
      });
    } else {
      console.log('Formulario no válido', this.editForm.errors);
    }
  }
}
