import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Couverture } from '../couverture/couverture';
import { LIVRES } from '../livres';
import { PanierService } from '../panier.service';

type Tri = 'catalogue' | 'titre' | 'prix-croissant' | 'prix-decroissant';

@Component({
  selector: 'app-catalogue',
  imports: [RouterLink, CurrencyPipe, Couverture],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue {
  protected readonly panier = inject(PanierService);
  protected readonly filtre = signal('');
  protected readonly tri = signal<Tri>('catalogue');
  protected readonly auteurs = [...new Set(LIVRES.map(l => l.auteur.split(' ').at(-1)!))].sort();
  protected readonly total = LIVRES.length;

  protected readonly resultats = computed(() => {
    const liste = LIVRES.filter(l => l.auteur.toLowerCase().includes(this.filtre().toLowerCase()));
    switch (this.tri()) {
      case 'titre': return [...liste].sort((a, b) => a.titre.localeCompare(b.titre));
      case 'prix-croissant': return [...liste].sort((a, b) => a.prix - b.prix);
      case 'prix-decroissant': return [...liste].sort((a, b) => b.prix - a.prix);
      default: return liste;
    }
  });

  protected choisirAuteur(nom: string) {
    this.filtre.set(this.filtre().toLowerCase() === nom.toLowerCase() ? '' : nom);
  }
}
