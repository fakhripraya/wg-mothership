import Dexie from 'dexie';
import { 
    DEVELOPMENT,
    ADD_CATALOGUE_FORM
} from '../../variables/global';

const db = new Dexie(DEVELOPMENT);
db.version(1).stores({
  [ADD_CATALOGUE_FORM]: '++id, name, type, category, files', 
});

export default db;