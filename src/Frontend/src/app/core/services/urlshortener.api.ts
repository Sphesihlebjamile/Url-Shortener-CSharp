import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Service, inject } from '@angular/core';

export interface ShortenUrlResponse {
  shortUrl: string;
  serverTime: number;
}

@Service()
export class UrlShortenerApi {
  private readonly http = inject(HttpClient);
  private readonly shortenUrlApiUrl = 'http://localhost:5164/api/v1/data/shorten';

  shortenUrl(
    longUrl: string,
    onSuccess: (response: ShortenUrlResponse) => void,
    onError: (error: HttpErrorResponse) => void,
  ): void {
    this.http.post<ShortenUrlResponse>(this.shortenUrlApiUrl, { longUrl }).subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
