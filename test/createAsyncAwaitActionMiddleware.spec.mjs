import { expect } from 'chai';

import createAsyncAwaitActionMiddleware from '../src/createAsyncAwaitActionMiddleware';

describe('createAsyncAwaitActionMiddleware', () => {
  let middleware;

  beforeEach(() => {
    middleware = createAsyncAwaitActionMiddleware();
  });

  it('Passed through non-promise and non-cancel actions', () => {
    const store = {};
    const next = action => action;
    const action = { type: 'DO' };

    const result = middleware(store)(next)(action);
    expect(result).to.equal(action);
  });

  it('', () => {

  });

  it('', () => {

  });
});
