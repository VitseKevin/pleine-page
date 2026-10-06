import { Routes } from '@angular/router';
import { Catalogue } from './catalogue/catalogue';
import { Fiche } from './fiche/fiche';
import { PagePanier } from './page-panier/page-panier';

export const routes: Routes = [
  { path: '', component: Catalogue, title: 'Pleine Page · Librairie' },
  { path: 'livre/:id', component: Fiche, title: 'Pleine Page · Fiche' },
  { path: 'panier', component: PagePanier, title: 'Pleine Page · Mon panier' },
  { path: '**', redirectTo: '' },
];
