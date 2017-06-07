import { Component } from "@angular/core";
import { UserData } from './../provider/AuthUser.service';
import { Router } from '@angular/router';

import { UsersComponent } from './../users/users.component'

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})

export class AdminComponent {
    
    constructor(private uData: UserData, private router: Router) {
        if(!uData.pageSession) {
            router.navigate(['/login']);
        }
    }

}