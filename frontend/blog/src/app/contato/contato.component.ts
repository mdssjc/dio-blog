import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../model/Contact';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit {
  contact: Contact = new Contact();
  form: FormGroup;
  formOk: boolean = false;

  constructor(private service: ContactService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.contact.name, Validators.required),
      email: new FormControl(this.contact.email, [
        Validators.required,
        Validators.email,
      ]),
      message: new FormControl(this.contact.message, [
        Validators.required,
        Validators.maxLength(60 * 3),
      ]),
    });
  }

  enviarContato(): void {
    if (this.form.valid) {
      this.contact.name = this.form.get('name').value;
      this.contact.email = this.form.get('email').value;
      this.contact.message = this.form.get('message').value;

      this.service.send(this.contact).subscribe(
        (_) => {
          this.formOk = true;
          setTimeout(() => {
            this.formOk = false;
            this.form.reset();
          }, 10000);
        },
        (error) => {
          console.error(error);
          this.formOk = false;
        }
      );
    } else {
      console.error('Formulário de contato inválido!');
    }
  }
}
