import { Component, OnInit } from '@angular/core';
import { Cliente } from "./cliente";
import {ClienteService } from "./cliente.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

 private clientes:Cliente[]=[];

constructor(private clientesService: ClienteService) {
this.clientesService.getClientes().subscribe( clientes=> this.clientes=clientes);
   }

  ngOnInit(): void {

  }

  getClientes():Cliente[]{
    return this.clientes;
  }

  delete(cliente: Cliente): void{

 swal.fire({
   title:"¿Estas Seguro?",
   text:"¿Seguro que desa eliminar al cliente "+cliente.nombre+" ?",
   showCancelButton:true,
   confirmButtonColor:'#3085d6',
   cancelButtonColor:"#d33",
   confirmButtonText:"Si, eliminar",
   cancelButtonText:"No, Cancelar",
   buttonsStyling:true,
   reverseButtons:true,
 }).then((result)=>{

if(result.value){
   this.clientesService.delete(cliente.id).subscribe(
     response=>{
       this.clientes=this.clientes.filter(cli => cli !== cliente)
       swal.fire("Cliente Eliminado","Cliente "+cliente.nombre+" eliminado correctamente","success");
     }
   );}
 }) ;


  }

}
