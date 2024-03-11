import { Component, inject } from '@angular/core';
import { ConfigItem } from 'src/app/service/config-item';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  pricing!: ConfigItem | undefined;
  configService: ConfigService = inject(ConfigService);

  constructor()  {
    // this.pricing = this.configService.getPageByName("pricing");
    this.configService.getPageById(5).subscribe(
      (response) => this.pricing = response
      );
  }
}
