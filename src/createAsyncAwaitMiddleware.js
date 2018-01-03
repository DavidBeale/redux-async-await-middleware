import isPromise from 'is-promise';
import isObject from 'isobject';

import relayActions from './relayActions';
import isCancelled from './isCancelled';

export default function createAsyncAwaitMiddleware() {
    const toCancel = new Set();

    return (store) => next => (action) => {
        const dispatch = store.dispatch;

        if (isObject(action) && action.type) {
            if (action.type.substr(0, 7) === 'CANCEL_') {
                toCancel.add(action.type.substr(7));
                return null;
            }

            return next(action);
        }

        if (isPromise(action)) {
            return action
                .then(actions => handler(actions, dispatch, toCancel))
                .catch(actions => handler(actions, dispatch, toCancel));
        }

        return next(action);
    };
}
