import {Injectable} from '@angular/core'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class ForumData {

    category: FirebaseListObservable<any>;
    sub: FirebaseListObservable<any>;
    config: FirebaseListObservable<any>

    constructor(db: AngularFireDatabase) {
        this.category = db.list('/category');
        this.config = db.list('/config');
    }

    categoryAdd(info):Observable<any> {
        let promise = this.category.push(info)
        return Observable.fromPromise( promise );
    }

    categoryUpdate(key, info):Observable<any> {
        info = {
            forumID: info.forumID,
            category: info.category,
            description: info.description,
            parent: info.parent
        }
        let promise = this.category.update(key, info)
        
        return Observable.fromPromise( promise );
    }

    categorySubAdd(info):Observable<any> {
        let promise = this.category.push(info)
        return Observable.fromPromise( promise );
    }

    deleteCategory(id):Observable<any> {
        let promise = this.category.remove(id)
        return Observable.fromPromise(promise);
    }
    
    deleteForumConfig(id):Observable<any> {
        let promise = this.config.remove(id)
        return Observable.fromPromise(promise);
    }
    configAdd(info):Observable<any> {
        let promise = this.config.push(info)
        return Observable.fromPromise(promise);
    }

    configUpdate(key, info):Observable<any> {
        let promise = this.config.update(key, info)
        return Observable.fromPromise( promise );
    }
}
