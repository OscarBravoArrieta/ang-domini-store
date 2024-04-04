 import { computed } from "@angular/core"
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
 import { Product } from "@shared/model/product.interface"

 export interface CartStore {

     products: Product[]
     totalAmount: number
     productsCount: number

 }

 const initialState: CartStore = {

     products: [],
     totalAmount: 0,
     productsCount: 0

 }

 export const CartStore = signalStore(

     { providedIn: 'root' },
     withState(initialState),
     withComputed(( { products }) => ({
         productsCount: computed(()=>calculateProductCount(products())),
         totalAmount: computed(()=>(products())),
     })),
     withMethods(({ products, ...store }) => ({
         addToCart(product: Product){
             const isProductInCart = products().find((item: Product) => item.id === product.id)
             if(isProductInCart) {

                 isProductInCart.quantity++
                 isProductInCart.subTotal = isProductInCart.quantity * isProductInCart.price
                 patchState(store, { products: [...products()]})

             } else {
                 patchState(store, { products: [...products(), product]})
             }

         },
         removeFromCart(id: number){
             const updateProducts = products().filter(product => product.id != id)
             patchState(store, { products: updateProducts})

         },
         clearCart() {}
     })),

 )

  function calculateTotalAmount(products: Product[]): number{
     return products.reduce((acc, products) => acc + products.price * products.quantity, 0)
  }
  function calculateProductCount(products: Product[]): number {
     return products.reduce((acc, products) => acc + products.quantity, 0)
  }
