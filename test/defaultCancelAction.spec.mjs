import { expect } from 'chai';

import defaultCancelAction from '../src/defaultCancelAction';

describe('defaultCancelAction', () => {
  it('rejects non-object actions', () => {
    expect(defaultCancelAction([])).to.equal(false);

    expect(defaultCancelAction({
      noType: ''
    })).to.equal(false);
  });

  it('rejects non-cancel actions', () => {
    expect(defaultCancelAction({
      type: 'MY_TYPE'
    })).to.equal(false);

    expect(defaultCancelAction({
      type: 'namespace/MY_TYPE'
    })).to.equal(false);

    expect(defaultCancelAction({
      type: 'name/space/MY_TYPE'
    })).to.equal(false);
  });

  it('matches basic cancel types', () => {
    expect(defaultCancelAction({
      type: 'CANCEL_MY_TYPE'
    })).to.equal('MY_TYPE');
  });

  it('matches namespaced cancel types', () => {
    expect(defaultCancelAction({
      type: 'namespace/CANCEL_MY_TYPE'
    })).to.equal('namespace/MY_TYPE');

    expect(defaultCancelAction({
      type: 'name/space/CANCEL_MY_TYPE'
    })).to.equal('name/space/MY_TYPE');
  });
});
