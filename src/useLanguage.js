import {useSyncExternalStore} from 'react';
import {subscribeLanguage,getLanguage} from './i18n.js';
export const useLanguage=()=>useSyncExternalStore(subscribeLanguage,getLanguage,getLanguage);
