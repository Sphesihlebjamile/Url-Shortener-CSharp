import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlShortenerApi } from '../../core/services/urlshortener.api';
import { HttpErrorResponse } from '@angular/common/http';

const ShortUrlDefault: string = '...';

@Component({
  imports: [FormsModule],
  selector: 'app-long-url-input',
  templateUrl: './long-url-input.html',
})
export class LongUrlInput {
  private readonly urlShortenerApi = inject(UrlShortenerApi);

  private longUrl: string = '';
  readonly longUrlErrors = signal<string[]>([]);
  readonly isGenerating = signal(false);

  shortUrl = output<string>();

  handleSubmit = (): void => {
    const validationResult = this.validateLongUrl();

    if (!validationResult) {
      this.shortUrl.emit(ShortUrlDefault);
      return;
    }

    this.clearLongUrlErrors();
    this.isGenerating.set(true);

    this.urlShortenerApi.shortenUrl(
      this.longUrl,
      (response) => {
        this.shortUrl.emit(response.shortUrl);
        this.isGenerating.set(false);
      },
      (error: HttpErrorResponse) => {
        this.shortUrl.emit(ShortUrlDefault);
        this.isGenerating.set(false);
        this.longUrlErrors.set([this.getApiErrorMessage(error)]);
      },
    );
  }

  validateLongUrl = (): boolean => {
    let errors: string[] = [];
    if(!this.longUrl){
      errors = [...errors, "A long Url is required"]
    }
    if(this.longUrl.length < 10){
      errors = [...errors, "Long Url is too short"]
    }
    if(this.longUrl.length > 999){
      errors = [...errors, "Long Url is too long"]
    }
    this.longUrlErrors.set(errors);
    return errors.length === 0;
  }

  clearLongUrlErrors = (): void => {
    this.longUrlErrors.set([]);
  }

  private getApiErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to the local API.';
    }

    return error.error?.title ?? error.message ?? 'Failed to generate the short URL.';
  }
}
