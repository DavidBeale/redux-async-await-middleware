import { expect } from 'chai';

import createAsyncAwaitMiddleware from '../src/createAsyncAwaitMiddleware';

describe('createAsyncAwaitMiddleware', () => {
    let middleware;

    beforeEach(() => {
        middleware = createAsyncAwaitMiddleware();
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
