import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RegistrazioneComponent } from './components/registrazione/registrazione/registrazione.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from './components/login/login/login.component';
import { AuthorComponent } from './components/author/author/author.component';
import { GestioneAutoriComponent } from './components/gestione-autori/gestione-autori/gestione-autori.component';
import { ArticleviewComponent } from './components/articleview/articleview/articleview.component';
import { ReviewComponent } from './components/review/review/review.component';
import { ViewreviewComponent } from './components/viewreview/viewreview/viewreview.component';
import { CommonModule } from '@angular/common';
import { GestioneUtentiComponent } from './components/gestione-utenti/gestione-utenti/gestione-utenti.component';
import { ActivateComponent } from './components/activate/activate/activate.component';
import { authGuard } from './guard/auth.guard';
import { authAdminGuard } from './guard/auth.admin.guard';
import { authStaffOrAdminGuard } from './guard/auth-staff-or-admin.guard';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'registrazione-utente',
    component: RegistrazioneComponent,
  },
  {
    path: 'articolo',
    component: ArticleEditorComponent,
    canActivate: [authStaffOrAdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registrazione-autore',
    component: AuthorComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'gestione-autori',
    component: GestioneAutoriComponent,
    canActivate: [authAdminGuard],
  },
  {
    path: 'activate-author/:id',
    component: ActivateComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'gestione-utenti',
    component: GestioneUtentiComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'revisione',
    component: ReviewComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'articolo/:id',
    component: ArticleviewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'revisione/:id',
    component: ViewreviewComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleEditorComponent,
    HomeComponent,
    SidebarComponent,
    RegistrazioneComponent,
    LoginComponent,
    AuthorComponent,
    GestioneAutoriComponent,
    ReviewComponent,
    ArticleviewComponent,
    ViewreviewComponent,
    GestioneUtentiComponent,
    ActivateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    QuillModule.forRoot(),



  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
