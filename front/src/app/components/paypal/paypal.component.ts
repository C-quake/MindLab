import { Component, Input, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ProfileService } from '../../services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  @Input() selected: any;
  @Input() addToLibrary: any;
  lib: any = [];
  constructor(
    private profileService: ProfileService,
    private _router: Router
  ) {}

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  showSuccess: boolean = false;

  ngOnInit(): void {
    this.initConfig();
    for (var ele of this.user.library) {
      this.lib.push(ele._id);
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.selected.price,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.selected.price,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: this.selected.price,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log('purchased', data);
        this.showSuccess = true;
        this.addToLibrary(this.selected);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
