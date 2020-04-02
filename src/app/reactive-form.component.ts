import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from './services/user-service';
import { User } from './domain/user';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./style.css'] 
})
export class ReactiveFormComponent { 
  isValidFormSubmitted: boolean = null;
	userForm = new FormGroup({
    uname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    married: new FormControl(false),
    tc: new FormControl('', Validators.requiredTrue)
	});
	user = new User();
	constructor(private userService: UserService) {
	}	
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if(this.userForm.invalid){
    return;	
    } 	
    this.isValidFormSubmitted = true;	
    console.log(this.userForm.valid);
    this.user.userName = this.userForm.get('uname').value;
    this.user.gender = this.userForm.get('gender').value;
    this.user.isMarried = this.userForm.get('married').value;
    this.user.isTCAccepted = this.userForm.get('tc').value;
    this.userService.createUser(this.user);	 
    this.reset();
	}
	reset() {
    this.userForm.reset({
      married: false
    });	   
	}	
	setDefaultValues() {
    this.userForm.patchValue({uname: 'Krishna', gender:'male', married:true});
	}	
} 