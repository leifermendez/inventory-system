import { FirstValuePipe } from './first-value.pipe';

describe('FirstValuePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstValuePipe();
    expect(pipe).toBeTruthy();
  });
});
