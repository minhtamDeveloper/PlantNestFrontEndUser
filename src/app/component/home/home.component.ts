import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { Category } from 'src/app/model/category.model';
import { FavoriteCart } from 'src/app/model/favoritecart.model';
import { Product } from 'src/app/model/product.model';
import { ResultAPI } from 'src/app/model/resultapi.model';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { FavoriteCartService } from 'src/app/service/favoritecart.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit  {
  productNew?: Product[];
  productBestSeller?: Product[];
  categoryFather?: Category[];
  categorySon?:Category[];
  addToCart?: Cart;
  addFavoriteCart?: FavoriteCart;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private favoriteCartService: FavoriteCartService
  ){}
  ngOnInit(){
  //hiện thị sản phẩm mới nhất
    this.productService.showNewProduct().then(
      result => {
        this.productNew = result as Product[];
      },
      err => {  
        console.log(err);
      }
    )

    //hiện thị sản phẩm được bán nhiều nhất
    this.productService.showBestSellerProduct().then(
      result => {
        this.productBestSeller = result as Product[];
      },
      err => {
        console.log(err);
      }
    )

      //hiện thị category cha
      this.categoryService.showFather().then(
        result => {
          this.categoryFather = result as Category[];
        },
        err => {
          console.log(err);
        }
      )

      //hiện thị category con
      this.categoryService.ShowSon().then(
        result => {
          this.categorySon = result as Category[];
        },
        err => {
          console.log(err);
        }
      )
  }

  selectCategory(id: any){
    var id = id;
    this.categoryService.findByCategoryId(id).then(
      result =>{
        this.categorySon = result as Category[];
      },err =>{
        console.log(err);
      }
    )
  }

  addNewProductToCart(id:any, sellPrice:any){
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
