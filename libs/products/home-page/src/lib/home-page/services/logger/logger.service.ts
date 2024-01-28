/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { datadogLogs as datadog } from '@datadog/browser-logs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private initialized = false;
  constructor() {
    datadog.init({
      clientToken: 'pub253f61f3f444f118fca8e01246976853',
      site: 'datadoghq.com',
      service: 'poc-datadog',
      forwardErrorsToLogs: true,
    });
    this.initialized = true;
  }

  public debug(message: string, context?: { [x: string]: any }): void {
    if (this.initialized) {
      datadog.logger.debug(message, context);
    }
  }

  public info(message: string, context?: { [x: string]: any }): void {
    if (this.initialized) {
      datadog.logger.info(message, context);
    }
  }

  public warn(message: string, context?: { [x: string]: any }): void {
    if (this.initialized) {
      datadog.logger.warn(message, context);
    }
  }

  public error(message: string, context?,  error?: Error): void {
    if (this.initialized) {
      console.log(context)
      datadog.logger.error(message, {}, error);
    }
  }
}
