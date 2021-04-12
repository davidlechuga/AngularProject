import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  reset(arg0: { first_name: string; last_name: string; mobile: string; address: string; city: string; state: string; country: string; zip: string; }) {
    throw new Error('Method not implemented.');
  }

  private BASE_URL = 'http://localhost:5000';

  constructor(private http:HttpClient) { 

  
  }
  getUsuarios():Observable<any>{
    return this.http.get(`${this.BASE_URL}/users`);
  }
  crearUsuario(usuario:Object):Observable<any>{
    return this.http.post(`${this.BASE_URL}/users`, usuario);
  }
   
}
