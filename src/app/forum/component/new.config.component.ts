import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from './../../provider/AuthUser.service';
import { ForumData } from './../../provider/Forum.service'

import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../../provider/interface";

@Component({
    selector: 'app-add-config',
    templateUrl: './new.config.component.html'
})

export class NewConfigComponent {

    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    form: FormGroup;
    category: FirebaseListObservable<any>;

    constructor(db: AngularFireDatabase, private router: Router, fb: FormBuilder, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }

        this.form = fb.group({
            uniqueName:         ['', Validators.required],
            configName:         ['', Validators.required], 
            description:        ['', Validators.required]
        });
    }

    onSubmit() {
        this.userVar.loading = true;
        let passData = {
                id:             this.form.value.uniqueName,
                name:           this.form.value.configName,
                description:    this.form.value.description
        }
        this.fData.configAdd(passData)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/forum']);
        }, e =>console.log(e));
    }

}