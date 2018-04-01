---
layout: post
title:  "Unexpected Automation: Creating a randomised HTTP payload"
date:   2015-09-16 00:36:00 +0100
permalink: unexpected-automation-creating-a-randomised-http-payload
tags: node
image: /img/test.jpg
---

After a bit of a break for the summer holiday, and as promised in <a href='http://www.mwtestconsultancy.co.uk/unexpected-automation-quickly-creating-test-data-in-mongodb/' title='Quickly creating test data in MongoDB' />Quickly creating test data in MongoDB</a>, here is a look at how we can use the randomisation script script from <a href='http://www.mwtestconsultancy.co.uk/unexpected-automation-quickly-creating-test-data-in-mongodb/' title='Quickly creating test data in MongoDB' />Quickly creating test data in MongoDB</a> to create a randomised HTTP payload for POST requests.

However, before we begin, let's refresh ourselves with the randomisation script:

```javascript
var name = ["Mark","Mary","Sally","Jim","Eric","Susan"]
var surname = ["Jones","Wilson","Jackson","Brown","Smith","Ericsson"]

var randomiseNumber = function(from, to){
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

var randomiseDate = function(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

var latestDate = new Date()
var checkInDate = randomiseDate(new Date(2013, 1, 1),latestDate)

var booking = { 
  "firstname": name[randomiseNumber(0,name.length - 1)], 
  "lastname": surname[randomiseNumber(0,surname.length - 1)], 
  "totalprice": randomiseNumber(100,1000), 
  "depositpaid": Math.random() >= 0.5,
  "bookingdates": {
    "checkin": checkInDate,
    "checkout": randomiseDate(checkInDate,latestDate)
  }
}

if(Math.random() >= 0.5){
  booking.additionalneeds = "Breakfast";
}

console.log(booking);
```

<h2>Creating a randomised JSON payload</h2>

JSON is an extremely popular choice for payloads in HTTP requests and because of the earlier work on the script we can use it straight off the bat to create a JSON payload.  Simply take the output of the randomised data and use that in your POST request.

<h2>Creating a randomised XML payload</h2>

Another widely used content type for POST requests is XML.  But since the script only offers the ability to create data in JSON format we need to update it a bit to make it produce an XML payload.  One way would be to concatenate strings to build up an XML payload but that would be a lot of work ending in a very different (and probably messy looking) script and it may be desirable to have a script that can easily switch between JSON and XML creation.

Therefore, we are going to use the <a href='https://www.npmjs.com/package/js2xmlparser' title='js2xmlparser'>js2xmlparser</a> library to convert the JSON into XML like so:

* First download the library by running ```npm install js2xmlparser``` in the directory your script is saved.</li>
* Add to the top of the script ```var js2xmlparser = require("js2xmlparser");```</li>
* Replace ```console.log(booking)``` at the bottom of the script with ```console.log(js2xmlparser("booking", booking));```</li>

The js2xmlparser method takes two parameters:
<ol>
<li>The first parameter determines the parent tag that the randomised data is injected into.  Since we are creating a booking we name it "booking".  (This might be a little confusing since the second parameter is named booking so try changing the name and observing what happens)</li>
<li>The second parameter takes the JSON object we have created and converts it into XML format</li>
</ol>

Once you have it set up, give it a try.  You should end up with an output like this:

```
<?xml version="1.0" encoding="UTF-8"?>
<booking>
  <firstname>Eric</firstname>
  <lastname>Wilson</lastname>
  <totalprice>832</totalprice>
  <depositpaid>false</depositpaid>
    <bookingdates>
      <checkin>Fri Jun 28 2013 19:57:28 GMT+0100 (BST)</checkin>
      <checkout>Sat Aug 09 2014 00:31:00 GMT+0100 (BST)</checkout>
    </bookingdates>
</booking>
```

<h3>Wrapping up</h3>

With either of these solutions you can create a quick and easy script to produce a randomised payload that can then be dropped into your tool of choice.
