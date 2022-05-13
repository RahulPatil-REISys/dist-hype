import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filevalidate',
  templateUrl: './filevalidate.component.html',
  styleUrls: ['./filevalidate.component.scss']
})
export class FilevalidateComponent implements OnInit {
  fileName = '';
  serverResponse = '';
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
  }
  
  onFileSelected(event) {
    
    const file:File = event.target.files[0];
    
    if (file) {
      
      this.fileName = file.name;
      
      const formData = new FormData();
      
      formData.append("file", file);
      console.log(`${environment.API_URL}/validate`);
      const validate$ = this.http.post(`${environment.API_URL}/validate`, formData);
      
      validate$.subscribe((data:any) => {
        this.serverResponse = data;
      });
    }
  
  }

}