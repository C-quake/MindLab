import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
