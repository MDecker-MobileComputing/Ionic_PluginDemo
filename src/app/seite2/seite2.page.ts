import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';
import { ToastHelferService } from '../toast-helfer.service';

/**
 * Seite für Anzeige Batteriestatus mit Plugin `@capacitor/device` und Zugriff auf
 * Zwischenablage mit `@capacitor/clipboard`.<br>
 * <br>
 *
 * Plugins dem Projekt hinzufügen:
 * ```
 * npm install @capacitor/device
 * npm install @capacitor/clipboard
 * ```
 * <br>
 * 
 * Dokumentation für die Plugins:
 * * https://capacitorjs.com/docs/apis/device
 * * https://capacitorjs.com/docs/apis/clipboard
 */
@Component({
  selector: 'app-seite2',
  templateUrl: './seite2.page.html',
  styleUrls: ['./seite2.page.scss'],
})
export class Seite2Page implements OnInit {

  /**
   * Member-Variable mit Status der Batterie (z.B. "80%"),
   * wird per Interpolation auf HTML-Seite angezeigt.
   */
  public batterieStatus: string = "???";


  /**
   * Constructor für *Dependency Injection*.
   */
  constructor(private toastHelferService: ToastHelferService) { }


  /**
   * Event-Handler für Aktualisierung der Anzeige mit Batteriestatus.
   * Dieses Plugin steht aber nicht bei Ausführung mit `ionic serve` zur Verfügung;
   * die in diesem Fall geworfene Exception wird mit einem `catch` gefangen.
   * <br>
   * `batteryInfo.batteryLevel` enthält Wert von 0.0 bis 1.0, muss also für
   * Anzeige in Prozent umgerechnet werden.
   */
  public async onButtonAktualisieren() {

    try {

      const batteryInfo = await Device.getBatteryInfo();

      const batteryLevel = batteryInfo.batteryLevel;
      if (batteryLevel) {

        const batterieLevelProzent = Math.round( batteryLevel * 100 );
        const batterieLadestatus   = batteryInfo.isCharging ? "lädt" : "lädt nicht";
  
        this.batterieStatus = `${batterieLevelProzent} % (${batterieLadestatus})`;  

      } else {

        throw Error("Batterie-Level nicht vorhanden.");
      }
    }
    catch (ex) {

      console.log("Exception bei Abfrage von Batteriestatus: " + ex);

      this.toastHelferService.zeigeToast(`Batteriestatus nicht verfügbar.`);

      this.batterieStatus = "Nicht verfügbar";
    }
  }


  /**
   * Implementierung für die einzige Methode im Interface `OnInit`.
   */
  ngOnInit() {

      this.onButtonAktualisieren();
  }


  /**
   * Event-Handler um aktuellen Batteriestatus in die Zwischenablage zu kopieren.
   * Das dafür benötigte Plugin steht auch bei Test mit `ionic serve` zur Verfügung.
   */
  public async onButtonInZwischenablageKopieren() {

    await Clipboard.write({ string: `Batteriestatus: ${this.batterieStatus}` });
  }

}
