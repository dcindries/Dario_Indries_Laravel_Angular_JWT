import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  peticiones: Peticion[] = [];

  constructor(private peticionService: PeticionService) {}

  ngOnInit(): void {
    this.peticionService.getAll().subscribe((data: Peticion[]) => {
      this.peticiones = data;
    });
  }
}
