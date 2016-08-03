[![npm version](https://badge.fury.io/js/ionic-push.svg)](https://badge.fury.io/js/ionic-push)
[![Build Status](https://travis-ci.org/pradel/ionic-push.svg?branch=master)](https://travis-ci.org/pradel/ionic-push)
[![Dependency Status](https://david-dm.org/pradel/ionic-push.svg)](https://david-dm.org/pradel/ionic-push)
[![devDependency Status](https://david-dm.org/pradel/ionic-push/dev-status.svg)](https://david-dm.org/pradel/ionic-push#info=devDependencies)

# ionic-push

A node client for pushing android and ios notifications to your ionic app.

## Install

`npm install --save ionic-push`

## Usage

```javascript
import IonicPush from 'ionic-push';

const ionic = new IonicPush(myJwt, myProfile);

ionic.push({
	"tokens": ["your", "device", "tokens"],
	"notification": {
    	"title": "Hi",
    	"message": "Hello world!",
    "android": {
    	"title": "Hey",
        "message": "Hello Android!"
    },
    "ios": {
        "title": "Howdy",
        "message": "Hello iOS!"
    }
  }
});
```

require

```javascript
var IonicPush = require('ionic-push').default;

var ionic = new IonicPush(myJwt, myProfile);
```

## Api

### new IonicPush

Create a new IonicPush instance.

#### Arguments

* `jwt` **string** _required_ [A valid ionic jwt](http://docs.ionic.io/v2.0.0-beta/docs/api-getting-started
)

* `profile` **string** _required_ [A valid ionic profile](http://docs.ionic.io/v2.0.0-beta/docs/security-profiles)

##### Returns

An IonicPush instance.

##### Example

```javascript
import IonicPush from 'ionic-push';

const ionic = new IonicPush(myJwt, myProfile);
```

### testToken

Test if your token is valid.

##### Returns

A Promise.

#### Example

```javascript
ionic.testToken().then(function() {
	console.log('my token is ok');
}).catch(function(err) {
	console.log('there is an error', err);
});
```

### push

Push a new notification.

#### Arguments

* `options` **object** _required_ [A valid ionic push object](http://docs.ionic.io/v2.0.0-beta/docs/push-sending-push#section-basic-api-usage)

##### Returns

A Promise.

#### Example

```javascript
ionic.push({
	"tokens": ["your", "device", "tokens"],
	"notification": {
    	"title": "Hi",
    	"message": "Hello world!",
    "android": {
    	"title": "Hey",
        "message": "Hello Android!"
    },
    "ios": {
        "title": "Howdy",
        "message": "Hello iOS!"
    }
  }
}).then(function() {
	console.log('successfully sent push');
}).catch(function(err) {
	console.log('there is an error', err);
});
```

### checkStatus

Check the status of a notification.

#### Arguments

* `uuid` **object** _required_ [A valid ionic push uuid](http://docs.ionic.io/v2.0.0-beta/docs/push-sending-push#section-checking-the-status-of-a-push)

##### Returns

A Promise.

#### Example

```javascript
checkStatus(myuuid).then(function(data) {
	console.log(data);
}).catch(function(err) {
	console.log('there is an error', err);
});
```
