import { Component, inject } from '@angular/core';
import { ConfigItem } from 'src/app/service/config-item';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-social',
  
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
})
export class SocialComponent {
  social!: ConfigItem | undefined;
  configService: ConfigService = inject(ConfigService);

  constructor()  {
    // this.social = this.configService.getPageByName("social");
    this.configService.getPageById(4).subscribe(
      (response) => this.social = response
      );
  }
}
