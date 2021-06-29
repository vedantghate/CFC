import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor() { }

  getFWheeler(n: number, d: number){
    /** 
     * Km x Emission factor/1000 = Ton Co2 emission
      (Emission factor for Diesel - 0.17 Kg/km)
    */

    return (n * d * 0.17 / 1000)

  }

  getTWheeler(n: number, d: number){
    /**
     * Km x Emission factor /1000 = Ton Co2 emission
      (Emission factor for Petrol -0.035 Kg/km)
     */

    return (n * d * 0.035 / 1000)
  }

  getLight(n: number, d: number){
    /**
     * Watt/hr x Emission factor /1000 = Ton Co2 emissions
      0.02 KW/hr x 0.83 /1000 = Ton Co2 emissions (for 1 bulb for 60
      minutes light consumption)
     */

    return (n * 0.02 * (d/60) * 0.83 / 1000)
  }

  getFan(n: number, d: number){
    /**
     * Watt/hr x Emission factor /1000 = Ton Co2 emissions
      0.07 KW/hr x 0.83 /1000 = Ton Co2 emissions (for 1 fan for 60 minutes)
     */

    return (n * 0.07 * (d/60) * 0.83 / 1000)
  }

  getAC(n: number, d: number){
    /**
     * 1.93 Kw/hr x 0.83 /1000 = Ton Co2 emissions (For 60 min 1 AC operation)
     */

    return (n * 1.93 * (d/60) * 0.83 / 1000)
  }

  getProjector(n: number, d: number){
    /**
     * 0.3 Kw/hr x 0.83 /1000 = Ton Co2 emissions (For 60 min 1 projector operation)
     */

    return (n * 0.3 * (d/60) * 0.83 / 1000)
  }

  getAudio(n: number, d: number){
    /**
     * 0.5 Kw/hr x 0.83 /1000 = Ton Co2 emissions (For 60 min 1 audio system operation)
     */

    return (n * 0.5 * (d/60) * 0.83 / 1000)
  }

  getMic(n: number, d: number){
    /**
     * 0.015 Kw/hr x 0.83 /1000 = Ton Co2 emissions (For 60 min 1 mic operation)
     */

    return (n * 0.015 * (d/60) * 0.83 / 1000)
  }

  getBeverage(n: number){
    /**
     * 50 gm carbon emission per tea– 0.00005 Ton Co2 per tea
     * 110 gm carbon emission per cup – 0.00011 Ton Co2 per cup
     */

    return (n * ( 0.00005 + 0.00011 ))
  }

  getMeal(v: number, nv: number){
    /**
     * 1.26 Kg Co2 emissions per non veg meal = 0.00126 Ton Co2 per nonveg meal
     * 700 gm Co2 emission per veg meal – 0.0007 Ton Co2 per veg meal
     * 85 gm carbon emission per 500ml water bottle = 0.000085 Ton Co2
     * Per person, we can consider 50 gm food waste (For 1 kg food waste = 2.5 kg Co2 emission)
     * So Carbon emission per person is = 0.000125 Ton co2
     * For Waste water treatment – 10 litre per person For 1 m3 waste water treatment = 0.708 kg Co2
     * So for per person 0.00000708 Ton Co2 emission
     */
    let n = v + nv;
    return ( (nv * 0.00126) + (v * 0.0007) + (n*0.000085/2) + n * ((0.000125 + 0.00000708)) )
  }

  getCommunication(e: number, sm: number){
    /**
     * 4 gm Co2 emission per email = 0.000004 Ton Co2 emission
     * Social media communication – whaats app, linked in etc.
     * 0.014 gm Co2 per communication = 1.4×10 -8 Ton Co2 emissions
     */

    return ( e * 0.000004 + sm * 1.4/100000000)
  }

  getOnline(n: number, d: number){
    /**
     * 0.015 KW/hr x 0.83/1000 = Ton Co2 emissions (For 1 charger for 60 minutes operation)
     */
    let charger = 0.015 * (0.83/1000)
    let light = 0.02 * (0.83 / 1000)
    let fan = 0.07 * (0.83 / 1000)
    
    return ( n * ((d/60) * (charger + light + fan)))
  }

}
