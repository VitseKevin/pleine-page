import { Injectable, computed, effect, signal } from '@angular/core';
import { LIVRES } from './livres';

const CLE = 'pleine-page-panier';

@Injectable({ providedIn: 'root' })
export class PanierService {
  readonly ids = signal<number[]>(this.lire());
  readonly livres = computed(() => LIVRES.filter(l => this.ids().includes(l.id)));
  readonly nombre = computed(() => this.ids().length);
  readonly total = computed(() => this.livres().reduce((somme, l) => somme + l.prix, 0));

  constructor() {
    effect(() => localStorage.setItem(CLE, JSON.stringify(this.ids())));
  }

  contient(id: number) {
    return this.ids().includes(id);
  }

  ajouter(id: number) {
    if (!this.contient(id)) {
      this.ids.update(p => [...p, id]);
    }
  }

  retirer(id: number) {
    this.ids.update(p => p.filter(x => x !== id));
  }

  vider() {
    this.ids.set([]);
  }

  private lire(): number[] {
    try {
      const valeur = JSON.parse(localStorage.getItem(CLE) ?? '[]');
      return Array.isArray(valeur) ? valeur.filter(x => typeof x === 'number') : [];
    } catch {
      return [];
    }
  }
}
