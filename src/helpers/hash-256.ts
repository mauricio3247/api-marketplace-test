import { InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto'

const helperHash256 = {
    provide: 'HELPER_HASH_256',
    useValue: (text: string): string => {
        try {
            const hash = crypto.createHash('sha256')
            return hash.update(text).digest('hex')
        } catch (error) {
            throw new InternalServerErrorException ('Internal Server Error')
        }
    }
}

export default helperHash256;