import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
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
  course: any;
  @Input() selected: any;
  lib: any = [];
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activateroute: ActivatedRoute,
    private storeService: StoreService
  ) {}

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  showSuccess: boolean = false;
  ngOnInit(): void {
    var id = this.activateroute.snapshot.params.id;
    this.storeService.getCourseById(id).subscribe((res: any) => {
      this.course = res;
      this.initConfig();
    });

    for (var ele of this.user.library) {
      this.lib.push(ele._id);
    }
  }

  addToLibrary(course: any) {
    this.lib.push(course._id);
    this.user.library.push(course);
    console.log(this.lib);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.profileService
      .update(this.user._id, { library: this.lib })
      .subscribe(() =>
        this.router.navigate(['library']).then(() => {
          location.reload();
        })
      );
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
                value: this.course.price,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.course.price,
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
                    value: this.course.price,
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
        this.addToLibrary(this.course);
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
