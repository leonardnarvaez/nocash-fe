import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeBase64 (base64Str: string): string {
    const buff = Buffer.from(base64Str, 'base64');
    // return buff.toString('ascii');
    return atob(base64Str);
  };

  extractPayload (jwt: string): any  {
    const tokens = jwt.split('.');
    if (tokens.length !== 3) return false;
    const [jwtHeader, jwtPayload, jwtSignature] = tokens;
    const encodedPayload = this.decodeBase64(jwtPayload);
    return JSON.parse(encodedPayload);
  };

  isExpired (jwt: string): boolean {
    const tokens = jwt.split('.');
    if (tokens.length !== 3) return true;
    const [jwtHeader, jwtPayload, jwtSignature] = tokens;
    const payload = this.extractPayload(jwt);
    const expireDateUnixTimestamp: number = payload['exp'] as number;
    console.log(expireDateUnixTimestamp);
  
    const expireDate: Date = new Date(expireDateUnixTimestamp*1000);
    const now: Date = new Date();
    console.log(jwtPayload);
    
    console.log(`current: ${now}`);
    console.log(`expireTime: ${expireDate}`);
  
    return now > expireDate
  };
}
