import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  backendHost: String = 'http://localhost:3000';
  estado: String='';
  formularioLogin = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  get email() {
    return this.formularioLogin.get('email');
  }
  get pais() {
    return this.formularioLogin.get('password');
  }

  onlogin(id){

    console.log('eliminar elemento por id: ' + this.formularioLogin.value);
    this.httpClient.post(`${this.backendHost}/usuarios/log`,this.formularioLogin.value)
        .subscribe((res: any) => {
          console.log(res)
          if (res.resul==true) {
            console.log(res.id)
              localStorage.setItem('id', res.id);
              this.router.navigate(["/contenedor"])
          }else {
            this.toastr.warning('user/pass erroneo','Code-x-error')
            console.log('user/pass erroneo')
          }
    });
  }

}
