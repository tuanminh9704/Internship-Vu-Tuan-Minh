import {stringToSlug} from '../lib/slugify.js';

const str = 'Xin chào bạn';
const newStr = stringToSlug(str);
console.log(newStr);