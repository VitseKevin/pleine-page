import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Couverture } from '../couverture/couverture';
import { LIVRES } from '../livres';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-fiche',
  imports: [RouterLink, CurrencyPipe, Couverture],
  templateUrl: './fiche.html',
  styleUrl: './fiche.css',
})
export class Fiche {
  readonly id = input.required<string>();
  protected readonly panier = inject(PanierService);
  protected readonly livre = computed(() => LIVRES.find(l => l.id === Number(this.id())));
  protected readonly ajoute = computed(() => this.panier.contient(Number(this.id())));
  protected readonly suggestions = computed(() =>
    LIVRES.filter(l => l.id !== Number(this.id())).slice(0, 4)
  );

  protected ajouter() {
    this.panier.ajouter(Number(this.id()));
  }
}
