import {compare} from 'bcrypt';

const helperHashCompare = {
    provide: 'HELPER_HASH_COMPARE',
    useValue: (text: string, textHashed: string): Promise<boolean> => {
        return compare(text, textHashed);
    }
}

export default helperHashCompare;