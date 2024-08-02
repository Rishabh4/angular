import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class SecurityService {

  private key = CryptoJS.enc.Base64.parse('VGhpc2lzYXRlc3RrZXlmbw==');

  encrypt(data: string): string {
    const ciphertext = CryptoJS.AES.encrypt(data, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
      });
    return ciphertext.toString();
  }

  decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
      });
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
