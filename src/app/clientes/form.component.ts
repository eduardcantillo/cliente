import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import  { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
cliente:Cliente =new Cliente();
 titulo:string ;
 errors:string[]=[];
  constructor(private clienteService:ClienteService,
  private router:Router, private activateRoute:ActivatedRoute) {

    this.titulo="Crear Cliente";

  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    this.activateRoute.params.subscribe(params =>{
      let id=params['id'];
      if(id){
        this.clienteService.getCliete(id).subscribe(cliente => this.cliente=cliente)
      }
    });
  }
public create(): void{
this.clienteService.create(this.cliente).subscribe(
  response => {
    this.router.navigate(["/clientes"]);
    swal.fire('Nuevo Cliente',`Cliente ${response.nombre} creado con exito`,'success');
  },
  err => {
    this.errors= err.error.errors as string[];
    console.log('Codigo del error desde el backend '+ err.status);
    console.log(err.error.errors);
  }
);
}

public update(): void{

 this.clienteService.update(this.cliente).subscribe(
    response => {
      this.router.navigate(["/clientes"]);
      swal.fire('Cliente actualizado',`Cliente ${response.nombre} actualizado con exito`,'success');

    },
    err => {
      this.errors= err.error.errors as string[];
      console.log('Codigo del error desde el backend '+ err.status);
      console.log(err.error.errors);
    }
  );
}
}
