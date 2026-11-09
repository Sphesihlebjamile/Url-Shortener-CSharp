import { Component, Input, signal, WritableSignal } from '@angular/core';
import { copyToClipboard } from '../../core/utilities/clipboard.functions';

const ShortUrlDefault: string = '...';

@Component({
  imports: [],
  selector: 'app-short-url-display',
  templateUrl: './short-url-display.html',
})
export class ShortUrlDisplay {
  @Input({ required: true }) shortUrl: WritableSignal<string> = signal<string>(ShortUrlDefault);

  copyToClipboardHandler = async (): Promise<void> => {
    var response = await copyToClipboard(this.shortUrl())
    if(!response){
      alert("Failed to copy to clipboard");
    }
  }
}
