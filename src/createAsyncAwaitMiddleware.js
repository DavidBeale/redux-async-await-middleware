import isPromise from 'is-promise';

import relayActions from './relayActions';

export default function createAsyncAwaitMiddleware() {
    return () => () => next => action => {
        if (isPromise(action)) {
            return action
                .then(actions => replayActions(next, actions))
                .catch(actions => replayActions(next, actions)));
        }

        return next(action);
    };
}
