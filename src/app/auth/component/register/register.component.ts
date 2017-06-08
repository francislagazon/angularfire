import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { UserData } from "./../../../provider/AuthUser.service";
import { USERS_KEY_FORMAT } from "./../../../provider/interface";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})

export class RegisterComponent {
    private userVar : USERS_KEY_FORMAT = <USERS_KEY_FORMAT> {};
    
    form: FormGroup;
    users: FirebaseListObservable<any>;
    
    constructor(fb: FormBuilder, db: AngularFireDatabase, private router: Router, private uData: UserData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
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