import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule,Routes } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { provideHttpClient } from '@angular/common/http';
import { MovieCarouselComponent } from './shared/components/movie-carousel/movie-carousel.component';
import { DescriptionPipe } from './shared/pipes/description.pipe';
import { ImagePipe } from './shared/pipes/image.pipe';
import {provideAnimations} from '@angular/platform-browser/animations'

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'browse', component: BrowseComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BrowseComponent,
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
    DescriptionPipe,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes,{enableTracing: true})
  ],
  providers: [provideHttpClient(),provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
