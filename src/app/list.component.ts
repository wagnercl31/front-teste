import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';
import { Pessoa } from './pessoa.interface';

@Component({
  selector: 'app-list',
  template: `
  <div style="text-align:center">
    <h1>
      Lista de pessoas
    </h1>
  </div>
  <ul>
    <li *ngFor="let pessoa of pessoas">
      <h2>{{ pessoa.email }}x {{ pessoa.name }}
      <button (click)="delete(pessoa.id)">x</button></h2>
    </li>
  </ul>

  <input #pessoaEmail type='text' placeholder='Email'>
  <input #pessoaName type='text' placeholder='Name'>
  <button (click)="add(pessoaName.value, pessoaEmail.value)">Add</button>
  <p>{{ error?.message }}</p>
  <p *ngIf="error">{{ error?.error | json }}</p>

  
  `
})
export class ListComponent implements OnInit {

  pessoas: Pessoa[];
  error: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getPessoa().subscribe(
      (pessoas: Pessoa[]) => this.pessoas = pessoas,
      (error: any) => this.error = error
    );
  }

  add(pessoaName: string, pessoaEmail: string) {
    this.api.createPessoa(pessoaName, pessoaEmail).subscribe(
      (name: Pessoa) => this.pessoas.push(name),
      (error: any) => this.error = error
    );
  }

  delete(id: number) {
    this.api.deletePessoa(id).subscribe(
      (success: any) => this.pessoas.splice(
        this.pessoas.findIndex(name => name.id === id)
      ),
      (error: any) => this.error = error
    );
  }
}
