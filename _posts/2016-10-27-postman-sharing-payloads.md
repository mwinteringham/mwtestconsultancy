---
layout: post
title:  "Postman - Parsing HTML responses"
date:   2016-10-27 14:29:00 +0100
permalink: postman-sharing-payloads
tags: automation postman API-testing
image: /img/test.jpg
---

<a href="https://www.getpostman.com/"><img src="/img/2016/10/postman.png" alt="Postman logo" width="320" height="132" class="alignright size-full wp-image-335" /></a>

As part of my workshops, I offer support afterwards to help answer questions attendees have once they are back at work and applying what they've learnt in the real world.  I was asked a question recently about Postman around sharing and comparing payloads across requests.  It's a question that has popped up a few times, so I thought I would share my solutions towards how you can get Postman to store payloads and then retrieve them to use as a comparator in later requests.

## The problem
For this example, I will be using [restful-booker](https://github.com/mwinteringham/restful-booker) which you can clone down and run yourself by following [these instructions](https://github.com/mwinteringham/restful-booker/blob/master/README.md). 

As part of my testing of [restful-booker](https://github.com/mwinteringham/restful-booker) I have two endpoints that send me back the following responses:

```POST /booking```
```
{
  "bookingid": 12,
  "booking": {
    "firstname": "Sally",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2013-02-23",
      "checkout": "2014-10-23"
    },
    "additionalneeds": "Breakfast"
  }
}
```

```GET /booking/12```
```
{
  "firstname": "Sally",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2013-02-23",
    "checkout": "2014-10-23"
  },
  "additionalneeds": "Breakfast"
}
```

So I need to work out how I can compare the booking object that exists in the ```POST /booking``` response body to the booking object in the ```GET /booking/{id}``` and since [restful-booker](https://github.com/mwinteringham/restful-booker) supports both XML and JSON how I can compare both formats.

## Comparing XML Payloads

Firstly, click [here to download the Postman collection](https://app.getpostman.com/run-collection/59b533b915c9c72ba26d) to access the requests and tests.  You will find that there are two requests, the first is creating a booking and the second is retrieving a booking.  So let's take a look at the code in the Test tab:

__1. Create XML booking__
```
var parsedResponse = xml2Json(responseBody);
postman.setGlobalVariable("created_id", parsedResponse['created-booking'].bookingid);

postman.setGlobalVariable("original_response", responseBody);
```

Let's review this test code:
1. Responsebody is a special variable in Postman that stores the response body __as a string__ meaning if we want to do something programmatic with the response body we need to parse it
2. ```xml2Json``` allows to easily convert an XML object into a object meaning we can call ```parsedResponse['created-booking'].bookingid``` to get the id we need for the next request
3. ```setGlobalVariable``` allows us to store values __as strings__ this means if we want to store a payload we have to store it as a string.  Attempting to store an object as a global variable will result in the string ```[object Object]``` being stored.

__2. Get booking and assert__
```
var currentResponse = xml2Json(responseBody);
var previousResponse = xml2Json(globals.original_response);

var flattenCurrentResponse = JSON.stringify(currentResponse.booking);
var flattenPreviousResponse = JSON.stringify(previousResponse['created-booking'].booking);

tests["Assert responses match"] = flattenCurrentResponse === flattenPreviousResponse;
```
Let's review this test code:

1. We can get our stored environment variable by calling ```globals.orginal_response``` to get the response as a string
2. We have to use ```JSON.stringify``` to convert our objects back to strings as comparing objects in JavaScript is a tricky thing to do

## Sharing JSON Payloads

Firstly, click [here to download the Postman collection](https://app.getpostman.com/run-collection/9d41fa57b3c1da1595ff) to access the requests and tests.  You will find that there are two requests, the first is creating a booking and the second is retrieving a booking.  So let's take a look at the code in the Test tab:

__1. Create XML booking__

```
var parsedResponse = JSON.parse(responseBody);
postman.setGlobalVariable("created_id", parsedResponse.bookingid);

postman.setGlobalVariable("original_response", responseBody);
```

Let's review this test code:
1. We use ```JSON.parse``` to parse the body as ```responseBody``` is stored __as a string__

__2. Get booking and assert__

```
var currentResponse = JSON.parse(responseBody);
var previousResponse = JSON.parse(globals.original_response);

var flattenCurrentResponse = JSON.stringify(currentResponse);
var flattenPreviousResponse = JSON.stringify(previousResponse.booking);

tests["Assert responses match"] = flattenCurrentResponse === flattenPreviousResponse;
```

## Conclusion

So there you have two demonstrations of storing bodies across requests.  The actual code required is quite simple but does require a few workarounds especially around the storing and retrieval of stored variables.

### References

1. Environmental variables - https://www.getpostman.com/docs/environments 
2. Reading environmental variables in the Test panel -http://stackoverflow.com/questions/21418529/how-do-i-read-environment-variables-in-postman-tests
3. Comparing Javascript Objects - http://stackoverflow.com/questions/1068834/object-comparison-in-javascript