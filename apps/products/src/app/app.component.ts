import { Component, OnDestroy, OnInit } from '@angular/core';
import { datadogRum } from '@datadog/browser-rum';
import '@nx-example/shared/header';

@Component({
  selector: 'nx-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(){
    datadogRum.init({
      applicationId: 'da95bce3-f5c5-44f5-bdbd-c126ae77d583',
      clientToken: 'pub253f61f3f444f118fca8e01246976853',
      site: 'datadoghq.com',
      service: 'poc-datadog',
      env: 'prod',
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 0,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    });
  }

  ngOnInit(){
    datadogRum.addAction('primeira ação no datadog');
  }

  ngOnDestroy(): void {
    datadogRum.stopSession()
}
}
