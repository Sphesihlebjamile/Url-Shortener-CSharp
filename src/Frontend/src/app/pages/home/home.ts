import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LongUrlInput } from '../../components/long-url-input/long-url-input';
import { ShortUrlDisplay } from '../../components/short-url-display/short-url-display';

const ShortUrlDefault: string = '...';

@Component({
  imports: [FormsModule, LongUrlInput, ShortUrlDisplay],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  readonly shortUrl = signal<string>(ShortUrlDefault);

  handleShortUrlUpdate(shortUrl: string): void {
    console.log('Short URL updated:', shortUrl);
    this.shortUrl.set(shortUrl);
  }
}