import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
//import { DbService } from '../servicio/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: String;
  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder,private router: Router, 
    public alertController: AlertController,
    public navControl: NavController) {
    this.loginForm = this.formBuilder.group ({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)

      ])),      
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ]))
    })
   }
  ngOnInit() {
  }
 
    async login(){
      var f = this.loginForm.value;
  
      var usuario = JSON.parse(localStorage.getItem('usuario'));
  
      if(usuario.nombre == f.nombre && usuario.password == f.password){
        console.log('Ingresado');
        localStorage.setItem('ingresado','true');
        this.navControl.navigateRoot('home');
        //this.router.navigate(['/home']);
        
      }
      else{
        this.router.navigate(['/login']);
        const alert = await this.alertController.create({
          header: 'Datos Incorrectos',
          message: 'Los datos que ingresaste no estan en la base de datos.',
          buttons: ['Aceptar']
          
        });
    
        await alert.present();
      }
    
  }


  Registro(){
    this.router.navigate(['/registro']);
  }
  
  

}
