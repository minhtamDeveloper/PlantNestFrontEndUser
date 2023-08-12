import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { ResultAPI } from 'src/app/model/resultapi.model';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartList: Cart[];
  totalPrice: number = 0; // Biến lưu trữ tổng tiền
  totalQuantity: number = 0;
  totalItems: number = 0;
  grandTotal: number = 0;
  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
  }

  ngOnInit(){


    this.cartService.findByAccountId('4').then(
      result => {
        this.cartList = result as Cart[];
      },
      err => {
        console.log(err);
      }
    )
    this.loadCartItems();
  }

  loadData(){
    // var userName = sessionStorage.getItem('username');
    this.cartService.findByAccountId('4').then(
      result => {
        this.cartList = result as Cart[];
      },
      err => {
        console.log(err);
      }
    )
  }

  loadCartItems() {
    // Load cart items from the service and populate cartList
    // Also, calculate totalItems and grandTotal
    this.totalItems = this.cartList.reduce((sum, cart) => sum + cart.quantity, 0);
    this.grandTotal = this.cartList.reduce((sum, cart) => sum + this.calculateTotalPrice(cart), 0);
  }

  calculateTotalPrice(cart: any) {
    return cart.quantity * cart.price;
  }

  updateCart(id: number, quantity: number) {
    var cartId = id;
    var cartQuantity = quantity;
    const cartToUpdate = this.cartList.find(cart => cart.id === cartId);
    if (cartToUpdate) {
      // Nếu tìm thấy cart, cập nhật giá trị quantity và totalPrice cho cart
      cartToUpdate.id = cartId;
      cartToUpdate.accountId = cartToUpdate.accountId;
      cartToUpdate.productId = cartToUpdate.productId;
      cartToUpdate.quantity = quantity;
      console.log(cartToUpdate);
      // Gọi service để cập nhật cart trên server (nếu cần)
      this.cartService.update(cartToUpdate).then(
        (updatedCart: Cart) => {
          // console.log("Updated cart on server:", updatedCart);
          Swal.fire({
            icon: 'success',
            title: 'Update Success!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        err => {
          console.log("Error while updating cart on server:", err);
        }
      );
    }
  }

  decreaseQuantity(cart: any) {
    if (cart.quantity > 1) {
      cart.quantity--;
    }
  }

  increaseQuantity(cart: any) {
    if (cart.quantity < 99) {
      cart.quantity++;
    }
  }

  async deleteCart(id: any) {
    var result = confirm("Are you sure?");
    if (result) {
      try {

        const res =  await this.cartService.delete(id) as ResultAPI;
        if (res.result) {
          console.log("Delete Success")
          Swal.fire({
            icon: 'success',
            title: 'Delete Success!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/cart', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart']);
          });
          await this.loadData();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
