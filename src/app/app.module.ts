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
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'registrazione-utente',
    component: RegistrazioneComponent,
  },
  {
    path: 'articolo',
    component: ArticleEditorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registrazione-autore',
    component: AuthorComponent,
  },
  {
    path: 'gestione-autori',
    component: GestioneAutoriComponent,
  },
  {
    path: 'activate-author/:id',
    component: ActivateComponent,
  },
  {
    path: 'gestione-utenti',
    component: GestioneUtentiComponent,
  },
  {
    path: 'revisione',
    component: ReviewComponent,
  },
  {
    path: 'articolo/:id',
    component: ArticleviewComponent,
  },
  {
    path: 'revisione/:id',
    component: ViewreviewComponent,
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
