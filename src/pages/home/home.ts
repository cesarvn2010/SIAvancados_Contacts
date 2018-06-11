import { Component } from '@angular/core';
import { Contacts, ContactFieldType, IContactFindOptions } from '@ionic-native/contacts';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import {EmailComposer} from '@ionic-native/email-composer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ourType: ContactFieldType[] = ["displayName"];
  contactsFound = [];
  emailTo: ContactFieldType[] = ["emails"];

  constructor(public navCtrl: NavController,
  private contacts: Contacts,
  private emailComposer: EmailComposer,
  private callNum: CallNumber
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

  enviarEmail(e){
    let email = {
      //falta eu corrigir só o to
      to: e,     
      subject: 'Foto Anexa',
      body: ' A foto segue anexa',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  ligar(n){
    this.callNum.callNumber(n, true).then(()=>{
        console.log('Ligando...');
    }).catch((err)=>
    {
      alert(JSON.stringify(err))

    })
  }

}
