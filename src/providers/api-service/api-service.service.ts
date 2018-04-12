import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {FacebookService, InitParams} from 'ngx-facebook';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiServiceService
{
	AuthToken; //globlalizing auth-token
	constructor(
		private fb: FacebookService,
		private http: Http
	){}
	fbInit()
	{
		this.fb.init({appId: '1285124248185637', version: 'v2.8'}).then((res) =>
		{
			console.log("Facebook init");
		}).catch((error) =>
		{
			console.error(error);
		});
	}
	/**************************Requests to server start***************************/
	fullUrl(Url)
	{
		const BaseUrl = 'http://188.166.25.105:2424/api/';
		return BaseUrl + Url;
	}
	headers(headers: Headers, header, value)
	{ //Headers goes here
		headers.append(header, value);
	}
	getRequest(Url, headers)
	{ //Get request to server
		return new Promise((resolve, reject) =>
		{
			this.http.get(Url, {headers: headers}).subscribe((res) =>
			{
				resolve(res);
			}, (error) =>
			{
				console.error("error get", error);
			});
		});
	}
	postRequest(Url, Body, headers)
	{ //Post request to server
		return new Promise((resolve, reject) =>
		{
			this.http.post(Url, Body, {headers: headers}).toPromise().then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});	
		});
	}
	putRequest(Url, Body, headers)
	{ //Put request to server
		return new Promise((resolve, reject) =>
		{
			this.http.put(Url, Body, {headers: headers}).toPromise().then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	deleteRequest(Url, headers)
	{
		return new Promise((resolve, reject) =>
		{
			this.http.delete(Url, {headers: headers}).toPromise().then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*************************Requests to server end**************************/
	/*************************Customer Section start**************************/
	facebookLogin()
	{ //Send request to Facebook to get Access Token
		let Url;
		const headers = new Headers();
		this.headers(headers, 'Content-Type', 'text');
		this.fb.login().then((res) =>
		{
			console.log("access", res);
			Url = this.fullUrl('login/fb?is_sp=1&access_token=' + res.authResponse.accessToken);
			this.getRequest(Url, headers).then((res) =>
			{
				this.AuthToken = JSON.parse(res._body).token;
			});
		}).catch((error) =>
		{
			console.error(error);
		});
	}
	signUpUser(SignUpData)
	{ //Sign Up user
		const headers = new Headers();
		const Url = this.fullUrl('user');
		console.log("signup body", SignUpData);
		this.headers(headers, 'Content-Type', 'application/json');
		this.postRequest(Url, SignUpData, headers).then((res) =>
		{
			this.AuthToken = JSON.parse(res._body).token;
		}).catch((error) =>
		{
			console.error(error);
		});
	}
	loginUser(LoginData)
	{ //Login user
		const headers = new Headers();
		const Url = this.fullUrl('login');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		this.postRequest(Url, LoginData, headers).then((res) =>
		{
			// this.AuthToken = res.auth_token;
		}).catch((error) =>
		{
			console.error(error);
		})
	}
	getCurrentUser()
	{ //Get Current user
		const headers = new Headers();
		const Url = this.fullUrl('user');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'text');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	createUserProfile(ProfileData)
	{ //create user profile
		const headers = new Headers();
		const Url = this.fullUrl('profile/user');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.postRequest(Url, ProfileData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	updateUserProfile(ProfileData)
	{ //update user profile
		const headers = new Headers();
		const Url = this.fullUrl('profile/user');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.putRequest(Url, ProfileData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/***************************Customer section ends***************************/
	/**********************Service provider section start***********************/
	createSPProfile(ProviderData)
	{ //create service provider profile
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		this.postRequest(Url, ProviderData, headers);
	}
	updateSPProfile(ProviderData)
	{ //update service provider profile
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.putRequest(Url, ProviderData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	getSPProfile()
	{ //get service provider profile
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'text');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	getSPProfileById()
	{ //get service provider profile by id
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/:id');
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	getSPsList()
	{ //get service providers list
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/list');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	createSPProfileLocation(LocationData)
	{ //getting location of service provider
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/location');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.postRequest(Url, LocationData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	upadteSPProfileLocation(LocationData)
	{ //upadting location of service provider
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/location');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.putRequest(Url, LocationData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	getListofServices()
	{ //get list of all available services
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/services');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		This API call allow to specify which kind of services Service Provider perform, how much time it takes and what is the
		price of particular service.
	*/
	createSPTypeService(ServiceData)
	{
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/services/:locationID');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.postRequest(Url, ServiceData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		This API call allow to specify which kind of services Service Provider perform, how much time it takes and what is the
		price of particular service.
	*/
	updateSPTypeService(ServiceData)
	{
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/services/:locationID');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.putRequest(Url, ServiceData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	createSPWorkingHours(WorkingHours)
	{ //create working hour of service
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/hours/gen/:locationID');
		this.headers(headers, 'auth-token', this.AuthToken);
		return new Promise((resolve, reject) =>
		{
			this.postRequest(Url, WorkingHours, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	updateSPWorkingHours(WorkingHours)
	{ //update working hour of service
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/hours/gen/:locationID');
		this.headers(headers, 'auth-token', this.AuthToken);
		return new Promise((resolve, reject) =>
		{
			this.putRequest(Url, WorkingHours, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Get General (Non specific e.g christmas) Working Hours of particular location
	*/
	getGeneralWorkingHours()
	{
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/hours/gen/:locationID');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		This option allows to set which hours that Service Provider is working in specific day.
		For instance Service Provider can work in christmas day on 24.12.2018: 09:00 - 12:00,
		where normally he would work 8 hours.
	*/
	setSpecificWorkingHours(WorkingHours)
	{
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/hours/spec/:locationID');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.postRequest(Url, WorkingHours, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		This option allows to get which hours that Service Provider is working
		in specific day.
	*/
	getSpecificWorkingHours()
	{
		const headers = new Headers();
		const Url = this.fullUrl('profile/sp/hours/spec/:locationID');
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/***********************Service provider section end************************/
	/*************************Appointment section start*************************/
	// Create appointment by customer
	createAppointmentByCustomer(AppointmentData)
	{
		const headers = new Headers();
		const Url = this.fullUrl('appointment');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.postRequest(Url, AppointmentData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	updateAppointmentByCustomer(AppointmentData)
	{
		const headers = new Headers();
		const Url = this.fullUrl('appointment');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.putRequest(Url, AppointmentData, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Cancel appointment by current logged-in customer
	*/
	cancelAppointmentByCurrentCustomer()
	{
		const headers = new Headers();
		const Url = this.fullUrl('appointment/:id');
		this.headers(headers, 'auth-token', this.AuthToken);
		return new Promise((resolve, reject) =>
		{
			this.deleteRequest(Url, headers).then(() =>
			{
				resolve("Appointment is Cancelled");
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Get list of current logged-in customer appointments
	*/
	getCurrentCustomerAppointmentsList()
	{
		const headers = new Headers();
		const Url = this.fullUrl('appointment/customer');
		this.headers(headers, 'auth-token', this.AuthToken);
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Get list of appointments from particular location
	*/
	getAppointmentsListLocation()
	{
		const headers = new Headers();
		const Url = this.fullUrl('appointment/sp/:locationID');
		this.headers(headers, 'auth-token', this.AuthToken);
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Accept appointment by Service Provider
	*/
	appointmentAcceptedbySP()
	{
		const headers = new Headers();
		const Url = this.fullUrl('appointment/sp/accept/:id');
		this.headers(headers, 'auth-token', this.AuthToken);
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then(() =>
			{
				resolve("Appointment Accepted");
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		create review
	*/
	createReview(Review)
	{
		const headers = new Headers();
		const Url = this.fullUrl('review');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.postRequest(Url, Review, headers).then(() =>
			{
				resolve("Review Submitted");
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Update review
	*/
	updateReview(Review)
	{
		const headers = new Headers();
		const Url = this.fullUrl('review');
		this.headers(headers, 'auth-token', this.AuthToken);
		this.headers(headers, 'Content-Type', 'application/json');
		return new Promise((resolve, reject) =>
		{
			this.putRequest(Url, Review, headers).then(() =>
			{
				resolve("Review Updated");
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Get reviews made by currently logged-in user
	*/
	getReviewbyCurrentUser()
	{
		const headers = new Headers();
		const Url = this.fullUrl('review');
		this.headers(headers, 'auth-token', this.AuthToken);
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/*
		Get reviews of particular location by it’s ID
	*/
	getReviewbyLocationID()
	{
		const headers = new Headers();
		const Url = this.fullUrl('review/:locationID');
		return new Promise((resolve, reject) =>
		{
			this.getRequest(Url, headers).then((res) =>
			{
				resolve(res);
			}).catch((error) =>
			{
				reject(error);
			});
		});
	}
	/**************************Appointment section end**************************/
}