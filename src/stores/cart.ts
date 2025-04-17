// import { defineStore } from 'pinia';
// import type { PropsCart } from '../components/store/Card.vue';

// export const useCartStore = defineStore('cart', {
//   state: ():{items: PropsCart[]} => ({
//     items: [],
//   }),

//   getters: {
//     cartCount: (state) => state.items.length,
//     totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0),
//   },

//   actions: {
//     loadFromLocalStorage() {
//       const data = localStorage.getItem('cart');
//       if(data){
//         try {
//           this.items = JSON.parse(data)
//         } catch(e) {
//           console.error("Error parsing cart from LS", e);
          
//         }
//       }
//     },
//     addToCart(product: PropsCart) {
//       this.items.push(product);
//       localStorage.setItem('cart', JSON.stringify(this.items));
//     },

//     removeFromCart(id: number) {
//       this.items = this.items.filter(item => item.id !== id);
//       localStorage.setItem('cart', JSON.stringify(this.items));
//     },

//     clearCart() {
//       this.items = [];
//       localStorage.removeItem('cart');
//     },
//   },
// });
