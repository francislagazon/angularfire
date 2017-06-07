import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from './../../../provider/AuthUser.service';
import { ForumData } from './../../../provider/Forum.service'

import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../../../provider/interface";

@Component({
    selector: 'app-new-category',
    templateUrl: './new.category.component.html'
})

export class NewCategoryComponent {

    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    form: FormGroup;
    category: FirebaseListObservable<any>;

    constructor(db: AngularFireDatabase, private router: Router, fb: FormBuilder, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }

        this.form = fb.group({
            categoryName:       ['', Validators.required], 
            description:        ['', Validators.required],
            parent:             ['0', Validators.required]
        });
    }

    onSubmit() {
        this.userVar.loading = true;
        let passData = {
                category:       this.form.value.categoryName,
                description:    this.form.value.description,
                parent:         this.form.value.parent
        }
        this.fData.categoryAdd(passData)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/category']);
        }, e =>console.log(e));
    }

}