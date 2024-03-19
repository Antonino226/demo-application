import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HeaderComponent } from './components/header/header.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {title: "ADS | Home", path:'home' , component: HeaderComponent, canActivate: [AuthGuard] },
  {title: "ADS | Profile", path:'profile/:id' , component: ProfileComponent, canActivate: [AuthGuard] },
  {title: "ADS | About", path:'about' , component: AboutComponent, canActivate: [AuthGuard] },
  {title: "ADS | Users", path:'users' , component: UsersComponent, canActivate: [AuthGuard] },
  {title: "ADS | Product", path:'product' , component: ProductComponent, canActivate: [AuthGuard] },
  {title: "ADS | Pricing", path:'pricing' , component: PricingComponent, canActivate: [AuthGuard] },
  {title: "ADS | Gallery", path:'gallery' , component: GalleryComponent, canActivate: [AuthGuard] },
  {title: "ADS | Not Found", path:'notfound' , component: NotfoundComponent },
  { path: "login", component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
