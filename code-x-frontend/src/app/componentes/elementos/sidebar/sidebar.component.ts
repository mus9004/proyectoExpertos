import { Component, OnInit, Output, Input,  EventEmitter} from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() agregarElemento= new EventEmitter()
  @Output() salirSistema= new EventEmitter()
  @Output() agregarCarpeta= new EventEmitter()
  @Output() agregarProyecto= new EventEmitter()
  @Output() abrirProyecto= new EventEmitter()
  @Output() Perfil= new EventEmitter()
  @Input() bntStyle:string="0";

  crear(){
    this.agregarElemento.emit();
  }
  nuevaCarpeta(){
    this.agregarCarpeta.emit()
  }
  nuevoProyecto(){
    this.agregarProyecto.emit()
  }
  perfil(){
    
    this.Perfil.emit()
  }
  salir(){
    this.salirSistema.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }
  proyectos(){
    this.abrirProyecto.emit()
  }

}
