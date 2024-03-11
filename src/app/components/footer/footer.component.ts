import { Component, inject } from '@angular/core';
import { ConfigItem } from 'src/app/service/config-item';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  footer!: ConfigItem | undefined;
  configService: ConfigService = inject(ConfigService);

  constructor()  {
    // this.footer = this.configService.getPageByName("footer");
    this.configService.getPageById(8).subscribe(
      (response) => this.footer = response
      );
  }
}
