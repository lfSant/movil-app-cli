import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {


  constructor() { }

  //geolocalizacion
  printCurrentPosition = async () => {
    return await Geolocation.getCurrentPosition();
  };

}
