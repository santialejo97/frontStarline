import { Component, OnInit } from '@angular/core';
import { service } from 'src/app/interfaces/star.interface';
import { StartServiceService } from 'src/app/services/startline/start-service.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
})
export class FeatureComponent implements OnInit {
  public listService: service[] = [];

  constructor(private start: StartServiceService) {
    this.start.getListServices().subscribe((data) => {
      this.listService = data.filter((item) => item.isactive === true);
    });
  }

  ngOnInit(): void {}
}
