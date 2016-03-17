import { assert } from 'chai';
import Promise from 'bluebird';
import express from 'express';
import removeRoute from 'express-remove-route';
import bodyParser from 'body-parser';
import IonicPush from '../src/main';

describe('IonicPush', () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(3000);
  const baseApiLocal = 'http://localhost:3000';
  const jwt = 'jwt';
  const profile = 'profile';
  const ionic = new IonicPush(jwt, profile);
  const ionicTest = new IonicPush(jwt, profile, {
    baseApi: baseApiLocal,
  });

  it('should have set this.jwt', () => {
    assert.equal(ionic.jwt, jwt);
  });

  it('should have set this.profile', () => {
    assert.equal(ionic.profile, profile);
  });

  it('should have default this.baseApi', () => {
    assert.equal(ionic.baseApi, 'https://api.ionic.io');
  });

  it('should have overwrite this.baseApi for ionicTest', () => {
    assert.equal(ionicTest.baseApi, baseApiLocal);
  });

  describe('#testToken', () => {
    it('should be a function', () => {
      assert.isFunction(ionic.testToken);
    });

    it('should return a promise', () => {
      const promise = ionic.testToken();
      assert.ok(promise instanceof Promise);
    });

    it('should call /auth/test', (done) => {
      app.get('/auth/test', (req, res) => {
        res.json();
        removeRoute(app, '/auth/test');
        done();
      });
      ionicTest.testToken();
    });

    it('should set header Authorization with jwt', (done) => {
      app.get('/auth/test', (req, res) => {
        assert.equal(req.headers.authorization, 'Bearer jwt');
        res.json();
        removeRoute(app, '/auth/test');
        done();
      });
      ionicTest.testToken();
    });

    it('should reject when there is an error', (done) => {
      const error = { message: 'error' };
      app.get('/auth/test', (req, res) => {
        res.status(403).json(error);
        removeRoute(app, '/auth/test');
      });
      ionicTest.testToken().catch((err) => {
        assert.deepEqual(err, error);
        done();
      });
    });

    it('should resolve', (done) => {
      const response = { message: 'hey' };
      app.get('/auth/test', (req, res) => {
        res.json(response);
        removeRoute(app, '/auth/test');
      });
      ionicTest.testToken().then((res) => {
        assert.deepEqual(res, response);
        done();
      });
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

    it('should call /push/notifications', (done) => {
      app.post('/push/notifications', (req, res) => {
        res.json();
        removeRoute(app, '/push/notifications');
        done();
      });
      ionicTest.push();
    });

    it('should set header Authorization with jwt', (done) => {
      app.post('/push/notifications', (req, res) => {
        assert.equal(req.headers.authorization, 'Bearer jwt');
        res.json();
        removeRoute(app, '/push/notifications');
        done();
      });
      ionicTest.push();
    });

    it('should send profile', (done) => {
      app.post('/push/notifications', (req, res) => {
        assert.deepEqual(req.body, { profile: 'profile' });
        res.json();
        removeRoute(app, '/push/notifications');
        done();
      });
      ionicTest.push();
    });

    it('should send info', (done) => {
      const data = { tokens: ['your', 'device', 'tokens'] };
      app.post('/push/notifications', (req, res) => {
        assert.deepEqual(req.body, Object.assign(data, { profile: 'profile' }));
        res.json();
        removeRoute(app, '/push/notifications');
        done();
      });
      ionicTest.push(data);
    });

    it('should reject when there is an error', (done) => {
      const error = { message: 'error' };
      app.post('/push/notifications', (req, res) => {
        res.status(403).json(error);
        removeRoute(app, '/push/notifications');
      });
      ionicTest.push().catch((err) => {
        assert.deepEqual(err, error);
        done();
      });
    });

    it('should resolve', (done) => {
      const response = { message: 'hey' };
      app.post('/push/notifications', (req, res) => {
        res.json(response);
        removeRoute(app, '/push/notifications');
      });
      ionicTest.push().then((res) => {
        assert.deepEqual(res, response);
        done();
      });
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

    it('should call /push/notifications/uuid/messages', (done) => {
      app.get('/push/notifications/:uuid/messages', (req, res) => {
        res.json();
        removeRoute(app, '/push/notifications/:uuid/messages');
        done();
      });
      ionicTest.checkStatus('aa');
    });

    it('should set header Authorization with jwt', (done) => {
      app.get('/push/notifications/:uuid/messages', (req, res) => {
        assert.equal(req.headers.authorization, 'Bearer jwt');
        res.json();
        removeRoute(app, '/push/notifications/:uuid/messages');
        done();
      });
      ionicTest.checkStatus('aa');
    });

    it('should construct url', (done) => {
      const uuid = 'plop';
      app.get('/push/notifications/:uuid/messages', (req, res) => {
        assert.equal(req.params.uuid, uuid);
        res.json();
        removeRoute(app, '/push/notifications/:uuid/messages');
        done();
      });
      ionicTest.checkStatus(uuid);
    });

    it('should reject when there is an error', (done) => {
      const error = { message: 'error' };
      app.get('/push/notifications/:uuid/messages', (req, res) => {
        res.status(403).json(error);
        removeRoute(app, '/push/notifications/:uuid/messages');
      });
      ionicTest.checkStatus('aa').catch((err) => {
        assert.deepEqual(err, error);
        done();
      });
    });

    it('should resolve', (done) => {
      const response = { message: 'hey' };
      app.get('/push/notifications/:uuid/messages', (req, res) => {
        res.json(response);
        removeRoute(app, '/push/notifications/:uuid/messages');
      });
      ionicTest.checkStatus('aa').then((res) => {
        assert.deepEqual(res, response);
        done();
      });
    });
  });
});
