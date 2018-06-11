import { Component } from '@angular/core';
import { Contacts, ContactFieldType, IContactFindOptions } from '@ionic-native/contacts';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ourType: ContactFieldType[] = ["displayName"];
  contactsFound = [];

  constructor(public navCtrl: NavController,
  private contacts: Contacts
  ) {
    this.search('');
  }

  search(q){
    const option: IContactFindOptions = {
      filter: q
    }
    this.contacts.find(this.ourType, option).then(conts => {
      this.contactsFound = conts;
    })
  }

  onKeyUp(ev){
    this.search(ev.target.value);
  }

}
