import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserData } from "./../../../provider/AuthUser.service";
import { USERS_KEY_FORMAT } from "./../../../provider/interface";
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

        this.onSubmit();

     }

    onSubmit() {
        this.userVar.loading = true;
        this.uData.userLogin(this.form.value.email, this.form.value.password)
        .subscribe((success) => {
            console.log(success);
            localStorage.setItem('pageSession', "Logged In");
            this.uData.loggedin = localStorage.getItem('pageSession');
            this.uData.profileID = success.uid;
            this.uData.pageSession = true;
            this.userVar.loading = false;
            this.router.navigate(['/']);
        }, e =>console.log(e));
    }
}