import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { AnalyticsService } from '../../services/analytics.service';
import { AnalyticsData } from '../../tools/AnalyticData';
import { Chart } from 'chart.js/auto';
import { BrandService } from '../../services/brand.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { ProviderService } from '../../services/provider.service';
import { Partner } from '../../models/Partner';
import { ModelService } from '../../services/model.service';
import { VersionService } from '../../services/version.service';
import { DeviceService } from '../../services/device.service';
import { RequestService } from '../../services/request.service';
@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrl: './provider-dashboard.component.css'
})
export class ProviderDashboardComponent implements OnInit{

  constructor(private brandService: BrandService,
    private authService:AuthService,
    private requestService:RequestService,
    private versionService:VersionService,
    private deviceService:DeviceService,
    private providerService:ProviderService,
    private modelService:ModelService,
  ) { }
  activeTab: string='product';
  user:User;
  partner:Partner;
  brandState:any;
  modelState:any;
  doughnutChart:any;
  total:any;
  totalRequests:any;
  switchTab(tab: string) {
    this.activeTab = tab;
    if(tab=='product'){
      this.onDevices()
    }else{
      this.onRequest()
    }
  }
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(response=>{
      console.log(response)
      this.user=response
      this.providerService.getProviderByIdUser(this.user.idUtilisateur).subscribe(response=>{
        console.log(response)
        this.partner=response
        this.onDevices()
      })
    })
  }
  onDevices(){
    this.brandService.countBrandsByState(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'brand')
      this.brandState=response
      this.renderDoughnutChart(response,'doughnutChart')
    })
    this.modelService.countModelsByState(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'model')
      this.modelState=response
      this.renderDoughnutChart(response,'doughnutChartModel')
    })
    this.versionService.countVersionsByState(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'version')
      this.renderDoughnutChart(response,'doughnutChartVersion')
    })
    this.deviceService.countDevicesByState(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'device')
      this.renderDoughnutChart(response,'doughnutChartDevice')
    })
    this.deviceService.countDevicesByModel(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'device model')
      this.renderPieChart(response,'deviceModelChart')
    })
    this.deviceService.countDevicesByBrand(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'device brand')
      this.renderPieChart(response,'deviceBrandChart')
    })
    this.deviceService.countDevicesByDeviceType(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'device type')
      this.renderChart(response,'chartDeviceType')
    })
  }
  onRequest(){
    this.requestService.countRequestForPartner(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'total request')
      this.total=response
    })
    this.requestService.countRequestsTotalForPartner(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'total requests number')
      this.totalRequests=response
    })
    this.requestService.countRequestsByBrandForPartner(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'requests brand')
      this.renderPieChart(response,'pieBrand')
    })
    this.requestService.countRequestsByDeviceForPartner(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'requests device')
      this.renderPieChart(response,'pieDevice')
    })
    this.requestService.countRequestsByModelForPartner(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'requests model')
      this.renderPieChart(response,'pieModel')
    })
    this.requestService.countRequestsByVersionForPartner(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'requests version')
      this.renderPieChart(response,'pieVersion')
    })
    this.requestService.countRequestsByDeviceTypeForPartner(this.user.idUtilisateur).subscribe(response=>{
      console.log(response,'requests version')
      this.renderChart(response,'barDeviceType')
    })
  }
  renderDoughnutChart(chart:any,canvas:string) {
    const labels = chart.map(item => item.state);
    const counts = chart.map(item => item.count);

    const data = {
      labels: labels,
      datasets: [{
        data: counts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
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
          text: 'Users by Role'
        }
      }
    };

    const ctx = document.getElementById(canvas) as HTMLCanvasElement;
    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
    });
  }
  renderPieChart(chart:any,canvas:string) {
    if (!chart || !chart.length) {
      return;
    }
  
    const labels: string[] = [];
    const values: number[] = [];
  
    chart.forEach(data => {
      labels.push(data.name);
      values.push(data.count);
    });
  
    const predefinedColors = [
      '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a',
      '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94',
      '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d',
      '#17becf', '#9edae5', '#393b79', '#5254a3', '#6b6ecf', '#9c9ede'
    ];
  
    const numColors = predefinedColors.length;
  
    const data = {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: predefinedColors.slice(0, numColors),
        borderColor: predefinedColors.slice(0, numColors),
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
          text: 'Analytics Data'
        }
      }
    };
  
    const ctx = document.getElementById(canvas) as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: data,
    });
  }
  renderChart(chart:any,canvas:string) {
    const labels: string[] = [];
    const values: number[] = [];
  
    chart.forEach(data => {
      labels.push(data.name);
      values.push(data.count);
    });
  
    const data = {
      labels: labels,
      datasets: [{
        label: 'NUMBER OF EVENTS',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  
    const ctx = document.getElementById(canvas) as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}
