import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LongUrlInput } from '../../components/long-url-input/long-url-input';
import { ShortUrlDisplay } from '../../components/short-url-display/short-url-display';
import { QrCode } from '../../components/qr-code/qr-code';
import { ShortUrlDefault } from '../../core/constants/urlshortener.constants';

@Component({
  imports: [FormsModule, LongUrlInput, ShortUrlDisplay, QrCode],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  readonly shortUrl = signal<string>(ShortUrlDefault);
  readonly shortUrlDefault = ShortUrlDefault;

  handleShortUrlUpdate(shortUrl: string): void {
    console.log('Short URL updated:', shortUrl);
    this.shortUrl.set(shortUrl);
  }
}