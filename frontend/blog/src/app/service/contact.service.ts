import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../model/Contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  send(contact: Contact) {
    return this.http.post('http://localhost:3000/contacts', contact);
  }
}
