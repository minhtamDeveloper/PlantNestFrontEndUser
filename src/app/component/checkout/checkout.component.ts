import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { CartService } from 'src/app/service/cart.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { enviroment } from 'src/environments/environment';
import { OrdersService } from 'src/app/service/order.service';
import { OrderDetailService } from 'src/app/service/orderdetail.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { Orders } from 'src/app/model/order.model';
import { ResultAPI } from 'src/app/model/resultapi.model';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { OrderDetail } from 'src/app/model/orderdetail.model';
import { Delivery } from 'src/app/model/delivery.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartList: Cart[];
  totalItems: number = 0;
  grandTotal: number = 0;
  showSuccess!: any;
  deliveryForm: FormGroup;
  paymentMethod: string = '';
  public payPalConfig?: IPayPalConfig;
  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private orderService: OrdersService,
    private orderDetailService: OrderDetailService,
    private deliveryService: DeliveryService,
    public datepipe: DatePipe
  ){

  }

  ngOnInit(){

    this.cartService.findByAccountId('4').then(
      result => {
        this.cartList = result as Cart[];
        this.loadCartItems();
      },
      err => {
        console.log(err);
      }
    )

    this.deliveryForm = this.formBuilder.group({
      recipientName: [''],
      recipientAddress: [''],
      recipientPhone: [''],
      message: [''],
    });
     // paypal
     this.initConfig();
  }
  loadCartItems() {
    this.totalItems = this.cartList.reduce((sum, cart) => sum + cart.quantity, 0);
    this.grandTotal = this.cartList.reduce((sum, cart) => sum + this.calculateTotalPrice(cart), 0);
  }
  calculateTotalPrice(cart: any) {
    return cart.quantity * cart.price;
  }


  // paypal()
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: `${enviroment.Client_ID}`,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: `${this.grandTotal}`,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: `${this.grandTotal}`
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: `${this.grandTotal}`,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  selectPaymentCash() {
    this.paymentMethod = 'cash'; // Gán giá trị 'Cash' cho biến paymentMethod
}
  async complete(grandTotal: number){
    var totalOrder = grandTotal;
    // var userName = sessionStorage.getItem('username');
    try {
      // const result = await this.accountService.findAccountIdByUsername(userName);
      // this.account = result as Account;

      // if (sessionStorage.getItem('username') != null) {
       // Lấy danh sách đơn hàng từ dịch vụ
      const ordersList = await this.orderService.findAll() as Orders[];
      // Khởi tạo biến lưu giá trị orderId lớn nhất
      let maxOrderId = 0;
      // Duyệt qua danh sách đơn hàng và tìm orderId lớn nhất
      for (const order of ordersList) {
        if (order.orderId > maxOrderId) {
          maxOrderId = order.orderId+1;
        }
      }
        const orders: Orders = {
          paymentMethod: this.paymentMethod || 'transfer',
          totalOrder: totalOrder,
          status: '0',
          accountId: 4,
          orderId: 0
        };
        console.log(orders);
       await this.orderService.created(orders).then(
          result =>{
            console.log(result);
            var resultAPI: ResultAPI  = result as ResultAPI;
          }
        )
        Swal.fire({
          icon: 'success',
          title: 'Order Success!',
        })
        console.log(maxOrderId);
        // tạo  ra list orderdetail
        const orderDetail: OrderDetail[] = this.cartList.map(cart => {
          return {
            orderId: maxOrderId,
            productId: cart.productId,
            quantity: cart.quantity,
            totalPrice: cart.price,
          };
        });
        await setTimeout(() => {
          console.log('a');
          this.orderService.updateOrderStatus(maxOrderId).then(
              result => {
                  console.log(result);
                  var resultAPI: ResultAPI = result as ResultAPI;
              },
              err => {
                  console.log(err);
              }
          );
      }, 20000);
      // Thêm danh sách orderDetails vào cơ sở dữ liệu
      console.log(orderDetail);
       this.orderDetailService.created(orderDetail).then(
        result => {
          console.log(result);
          var resultAPI:ResultAPI = result as ResultAPI;
        }
       )
      // thêm delivery vào
      const recipientName = this.deliveryForm.get('recipientName').value;
        const recipientAddress = this.deliveryForm.get('recipientAddress').value;
        const recipientPhone = this.deliveryForm.get('recipientPhone').value;
        const message = this.deliveryForm.get('message').value;
          const delivery: Delivery = {
            orderId: maxOrderId,
            recipientName: recipientName,
            recipientAddress: recipientAddress,
            recipientPhone: recipientPhone,
            message: message,
            status:'0'
          }
        console.log(delivery);
        this.deliveryService.created(delivery);
        this.cartService.deleteByAccountId(4);
        this.router.navigate(['/myorder']);
      }
    //   else {
    //     this.router.navigate(['/login']);
    //   }
    // }
    catch (err) {
      console.log(err);
    }
  }


}

