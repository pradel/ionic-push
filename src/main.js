import Promise from 'bluebird';
import request from 'superagent';

export default class IonicPush {
  constructor(jwt, profile, options = {}) {
    this.jwt = jwt;
    this.profile = profile;
    this.baseApi = options.baseApi || 'https://api.ionic.io';
  }

  testToken() {
    return new Promise((resolve, reject) => {
      request.get(`${this.baseApi}/auth/test`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .end((err, res) => {
          if (err) return reject(err.response.body);
          return resolve(res.body);
        });
    });
  }

  push(data) {
    return new Promise((resolve, reject) => {
      const params = Object.assign({
        profile: this.profile,
      }, data);
      request.post(`${this.baseApi}/push/notifications`)
        .send(params)
        .set('Authorization', `Bearer ${this.jwt}`)
        .end((err, res) => {
          if (err) return reject(err.response.body);
          return resolve(res.body);
        });
    });
  }

  checkStatus(id) {
    return new Promise((resolve, reject) => {
      request.get(`${this.baseApi}/push/notifications/${id}/messages`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .end((err, res) => {
          if (err) return reject(err.response.body);
          return resolve(res.body);
        });
    });
  }
}
