import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private apiRoot = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }


  getPessoa() {
    return this.http.get(this.apiRoot.concat('pessoa/'));
  }

    createPessoa(name: string, email: string) {
    return this.http.post(
      this.apiRoot.concat('pessoa/'),
      { name, email }
    );
  }

  deletePessoa(id: number) {
    return this.http.delete(this.apiRoot.concat(`pessoa/${id}/`));
  }
}

