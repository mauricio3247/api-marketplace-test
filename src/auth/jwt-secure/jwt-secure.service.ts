import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { PayloadAuthInterface } from '../payload-auth.interface';

@Injectable()
export class JwtSecureService {
    constructor (
        private readonly jwtService: JwtService,
    ) {}

    async encode(id:string, email:string, rol:string):Promise<string> {
        try {
            const payload:PayloadAuthInterface= {
                id,
                email,
                rol
            }
            return this.jwtService.signAsync(payload)
        } catch (error) {
            throw error
        }
    }

    async decode (token:string): Promise<PayloadAuthInterface> {
        try {
            const decode: PayloadAuthInterface = await this.jwtService.verifyAsync(token)
            return decode
        } catch (error) {
            throw error
        }
    }
}
