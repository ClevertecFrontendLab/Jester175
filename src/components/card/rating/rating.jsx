import {v4} from 'uuid';

import { star, starWhite } from '../../../assets/images/main/card';


export const Rating = ({ length }) => {
  if (!length) return 'ещё нет оценок';

  const fullStarsLength = 5;

  const starRating = new Array(length)
    .fill(null)
    .map((_, i) => <img src={star} key={v4()} alt='оценка' />);

  const missingStarsLength = 5 - starRating.length;

  if (starRating.length !== fullStarsLength) {
    const missingStars = new Array(missingStarsLength)
      .fill(null)
      .map(() => <img src={starWhite} key={v4()} alt='нет оценки' />);

    return starRating.concat(missingStars);
  }

  return starRating;
};
