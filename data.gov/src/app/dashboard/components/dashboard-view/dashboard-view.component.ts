import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, UsaActiveModal, UsaModalService, UsaModalRef } from "@gsa-sam/ngx-uswds";

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  documents;

  closeResult = '';
  modalRef: UsaModalRef;


  constructor(private http:HttpClient,private modalService: UsaModalService) {}
  
  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.http.get('http://localhost:4000/docs')
    .subscribe((docs:any) => {
      this.documents = docs.documents;
    });
  }

  downloadFile(file){
    console.log('downloadFile');
    console.log(file);
    this.http.post(file.path,{'path':file.name},{ responseType: 'blob'}).subscribe(data => {
      console.log(data);
      // const url = window.URL.createObjectURL(new Blob([data as BlobPart], { type: 'application/pdf' }));
      const url = window.URL.createObjectURL(new Blob([data as BlobPart]));

      var link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('style', 'display: none');
      link.href = url;
      link.download = file.name;
      link.click();
    });
  }

  open() {
  
  }


}
