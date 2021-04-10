import { Injectable } from '@angular/core';
declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  privacidad: boolean;
  privacidadSeleccionada: boolean;

  online: boolean;
  ojo2: boolean;

  constructor() { }

  politicaPrivacidad() {
    this.privacidad = false;
    this.privacidadSeleccionada = true;
    $('input[type="checkbox"]').prop('checked', false);
    $('#alerta').modal('hide');
    setTimeout(() => {
      $('#privacidad').modal();
    }, 500);
  }

  cambioPrivacidad() {
    this.privacidadSeleccionada = !this.privacidadSeleccionada;
  }

  contacto() {
    setTimeout(() => {
      $('input[type="checkbox"]').prop('checked', false);
      this.privacidadSeleccionada = true;
    }, 100);
    $('#alerta').modal('hide');
    setTimeout(() => {
      $('#contacto').modal();
    }, 500);
    $(document).ready(() => {
      $('#contacto').on('shown.bs.modal', () => {
        $('#focusInput').trigger('focus');
      });
    });
  }

  logOut() {
    this.online = false;
    this.ojo2 = true;
  }
}
