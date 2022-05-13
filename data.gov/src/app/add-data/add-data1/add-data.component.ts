import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  
  publicKey;
  fileName;
  uploadedFileDetails;

  fileObj = {
    files: [],
    title : '',
    description : '',
    organizationType : ''
  };


  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) { 
    this.publicKey = 'fce68fae-17b7-4f31-85b2-f6b768450a62';
  }

  ngOnInit(): void {
    console.log('AddDataComponent')
  }

  onFileSelected(event) {
    
    this.ngxService.start();

    const file:File = event.target.files[0];
    if(this.publicKey){
      if (file) {
        
        this.fileName = file.name;
        
        const formData = new FormData();
        
        formData.append("file", file);
        formData.append("publicKey", this.publicKey);
        
        console.log(formData)

        const upload$ = this.http.post(`${environment.API_URL}/upload/single`, formData);
        
        upload$.subscribe((data:any) => {
          console.log(data);

          this.fileObj.files.push({
            "type":data.name.split('.')[data.name.split('.').length - 1],
            "path": data.path,
            "name": data.name,
            "fileHex": data.fileHex,
            "txId": data.data.TXId
          });

          this.ngxService.stop();

        });

      }
    } else {
      console.log('Public key not found.');
    }
  }

  add(){
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    },2000)

    let msg = 'Transaction ID: ';
    msg = msg + this.fileObj.files[0].fileHex;
    msg = msg + '\n' +'File Hex: ' + this.fileObj.files[0].txId;
    this.toastr.success(msg, 'Data Saved!',{timeOut: 5000,tapToDismiss:false});


    // console.log(this.fileObj);
    // const upload$ = this.http.post(`${environment.DATA_URL}/doc`, this.fileObj);
    // upload$.subscribe((data:any) => {
    //   console.log(data);
    //   let msg = 'Transaction ID: ';
    //   msg = msg + this.fileObj.files[0].fileHex;
    //   msg = msg + 'File Hex: ' + this.fileObj.files[0].txId;
    //   this.toastr.success(data.msg, msg);
    //   this.uploadedFileDetails = data;
    //   this.ngxService.stop();
    // });

  }

  disabled() {
    if(this.fileObj.files.length > 0)
      return false;
    else
      return true;
  }

}
