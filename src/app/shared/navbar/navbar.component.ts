import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

import Swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  ojo = true;
  login1: boolean;
  input1: boolean;

  clave = '';

  constructor(public modalService: ModalService) {
    this.modalService.ojo2 = true;
  }

  ngOnInit(): void {
  }

  cerrarNavbar() {
    $('.navbar-collapse').collapse('hide');
    this.login1 = false;
    this.input1 = false;
  }

  alerta() {
    $('#alerta').modal();
    this.cerrarNavbar();
  }

  onClick1() {
    this.ojo = false;
    this.login1 = false;
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  onClick2() {
    this.ojo = true;
    this.login1 = true;
    this.modalService.ojo2 = false;
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  entrar() {
    this.login1 = false;
    this.input1 = true;
    $(document).ready(() => {
      $('#focusClave').trigger('focus');
    });
    $('[data-toggle="tooltip"]').tooltip('hide');
  }

  inputLogin() {
    if (this.clave !== '123') {
      this.login1 = false;
      this.input1 = false;
      this.clave = '';
      this.cerrarNavbar();
    } else {
      this.login1 = false;
      this.input1 = false;
      this.clave = '';
      this.cerrarNavbar();
      $('#loginModal').modal();
      $(document).ready(() => {
        $('#loginModal').on('shown.bs.modal', () => {
          $('#focusLogin').trigger('focus');
        });
      });
    }
  }

  logOut() {
    this.cerrarNavbar();
    this.modalService.logOut();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      title: 'David OFFLINE',
      background: 'rgb(233,233,0)',
      icon: 'success'
    });
  }

}
