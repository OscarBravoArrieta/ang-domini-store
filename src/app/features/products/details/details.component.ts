 import { CurrencyPipe } from '@angular/common'
 import { Component, OnInit, Signal, inject, input } from '@angular/core'
 import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
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

     starsArray: number[] = new Array(5).fill(0)
     productId  = input<number>(0, { alias: 'id'})
     product!: Signal<Product | undefined>
     private readonly ProductService = inject(ProductsService)
     private readonly sanitizer = inject(DomSanitizer)


     // -------------------------------------------------------------------------------------------

     ngOnInit(): void {

         this.product = this.ProductService.getProductById(this.productId())

     }

     // -------------------------------------------------------------------------------------------

     onAddToCart () {

     }

     // -------------------------------------------------------------------------------------------

     generateSvg (index: number): SafeHtml {
         
         let svgContent = null
         
         const rate = this.product()?.rating.rate as number

         if (index + 1 <= Math.floor(rate)) {
             svgContent = 
                 `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                 </svg>`
         } else if (index < rate) {
             svgContent = 
                 `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                 </svg>`
         } else {
             svgContent = 
                 `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                 </svg>`
         }
         return this.sanitizer.bypassSecurityTrustHtml(svgContent)
     }

     // -------------------------------------------------------------------------------------------


 }
