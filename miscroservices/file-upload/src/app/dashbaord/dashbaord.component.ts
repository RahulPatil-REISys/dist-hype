import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  id = '';
  private sub: any;
  transaction:any = {
    filehex: '',
    uploadedate: '',
    userpublickey: ''
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      this.getFileData(this.id);
   });
  }

  getFileData(id) {
    const data$ = this.http.get(`${environment.API_URL}/dashboard/${id}`);
    data$.subscribe((resp) => {
      console.log(resp);
      if(resp) {
        this.transaction = resp;
      }
    });
  }

}
