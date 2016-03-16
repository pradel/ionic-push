[![Build Status](https://travis-ci.org/pradel/ionic-push.svg?branch=master)](https://travis-ci.org/pradel/ionic-push)

# ionic-push

A node client for pushing android and ios notifications to your ionic app.

## Install

`npm install --save ionic-push`

## Usage

```
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

```
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

```
import IonicPush from 'ionic-push';

const ionic = new IonicPush(myJwt, myProfile);
```

### testToken

Test if your token is valid.

##### Returns

A Promise.

#### Example

```
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

```
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

```
checkStatus(myuuid).then(function(data) {
	console.log(data);
}).catch(function(err) {
	console.log('there is an error', err);
});
```