 import { HttpClient } from '@angular/common/http'
 import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from '@angular/core'
 import { environment } from '@envs/environment.development'
 import { Product } from '@shared/model/product.interface'
 import { map, tap } from 'rxjs'
 import { toSignal } from '@angular/core/rxjs-interop'

 @Injectable({
     providedIn: 'root'
 })
 export class ProductsService {

     public products = signal<Product[]>([])
     private readonly http = inject(HttpClient)
     private readonly endPoint = environment.apiURL
     private readonly injector = inject(EnvironmentInjector)

     constructor() {
         this.getProducts()
     }
     //--------------------------------------------------------------------------------------------

     getProducts() {

         this.http.get<Product[]>(`${this.endPoint}/products/?sort=desc`)
             .pipe(
                 map((products: Product[]) => products.map((product: Product) =>({...product, quantity: 1}))
                 ),
                 tap((products: Product[]) => this.products.set(products)))
             .subscribe()

     }

     //--------------------------------------------------------------------------------------------

     getProductById(id: number) {

         return runInInjectionContext(this.injector, () =>
             toSignal<Product>(
                 this.http.get<Product>(`${this.endPoint}/products/${id}`)
             )
         )
     }

     //--------------------------------------------------------------------------------------------
}
