import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from "./components/footer/footer.component";
import { SocialComponent } from './components/social/social.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { JwtHelperService, JWT_OPTIONS, JwtInterceptor  } from '@auth0/angular-jwt';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        AboutComponent,
        UsersComponent,
        PricingComponent,
        GalleryComponent,
        NotfoundComponent,
        NavComponent,
        FooterComponent,
        SocialComponent,
        ProductComponent,
    ],
    providers: [ JwtHelperService, 
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        RouterOutlet,
        RouterLink, 
        RouterLinkActive      
    ]
})
export class AppModule { }
