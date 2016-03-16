import { assert } from 'chai';
import Promise from 'bluebird';
import IonicPush from '../src/main';

describe('IonicPush', () => {
  const jwt = 'jwt';
  const profile = 'profile';
  const ionic = new IonicPush(jwt, profile);

  it('should have set this.jwt', () => {
    assert.equal(ionic.jwt, jwt);
  });

  it('should have set this.profile', () => {
    assert.equal(ionic.profile, profile);
  });

  describe('#testToken', () => {
    it('should be a function', () => {
      assert.isFunction(ionic.testToken);
    });

    it('should return a promise', () => {
      const promise = ionic.testToken();
      assert.ok(promise instanceof Promise);
    });
  });

  describe('#push', () => {
    it('should be a function', () => {
      assert.isFunction(ionic.push);
    });

    it('should return a promise', () => {
      const promise = ionic.push();
      assert.ok(promise instanceof Promise);
    });
  });

  describe('#checkStatus', () => {
    it('should be a function', () => {
      assert.isFunction(ionic.checkStatus);
    });

    it('should return a promise', () => {
      const promise = ionic.checkStatus();
      assert.ok(promise instanceof Promise);
    });
  });
});
