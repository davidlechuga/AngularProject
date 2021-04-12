import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styles: []
})
export class AjustesComponent implements OnInit {

  usuarioArray: any= [];
  ModalTitle: string;
  ActivateAdd: boolean=false;
  
  constructor(private usuarioService:UsuarioService) {


   }

   @Input() usuario:any;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.usuarioService.getUsuarios()
    .subscribe(data => {
      console.log(data);
      this.usuarioArray = data;
    }, error => console.log(error));
  }

  closeClick() {
    this.ActivateAdd=false;
    this.refreshList();
  }

  addClick(){
    this.usuario={
      usuarioId:0,
      username: ""
    }
    this.ModalTitle="Añade un Nuevo usuario";
    this.ActivateAdd=true;
  }

  selectedUsuario: Usuario = new Usuario();
  seleccionar(usuario:Usuario){
    this.selectedUsuario = usuario;
  }

  nuevo() {
    this.selectedUsuario = new Usuario();
  }

  guardar() {
    if(this.selectedUsuario._id == null) {
      this.usuarioService.crearUsuario(this.selectedUsuario)
      .subscribe(data => {
        if(data.transaccion) {
          this.usuarioService.getUsuarios()
          .subscribe(data => {
            console.log(data);
            this.usuarioArray = data.data;
          }, error => console.log(error));
        }
      })
    }else {
      console.log("Caso editar");
      
    }
  }


}
