# Angular

## Installation
Angular [plays nice](https://custom-elements-everywhere.com/#angular) with custom elements. Just make sure to apply the custom elements schema as shown below.

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

?> Are you using Shoelace with Angular? This page could use some love. [Please help us improve it!](https://github.com/shoelace-style/shoelace/blob/next/docs/frameworks/angular.md)
