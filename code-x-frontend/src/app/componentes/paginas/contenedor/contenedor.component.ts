import { Component, OnInit, HostListener} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


import { isObject } from 'util';


@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {
  isShown=false;
  isShownP=false;
  textoDeInput: string = null
  carpetas() {
    this.isShownP = false;
    this.isShown = ! this.isShown;
  }
  Proyecto() {
    this.isShown = false;
    this.isShownP = ! this.isShownP;
  }
  crearProyectoCarpeta(campo) {
    this.isShown = false;
    this.isShownP =false;
    let x =sha256(Date.now())
    if (campo) {
      this.agregar(this.keys.slice(),this.persona.contenedor,this.textoDeInput,x.words[0])
      this.actualizar(this.persona)
    } else {
      this.agregar(this.keys.slice(),this.persona.contenedor,this.textoDeInput,{})
      this.actualizar(this.persona)
    }
  }  
  abrirPerfil(){
    this.router.navigate(["/perfil"])
  }     
  
  constructor(private httpClient:HttpClient,private toastr: ToastrService,private router: Router) {
    this.leerDatos()
  }

  public isCollapsed = false;
  public isCollapsedN = false;
  public sideBarIsCollapsed = false;
  backendHost: string = 'http://localhost:3000';
  public innerWidth: any;
  sendStyle=''
  classToggled = false;
  persona: any = {};
  carpetasActuales=[];
  archivosActuales=[];
  objetos=[];
  keys=[];
  rutas="";
  ngOnInit() {

  }

  leerDatos() {
    let ids=localStorage.getItem('id')
    
    this.httpClient.get(`${this.backendHost}/usuarios/${ids}`)
        .subscribe((res: any) => {
        this.persona=res;
        this.keys.push('/')
        this.recorrido(this.persona.contenedor,true)
    });
  }

  ruta(){
    this.rutas=''
    for (let i = 0; i < this.keys.length; i++) {
      const element = this.keys[i];
      this.rutas+=element+'/'
    }
  }

  retroceder(){
    //console.log(this.keys.length)
    if (this.keys.length>1) {
      this.objetos.pop()
      this.keys.pop()
      console.log(this.objetos.length)
      this.recorrido(this.objetos[this.objetos.length-1],false)
    }
  }
  recorrido(objeto,boole){
    if (boole) this.objetos.push(objeto);
    this.carpetasActuales=[];
    this.archivosActuales=[];
    for (const key in objeto) {
      if(isObject(objeto[key])){
        this.carpetasActuales.push(key);
      }else {
        this.archivosActuales.push(key);
       // console.log(false,key)
      }
    }
    this.ruta()
  }
  crearElemento(){
    let llaves=[]
    llaves=this.keys.slice()
    llaves.shift();
    let objetos1=this.persona.contenedor;
    let L_llaves=""
    if (llaves.length>0) {
      for (let i = 0; i < llaves.length; i++) {
        const element = llaves[i];
       L_llaves+=['+element+']
        console.log( L_llaves)
      }
    }
    //let x=['contenedor']
    //let x1=['contenedor']
    //console.log(x)
   // console.log(this.persona)
  }
//-------------------------------agrega elemento a la Base de Datos-----------------------
  agregarE(){
    this.agregar(this.keys.slice(),this.persona.contenedor,'prueba.html',{})
    this.actualizar(this.persona)
  }

  agregar(llaves,objeto,elemento,contenido){
    llaves.shift()
    if (llaves.length>1) {
      this.agregar(llaves,objeto[llaves[0]],elemento,contenido)
    }else{
      if (llaves.length==0) {
        objeto[elemento]=contenido
      } else{ objeto[llaves[0]][elemento]=contenido }
    }
  }

  actualizar(objeto) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    this.httpClient.put(`${this.backendHost}/usuarios/update/${this.persona._id}`,objeto)
    .subscribe((res: any) => {
      console.log(res);
      if ((res.nModified==0) && (res.ok==1) ) {
        this.toastr.warning('Code-x-Error', 'Nombre de carpeta ya existe');
      }
    });
  }

  //-------------------------ajuse de tamaño ventana y boton de mostrar----------------------
  public toggleField() {
    this.classToggled = !this.classToggled;
    if (this.classToggled) {
      this.sendStyle="-15rem";
    }else this.sendStyle="0rem";
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth<650){
      this.classToggled = true;
      this.sendStyle="-15rem";
    }else{
      this.classToggled =false;
      this.sendStyle="0rem";
    }
    console.log(this.innerWidth)
  }
  @HostListener("window:load", ["$event"])
    closewindow($event) {

    if ($event===window.onclose) {
        localStorage.clear();
    } 
  }
  salir(){
    localStorage.clear();
    this.router.navigate(["/landing"])
  }

  
}
