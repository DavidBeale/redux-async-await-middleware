# redux-async-await-middleware [![Build Status](https://travis-ci.org/bealearts/redux-async-await-middleware.png?branch=master)](https://travis-ci.org/bealearts/redux-async-await-middleware) [![npm version](https://badge.fury.io/js/redux-async-await-middleware.svg)](http://badge.fury.io/js/redux-async-await-middleware) [![Dependency Status](https://david-dm.org/bealearts/redux-async-await-middleware.png)](https://david-dm.org/bealearts/redux-async-await-middleware)

Redux middleware to enable async/await action creators

# Motivation

Use async/await to make Redux as elegant to use with async flows as it is with synchronous, without the learning/complexity overhead of redux-saga or redux-observable etc.


# Usage

## Include the middleware
```js

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
```


# Install
```shell
npm i redux-async-await-middleware
```


# Test
```shell
npm i
npm test
```
