 import { Component, inject } from '@angular/core'
 import { CardComponent } from "./card/card.component"
 import { ProductsService } from 'app/api/products.service'
 import { Product } from '@shared/model/product.interface'
 import { CartStore } from '@shared/store/shoping-cart.store'
 

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
     cartStore = inject(CartStore)

     onAddToCart(product: Product): void{
         
        this.cartStore.addToCart(product)
         
     }
 }
