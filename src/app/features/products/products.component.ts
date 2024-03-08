 import { Component, inject } from '@angular/core';
 import { CardComponent } from "./card/card.component";
 import { ProductsService } from 'app/api/products.service'
 

 @Component({
     selector: 'app-products',
     standalone: true,
     templateUrl: './products.component.html',
     styleUrl: './products.component.scss',
     imports: [CardComponent]
 })
 export default class ProductsComponent {
     private readonly productService = inject(ProductsService)
     products = this.productService.products


 }
