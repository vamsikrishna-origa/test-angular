import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {faEye, faTrash, faPen} from '@fortawesome/free-solid-svg-icons'
import { $ } from 'protractor';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService) { }
  usersData: any;
  userData: any;
  userId:  any;
  userObj = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;
  p: number = 1;
  ngOnInit(): void {
    this.fetchUsers("all");
  }
  fetchUsers(id) {
    this.userService.fetchUser(id).subscribe((resp) => {
      this.usersData = resp.data;
      this.usersData.forEach((elem) => {
        elem.profileImage = "http://localhost:8000/" + elem.profileImage;
      })
    });
  }
  delete(id) {
    this.userService.deleteUser(id).subscribe((resp) => {
      alert(resp.message);
      this.fetchUsers("all");
    }, err => {alert(err.message)}); 
  }
  updateModal(user) {
    this.userId = user._id;
    this.userObj.firstName = user.firstName;
    this.userObj.lastName = user.lastName;
    this.userObj.email = user.email;
    this.userObj.phoneNumber = user.phoneNumber;
  }
  update() {
    if(!this.validatePhone(this.userObj.phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    this.userService.updateUser(this.userId, {user: this.userObj}).subscribe((resp) => {
      console.log(resp);
      document.getElementById('close-btn').click();
      alert(resp.message);
      this.fetchUsers("all");
    }, err => {
      console.log(err);
      alert(err.message);
    })
  }
  view(id){
    this.userService.fetchUser(id).subscribe((resp) => {
      this.userData = resp.data[0];
      this.userData.profileImage = "http://localhost:8000/" + this.userData.profileImage
    }, err => {
      console.log(err);
      alert(err.message);
    })
  }

  validatePhone(str) {
    if (!str) {
      return false;
    }
    var regex = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/;
    return regex.test(str);
  }

}
