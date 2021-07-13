import {hash} from 'bcrypt';
const SALTS = 10;

const helperHash = {
    provide: 'HELPER_HASH',
    useValue: (text: string): Promise<string> => {
        return hash(text, SALTS);
    }
}

export default helperHash;