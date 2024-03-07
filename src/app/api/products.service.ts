 import { HttpClient } from '@angular/common/http'
 import { Injectable, inject, signal } from '@angular/core'
 import { environment } from '@envs/environment.development'
 import { Product } from '@shared/model/product.interface'
 import { tap } from 'rxjs'

 @Injectable({
     providedIn: 'root'
 })
 export class ProductsService {

     public products = signal<Product[]>([])
     private readonly http = inject(HttpClient)
     private readonly endPoint = environment.apiURL

     constructor() {
         this.getProducts()
     }
     //--------------------------------------------------------------------------------------------

     getProducts() {

         this.http.get<Product[]>(`${this.endPoint}/products/?sort=desc`)
             .pipe(tap((data: Product[]) => this.products.set(data)))
             .subscribe()

     }

     //--------------------------------------------------------------------------------------------

     getProductById(id: string) {

         return this.http.get<Product>(`${this.endPoint}/products/${id}`)

     }

     //--------------------------------------------------------------------------------------------
}
