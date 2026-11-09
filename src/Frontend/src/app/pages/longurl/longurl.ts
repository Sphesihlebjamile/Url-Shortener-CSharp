import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlShortenerApi } from '../../core/services/urlshortener.api';

@Component({
  selector: 'app-longurl',
  template: '',
})
export class Longurl implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly urlShortenerApi = inject(UrlShortenerApi);

  ngOnInit(): void {
    const shortUrlCode = this.route.snapshot.paramMap.get('shortUrlCode');

    if (!shortUrlCode) {
      void this.router.navigate(['/404']);
      return;
    }

    this.urlShortenerApi.getLongUrlByShortUrlCode(
      shortUrlCode,
      (response) => {
        try {
          const longUrl = new URL(response.longUrl);
          if (longUrl.protocol !== 'http:' && longUrl.protocol !== 'https:') {
            void this.router.navigate(['/']);
            return;
          }

          window.location.replace(longUrl.toString());
        } catch {
          void this.router.navigate(['/']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          void this.router.navigate(['/404']);
          return;
        }

        void this.router.navigate(['/']);
      },
    );
  }
}
