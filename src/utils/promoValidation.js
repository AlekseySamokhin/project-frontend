import map from 'lodash/map';

export default function promoValidation(promoCodes, code) {
  let temp = false;

  map(promoCodes, (item) => {
    if (code === item) {
      temp = true;
    }
  });

  return temp;
}
