import { Component, OnInit,HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('iframe') iframe: ElementRef;


  constructor(
    private renderer: Renderer2,
    private httpClient:HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private locations: Location) 
    {
    this.leerDatos();
  }
 
  backendHost: string = 'http://localhost:3000';
  persona: any = {};
  proyectos:any={}
  x= localStorage.getItem("clave");

  title = 'editor';
  todo=`<iframe id="prentar"  srcdoc='<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><style>body {font-family: sans-serif;text-align: center;padding: 3rem;font-size: 1.125rem;line-height: 1.5;transition: all 725ms ease-in-out;}h1 {font-size: 2rem;font-weight: bolder; margin-bottom: 1rem;} p {margin-bottom: 1rem;color: tomato;}button {cursor: pointer; appearance: none; border-radius: 4px;font-size: 1.25rem;padding: 0.75rem 1rem;border: 1px solid navy;background-color: dodgerblue;color: white;}</style></head><body><h1>I am a headline made with HTML</h1><p>And I am a simple text paragraph. The color of this text is styled with CSS. Click the button below to remove me through the power JavaScript.</p><button>Hide the text above</button><script>$("button").on("click", function() {$("p").css("opacity", 0);});</script></body></html>'  style="height:100%;width: 100%; border: 0px;margin: 0;padding:0;background-color: #1d1e22;"> </iframe>`
  ht='';
  editorOptions = {theme: 'vs-dark', language: 'html',minimap: { enabled: false}};
  code: string = '';
  originalCode: string = 'function x() { // TODO }';

  editorOptions1 = {theme: 'vs-dark', language: 'css',minimap: { enabled: false} };
  code1: string = '';
  originalCode1: string = 'function x() { // TODO }';

  editorOptions2 = {theme: 'vs-dark', language: 'javascript',minimap: { enabled: false} };
  code2: string = '';
  originalCode2: string = '';
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.actualizar()
    console.log(this.persona.proyectos[this.x]['html'])
  }
  
@HostListener('click') onClick() {
  this.actualizar()
}
  actualizar(){
  this.ht=`<html ><head><script>${this.code2}</script><style>${this.code1}</style></head><body>${this.code}</body></html> `
  //this.renderer.setAttribute(this.iframe.nativeElement, 'srcdoc', this.ht);
  /*
  const iframe = this.iframe.nativeElement;
    iframe.document = iframe.contentWindow.document || iframe.contentDocument;
    iframe.document.open();
    iframe.document.writeln(this.ht);
    iframe.document.close();*/
  }
  ngOnInit(): void {
   
  }

  leerDatos() {
    let ids=localStorage.getItem('id')
    
    this.httpClient.get(`${this.backendHost}/usuarios/${ids}`)
        .subscribe((res: any) => {
        this.persona=res;
        this.code=this.persona.proyectos[this.x]['html']
        this.code1=this.persona.proyectos[this.x]['css']
        this.code2=this.persona.proyectos[this.x]['js']
        this.actualizar()
    });
  }

  guardar() {
    this.persona.proyectos[this.x]['html']=this.code
    this.persona.proyectos[this.x]['css']=this.code1
    this.persona.proyectos[this.x]['js']=this.code2
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    this.httpClient.put(`${this.backendHost}/usuarios/update/${this.persona._id}`,this.persona)
    .subscribe((res: any) => {
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
}
