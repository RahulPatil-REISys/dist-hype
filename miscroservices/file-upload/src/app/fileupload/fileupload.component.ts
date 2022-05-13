import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  fileName = '';
  serverResponse = '';
  user = {};
  publicKey = '';
  txId;
  resp;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    this.publicKey =  this.user['p_key'];
  }
  
  onFileSelected(event) {
    
    const file:File = event.target.files[0];
    if(this.publicKey){
      if (file) {
        
        this.fileName = file.name;
        
        const formData = new FormData();
        
        formData.append("file", file);
        formData.append("publicKey", this.publicKey);
        
        const upload$ = this.http.post(`${environment.API_URL}/upload/single`, formData);
        
        upload$.subscribe((data:any) => {
          this.resp = data;
          this.serverResponse = data.msg;
          this.txId = data.data.TXId;
        });
      }
    } else {
      this.serverResponse = "Please Generate Key!";
    }
  }

  generateKey(){
    var u='',m='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',i=0,rb=Math.random()*0xffffffff|0;
    while(i++<36) {
        var c=m[i-1],r=rb&0xf,v=c=='x'?r:(r&0x3|0x8);
        u+=(c=='-'||c=='4')?c:v.toString(16);rb=i%8==0?Math.random()*0xffffffff|0:rb>>4
    }
    console.log(u);
    this.publicKey = u;
  }

}
