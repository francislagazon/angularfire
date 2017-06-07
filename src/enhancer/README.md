# Enhance
Enhancer for bootstrap and font-awesome


The right way and easest way to enhance Bootstrap v4 and font-awesome is

1. We just use normal bootstrap v4 and font-awesome.
2. We will enhance the look of boostrap & font-awesome and somehow we will add our own components.
3. We only work on CSS.


# Installation

* first, add enhancer into your Angular project.

For instance, you can add enhancer as git submodule.

````
$ git submodule add https://github.com/thruthesky/enhancer src/enhancer
````

* second, add it to "styles" section in .angular.cli.json

````
      "styles": [
        "enhancer/scss/enhancer.scss"
      ]
````






# For developers

## Test Environment Installation



0. Set the Angular parent project with SCSS style.

1. git submodule add on the parent project.

$ git submodule add https://github.com/thruthesky/enhance src/enhance


2. insert enhance.scss into .angular.cli.json

````
      "styles": [
        "styles.scss",
        "enhancer/scss/enhancer.scss"
      ],
````




3. Test/Build on a sample component by adding it on NgModule.

````
    import { EnhanceSample } from '../enhance/components/sample';
    @NgModule({
    declarations: [ EnhanceSample ]
    });
````

4. And add selector in your project for a test

````
    <enhance-sample></enhance-sample>
````

5. test/edit HTML on enhance/components/sample.html


6. After work, git commit/push





# Tips

## Centering an element of parent

left, right = 50%
margin-left, margin-right = - size;

````
<div class="p-relative">
    <img [src]="teacher.img_youtube">
    <i class="p-absolute b-block t-50 l-50 fs-3rem orange fa fa-play-circle" style="margin-top: -1.5rem; margin-left: -1.5rem;"></i>
</div>
````




## combination of classes.

.b-0 is for `bottom: 0` and you want to give some space from bottom. then, you can combine with `.m-2` from bootstrap.

````
<div class="config p-absolute b-0 m-2">
````
