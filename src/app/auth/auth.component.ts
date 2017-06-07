import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { UserData } from "./../provider/AuthUser.service";
import { USERS_KEY_FORMAT } from "./../provider/interface";
//------------------------------ LOGIN COMPONENT ------------------------------//

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT> {};

    //loading: boolean = false;
    form: FormGroup;
    users: FirebaseListObservable<any>;
    constructor(fb: FormBuilder, private router: Router, db: AngularFireDatabase, private uData: UserData) {
        this.userVar.loading = false;
        if(this.uData.pageSession) {
            this.router.navigate(['/']);
        }
        this.users = db.list('/users');
        this.form = fb.group({
            email: ['admin7777@gmail.com', Validators.required],
            password: ['admin7777@gmail.com', Validators.required]
        });

     }

    onSubmit() {
        this.userVar.loading = true;
        this.uData.userLogin(this.form.value.email, this.form.value.password)
        .subscribe((success) => {
            console.log(success);
            this.uData.profileID = success.uid;
            this.uData.pageSession = true;
            this.userVar.loading = false;
            this.router.navigate(['/']);
        }, e =>console.log(e));
    }
}

//------------------------------ REGISTER COMPONENT ------------------------------//

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})

export class RegisterComponent {
    private userVar : USERS_KEY_FORMAT = <USERS_KEY_FORMAT> {};
    
    form: FormGroup;
    users: FirebaseListObservable<any>;
    
    constructor(fb: FormBuilder, db: AngularFireDatabase, private router: Router, private uData: UserData) {
        this.userVar.loading = false;
        this.users = db.list('/users');
        this.users.subscribe(req => console.log(req));

       this.form = fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
          password2: ['', Validators.required],
          role: ['Administrator', Validators.required]
      }, {validator: this.PasswordValidation('password','password2')});
    }

    PasswordValidation(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }
    
    onSubmit() {
        this.userVar.loading = true;
        this.uData.register(this.form.value.email, this.form.value.password)
        .subscribe((success) => {
           this.userVar.loading = false;
            this.users.update(success.uid, {'uid': success.uid, 'email':success.email, 'role': this.form.value.role, 'trash': '0'});
            this.router.navigate(['/']);
        }, e =>console.log(e));
    }

}

@Component({
    selector: 'app-forgot',
    //templateUrl: './register.component.html',
    template: `
<form [formGroup]="form">
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
        <h3>Forgot Password</h3>
        <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <div class="form-group">
            <label class="sr-only" for="email">E-Mail Address</label>
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                    <input type="text" formControlName="email" name="email" class="form-control" id="email"
                        placeholder="you@example.com" required>
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="padding-top: 1rem">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <button type="submit" class="btn btn-success" (click)="onSubmit()">
                <i class="fa fa-sign-in"></i> Send Recovery Email
            </button>
        </div>
    </div>
</form>`
    
    
})

export class ForgotPasswordComponent {
    private userVar : USERS_KEY_FORMAT = <USERS_KEY_FORMAT> {};
    form: FormGroup;
    constructor(fb: FormBuilder, private router: Router, private uData: UserData) {
        this.form = fb.group({
            email: ['', Validators.required],
        });
    }

    onSubmit() {
        this.userVar.loading = true;
        this.uData.forgotPassword(this.form.value.email)
        .subscribe((success) => {
            this.router.navigate(['/']);
        }, e =>console.log(e));
    }

}