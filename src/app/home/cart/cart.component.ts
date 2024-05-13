import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/Phone';
import { DeviceService } from '../../services/device.service';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import { Request } from '../../models/Request';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/Cart';
import { State } from '../../enum/State';
import { StateUser } from '../../enum/StateUser';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  constructor(private deviceService:DeviceService,
    private authService:AuthService,
    private requestService:RequestService,
    private googleAnalyticService:GoogleAnalyticsService,
    private cartService:CartService,
    private route:Router
  ){}
  request= {
    idRequest:0,
    date:'',
    initialPayment:0,
    warranty:1,
    repayement:0,
    state:'',
    reason:'',
    borrowerType:'',
    user:{
      idUtilisateur:0,
      name:'',
      lastName:'',
      number:'',
      password:'',
      email:'',
      adress:'',
      dob:'',
      img:'',
      stateUser:StateUser.ACTIVE,
      role:{
      idRole:3,
      nameRole:"user"
    }
    }
  }
  cart = {
    idCart: 0,
    total: 0,
    itemNumber: 1,
    request: {
      idRequest: 0,
      date: '',
      initialPayment:0,
      warranty:1,
      repayement: 0,
      state: '',
      reason: '',
      borrowerType: '',
      user: {
        idUtilisateur: 0,
        name: '',
        lastName: '',
        number: '',
        password: '',
        email: '',
        adress: '',
        dob: '',
        img: '',
        stateUser:StateUser.ACTIVE,
        role: {
          idRole: 3,
          nameRole: 'user'
        }
      }
    },
    device: {
      idDevice:0,
      nameDevice: '',
      price: 0,
      inventory: 0,
      imgDevice: '',
      descDevice: '',
      reason:'',
      number:1,
      color: '',
      state: State.Valid,
      deviceType: {
        idType: 0,
        nameType: ''
      },
      version: {
        idVersion: 0,
        nameVersion: '',
        descVersion: '',
        imgVersion: '',
        idPartner:0,
        namePartner:'',
        reason:'',
        model: {
          idModel: 0,
          nameModel: '',
          descModel: '',
          imgModel: '',
          brand: {
            idBrand: 0,
            nameBrand: '',
            descBrand: '',
            logoBrand: '',
            state: State.Valid
          },
          state: State.Valid
        },
        state: State.Valid
      },
      sale: {
        idSale: 1,

      }
    }
  };
  
  itmsAdded:string[]=[]
  cartItems:Cart[]=[]
  total:number=0;
  devices:Device[]=[]
  idRequest:number
  user:User;
  ngOnInit(): void {
    for (let index = 0; index < localStorage.length; index++) {
      const element = localStorage.key(index);
      if (element!='token') {
        this.itmsAdded.push(element)
      }
    }
    this.getAllDevices()
  }
  getAllDevices(){
    let total = 0;
    const requests = [];
    for (let index = 0; index < this.itmsAdded.length; index++) {
      const element = this.itmsAdded[index];
      let idDevice = localStorage.getItem(element);
      requests.push(this.deviceService.getDevice(parseInt(idDevice)));
    }

    forkJoin(requests).subscribe((responses: Device[]) => {
      this.devices = responses;
      this.devices.forEach(device => {
        total += device.price;
      });
      this.total = total;
    });
  }
  AddRequest(){
    this.trackClickAddRequest()
    const today: Date = new Date();
    console.log(today)
    this.authService.getUserDetails().subscribe(response=>{
      this.user=response
      this.request.date=today.toISOString().substring(0, 10);
      this.request.initialPayment=this.total*0.1
      this.request.repayement=this.total-(this.total*0.1)
      this.request.user=response
      this.request.state=State.Pending_Validation
      if(response.role.idRole!=3){
        this.route.navigate(['/login']);
        Swal.fire('Error!', 'You Have To Login First.', 'error');
      }else{
        if(this.itmsAdded!=null){
        this.requestService.addRequests(this.request).subscribe(response=>{
          this.idRequest=response.idRequest
          for (let index = 0; index < this.devices.length; index++) {
            const element = this.devices[index];
            this.cart.device.idDevice=element.idDevice
            this.cart.request=response
            this.cart.itemNumber=element.number
            this.cartItems.push(this.cart)
          }
          console.log(response)
          console.log(this.cartItems,'items')
          this.cartService.addToCart(this.cartItems).subscribe(response=>{
            console.log(response)
            this.cancel()
            this.route.navigate(['home/document',this.idRequest]);
          })
        })}
        else{
          Swal.fire('Error!', 'Your request was added.', 'error');
        }
      }
    },error=>{
      Swal.fire('Error!', 'You Have To Login First.', 'error');
    })
  }
  cancel() {
    for (let index = 0; index < this.itmsAdded.length; index++) {
      const element = this.itmsAdded[index];
      localStorage.removeItem(element);
    }
    this.itmsAdded=null
    this.devices=null
    this.trackClickCancel()

  }
  removeItem(name:string){
    localStorage.removeItem(name)
    /*this.route.navigate(['home/cart'])*/
  }
  trackClickCancel(){
    const buttons = document.querySelector('.tarck-cancel-cart')
    buttons.addEventListener('click',()=>{
      this.googleAnalyticService.trackEvent('Cancel cart','Cancel cart','Cancel cart')
    })
  }
  trackClickAddRequest(){
    const buttons = document.querySelector('.tarck-add-request')
    buttons.addEventListener('click',()=>{
      this.googleAnalyticService.trackEvent('Add request',this.cartItems.toString(),this.cartItems.toString())
    })
  }
}
