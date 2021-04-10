import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: []
})
export class ModalsComponent implements OnInit {

  mensaje = {
    email: '',
    mensaje: ''
  };

  usuarioLogin = {
    nombre: 'David',
    password: '123'
  };

  constructor(public modalService: ModalService) {
    this.modalService.privacidadSeleccionada = true;
  }

  ngOnInit(): void { }

  politicaPrivacidad() {
    this.modalService.politicaPrivacidad();
  }

  cambioPrivacidad() {
    this.modalService.cambioPrivacidad();
  }

  contacto() {
    this.modalService.contacto();
  }

  contactoFede(f: NgForm) {

    if (f.invalid) {
      $('#contacto').modal('hide');
      console.log(f.value);
      this.limpiarMensaje();
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        title: 'Todos los campos son obligatorios',
        background: 'rgb(233,233,0)',
        icon: 'error'
      });
    } else {
      $('#contacto').modal('hide');
      console.log(f.value);
      this.limpiarMensaje();
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        title: 'Mensaje enviado correctamente',
        background: 'rgb(233,233,0)',
        icon: 'success'
      });
    }
  }

  limpiarMensaje() {
    this.mensaje.email = '';
    this.mensaje.mensaje = '';
  }

  limpiarUsuario() {
    this.usuarioLogin.nombre = '';
    this.usuarioLogin.password = '';
  }

  salirLogin() {
    $('#loginModal').modal('hide');
  }

  login(forma: NgForm) {
    console.log(forma.value);

    if (this.usuarioLogin.nombre === 'David' && this.usuarioLogin.password === '123') {
      this.salirLogin();
      setTimeout(() => {
        $('.navbar-collapse').collapse('hide');
      }, 1000);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        title: 'David ONLINE',
        background: 'rgb(233,233,0)',
        icon: 'success'
      });
      this.limpiarUsuario();
      this.modalService.online = true;

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        title: 'INVALID DATA',
        background: 'rgb(233,233,0)',
        icon: 'error'
      });
      $('.navbar-collapse').collapse('hide');
      this.salirLogin();
      this.limpiarUsuario();
    }
  }


}
