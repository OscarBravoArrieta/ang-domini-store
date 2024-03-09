 import { CurrencyPipe } from '@angular/common'
 import { Component, OnInit, Signal, inject, input } from '@angular/core'
 import { Product } from '@shared/model/product.interface'
 import { ProductsService } from 'app/api/products.service'

 @Component({
     selector: 'app-details',
     standalone: true,
     imports: [CurrencyPipe],
     templateUrl: './details.component.html',
     styleUrl: './details.component.scss'
 })
 export default class DetailsComponent implements OnInit {

     productId = input<number>(0, { alias: 'id'})
     product!: Signal<Product | undefined>
     private readonly ProductService = inject(ProductsService)


     // -------------------------------------------------------------------------------------------

     ngOnInit(): void {

         this.product = this.ProductService.getProductById(this.productId())

     }

     // -------------------------------------------------------------------------------------------

     onAddToCart () {

     }

     // -------------------------------------------------------------------------------------------


 }
