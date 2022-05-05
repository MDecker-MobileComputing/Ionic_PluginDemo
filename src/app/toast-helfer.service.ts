import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastHelferService {

  constructor( private toastController: ToastController ) {}


  /**
   * Toast anzeigen. Sollte nicht für die Anzeige von Fehlermeldungen verwendet werden.
   *
   * @param nachricht  Anzuzeigender Text
   */
   async zeigeToast(nachricht: string) {

    const toast =
          await this.toastController.create({
              message : nachricht,
              duration: 2000  // 2000 ms = 2 seconds
          });

    await toast.present();
  }

}
