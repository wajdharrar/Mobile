import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Request } from '../../models/Request';
import { Chart } from 'chart.js/auto';
import { RecommendationService } from '../../services/recommendation.service';
import { Device } from '../../models/Phone';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent implements OnInit{
  devices:any;
  user:User;
  requests:any;
  doughnutChart:any;
  devicesRec:Device[]
  constructor(private cartService:CartService,
    private serviceRequest:RequestService,
    private googleAnalyticService:GoogleAnalyticsService,
    private recommendationService:RecommendationService,
    private authService:AuthService){}
 ngOnInit(): void {
   this.cartService.getTopRequestedDevicesForCurrentWeek().subscribe(response=>{
    console.log(response)
    this.devices=response
   })
   this.authService.getUserDetails().subscribe(response=>{
    this.user=response
    this.serviceRequest.countRequestsByStateForUser(this.user.idUtilisateur).subscribe(response=>{
      this.requests=response
      console.log(response);
      this.renderDoughnutChartState()
    },(error)=>{
      console.log(error);
    })
    this.recommendationService.recommendDevicesForUser(this.user).subscribe(response=>{
      console.log(response,'devices')
      this.devicesRec=response
    })
  })
 }
 addToCart(device:Device){
  this.trackClick(device)
  localStorage.setItem(device.nameDevice,device.idDevice.toString())
}
trackClick(product:Device){
  const buttons = document.querySelector('.tarck-add-to-cart')
  buttons.addEventListener('click',()=>{
    this.googleAnalyticService.trackEvent('Add to cart',product.nameDevice,product.nameDevice)
  })
}
 renderDoughnutChartState() {
  const labels = this.requests.map(state => state.state);
  const counts = this.requests.map(state => state.count);

  const data = {
    labels: labels,
    datasets: [{
      data: counts,
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Requests by State'
      }
    }
  };

  const ctx = document.getElementById('doughnutChartState') as HTMLCanvasElement;
  this.doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
  });
}
}
