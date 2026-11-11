import { Component, Input, input } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [QRCodeComponent, FormsModule],
  selector: 'app-qr-code',
  templateUrl: './qr-code.html',
})
export class QrCode {
  @Input({ required: true }) qrUrl: string = '';
}
