import { Component, Input, OnInit } from '@angular/core';
import { service } from 'src/app/interfaces/star.interface';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input('img') img: string = '';
  @Input('service') service!: service;
  public statusAuth!: boolean;

  constructor(private auth: AuthServiceService) {}

  ngOnInit(): void {}
}
