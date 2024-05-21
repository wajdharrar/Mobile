import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../models/Phone';
import { Version } from '../../models/Version';
import { FeatureService } from '../../services/feature.service';
import { FeatureValueString } from '../../models/tools/FeatureValueString';
import { FeatureVersionService } from '../../services/feature-version.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-details-device',
  templateUrl: './details-device.component.html',
  styleUrls: ['./details-device.component.css']
})
export class DetailsDeviceComponent implements OnInit {
  deviceId: number;
  device: Device;
  version: Version;
  featureValues: FeatureValueString[] = [];

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private featureService: FeatureService,
    private googleAnalyticService:GoogleAnalyticsService,
    private featureVersionService: FeatureVersionService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.deviceId = param['id'];
      this.deviceService.getDevice(this.deviceId).subscribe(deviceResponse => {
        console.log(deviceResponse);
        this.device = deviceResponse;
        this.featureVersionService.getAllFeaturesByIdVersion(deviceResponse.version.idVersion).subscribe(featuresResponse => {
          console.log(featuresResponse);
          featuresResponse.forEach(feature => {
            const featureValue: FeatureValueString = {
              feature: '',
              value: ''
            };
            this.featureService.getFeature(feature.idFeatureVersion.idFeature).subscribe(featureResponse => {
              console.log(featureResponse);
              featureValue.feature = featureResponse.nameFeature;
              featureValue.value = feature.value;
              this.featureValues.push(featureValue);
            });
          });
        });
      });
    });
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
}
