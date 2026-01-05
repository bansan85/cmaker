import { describe, expect, it } from 'vitest';

import { sleep } from './timer';

describe('MockIpc', () => {
  it('should wait', async () => {
    let date1 = new Date();
    await sleep(10);
    let date2 = new Date();
    let diff = date2.getTime() - date1.getTime();
    expect(diff).greaterThanOrEqual(10);

    date1 = new Date();
    await sleep(100);
    date2 = new Date();
    diff = date2.getTime() - date1.getTime();
    expect(diff).greaterThanOrEqual(100);

    date1 = new Date();
    await sleep(150);
    date2 = new Date();
    diff = date2.getTime() - date1.getTime();
    expect(diff).greaterThanOrEqual(150);
  });
});
