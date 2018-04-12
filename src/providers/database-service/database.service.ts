import { Injectable } from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Schema} from '../../interfaces/schema';

@Injectable()
export class DatabaseService
{
	schema: Schema;
    constructor(private formBuilder: FormBuilder) {}
	matchPassword(control: AbstractControl)
	{
		return control.get('password').value == control.get('verifyPassword').value;
	}
	schemaForm()
	{
	/*****************************For Customer Start******************************/
		//form builder for only login data
		this.schema =
		{
			LoginForm: this.formBuilder.group(
			{
				email: ['', Validators.compose([Validators.pattern("[a-z0-9._%+-]{3,}@[a-z]{3,}([.]{1}[a-z]{2,}|[.]{1}[a-z]{2,}[.]{1}[a-z]{2,})"), Validators.required])],
				password: ['', Validators.compose([Validators.min(8), Validators.max(64), Validators.required])]
			}),
			//form builder for only signup data
			SignUpForm: this.formBuilder.group(
			{
				email: ['', Validators.compose([Validators.pattern("[a-z0-9._%+-]{3,}@[a-z]{3,}([.]{1}[a-z]{2,}|[.]{1}[a-z]{2,}[.]{1}[a-z]{2,})"), Validators.required])],
				password: ['', Validators.compose([Validators.min(8), Validators.max(64), Validators.required])],
				verifyPassword: ['', Validators.compose([Validators.min(8), Validators.max(64), Validators.required])],
				is_sp: ['false']
			}),
			//form builder for only user profile data
			ProfileForm: this.formBuilder.group(
			{
				dob: ['', Validators.compose([Validators.min(10), Validators.max(10), Validators.required])],
				tel: ['', Validators.compose([Validators.min(6), Validators.max(25), Validators.required])]
			}),
			//form builder for only updating user profile data
			UpdateProfileForm: this.formBuilder.group(
			{
				dob: ['', Validators.compose([Validators.min(10), Validators.max(10), Validators.required])],
				tel: ['', Validators.compose([Validators.min(6), Validators.max(25), Validators.required])],
				email: ['', Validators.compose([Validators.pattern("[a-z0-9._%+-]{3,}@[a-z]{3,}([.]{1}[a-z]{2,}|[.]{1}[a-z]{2,}[.]{1}[a-z]{2,})"), Validators.required])],
				password: ['', Validators.compose([Validators.min(8), Validators.max(64), Validators.required])]
			}),
		/******************************For Customer End*******************************/
		/************************For Service Providers Start**************************/
			//form builder for only Service provider profile data
			SPProfileForm: this.formBuilder.group(
			{
				email: ['', Validators.compose([Validators.pattern("[a-z0-9._%+-]{3,}@[a-z]{3,}([.]{1}[a-z]{2,}|[.]{1}[a-z]{2,}[.]{1}[a-z]{2,})"), Validators.required])],
				company_name: ['', Validators.compose([Validators.max(64), Validators.required])],
				tel: ['', Validators.compose([Validators.min(6), Validators.max(25), Validators.required])],
				desc: [''],
				is_freelancer: ['false'],
				user_id: ['']
			}),
			SPProfileLocationCreateForm: this.formBuilder.group(
			{
				id: ['', Validators.min(1)],
				location: ['', Validators.compose([Validators.max(100), Validators.required])],
				name: ['', Validators.compose([Validators.max(100), Validators.required])],
				desc: ['', Validators.max(255)],
				lat: ['', Validators.compose([Validators.pattern('^\\d+\\.\\d{6}$'), Validators.required])],
				lng: ['', Validators.compose([Validators.pattern('^\\d+\\.\\d{6}$'), Validators.required])]
			}),
			SPProfileLocationUpdateForm: this.formBuilder.group(
			{
				id: ['', Validators.compose([Validators.min(1), Validators.required])],
				location: ['', Validators.compose([Validators.max(100), Validators.required])],
				name: ['', Validators.compose([Validators.max(100), Validators.required])],
				desc: ['', Validators.max(255)],
				lat: ['', Validators.compose([Validators.pattern('^\\d+\\.\\d{6}$'), Validators.required])],
				lng: ['', Validators.compose([Validators.pattern('^\\d+\\.\\d{6}$'), Validators.required])]
			}),
			SPProfileWorkingHoursGenSetForm: this.formBuilder.group(
			{
				weekday: ['', Validators.compose([Validators.minLength(1), Validators.max(7), Validators.required])],
				hour_from: ['', Validators.compose([Validators.max(8), Validators.required])],
				hour_to: ['', Validators.compose([Validators.max(8), Validators.required])]
			}),
			SPProfileWorkingHoursSpecSetForm: this.formBuilder.group(
			{
				time_from: ['', Validators.compose([Validators.max(24), Validators.required])],
				time_to: ['', Validators.compose([Validators.max(24), Validators.required])]
			}),
			AppointmentCreateForm: this.formBuilder.group(
			{
				time: ['', Validators.compose([Validators.max(24), Validators.required])],
				sp_profile_location_id: ['', Validators.compose([Validators.min(1), Validators.required])],
				service_type_id: ['', Validators.compose([Validators.min(1), Validators.required])]
			}),
			AppointmentUpdateForm: this.formBuilder.group(
			{
				time: ['', Validators.compose([Validators.max(24), Validators.required])],
				id: ['', Validators.compose([Validators.min(1), Validators.required])],
			}),
			SPProfileServicesSetForm: this.formBuilder.group(
			{
				service_type_id:  ['', Validators.compose([Validators.min(1), Validators.required])],
				duration: ['', Validators.compose([Validators.min(1), Validators.required])],
				price: ['', Validators.compose([Validators.min(0), Validators.pattern('^\\d+\\.\\d{2}$'), Validators.required])]
			})
		}
		return this.schema;
	}
	/*************************For Service Providers End***************************/
	 //validation messages
	validation_messages =
	{
		'email': [{type: 'required', message: 'E-mail is required.'}, {type: 'pattern', message: 'E-mail is not valid'}],
		'password': [{type: 'required', message: 'Password is required.'}, {type: 'min', message: 'Password must be greater than 7 digits.'}, {type: 'max', message: 'Password must be less than 65 digits.'}],
		'confirmPassword': [{type: 'required', message: 'Password is required.'}, {type: 'min', message: 'Password must be greater than 7 digits.'}, {type: 'max', message: 'Password must be less than 65 digits.'}, {type: 'mismatch', message: 'Password miss match.'}],
		'dob': [{type: 'required', message: 'dob is required.'}],
		'tel': [{type: 'required', message: 'Phone No. is required.'}, {type: 'min', message: 'No. must be greater than 5 digits.'}, {type: 'max', message: 'No. must be less than 26 digits.'}],
		'company_name': [{type: 'required', message: 'company_name is required.'}, {type: 'max', message: 'company_name must be less than 65 digits.'}],
		'location': [{type: 'required', message: 'location is required.'}, {type: 'max', message: 'location must be less than 100 digits.'}],
		'name': [{type: 'required', message: 'name is required.'}, {type: 'max', message: 'name must be less than 100 digits.'}],
		'desc': [{type: 'max', message: 'desc must be less than 225 digits.'}],
		'lat': [{type: 'required', message: 'You must provide location latitude.'}, {type: 'pattern', message: 'Precision must less than 7 decimals.'}],
		'lng': [{type: 'required', message: 'You must provide location longitude.'}, {type: 'pattern', message: 'Precision must less than 7 decimals.'}],
		'weekday': [{type: 'required', message: 'This field is required.'}, {type: 'minLength', message: 'weekdays must be greater than 0.'}, {type: 'maxLength', message: 'weekdays must be less than 8.'}],
		'hour_from': [{type: 'required', message: 'hour_from is required.'},{type: 'max', message: 'hour must be less than 9.'}],
		'hour_to': [{type: 'required', message: 'hour_to is required.'}, {type: 'max', message: 'hour must be less than 9.'}],
		'time': [{type: 'required', message: 'This field is required.'}, {type: 'max', message: 'Must less than 25.'}],
		'sp_profile_location_id': [{type: 'required', message: 'This field is required.'}, {type: 'min', message: 'Must be a positive integer.'}],
		'service_type_id': [{type: 'required', message: 'This field is required.'}, {type: 'min', message: 'Must be a positive integer.'}],
		'id': [{type: 'required', message: 'ID is required.'}, {type: 'min', message: 'ID must be a positive integer.'}],
		'duration': [{type: 'required', message: 'Duration is required.'}, {type: 'min', message: 'Duration must be a positive integer.'}],
		'price': [{type: 'required', message: 'Enter Price.'}, {type: 'min', message: 'price must be in positive.'}, {type: 'pattern', message: 'Max 2 digits after decimal point.'}]
	};
}