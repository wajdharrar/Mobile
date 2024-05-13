import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { AnalyticsService } from '../../services/analytics.service';
import { AnalyticsData } from '../../tools/AnalyticData';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrl: './provider-dashboard.component.css'
})
export class ProviderDashboardComponent implements OnInit{
  analytics!:AnalyticsData;
  events!:AnalyticsData[];
  labels!:string;
  values!:number;
  pages!:AnalyticsData[];
  buyers!:AnalyticsData[];
  scroll!:AnalyticsData[];

  constructor(private googleAnalyticsService: GoogleAnalyticsService, private analyticsService: AnalyticsService) { }
  activeTab: string='global';
  switchTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnInit(): void {
    this.analyticsService.getUsers().subscribe(response => {
      console.log(response);
      this.analytics = response;
      //this.createChart(); // Call createChart after data is retrieved
    });
    this.analyticsService.getEvents().subscribe(response=>{
      console.log(response)
      this.events=response;
      this.renderChart()
    });
    this.analyticsService.getPage().subscribe(response=>{
      console.log(response)
      this.pages=response
      this.renderChartpage()
    })
    this.analyticsService.getBuyer().subscribe(response=>{
      console.log(response)
      this.buyers=response
      this.renderPieChart()
    })
    this.analyticsService.getScroll().subscribe(response=>{
      console.log(response)
      this.scroll=response
    })
  }
  ngAfterViewInit(): void {
    //this.createChart(); // Call createChart after view is initialized
  }

  /*createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.analytics.dimensionValues,
        datasets: [{
          label: 'Active Users',
          data: this.analytics.metricValue,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 100
        }]}})}  */
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



        renderChartpage() {
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.pages.forEach(data => {
            labels.push(data.dimensionValues);
            values.push(data.metricValue);
          });
        
          const data = {
            labels: labels,
            datasets: [{
              label: 'NUMBER OF EVENTS PER PAGE',
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
        
          const ctx = document.getElementById('analyticsChartPage') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
          });
        }



        renderPieChart() {
          // Check if events data is available
          if (!this.events || !this.events.length) {
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
        renderPieScrollChart() {
          // Check if events data is available
          if (!this.scroll || !this.scroll.length) {
            return; // Exit if events data is not available
          }
        
          const labels: string[] = [];
          const values: number[] = [];
        
          // Iterate over each AnalyticsData object to extract dimension values and metric values
          this.scroll.forEach(data => {
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
              label: 'NUMBER OF SCROLL PER PAGE',
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
        
          const ctx = document.getElementById('analyticsPieScrollChart') as HTMLCanvasElement;
          const myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
          });
        }
}
