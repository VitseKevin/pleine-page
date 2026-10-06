import { Component, computed, input } from '@angular/core';
import { Livre } from '../livres';

const PALETTES = [
  ['#c2562a', '#f6d2a8'],
  ['#2f5d50', '#d3e6c9'],
  ['#1f3a5f', '#a9cbe8'],
  ['#6b2d5c', '#f3bfd4'],
  ['#d8a23e', '#3b2a12'],
  ['#24363f', '#e8d4a2'],
  ['#8a3b2e', '#f7dcc5'],
  ['#3d4f2a', '#ece49f'],
];

@Component({
  selector: 'app-couverture',
  templateUrl: './couverture.html',
  styleUrl: './couverture.css',
})
export class Couverture {
  readonly livre = input.required<Livre>();
  protected readonly palette = computed(() => PALETTES[this.livre().id % PALETTES.length]);
  protected readonly motif = computed(() => this.livre().id % 4);
}
