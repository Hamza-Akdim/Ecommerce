import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
