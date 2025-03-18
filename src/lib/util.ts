import { ROW_LIMIT } from './constants';

export const getOffsetFromPage = (page: number) => {
  const offset = ROW_LIMIT * (page - 1);

  return offset < 0 ? 0 : offset;
};
