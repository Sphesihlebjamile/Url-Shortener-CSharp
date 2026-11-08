import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Service, inject } from '@angular/core';

export interface ShortenUrlResponse {
  shortUrl: string;
  serverTime: number;
}

export interface LongUrlResponse {
  longUrl: string;
  serverTime: number;
}

@Service()
export class UrlShortenerApi {
  private readonly http = inject(HttpClient);
  private readonly shortenUrlApiUrl = 'https://localhost:7017/api/v1/data/shorten';
  private readonly getLongUrlByShortUrlCodeApiUrl = 'https://localhost:7017/api/v1/data/long';

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

  getLongUrlByShortUrlCode(
    shortUrlCode: string,
    onSuccess: (response: LongUrlResponse) => void,
    onError: (error: HttpErrorResponse) => void
  ): void {
    const url = `${this.getLongUrlByShortUrlCodeApiUrl}/${encodeURIComponent(shortUrlCode)}`;
    this.http.get<LongUrlResponse>(url).subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
