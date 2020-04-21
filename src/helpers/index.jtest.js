import { refreshObj, toTitleCase } from './index';

describe('testing my helpers...', () => {
  it('refreshObj() works as expected', () => {
    expect(refreshObj({
      cat: 'mamal'
    })).toEqual({ cat: 'mamal'});
  });

  it('toTitleCase() works as expected', () => {
    expect(toTitleCase('i like cats')).toEqual('I Like Cats');
  });
});
