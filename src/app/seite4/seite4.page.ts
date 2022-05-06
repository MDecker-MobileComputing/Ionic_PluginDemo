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
 * <br><br>
 * 
 * Folgende Permission in Manifest-Datei hinzufügen:
 * ```
 * <uses-permission android:name="android.permission.READ_CONTACTS" />
 * <uses-permission android:name="android.permission.WRITE_CONTACTS" />
 * ```
 * Es handelt sich dabei um Permissions mit dem "Protection Level: Dangerous":
 * https://developer.android.com/reference/android/Manifest.permission#READ_CONTACTS
 * Es muss deshalb immer unmittelbar vor `Contacts.getContacts()` erst noch
 * `Contacts.getPermissions()` aufgerufen werden.
 * Auch wenn die App nur Adressbuchdaten auslesen soll muss die Android-App die
 * Berechtigung `WRITE_CONTACTS` haben.
 * <br><br>
 * 
 * Für die Testdaten in der Adressbuch-App muss neben Vor- und Nachname mindestens
 * eine Email-Adresse eingegeben sein (sonst werden die Datensätze von dem Plugin
 * nicht erkannt).
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

      const permissionStatus = await Contacts.getPermissions();
      if (permissionStatus.granted === false) {

        this.toastHelferService.zeigeToast("Fehlende Berechtigungen für Zugriff auf Adressbuch.");
        return;
      }

      const ergebnisObj = await Contacts.getContacts();
      const kontakteArray = ergebnisObj.contacts;
      console.log(`Kontakte: ${kontakteArray}`);

      if (kontakteArray.length === 0) {

        this.toastHelferService.zeigeToast("Adressbuch ist leer.");
        return;
      }

      this.kontakteArray = [];
      for (let kontakt of kontakteArray) {

        let id = kontakt.displayName;
        this.kontakteArray.push(id);
      }
    }
    catch (ex) {

      console.log("Exception beim Auslesen Adressbuch: " + ex);
      this.toastHelferService.zeigeToast(`Adressbuch kann nicht ausgelesen werden: ${ex}`);
    }
  }

}
