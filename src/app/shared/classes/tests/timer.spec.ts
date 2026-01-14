import { describe, expect, it } from 'vitest';

import { sleep } from './timer';

describe('MockIpc', () => {
  it('should wait', async () => {
    const targetError = 1;

    let timerTarget = 10;
    let date1 = new Date();
    await sleep(timerTarget);
    let date2 = new Date();
    let diff = date2.getTime() - date1.getTime();
    expect(diff).greaterThanOrEqual(timerTarget - targetError);

    timerTarget = 100;
    date1 = new Date();
    await sleep(timerTarget);
    date2 = new Date();
    diff = date2.getTime() - date1.getTime();
    expect(diff).greaterThanOrEqual(timerTarget - targetError);

    timerTarget = 150;
    date1 = new Date();
    await sleep(timerTarget);
    date2 = new Date();
    diff = date2.getTime() - date1.getTime();
    expect(diff).greaterThanOrEqual(timerTarget - targetError);
  });
});
