import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { AnalyticsService } from '../../services/analytics.service';
import { AnalyticsData } from '../../tools/AnalyticData';
import { Chart } from 'chart.js/auto';
import { AnalyticPageTab } from '../../tools/AnalyticPageTab';
import { AnalyticCityTab } from '../../tools/AnalyticCityTab';
import { AnalyticCityTime } from '../../tools/AnalyticCityTime';
import { RequestService } from '../../services/request.service';
import { UserRoleCount } from '../../tools/UserRoleCount';
import { UserService } from '../../services/user.service';
import { RequestStateCount } from '../../tools/RequestStateCount';
import { RequestDeviceCount } from '../../tools/RequestDeviceCount';
import { RequestDeviceTypeCount } from '../../tools/RequestDeviceTypeCount';
import { RequestBrandCount } from '../../tools/RequestBrandCount';
import { RequestPartnerCount } from '../../tools/RequestPartnerCount';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class DashboardComponent implements OnInit {
  analytics!:AnalyticsData;
  bounce!:AnalyticsData
  events!:AnalyticsData[];
  labels!:string;
  values!:number;
  pages!:AnalyticPageTab[];
  buyers!:AnalyticsData[];
  scroll!:AnalyticCityTab[];
  cityTime:AnalyticCityTime[]
  displayedPages: AnalyticPageTab[] = [];
  displayedPagesCity: AnalyticCityTab[] = [];
  currentPage = 0;
  total:number
  count:number
  userRole:UserRoleCount[]
  requestState:RequestStateCount[]
  device:RequestDeviceCount[]
  deviceType:RequestDeviceTypeCount[]
  brand:RequestBrandCount[]
  partner:RequestPartnerCount[]
  doughnutChart: any;
  pageSize = 5; // Change this to adjust number of rows per page
  constructor(private googleAnalyticsService: GoogleAnalyticsService, 
    private requestService:RequestService,
    private userService:UserService,
    private analyticsService: AnalyticsService) { }
  activeTab: string='global';
  switchTab(tab: string) {
    if(tab=='user'){
      this.onUserBehaviour()
    }else if(tab=='demo'){
      this.updateDisplayedPages();
      this.ondemographics()
    }else if(tab=='global'){
      this.OnGlobal()
    }
    this.activeTab = tab;
  }
  OnGlobal(){
    this.analyticsService.getUsers().subscribe(response=>{
      this.analytics=response
    })
    this.analyticsService.getBounce().subscribe(response=>{
      this.bounce=response
    })
    this.userService.getUsersByRole().subscribe(response=>{
      console.log(response,'role')
      this.userRole=response
      this.renderDoughnutChart()
    })
    this.requestService.getStateCount().subscribe(response=>{
      console.log(response,'state')
      this.requestState=response
      this.renderDoughnutChartState()
    })
    this.requestService.getTotal().subscribe(response=>{
      console.log(response)
      this.total=response
    })
    this.requestService.getCount().subscribe(response=>{
      console.log(response)
      this.count=response
    })
    this.requestService.getDeviceCount().subscribe(response=>{
      console.log(response,'device')
      this.device=response
      this.renderPieChartDevice()
    })
    this.requestService.getDeviceTypeCount().subscribe(response=>{
      console.log(response,'devoceType')
      this.deviceType=response
      this.renderChartDeviceType()
    })
    this.requestService.getBrandCount().subscribe(response=>{
      console.log(response,'brand')
      this.brand=response
      this.renderPieChartBrand()
    })
    this.requestService.getPartnerCount().subscribe(response=>{
      console.log(response,'partner')
      this.partner=response
      this.renderChartPartner()
    })
  }
  ngOnInit(): void {
    this.OnGlobal()
  }
  onUserBehaviour(){
    this.analyticsService.getEvents().subscribe(response=>{
      console.log(response)
      this.events=response;
      this.renderChart()
    });
    this.analyticsService.getPage().subscribe(response=>{
      console.log(response)
      this.pages=response
    })
  }
  ondemographics(){
    this.analyticsService.getBuyer().subscribe(response=>{
      console.log(response,'city')
      this.buyers=response
      this.renderPieChart()
    })
    this.analyticsService.getCityTime().subscribe(response=>{
      console.log(response,'city time')
      this.cityTime=response
      this.renderCityTimeChart(this.cityTime)
    })
  }
        renderChart() {
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.events.forEach(data => {
            labels.push(data.dimensionValues);
            values.push(data.metricValue);
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
        
          const ctx = document.getElementById('analyticsChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
          });
        }
        renderChartPartner() {
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.partner.forEach(data => {
            labels.push(data.name);
            values.push(data.nameCount);
          });
        
          const data = {
            labels: labels,
            datasets: [{
              label: 'NUMBER OF REQUESTS BY PARTNER',
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
        
          const ctx = document.getElementById('deviceTypeChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
          });
        }
        renderChartDeviceType() {
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.deviceType.forEach(data => {
            labels.push(data.deviceTYpe);
            values.push(data.deviceTypeCount);
          });
        
          const data = {
            labels: labels,
            datasets: [{
              label: 'NUMBER OF REQUESTS BY DEVICE TYPE',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 0.5)',
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
        
          const ctx = document.getElementById('partnerChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
          });
        }
        renderPieChartDevice() {
          // Check if events data is available
          if (!this.device || !this.device.length) {
            return; // Exit if events data is not available
          }
        
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.device.forEach(data => {
            labels.push(data.device);
            values.push(data.deviceCount);
          });
        
          // Define an array of 24 predefined colors
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
              label: 'NUMBER OF REQUESTS BY DEVICE',
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
                text: 'Device'
              }
            }
          };
        
          const ctx = document.getElementById('devicePieChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
          });
        }
        renderPieChartBrand() {
          // Check if events data is available
          if (!this.brand || !this.brand.length) {
            return; // Exit if events data is not available
          }
        
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.brand.forEach(data => {
            labels.push(data.brand);
            values.push(data.brandCount);
          });
        
          // Define an array of 24 predefined colors
          const predefinedColors = [
            'rgba(75, 192, 192, 0.5)', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a',
            '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94',
            '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d',
            '#17becf', '#9edae5', '#393b79', '#5254a3', '#6b6ecf', '#9c9ede'
          ];
        
          const numColors = predefinedColors.length;
        
          const data = {
            labels: labels,
            datasets: [{
              label: 'NUMBER OF REQUESTS BY BRAND',
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
                text: 'Device'
              }
            }
          };
        
          const ctx = document.getElementById('brandPieChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
          });
        }


        renderPieChart() {
          // Check if events data is available
          if (!this.buyers || !this.buyers.length) {
            return; // Exit if events data is not available
          }
        
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.buyers.forEach(data => {
            labels.push(data.dimensionValues);
            values.push(data.metricValue);
          });
        
          // Define an array of 24 predefined colors
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
              label: 'NUMBER OF SESSIONS PER CITY',
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
        
          const ctx = document.getElementById('analyticsPieChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
          });
        }
    

        get maxPage() {
          return Math.ceil(this.pages.length / this.pageSize) - 1;
      }
  
      nextPage() {
          if (this.currentPage < this.maxPage) {
              this.currentPage++;
              this.updateDisplayedPages();
          }
      }
  
      prevPage() {
          if (this.currentPage > 0) {
              this.currentPage--;
              this.updateDisplayedPages();
          }
      }
  
      updateDisplayedPages() {
          const startIndex = this.currentPage * this.pageSize;
          const endIndex = Math.min(startIndex + this.pageSize, this.pages.length);
          this.displayedPages = this.pages.slice(startIndex, endIndex);
      }
      renderCityTimeChart(backendData:AnalyticCityTime[]){
        const cities = [...new Set(backendData.map(item => item.dimensionValues))];
        const datasets = [];
        cities.forEach((city, index) => {
          const cityData = backendData.filter(item => item.dimensionValues === city);
          const data = cityData.map(item => +item.metricValue);
          const dates = cityData.map(item => item.date);
          const color = this.getRandomColor();
    
          datasets.push({
            label: city,
            data: data,
            borderColor: color,
            fill: false
          });
        });
    
        // Create chart
        new Chart('cityTimeChart', {
          type: 'line',
          data: {
            labels: [...new Set(backendData.map(item => item.date))],
            datasets: datasets
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Users'
                }
              }
            }
          }
        });
      }    
    // Function to generate random color
    getRandomColor(): string {
      const bluePurpleRange = ['4B0082', '483D8B', '4169E1', '6495ED', '4682B4', '87CEEB', '6A5ACD', '9370DB', '8A2BE2', '9932CC', '8B008B', '800080'];
      return '#' + bluePurpleRange[Math.floor(Math.random() * bluePurpleRange.length)];
    }
    renderDoughnutChart() {
      const labels = this.userRole.map(role => role.role);
      const counts = this.userRole.map(role => role.userCount);
  
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
  
      const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
      this.doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
      });
    }
    renderDoughnutChartState() {
      const labels = this.requestState.map(satate => satate.state);
      const counts = this.requestState.map(satate => satate.requestCount);
  
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
