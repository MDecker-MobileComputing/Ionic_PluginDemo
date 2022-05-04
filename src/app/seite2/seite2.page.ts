import { Component, OnInit } from '@angular/core';

/**
 * Seite für Anzeige Batteriestatus.
 */
@Component({
  selector: 'app-seite2',
  templateUrl: './seite2.page.html',
  styleUrls: ['./seite2.page.scss'],
})
export class Seite2Page  {

  /** Member-Variable mit Status der Batterie, wird per Interpolation auf HTML-Seite angezeigt. */
  public batterieStatus: string = "???";

  constructor() { }

  /**
   * Event-Handler für Aktualisierung der Anzeige mit Batteriestatus.
   */
  public onButtonAktualisieren() {

    console.log("Sollte jetzt Batteriestatus aktualisieren.");
  }

}
