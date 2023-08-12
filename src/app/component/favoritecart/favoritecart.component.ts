import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { FavoriteCart } from 'src/app/model/favoritecart.model';
import { ListOrderDetail } from 'src/app/model/listorderdetail.model';
import { Product } from 'src/app/model/product.model';
import { ResultAPI } from 'src/app/model/resultapi.model';
import { CartService } from 'src/app/service/cart.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { FavoriteCartService } from 'src/app/service/favoritecart.service';
import { OrdersService } from 'src/app/service/order.service';
import { OrderDetailService } from 'src/app/service/orderdetail.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './favoritecart.component.html'
})
export class FavoriteComponent {
  product!: Product;
  favoriteCart:FavoriteCart[];

  constructor(
    private router:Router,
    private favoriteService: FavoriteCartService
       ){}
     ngOnInit(){

     this.favoriteService.findByAccountId(4).then(
      result =>{
        this.favoriteCart = result as FavoriteCart[];
      }
    )

  }


}
