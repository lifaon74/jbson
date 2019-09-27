import { test } from './tests/tests';

window.onload = () => {
  test()
    .catch((error: any) => {
      console.error(error);
    });
};






