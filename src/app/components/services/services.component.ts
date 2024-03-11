import { Component, inject } from '@angular/core';
import { ConfigItem } from 'src/app/service/config-item';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-services',
  
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  services!: ConfigItem | undefined;
  configService: ConfigService = inject(ConfigService);

  constructor()  {
    // this.services = this.configService.getPageByName("services");
    this.configService.getPageById(6).subscribe(
      (response) => this.services = response
      );
  }
}
