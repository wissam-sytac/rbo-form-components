import stripNonNumericChars from './stripNonNumericChars';

describe('stripNonNumericChars', () => {
  it('should ignore empty strings', async () => {
    expect(stripNonNumericChars('')).toEqual('');
  });

  it('should skip digits', async () => {
    expect(stripNonNumericChars('323')).toEqual('323');
  });

  it('should strip non-numeric chars', async () => {
    expect(stripNonNumericChars('a32>>3')).toEqual('323');
    expect(stripNonNumericChars('a 5.2!')).toEqual('52');
  });
});
