import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserData } from './../../../provider/AuthUser.service';
import { ForumData } from './../../../provider/Forum.service'

import { USERS_KEY_FORMAT, FORUM_KEY_FORMAT } from "./../../../provider/interface";

@Component({
    selector: 'app-edit-new-config',
    templateUrl: './edit.config.component.html'
})

export class EditNewConfigComponent {

    private userVar:USERS_KEY_FORMAT = <USERS_KEY_FORMAT>{};
    private forumVar : FORUM_KEY_FORMAT = <FORUM_KEY_FORMAT> {};
    form: FormGroup;
    category: FirebaseListObservable<any>;
    
    constructor(db: AngularFireDatabase, private activatedRoute: ActivatedRoute, private router: Router, fb: FormBuilder, private uData: UserData, private fData: ForumData) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
        this.form = fb.group({
            uniqueName:         ['', Validators.required],
            configName:         ['', Validators.required], 
            description:        ['', Validators.required]
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.forumVar.forumId = params['forumId'] ? params['forumId'] : null;

                this.userVar.userDetail = db.list('/config/'+ this.forumVar.forumId )
                    .subscribe(req =>  {
                        for(let uIndex of req) {
                            if(uIndex.$key == "id")                 { this.forumVar.forumUID = uIndex.$value;    }
                            if(uIndex.$key == "name")               { this.forumVar.name = uIndex.$value;     }
                            if(uIndex.$key == "description")        { this.forumVar.description = uIndex.$value;         }
                        }
                        this.form.patchValue({
                            uniqueName:     this.forumVar.forumUID,
                            configName:     this.forumVar.name, 
                            description:    this.forumVar.description
                        })
                    }); 
        });
    }
    
    onSubmit() {
        this.userVar.loading = true;
        let passData = {
                id:             this.form.value.uniqueName,
                name:           this.form.value.configName,
                description:    this.form.value.description
        }
        this.fData.configUpdate(this.forumVar.forumId, passData)
        .subscribe((success) => {
            this.userVar.loading = false;
            this.router.navigate(['/forum/']);
        }, e =>console.log(e));
    }

}