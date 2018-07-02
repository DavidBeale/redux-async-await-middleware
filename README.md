# redux-async-await-action-middleware [![Build Status](https://travis-ci.org/bealearts/redux-async-await-action-middleware.png?branch=master)](https://travis-ci.org/bealearts/redux-async-await-action-middleware) [![npm version](https://badge.fury.io/js/redux-async-await-action-middleware.svg)](http://badge.fury.io/js/redux-async-await-action-middleware) [![Dependency Status](https://david-dm.org/bealearts/redux-async-await-action-middleware.png)](https://david-dm.org/bealearts/redux-async-await-action-middleware)

> Redux middleware to enable async/await action creators

# Motivation

Use async/await to make Redux as elegant to use with async flows as it is with synchronous, without the learning/complexity overhead of redux-saga or redux-observable etc.

# Usage

## Include the middleware

```js
import { createStore } from 'redux';
import createAsyncAwaitActionMiddleware from 'redux-async-await-action-middleware';

const store = createStore([
  createAsyncAwaitActionMiddleware()  // Add before logger etc
]);
```

## Basic async action creator

```js
export async function loadData() {
  try {
    const response = await fetch('...');
    const data = await response.json();

    // Action can be any kind, not just FSA
    return {
      type: 'LOAD_DATA',
      payload: data
    }
  } catch (error) {
    return {
      type: 'LOAD_DATA',
      payload: error,
      isError: true
    }
  }
}

...

dispatch(loadData());
```

## A more complete async action creator

```js
import { createAction } from 'redux-actions';

const LOAD_DATA = 'LOAD_DATA';
const NO_DATA_AVAILABLE = 'NO_DATA_AVAILABLE';
const AUTH_FAILED = 'AUTH_FAILED';

const errorHandlers = {
  404: createAction(NO_DATA_AVAILABLE),
  403: createAction(AUTH_FAILED)
}

export async function loadData() {
  try {
    const response = await fetch('...');

    if (response.statusCode !== 200) {
      const handler = errorHandlers[response.statusCode];
      if (handler) {
        return handler();
      }

      throw new Error(`Unexpected Response: ${response.statusCode}:${response.status}`);
    }

    const data = await response.json();

    return createAction(LOAD_DATA)(data);
  } catch (error) {
    return createAction(LOAD_DATA)(error);
  }
}

...

dispatch(loadData());
```

## Use with an in-progress action

```js
import { createAction } from 'redux-actions';

import store from '../myStore';

const LOAD_DATA = 'LOAD_DATA';
const LOAD_DATA_IN_PROGRESS = 'LOAD_DATA_IN_PROGRESS';

const dispatch = store.dispatch;

export async function loadData() {
  try {
    dispatch(createAction(LOAD_DATA_IN_PROGRESS)());

    const response = await fetch('...');
    const data = await response.json();

    return createAction(LOAD_DATA)(data);
  } catch (error) {
    return createAction(LOAD_DATA)(error);
  }
}

...

dispatch(loadData());
```

## Cancel an async action

```js
import { createAction } from 'redux-actions';

const LOAD_DATA = 'LOAD_DATA';
const CANCEL_LOAD_DATA = 'CANCEL_LOAD_DATA';

export async function loadData() {
  try {
    const response = await fetch('...');
    const data = await response.json();

    return createAction(LOAD_DATA)(data);
  } catch (error) {
    return createAction(LOAD_DATA)(error);
  }
}

...

dispatch(loadData());

...

// The fetch will complete, but the success or failure actions will not be dispatched
dispatch(createAction(CANCEL_LOAD_DATA));
```


## Cancel an async action, with the [Abort API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

```js
import { createAction } from 'redux-actions';

const LOAD_DATA = 'LOAD_DATA';
const CANCEL_LOAD_DATA = 'CANCEL_LOAD_DATA';

var loadDataAbortController;

export async function loadData() {
  try {
    loadDataAbortController = new AbortController();
    const response = await fetch('...', {
      signal: loadDataAbortController.signal
    });
    const data = await response.json();

    return createAction(LOAD_DATA)(data);
  } catch (error) {
    return createAction(LOAD_DATA)(error);
  }
}

export function cancelLoadData() {
  loadDataAbortController.abort();
  return createAction(CANCEL_LOAD_DATA);
}

...

dispatch(loadData());

...

// The fetch will cancelled, and the failure actions will not be dispatched
dispatch(cancelLoadData());
```


## Multiple Dispatch

```js
import { createAction } from 'redux-actions';

const ACTION1 = 'ACTION1';
const ACTION2 = 'ACTION2';

export async function loadData() {
  try {
    const data1 = await ...
    const data2 = await ...

    return [
      createAction(ACTION1)(data1),
      createAction(ACTION2)(data2)
    ];
  } catch (error) {
    return [
      createAction(ACTION1)(error),
      createAction(ACTION2)(error)
    ];
  }
}

...

dispatch(loadData());
```

# Install

```shell
npm i redux-async-await-action-middleware
```

# Test

```shell
npm i
npm test
```
