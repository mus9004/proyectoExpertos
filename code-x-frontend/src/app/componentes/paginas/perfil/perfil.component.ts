import { isNull } from 'util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  backendHost: string = 'http://localhost:3000';

  @ViewChild ('modalPassword') modalPassword;
 
  persona: any;
  confirmar="";
  pass="";
  constructor(
    private httpClient: HttpClient,
    private router: Router, 
    private toastr: ToastrService,
    private locations: Location,
    private modalService: NgbModal) 
  {
    this.leerDatos()

   }
  
   formularioReg = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    confirmarPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    genero: new FormControl('', [Validators.required]),
    //contenedor:any=new Object(),
  });
 
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
  ngOnInit(): void {
  }

  leerDatos() {
    let ids=localStorage.getItem('id')
    
    this.httpClient.get(`${this.backendHost}/usuarios/${ids}`)
         .subscribe((res: any) => {
        this.persona=res;
        console.log(this.persona)
        this.formularioReg.get('nombre').setValue(this.persona['nombre'])
        this.formularioReg.get('apellido').setValue(this.persona['apellido'])
        this.formularioReg.get('email').setValue(this.persona['email'])
        this.formularioReg.get('password').setValue(this.persona['password'])
        this.formularioReg.get('confirmarPassword').setValue( this.persona['password'])
        this.formularioReg.get('genero').setValue(this.persona['genero'])
        
        
    });
  }

  
  valida(){
  return this.pass == this.confirmar ? true :false   
  } 

  guardar() {
    console.log(this.formularioReg.valid );
    console.log(this.valida());
   
    if (this.formularioReg.valid && this.valida() ) {
      let arreglo=Object()
      arreglo=this.formularioReg.value;
      if ((this.pass=="") || (isNull(this.pass)) || (this.pass.startsWith(' ')))  {
        console.log("no fue agregado!!!")
      }else{arreglo.password=this.pass}
      
      this.httpClient.post(`${this.backendHost}/usuarios/${localStorage.getItem('id')}`, arreglo)
      .subscribe(( res: any) => {
        console.log(res)
      if (res.code==11000) {
        this.toastr.warning('Usuario ya existe','Code-x-error')
      }else {
        this.toastr.warning('Registro Actualizado','Code-x-success')
      }
    });
    }else{this.toastr.warning('Error: problema con un campo del formulario usuario no guardado','Code-x-error')//console.log('no guardado');
    }
  }

  actualizar(objeto) {
    this.httpClient.put(`${this.backendHost}/usuarios/update/${this.persona._id}`,objeto)
    .subscribe((res: any) => {
      console.log(res)
      if ((res.nModified==0) && (res.ok==1) ) {
        this.toastr.warning('Code-x-Error', 'Nombre de carpeta ya existe');
      }else{
        this.toastr.success('Code-x-correcto', 'Actualizado');
      }
    });
  }
  salir(){
    localStorage.removeItem("clave");
    this.locations.back();
  }

  cambiarPws(){
 console.log(this.confirmar)
    
    this.modalService.open(this.modalPassword, {size: 'lg'});
  }


}
