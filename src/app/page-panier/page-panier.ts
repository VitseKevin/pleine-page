import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Couverture } from '../couverture/couverture';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-page-panier',
  imports: [RouterLink, CurrencyPipe, Couverture],
  templateUrl: './page-panier.html',
  styleUrl: './page-panier.css',
})
export class PagePanier {
  protected readonly panier = inject(PanierService);
}
