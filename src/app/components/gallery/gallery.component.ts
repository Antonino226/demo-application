import { Component, inject } from '@angular/core';
import { ConfigItem } from 'src/app/service/config-item';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-gallery',
  
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  gallery!: ConfigItem | undefined;
  configService: ConfigService = inject(ConfigService);

  constructor()  {
    // this.gallery = this.configService.getPageByName("gallery");
    this.configService.getPageById(3).subscribe(
      (response) => this.gallery = response
      );
  }
}
