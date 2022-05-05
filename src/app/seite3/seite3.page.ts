import { Component } from '@angular/core';
import { AppLauncher } from '@capacitor/app-launcher';
import { ToastHelferService } from '../toast-helfer.service' ;

/**
 * Seite enthält Buttons um mit Plugin `@capacitor/app-launcher`
 * andere Apps zu öffnen.<br>
 *
 * Installation Plugin: `npm install @capacitor/app-launcher`
 *
 * Doku zu Plugin: https://capacitorjs.com/docs/apis/app-launcher`
 */
@Component({
  selector: 'app-seite3',
  templateUrl: './seite3.page.html',
  styleUrls: ['./seite3.page.scss'],
})
export class Seite3Page {

  /**
   * Constructor für *Dependency Injection*.
   */
  constructor(private toastHelferService: ToastHelferService) { }

  /**
   * Event-Handler-Methode für Button, mit dem eine Lernkarte
   * geöffnet werden.
   */
  public async onButtonLernkarte1() {

    const canOpenUrlResult = await AppLauncher.canOpenUrl({ url: "de.mide.custom_action.zeige_lernkarte" });

    if (canOpenUrlResult.value === true) {

      console.log("Externe App ist vorhanden, versuche sie zu öffnen.");
      await AppLauncher.openUrl({ url: "de.mide.custom_action.zeige_lernkarte://?text_vorne=ADB&text_hinten=Android+Debug+Bridge" });

    } else {

      this.toastHelferService.zeigeToast("App ist nicht auf dem Gerät installiert.");
    }
  }

}
