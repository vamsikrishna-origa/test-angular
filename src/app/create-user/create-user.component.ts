import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UserService) { }
  userObj = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    imageFilePath: ''
  }
  filesToUpload: Array<File> = [];
  ngOnInit(): void {
  }
  imageUpload(): any {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files)
    formData.append("image", files[0], files[0]['name']);
    console.log('form data variable :   ' + formData.toString());
    var header = new HttpHeaders({
      'Accept': "application/json"
    });

    var options = {
      headers: header
    };
    this.userService.upload(formData, options)
      .subscribe((resp) => {
        this.userObj.imageFilePath = resp.filename;
        this.userService.saveUser(this.userObj).subscribe((res) => {
          alert(res.message);
          window.location.reload();
        }, (err) => {
          console.log("Error while Saving User", err);
        })
      }, (err) => {
        alert("Error while uploading image");
        console.log("Error while uploading image", err);
      });
  }
  saveUser() {
    if (!this.validatePhone(this.userObj.phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    this.imageUpload();
    
  }

  fileChangeEvent(event) {
    this.filesToUpload.push(event.target.files[0]);
  }

  validatePhone(str) {
    if (!str) {
      return false;
    }
    var regex = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/;
    return regex.test(str);
  }
}
