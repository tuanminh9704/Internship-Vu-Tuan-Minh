import { characters } from "app/constants/characters";
export const generateCoupon = (size: number) => {
  let result = 'COUPON';

  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
