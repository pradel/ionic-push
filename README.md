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

## Api

### new IonicPush

Create a new IonicPush instance.

#### Arguments

* `jwt` **string** _required_ [A valid ionic jwt](http://docs.ionic.io/v2.0.0-beta/docs/api-getting-started
)

* `profile` **string** _required_ [A valid ionic profile](http://docs.ionic.io/v2.0.0-beta/docs/security-profiles)

##### Returns

An IonicPush instance.

### testToken

Test if your token is valid.

##### Returns

A Promise.

### push

Push a new notification.

#### Arguments

* `options` **object** _required_ [A valid ionic push object](http://docs.ionic.io/v2.0.0-beta/docs/push-sending-push#section-basic-api-usage)

##### Returns

A Promise.

### checkStatus

Check the status of a notification.

#### Arguments

* `uuid` **object** _required_ [A valid ionic push uuid](http://docs.ionic.io/v2.0.0-beta/docs/push-sending-push#section-checking-the-status-of-a-push)

##### Returns

A Promise.