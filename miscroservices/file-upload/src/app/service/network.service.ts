import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  login(loginform) {
    return this.http.post(environment.API_URL + '/user/login',loginform);
  }
  getLoanProposals(page,size) {
    return this.http.get(environment.API_URL + '/loan?pageNo='+page+'&pageSize='+size);
  }
  getLoanProposalDetails(id) {
    return this.http.get(environment.API_URL + '/loan/details/'+id);
    // return this.http.get(environment.API_URL + '/loan/user/'+id);
  }

}
