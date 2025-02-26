import { InjectionToken, NgModule } from "@angular/core";
import { environment } from "../../environments/environment";
import { CommonModule } from "@angular/common";



export let APP_CONFIG = new InjectionToken<AppConfig>('app.config')

export class AppConfig{
    apiBaseUrl: string ='';
    endpoints: {
        products: string;
        categories: string;
        category: string;
        carts: string;
        user: string;
      } = { products: '', categories: '', category: '' ,carts:'', user:''};
}

export const APP_DI_CONFIG: AppConfig = {
    apiBaseUrl: environment.apiBaseUrl,
    endpoints: {
        products: `${environment.apiBaseUrl}/products`,
        categories: `${environment.apiBaseUrl}/products/categories`,
        category: `${environment.apiBaseUrl}/products/category`,
        carts: `${environment.apiBaseUrl}/carts`,
        user: `${environment.apiBaseUrl}/carts/user`
      }
};

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [{
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG
    }]
  })
  export class AppConfigModule { }