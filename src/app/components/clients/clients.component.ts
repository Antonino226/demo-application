import { Component, inject } from '@angular/core';
import { ConfigItem } from 'src/app/service/config-item';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-clients',
  
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  clients!: ConfigItem | undefined;
  configService: ConfigService = inject(ConfigService);

  constructor()  {
    // this.clients = this.configService.getPageByName("clients");
    this.configService.getPageById(2).subscribe(
      (response) => this.clients = response
      );
  }
}
