import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtbuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  buscar(){
    const valor = this.txtbuscar.nativeElement.value;

    if (valor.trim().length === 0)
      return;

    //console.log(valor);
    this.txtbuscar.nativeElement.value = '';
    this.gifsService.buscarGifs(valor);
  }
}
