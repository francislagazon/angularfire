import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-action',
    template: ''
})

export class ActionComponent {
    constructor(private location: Location) {
        location.back();
    }
}