import { Component, OnInit  } from '@angular/core';
import { ToastHelferService } from '../toast-helfer.service';
import { Network } from '@capacitor/network';

/**
 * Seite um aktuellen Netzwerkstatus mit entsprechendem Plugin abrufen.
 * <br>
 *
 * Doku zu Netzwerk-Plugin: https://capacitorjs.com/docs/apis/network
 */
@Component({
  selector: 'app-seite3',
  templateUrl: './seite3.page.html',
  styleUrls: ['./seite3.page.scss'],
})
export class Seite3Page implements OnInit {

  /**
   * Member-Variable mit Status der Batterie (z.B. "wifi (verbunden)"),
   * wird per Interpolation auf HTML-Seite angezeigt.
   */
  public netzwerkstatus : string = "???";

  /**
   * Constructor für *Dependency Injection*.
   */
  constructor(private toastHelferService: ToastHelferService) { }

  /**
   * Event-Handler-Methode für Button "Aktualisieren".
   */
  public async onButtonAktualisieren() {

    const status = await Network.getStatus();

    this.netzwerkstatus = status.connectionType;
    // mögliche Werte für Connection Type: 'wifi' | 'cellular' | 'none' | 'unknown';

    if (status.connected) {

      this.netzwerkstatus += " (verbunden)";

    } else {

      this.netzwerkstatus += " (nicht verbunden)";
    }
  }

  /**
   * Implementierung für die einzige Methode im Interface `OnInit`.
   */
  ngOnInit() {

    this.onButtonAktualisieren();
  }

}
