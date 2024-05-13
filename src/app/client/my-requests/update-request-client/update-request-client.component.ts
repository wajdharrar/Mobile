import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { State } from '../../../enum/State';
import { StateUser } from '../../../enum/StateUser';
import { Cart } from '../../../models/Cart';
import { Document } from '../../../models/Document';
import { Request } from '../../../models/Request';
import { Device } from '../../../models/Phone';
import { CartService } from '../../../services/cart.service';
import { DeviceService } from '../../../services/device.service';
import { DocumentService } from '../../../services/document.service';
import { FileService } from '../../../services/file.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-update-request-client',
  templateUrl: './update-request-client.component.html',
  styleUrl: './update-request-client.component.css'
})
export class UpdateRequestClientComponent {
  nationalId:any
  birthCertificate:any
  proofOfIncome:any
  proofOfEmployement:any
  taxReturn:any
  bankStatement:any
  uploadProgress: any;
  request: Request;
  cart: Cart[];
  devices: Device[];
  idRequest: number;
  total: number;
  Salary: number;
  initialPayment: number = 0;
  repayment: number = 0;
  warranty: number=1;
  percentage: number;
  documents:Document={
    idDocument:0,
    nationalId:'',
    birthCertificate:'',
    proofOfIncome:'',
    proofOfEmployement:'',
    taxReturn:'',
    bankStatement:'',
    state:State.Pending_Validation,
    reason:'',
    request:{
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
  };
  constructor(private fileService: FileService,
              private route: ActivatedRoute,
              private documentService:DocumentService,
              private router:Router,
              private cartService: CartService,
              private deviceService: DeviceService,
              private requestService: RequestService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idRequest = params['id'];
      this.requestService.getRequest(this.idRequest).subscribe(response => {
        this.request = response;
        this.warranty=response.warranty
        console.log(this.warranty)
        this.repayment=response.repayement
        console.log(this.repayment)
        this.initialPayment=response.initialPayment
        console.log(this.initialPayment)
        this.documents.request=response;
        this.documentService.getByIdRequest(response).subscribe(response=>{
          this.documents=response
          console.log(response)
        })
        this.cartService.getByIdRequest(this.request).subscribe(response => {
          this.cart = response;
          let total = 0;
          const requests = [];
          for (let index = 0; index < this.cart.length; index++) {
            const element = this.cart[index];
            requests.push(this.deviceService.getDevice(element.device.idDevice));
          }

          forkJoin(requests).subscribe((responses: Device[]) => {
            this.devices = responses;
            this.devices.forEach(device => {
              total += device.price;
            });
            this.total = total;
          });
        })
        })
      })    
  }

  onWarrantyChange() {
    this.repayment = (this.total - this.initialPayment) / (this.warranty*12);
  }

  onPercentageChange() {
    console.log(this.percentage)
    this.initialPayment = this.percentage * (this.total/100);
    this.repayment=(this.total-this.initialPayment)/(this.warranty*12)
  }

  onFileSelected(event: any,file:any,type:string) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      file = fileList[0];
    }
    this.onUploadFile(this.documents,file,type)
  }
  onUploadFile(document: any,file:any,type:string) {
    if (file) {
      this.fileService.uploadDoc(file, document.idDocument, type).subscribe((progress) => {
        this.uploadProgress === progress
        if (progress === 100) {
          Swal.fire({
            title: "Success!",
            text: 'File uploaded successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          file = null;
        } else {
          Swal.fire({
            title: "Error!",
            text: 'Failed to upload file',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      })
    }
  }
  validate(){
    this.request.repayement=this.repayment
    this.request.initialPayment=this.initialPayment
    this.request.warranty=this.warranty
    this.requestService.updateRequest(this.request).subscribe(response=>{
      console.log(response)
    })
    this.router.navigate(['/client/requests'])
  }
}
