import { Component } from '@angular/core';
import { ToastHelferService } from '../toast-helfer.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

/**
 * Seite um Foto mit Cordova-Plugin aufzunehmen:
 * * https://ionicframework.com/docs/native/camera#installation
 * * https://ionicframework.com/docs/native/camera#angular
 * * https://www.npmjs.com/package/@awesome-cordova-plugins/camera
 * * https://github.com/danielsogl/awesome-cordova-plugins#awesome-cordova-plugins
 * <br><br>
 * 
 * Plugin hinzufügen:
 * ```
 * npm install @awesome-cordova-plugins/core --save
 * npm install cordova-plugin-camera
 * npm install @awesome-cordova-plugins/camera
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
 * Die Aufnahme eines Fotos funktioniert nicht wenn die App mit `ionic serve` ausgeführt wird.
 */
@Component({
  selector: 'app-seite5',
  templateUrl: './seite5.page.html',
  styleUrls: ['./seite5.page.scss'],
})
export class Seite5Page {

  /**
   * Konfigurationsobjekt für Methode `Camera.getPicture()`.
   */
  private readonly FOTO_OPTIONEN: CameraOptions = {

      quality        : 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType   : this.camera.EncodingType.JPEG,
      mediaType      : this.camera.MediaType.PICTURE
  };

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
  constructor(private camera: Camera, 
              private toastHelferService: ToastHelferService) { }


  /**
   * Event-Handler für Button "Foto aufnehmen".
   */
  public async onButtonAuslesen() {

    console.log("Versuche Foto aufzunehmen.");

    this.camera.getPicture(this.FOTO_OPTIONEN).then((imageData) => {

        this.bildBase64String = `data:image/png;base64,${imageData}`;
        console.log(`bildBase64String=${this.bildBase64String}`);

     }, (err) => {
      
        this.toastHelferService.zeigeToast(`Fehler bei Verwendung Kamera: ${err}`);
     });
  }

}
