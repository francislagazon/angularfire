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
    templateUrl: './edit.category.component.html'
})

export class EditCategoryComponent {

    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    private forumVar : FORUM_KEY_FORMAT = <FORUM_KEY_FORMAT> {};
    form: FormGroup;
    category: FirebaseListObservable<any>;

    constructor(db: AngularFireDatabase, private activatedRoute: ActivatedRoute, private router: Router, fb: FormBuilder, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
        this.form = fb.group({
            forumId:            ['', Validators.required],
            categoryName:       ['', Validators.required], 
            description:        ['', Validators.required],
            parent:             ['0', Validators.required]
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.forumVar.forumId = params['forumId'] ? params['forumId'] : null;
            this.forumVar.catId = params['catId'] ? params['catId'] : null;
            this.forumVar.storageId = params['forumId'];

                this.userVar.userDetail = db.list('/category/'+ this.forumVar.catId )
                    .subscribe(req =>  {
                        for(let uIndex of req) {
                            if(uIndex.$key == "category")       { this.forumVar.categoryName = uIndex.$value;    }
                            if(uIndex.$key == "description")    { this.forumVar.description = uIndex.$value;       }
                            if(uIndex.$key == "forumID")        { this.forumVar.forumId = uIndex.$value;     }
                            if(uIndex.$key == "parent")         { this.forumVar.parent = uIndex.$value;        }
                        }

                        if(this.forumVar.parent != <any>0) {
                            this.forumVar.forumId = "0";
                        }
                        this.form.patchValue({
                            forumId:        this.forumVar.forumId,
                            categoryName:   this.forumVar.categoryName, 
                            description:    this.forumVar.description, 
                            parent:         this.forumVar.parent
                        })
                    }); 
        });
    }
    
    onSubmit() {
        this.userVar.loading = true;
        let passData = {
                forumID:        this.form.value.forumId,
                category:       this.form.value.categoryName,
                description:    this.form.value.description,
                parent:         this.form.value.parent
        }
        this.fData.categoryUpdate(this.forumVar.catId, passData)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/category/' + this.forumVar.storageId]);
        }, e =>console.log(e));
    }

}