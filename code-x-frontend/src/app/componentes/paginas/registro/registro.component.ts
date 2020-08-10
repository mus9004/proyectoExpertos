import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  backendHost: string = 'http://localhost:3000';


  formularioReg = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmarPassword: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    //contenedor:any=new Object(),
  });

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

  get nombre(){
    return this.formularioReg.get('nombre');
  }
  get apellido(){
    return this.formularioReg.get('apellido');
  }
  get email() {
    return this.formularioReg.get('email');
  }
  get password() {
    return this.formularioReg.get('password');
  }
  get confirmarPassword() {
    return this.formularioReg.get('confirmarPassword');
  }
  get genero() {
    return this.formularioReg.get('genero');
  }
  get contenedor() {
    return this.formularioReg.get('contenedor');
  }
  /*
  /*get pais() {
    return this.formularioRegistro.get('pais');
  }*/

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.formularioReg.valid);

    if (this.formularioReg.valid ) {
      let arreglo=Object()
      arreglo=this.formularioReg.value;
      arreglo.contenedor={}
     // console.log(arreglo)
      this.httpClient.post(`${this.backendHost}/usuarios`, arreglo)
      .subscribe(( res: any) => {
        console.log(res)
      if (res.code==11000) {
        this.toastr.warning('usuario ya existe','Code-x-error')
        console.log('usuario ya existe')
      }else {
        this.router.navigate(['/login']);
      }
    });
    }else{this.toastr.warning('Error: problema con un campo del formulario usuario no guardado','Code-x-error')//console.log('no guardado');
    }
  }
}
