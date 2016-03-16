import Promise from 'bluebird';
import request from 'superagent';

export default class IonicPush {
  constructor(jwt, profile) {
    this.jwt = jwt;
    this.profile = profile;
  }

  testToken() {
    return new Promise((resolve, reject) => {
      request.get('https://api.ionic.io/auth/test')
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
      request.post('https://api.ionic.io/push/notifications')
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
      request.get(`https://api.ionic.io/push/notifications/${id}/messages`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .end((err, res) => {
          if (err) return reject(err.response.body);
          return resolve(res.body);
        });
    });
  }
}
