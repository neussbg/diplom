import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export enum BackConrollers {
  device = 'device',

  brand = 'brand',

  type = 'type',
}

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  /** Контроллер для подключения бека */
  private static controller = environment.apiUrl;

  protected backEndDeviceController = `${BaseApiService.controller}/${BackConrollers.device}`;

  protected backEndBrandsController = `${BaseApiService.controller}/${BackConrollers.brand}`;

  protected backEndTypeController = `${BaseApiService.controller}/${BackConrollers.type}`;

  protected backEndRegistration = `${BaseApiService.controller}/user/registration`;

  protected backEndLogin = `${BaseApiService.controller}/user/login`;

  protected backEndUsers = `${BaseApiService.controller}/user/users`;

  protected backEndPowers = `${BaseApiService.controller}/power`;

  constructor() {}
}
