import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserData } from "./../../../provider/AuthUser.service";
import { USERS_KEY_FORMAT } from "./../../../provider/interface";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    
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