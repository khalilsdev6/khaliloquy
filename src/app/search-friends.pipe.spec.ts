import { SearchFriendsPipe } from './search-friends.pipe';
import { Friend } from './shared/friend';

describe('SearchFriendsPipe', () => {
  let friends: Friend[];
  const pipe = new SearchFriendsPipe();
  beforeAll(() => {
    friends = [
      new Friend('stemmllerjs', [], 'https://google.com', false),
      new Friend('joshhomme', [], 'https://google.com', false),
      new Friend('hellokitty', [], 'https://google.com', false),
      new Friend('slight', [], 'https://google.com', false),
      new Friend('hmz.js', [], 'https://google.com', false)
    ];
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('can filter and return a user by their username', () => {
    const filtered = pipe.transform(friends, 'stemml');
    expect(filtered.length).toBe(1);
  });
  it('should return none if it doesnt match any names', () => {
    const filtered = pipe.transform(friends, 'fsddgrdgdrgdhfggh');
    expect(filtered.length).toBe(0);
  });
  it('should be able to locate substrings of matching text', () => {
    const filtered = pipe.transform(friends, 'll');
    expect(filtered.length).toBe(2);
  });
});
