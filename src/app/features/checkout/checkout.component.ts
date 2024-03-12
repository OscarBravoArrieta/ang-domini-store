 import { CurrencyPipe } from '@angular/common';
 import { Component, inject } from '@angular/core';
 import { CartStore } from '@shared/store/shoping-cart.store';
 import { CheckoutService } from './services/checkout.service';

 @Component({
     selector: 'app-checkout',
     standalone: true,
     imports: [CurrencyPipe],
     templateUrl: './checkout.component.html',
     styleUrl: './checkout.component.scss'
 })
 export default class CheckoutComponent {

     public cartStore = inject(CartStore)
     private readonly checkoutService = inject(CheckoutService)

     //--------------------------------------------------------------------------------------------

     onProceedToPay () {

         this.checkoutService.onProceedToPay()


     }

     //--------------------------------------------------------------------------------------------

     removeItem(id: number) {

         this.cartStore.removeFromCart(id)

     }

     //--------------------------------------------------------------------------------------------

     clearAll() {

        this.cartStore.clearCart()

     }
     //--------------------------------------------------------------------------------------------


 }
