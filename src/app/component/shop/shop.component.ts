import { Component } from '@angular/core';
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
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  product?: Product[];
  categorySon?:Category[];
  page : number;
  productBestSeller?: Product[];
  selectedCategoryIndex: number | null = null;
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
    this.page = 1;
      this.productService.showAll().then(
        result => {
          this.product = result as Product[];
        },
        err => {
          console.log(err);
        }
      )

      //hiện thị category cha
      this.categoryService.ShowSon().then(
        result => {
          this.categorySon = result as Category[];
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
  }

  previousPage(){
    if(this.page > 1){
      this.page = this.page -1;
    }
  }
  nextPage(){
      if(this.page <this.product.length/9){
          this.page = this.page + 1;
      }
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
  onCheckboxChange(index: number) {
    if (index === -1) {
      // Xử lý khi chọn "All plants"
      this.selectedCategoryIndex = -1;
    } else if (this.selectedCategoryIndex === index) {
      // Xử lý khi chọn một checkbox đã chọn trước đó
      this.selectedCategoryIndex = -1; // Bỏ chọn lại "All plants"
    } else {
      // Xử lý khi chọn một checkbox khác
      this.selectedCategoryIndex = index;
    }
  }

  selectByCateogryId(categoryId: any) {
    if (categoryId == '0') {
        this.productService.showAll().then(
            result => {
                this.product = result as Product[];
            },
            err => {
                console.log(err);
            }
        );
    } else {
        this.productService.findProductByCategoryId2(categoryId).then(
            result => {
                this.product = result as Product[];
            },
            err => {
                console.log(err);
            }
        );
    }
}

selectByNew(){
  this.productService.showNewProduct().then(
    result => {
      this.product = result as Product[];
    },
    err => {
      console.log(err);
    }
  )
}
selectByAZ(){
  this.productService.findProductByAZ().then(
    result => {
      this.product = result as Product[];
    },
    err => {
      console.log(err);
    }
  )
}
selectByZA(){
  this.productService.findProductByZA().then(
    result => {
      this.product = result as Product[];
    },
    err => {
      console.log(err);
    }
  )
}
selectByDesc(){
  this.productService.findProductByPriceDesc().then(
    result => {
      this.product = result as Product[];
    },
    err => {
      console.log(err);
    }
  )
}
selectByAsc(){
  this.productService.findProductByPriceAsc().then(
    result => {
      this.product = result as Product[];
    },
    err => {
      console.log(err);
    }
  )
}
}
