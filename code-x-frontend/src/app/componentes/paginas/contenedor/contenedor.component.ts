import { Component, OnInit, HostListener, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import sha256 from 'crypto-js/sha256';
//66import hmacSHA512 from 'crypto-js/hmac-sha512';
//import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isObject, isString, isNull } from 'util';



@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {

  @ViewChild ('modalProyectos') modalProyectos;

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
    let x =Date.now().toString()
    if (isNull( this.textoDeInput) || (this.textoDeInput.startsWith(' '))  ) {
      this.toastr.warning('Code-x-Error', 'Error en el nombre de Carpeta/Proyecto');
    } else{
      
      if (campo) {
        let x2:number=this.persona['cantidadProtectos']
        let x3=0;
        for (const key in this.objetos[0]) {
          x3+=1
        }
        console.log(x2, (x2>this.objetos.length),x3)
        if (x2>x3) {/////////verifica la cantidad de proyectos////////
          this.agregar(this.keys.slice(),this.persona.contenedor,this.persona.proyectos,this.textoDeInput,x)
          //this.persona['cantidadProtectos']=this.persona['cantidadProtectos']+1
          this.actualizar(this.persona)
          this.leerProyecto()
        } else{
          this.toastr.warning('Code-x-Error', 'Llego a su cantidad de proyectos Maxima, adquiera un nuevo plan');
        }

      } else {///////////////////////////agrega carpetas///////////////////////////
        this.agregar(this.keys.slice(),this.persona.contenedor,this.persona.proyectos,this.textoDeInput,{})
        this.actualizar(this.persona)
        this.leerProyecto()
      }

    }

  }  
  abrirPerfil(){
    this.router.navigate(["/perfil"])
  }     
  
  constructor(private httpClient:HttpClient,private toastr: ToastrService,private router: Router,private modalService: NgbModal) {
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
  elementoFor=''
  objetos=[];
  keys=[];
  rutas="";
  listaProyectos=[]
  
  ngOnInit() {

  }

  leerDatos() {
    let ids=localStorage.getItem('id')
    
    this.httpClient.get(`${this.backendHost}/usuarios/${ids}`)
        .subscribe((res: any) => {
        this.persona=res;
        this.keys.push('/')
        this.recorrido(this.persona.contenedor,true)
        this.leerProyecto()
    });
  }

  ruta(){
    this.rutas=''
    for (let i = 0; i < this.keys.length; i++) {
      const element = this.keys[i];
      this.rutas+=element+'/'
    }
  }
  leerProyecto(){
    this.listaProyectos=[]
    for (const key in this.persona.proyectos) {
      const element =this.persona.proyectos[key];
      this.listaProyectos.push(element) 
  }
  }

  retroceder(){

    if (this.keys.length>1) {
      this.objetos.pop()
      this.keys.pop()
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
        //.log( L_llaves)
      }
    }
    //let x=['contenedor']
    //let x1=['contenedor']

  }
//-------------------------------agrega elemento a la Base de Datos-----------------------
  agregarE(){
    this.agregar(this.keys.slice(),this.persona.contenedor,this.persona.proyectos,'prueba.html',{})
    this.actualizar(this.persona)
  }

  agregar(llaves,objeto,proyectos,elemento,contenido){
    llaves.shift()
    if (llaves.length>1) {
      this.agregar(llaves,objeto[llaves[0]],proyectos,elemento,contenido)
    }else{

      if (llaves.length==0) {
        objeto[elemento]=contenido 
        this.elementoFor=elemento;
        if (isObject(objeto[elemento]))
          {this.carpetasActuales.push(elemento)}
          else{
            this.archivosActuales.push(elemento);
            proyectos[contenido]={"html": "","css": "","js": "","titulo":elemento,"llave":contenido};
          }
      } else{ 
        objeto[llaves[0]][elemento]=contenido 
        this.elementoFor=elemento;
        if (isObject(objeto[llaves[0]][elemento]))
          {this.carpetasActuales.push(elemento)}
          else{
            this.archivosActuales.push(elemento);
            proyectos[contenido]={"html": "","css": "","js": "","titulo":elemento,"llave":contenido};
          }
      }
    }
  }

  actualizar(objeto) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    this.httpClient.put(`${this.backendHost}/usuarios/update/${this.persona._id}`,objeto)
    .subscribe((res: any) => {
      if ((res.nModified==0) && (res.ok==1) ) {
        this.toastr.warning('Code-x-Error', 'Nombre de carpeta ya existe');
      }else{
        this.toastr.success('Code-x-correcto', 'Actualizado');
      }
    });
  }

  editor(clave){
     let claves=[]
    claves=this.keys.slice()
    claves.shift();
    localStorage.setItem("clave",this.objetos[this.objetos.length-1][clave])
    localStorage.setItem('claves',JSON.stringify(claves))
    this.router.navigate(['/editor']);
    
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

  proyectos1(){
    this.modalService.open(this.modalProyectos, {size: 'xl'})
  }
  
  cerrarModal(){
    this.modalService.open(this.modalProyectos, {size: 'xl'})
  }
  
}
