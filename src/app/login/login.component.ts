import { Component } from '@angular/core';
import { ApiServiceService } from '../../providers/api-service/api-service.service';
import { DatabaseService } from '../../providers/database-service/database.service';
import {Schema} from '../../interfaces/schema';

@Component(
{
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent
{
	validation_messages = {};
	schema: Schema;
	constructor(
		public apiService: ApiServiceService,
		public db: DatabaseService
	){
		this.apiService.fbInit();
		this.schema = this.db.schemaForm();
		console.log(this.validation_messages);
	}
	ngOnInit()
	{
		this.validation_messages = this.db.validation_messages;
	}
	// Login Via facebook
	facebookLogin()
	{
		this.apiService.facebookLogin();
	}
	signUpUser(SignUpData)
	{ //Sign Up user
		let Body = new FormData();
		delete SignUpData.verifyPassword;
		this.apiService.signUpUser(SignUpData);
	}
	loginUser(LoginData)
	{ //Login user
		if(LoginData.valid)
			this.apiService.loginUser(LoginData);
	}
}