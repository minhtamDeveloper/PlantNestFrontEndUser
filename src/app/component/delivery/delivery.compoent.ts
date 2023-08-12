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
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent {
  product!: Product;
  relatedProduct!: Product[];
  addProductRelated?: Cart;
  listOrderDetail: ListOrderDetail[]= [];
  listOrderDetail2: ListOrderDetail[]= [];
  listOrderDetail3: ListOrderDetail[]= [];
  constructor(
    private orderService: OrdersService,
    private router:Router
       ){}
    async ngOnInit(){

    await this.orderService.findByAccountId(4).then(
      result =>{
        this.listOrderDetail = result as ListOrderDetail[];
      }
    )
    await this.orderService.findByAccountId2(4).then(
      result =>{
        this.listOrderDetail2 = result as ListOrderDetail[];
      }
    )

    await this.orderService.findByAccountId3(4).then(
      result =>{
        this.listOrderDetail3 = result as ListOrderDetail[];
      }
    )
  }

  async deleteInvoice(orderId:any){

    var result = confirm("Want to cancel your order?");
    if (result) {
      try {
        const res =  await this.orderService.updateOrderStatus2(orderId) as ResultAPI;
        if (res.result) {
          console.log("Delete Success")
          Swal.fire({
            icon: 'success',
            title: 'Delete Success!',
            showConfirmButton: false,
            timer: 1500
          })
          // this.loadCartItems();

          this.router.navigateByUrl('/myorder', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/myorder']);
          });
          await this.orderService.findByAccountId(4).then(
            result =>{
              this.listOrderDetail = result as ListOrderDetail[];
            }
          )

        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
