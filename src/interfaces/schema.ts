import {FormGroup} from '@angular/forms';

export interface Schema
{
    LoginForm: FormGroup;
    SignUpForm: FormGroup;
    ProfileForm: FormGroup;
    UpdateProfileForm: FormGroup;
    SPProfileForm: FormGroup;
    SPProfileLocationCreateForm: FormGroup;
    SPProfileLocationUpdateForm: FormGroup;
    SPProfileWorkingHoursGenSetForm: FormGroup;
    SPProfileWorkingHoursSpecSetForm: FormGroup;
    AppointmentCreateForm: FormGroup;
    AppointmentUpdateForm: FormGroup;
    SPProfileServicesSetForm: FormGroup;
}