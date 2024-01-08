import { Component } from '@angular/core';
import { ToastHelferService } from '../toast-helfer.service';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';


/**
 * Seite um Foto mit Cordova-Plugin aufzunehmen:
 * * https://ionicframework.com/docs/native/camera#installation
 * <br><br>
 *
 * Plugin dem Projekt hinzufügen:
 * ```
 * npm install @capacitor/camera
 * ```
 * <br><br>
 *
 * Das Foto wird im Base64-Format zurückgeliefert, es kann in einer Ionic-App wie
 * z.B. unter der folgenden URL beschrieben angezeigt werden:
 * https://forum.ionicframework.com/t/how-to-convert-base64-to-image/128190/3?u=mide-42b
 * <br><br>
 *
 * In Datei `app.module.ts` muss `Camera` im Array `providers` hinzugefügt werden.
 * <br><br>
 *
 * Die Aufnahme eines Fotos funktioniert nicht, wenn die App mit `ionic serve` ausgeführt wird.
 */
@Component({
  selector: 'app-seite5',
  templateUrl: './seite5.page.html',
  styleUrls: ['./seite5.page.scss'],
})
export class Seite5Page {

  /**
   * Default-Wert ist ein möglichst kleinstes Bild mit nur einem transparentem Punkt in Base64-Darstellung.
   * (gif statt jpeg wie später das Foto, weil damit ein kürzerer String möglich ist).
   * Lösung nach https://stackoverflow.com/a/9967193/1364368
   * Base64 ist eine Kodierung (keine Verschlüsselung!), um binäre Daten (z.B. ein JPEG/GIF-Bild)
   * nur mit ASCII-Zeichen darzustellen.
   */
  public bildBase64String = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";


  /**
   * Constructor für *Dependency Injection*.
   */
  constructor(private toastHelferService: ToastHelferService) { }


  /**
   * Event-Handler für Button "Foto aufnehmen".
   */
  public async onButtonAuslesen() {

    console.log("Versuche Foto aufzunehmen.");

    try {

      const bild = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        source: CameraSource.Camera, // neues Foto, kein altes aus Foto-Album auswählen
        resultType: CameraResultType.Base64
      });

      console.log("Foto von Camera.getPhoto() erhalten.");
      this.bildBase64String = `data:image/png;base64,${bild.base64String}`;
    }
    catch (fehler) {

      this.toastHelferService.zeigeToast(`Fehler bei Verwendung Kamera: ${fehler}`);
    }
  }

}
