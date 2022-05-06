import { Component } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { ToastHelferService } from '../toast-helfer.service';

/**
 * Seite zum Auslesen aller Kontakte aus dem Adressbuch mit
 * einem Community-Plugin.<br>
 *
 * Doku zu Plugin:
 * * https://www.npmjs.com/package/@capacitor-community/contacts
 * * https://github.com/capacitor-community/contacts#installation
 */
@Component({
  selector: 'app-seite4',
  templateUrl: './seite4.page.html',
  styleUrls: ['./seite4.page.scss'],
})
export class Seite4Page  {

  /** Array mit Anzeigetext für gefundene Kontakte, wird auf UI angezeigt. */
  public kontakteArray: string[] = [];

  /**
   * Constructor für *Dependency Injection*.
   */
  constructor(private toastHelferService: ToastHelferService) { }


  /**
   * Event-Handler für "Adressbuch auslesen".
   */
  public async onButtonAuslesen() {

    try {
      const ergebnisObj = await Contacts.getContacts();
      const kontakteArray = ergebnisObj.contacts;
      console.log(`Kontakte: ${kontakteArray}`);

      if (kontakteArray.length === 0) {

        this.toastHelferService.zeigeToast("Adressbuch ist leer.");
        return;
      }

      this.kontakteArray = [];
      for (let kontakt of kontakteArray) {
        let id = kontakt.contactId;
        this.kontakteArray.push(id);
      }
    }
    catch (ex) {

      console.log("Exception beim Auslesen Adressbuch: " + ex);
      this.toastHelferService.zeigeToast(`Adressbuch kann nicht ausgelesen werden: ${ex}`);
    }
  }

}
