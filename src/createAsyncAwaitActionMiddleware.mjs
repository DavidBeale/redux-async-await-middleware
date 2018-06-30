import isPromise from 'is-promise';
import isObject from 'isobject';

import handler from './handler';
import defaultCancelAction from './defaultCancelAction';

const defaultOptions = {
  cancelAction: defaultCancelAction
};


export function createAsyncAwaitMiddleware(options = defaultOptions) { // eslint-disable-line import/prefer-default-export,max-len
  const toCancel = new Set();
  const { cancelAction } = options;

  return store => next => (action) => {
    const { dispatch } = store;

    if (isObject(action) && cancelAction(action)) {
      toCancel.add(cancelAction(action));
      return null;
    }

    if (isPromise(action)) {
      return action
        .then(actions => handler(actions, dispatch, toCancel));
    }

    return next(action);
  };
}
