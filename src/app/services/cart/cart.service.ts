import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Product } from '../../shared/models/Product';
import CartItem from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();
  constructor() {}
  //Add new Product to cart
  addToCart(product: Product) {
    const existCartItem = this.cart.items.find(
      (cartitem) => cartitem.product.id == product.id
    );
    existCartItem
      ? existCartItem.quantity++
      : this.cart.items.push(new CartItem(product));
    console.log(this.cart);
  }
  //Add new Product to cart with quantity for single product page
  addToCartWithQuantity(product: Product,quantity:number) {
    const existCartItem = this.cart.items.find(
      (cartitem) => cartitem.product.id == product.id
    );
    existCartItem
      ? existCartItem.quantity=quantity
      : this.cart.items.push(this.createCartItemQuantity(product,quantity));
      //quantity?this.cart.
    console.log(this.cart);
  }

  // Creat cart item for single product page
  createCartItemQuantity(product: Product,quantity:number) {
    let cartItem= new CartItem(product);
    cartItem.quantity=quantity;
    return cartItem;
  }

  //Function display Cart Items
  getCart(): Cart {
    return this.cart;
  }

  //update cart Quantity
  addQuantitiy(cartItemId: number): Cart {
    console.log(cartItemId);
    this.cart.items.find((cartItem) => {
      if (cartItem.id == cartItemId) cartItem.quantity++;
    });
    return this.cart;
  }

  //delete cart item
  deleteCartItemById(cartItemId: number): Cart {
    var removeIndex = this.cart.items
      .map((cartItem) => cartItem.id)
      .indexOf(cartItemId);
    ~removeIndex && this.cart.items.splice(removeIndex, 1);
    return this.cart;
  }
}
