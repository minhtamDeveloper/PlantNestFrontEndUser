import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { FavoriteCart } from 'src/app/model/favoritecart.model';
import { Product } from 'src/app/model/product.model';
import { ResultAPI } from 'src/app/model/resultapi.model';
import { CartService } from 'src/app/service/cart.service';
import { FavoriteCartService } from 'src/app/service/favoritecart.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopdetail',
  templateUrl: './shopdetail.component.html',
  styleUrls: ['./shopdetail.component.css']
})
export class ShopdetailComponent {
  product!: Product;
  relatedProduct!: Product[];
  addProductRelated?: Cart;
  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favoriteCartService: FavoriteCartService
       ){}
  ngOnInit(){

    this.activatedRoute.paramMap.subscribe(p=>{
      var proId = p.get('id');
      this.productService.findProductById(proId!).then(
        result => {
          this.product = result as Product;
          console.log(this.product);
        },
        err => {
          console.log(err);
        }
      )
    })
    this.activatedRoute.paramMap.subscribe(p=>{
      var catId = p.get('categoryId');
      this.productService.findProductByCategoryId(catId!).then(
        result =>{
          this.relatedProduct = result as Product[];
          console.log(this.relatedProduct);
        },
        err =>{
          console.log(err)
        }
      )
    })
  }

  addToCart(id:any,sellPrice:any){
    var id = id;
    var quantity = parseInt((document.getElementById('qty') as HTMLInputElement).value);
    var sellPrice = sellPrice;
    console.log(id, quantity,sellPrice);
    const cartToAdd: Cart = { accountId: 4, productId: id, quantity:quantity, id: 0, productName: '', price: sellPrice, imageUrl: '' };
    // console.log(cartToAdd);
    this.cartService.created(cartToAdd).then(
      result => {
        console.log(result);
        var resultAPI: ResultAPI = result as ResultAPI;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Add Product to cart successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/cart']);
      },
      ).catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err,
        })
      });
  }

  addProductRelatedToCart(id:any, sellPrice:any){
    var id = id;
    var sellPrice = sellPrice;
    // console.log(id);
    const cartToAdd: Cart = { accountId: 4, productId: id, quantity: 1, id: 0, productName: '', price: sellPrice, imageUrl: '' };
    // console.log(cartToAdd);
    this.cartService.created(cartToAdd).then(
      result => {
        console.log(result);
        var resultAPI: ResultAPI = result as ResultAPI;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Add Product to cart successfully',
          showConfirmButton: false,
          timer: 1500
        })
      },
      ).catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err,
        })
      });
  }

  addFavoriteCard(id:any, sellPrice:any){
    var id = id;
    var sellPrice = sellPrice;
    const addFavoriteCard: FavoriteCart = { accountId: 4, productId: id, id: 0, productName: '', price: sellPrice, imageUrl: '' };
    console.log(addFavoriteCard);
    this.favoriteCartService.created(addFavoriteCard).then(
      result => {
        console.log(result);
        var resultAPI: ResultAPI = result as ResultAPI;
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Add Favorite Cart Success',
          showConfirmButton: false,
          timer: 1500
        })
      },
      ).catch(err => {
        console.log(err);
        Swal.fire({
          icon: 'info',
          title: 'The product is already in the wishlist',
          showConfirmButton: false,
          timer: 1500
        })
      });
  }
}
