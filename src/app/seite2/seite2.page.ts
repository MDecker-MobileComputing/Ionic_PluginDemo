import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Clipboard } from '@capacitor/clipboard';

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
 */
@Component({
  selector: 'app-seite2',
  templateUrl: './seite2.page.html',
  styleUrls: ['./seite2.page.scss'],
})
export class Seite2Page  {

  /** Member-Variable mit Status der Batterie (z.B. "80%"), wird per Interpolation auf HTML-Seite angezeigt. */
  public batterieStatus: string = "???";

  //constructor() { }

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

      const batterieLevelProzent = Math.round( batteryInfo.batteryLevel * 100 );
      const batterieLadestatus   = batteryInfo.isCharging ? "lädt" : "lädt nicht";

      this.batterieStatus = `${batterieLevelProzent} % (${batterieLadestatus})`;
    }
    catch (ex) {

      console.log("Exception bei Abfrage von Batteriestatus: " + ex);
      this.batterieStatus = "Nicht verfügbar";
    }
  }

  /**
   * Event-Handler um aktuellen Batteriestatus in die Zwischenablage zu kopieren.
   * Das dafür benötigte Plugin steht auch bei Test mit `ionic serve` zur Verfügung.
   */
  public async onButtonInZwischenablageKopieren() {

    await Clipboard.write({ string: `Batteriestatus: ${this.batterieStatus}` });
  }

}
