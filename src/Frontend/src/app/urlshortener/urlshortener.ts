import { Component, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { copyToClipboard } from './urlshortener.functions';

const ShortUrlDefault: string = '...';
const ShortenUrlApiUrl: string = 'http://localhost:5164/api/v1/data/shorten';

interface ShortenUrlResponse {
  shortUrl: string;
  serverTime: number;
}

@Component({
  imports: [FormsModule],
  selector: 'app-urlshortener',
  styleUrl: './urlshortener.css',
  templateUrl: './urlshortener.html',
})
export class Urlshortener {
  private readonly http = inject(HttpClient);

  longUrl: string = '';
  readonly longUrlErrors = signal<string[]>([]);
  readonly shortUrl = signal<string>(ShortUrlDefault);
  readonly isGenerating = signal(false);

  handleSubmit = (): void => {
    const validationResult = this.validateLongUrl();

    if (!validationResult) {
      this.shortUrl.set(ShortUrlDefault);
      return;
    }

    this.clearLongUrlErrors();
    this.isGenerating.set(true);

    this.http.post<ShortenUrlResponse>(ShortenUrlApiUrl, { longUrl: this.longUrl }).subscribe({
      next: (response) => {
        this.shortUrl.set(response.shortUrl);
        this.isGenerating.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.shortUrl.set(ShortUrlDefault);
        this.isGenerating.set(false);
        this.longUrlErrors.set([this.getApiErrorMessage(error)]);
      }
    });
  }

  private getApiErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to the local API.';
    }

    return error.error?.title ?? error.message ?? 'Failed to generate the short URL.';
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

  copyToClipboard = async (): Promise<void> => {
    var response = await copyToClipboard(this.shortUrl())
    if(!response){
      alert("Failed to copy to clipboard");
    }
  }

  clearLongUrlErrors = (): void => {
    this.longUrlErrors.set([]);
  }
}