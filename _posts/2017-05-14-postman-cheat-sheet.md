---
layout: post
title:  "Postman cheat sheet - Quick guide to automating APIs"
date:   2017-05-14 16:56:00 +0100
permalink: postman-cheat-sheet
tags: API-testing postman
image: /img/test.jpg
---

Postman cheat sheet is something I have wanted to put together for a while as a response to helping attendees of my [Testing API and Web services training](http://www.mwtestconsultancy.co.uk/testing-web-services-training/). The cheat contains a high-level collection of the features available in Postman to help you to automate APIs and Web services. Unless stated otherwise the methods below are used in the __Tests tab__ and some can be found on the right-hand section of the Tests tab labelled __snippets__.

I've organised the Postman cheat sheet based on problems users of Postman are trying to solve based on observations from previous training sessions and questions from [Postman slack community](https://postmancommunity.slack.com/). However, if there is something else you want to see added to the Postman cheat sheet, get in touch with me via Twitter [@2bittester](https://twitter.com/2bittester).

For more detailed information on each feature, check out [https://www.getpostman.com/docs](https://www.getpostman.com/docs).

## Using variables

__Note:__ Variables are shared as strings across Postman. This means you need to ensure that whatever you want to store has to be converted to a string before storing. Failing to convert can result in behaviour such as stored parsed response bodies return as ```[Object object]``` instead of the original body. You can learn more about sharing response bodies [here](http://www.mwtestconsultancy.co.uk/postman-sharing-payloads/).

### Setting

__Global__
```
postman.setGlobalVariable("myVariable", "localhost");
```
Overrides variables of lower scope with the same name

__Environmental__
```
postman.setEnvironmentVariable("myVariable", "localhost");
```
Can be overridden by a global variable of the same name

### Reading variables in request builder

```
{{myVariable}}
```

For example with the variable "myVariable" set to "localhost", using ```http://{{myVariable}}:8080/ping``` will create a string of ```http://localhost:8080```

### Reading variables in test tab

__Global__
```
var variableToUse = getGlobalVariable("myVariable");
```
Assigns stored variable "myVariable" to the variableToUse for future use.

__Environmental__
```
var variableToUse = getEnvironmentVariable("myVariable");
```
Assigns stored variable "myVariable" to the variableToUse for future use.

### Clearing

```
postman.clearEnvironmentVariable("myVariable");
```

Reference: [https://www.getpostman.com/docs/postman/environments_and_globals/variables](https://www.getpostman.com/docs/postman/environments_and_globals/variables)

# Status codes

__Assert status code matches expected status code__

```
tests["Status code is 200"] = responseCode.code === 200;
```

__Assert status code name__

```
tests["Status code name has string"] = responseCode.name.has("Created");
```

# Headers

__Assert header is present__

```
tests["Content-Type is present"] = postman.getResponseHeader("Content-Type");
```

__Assert header value__

```
var header = postman.getResponseHeader("Content-Type");

tests["Header contains value"] = header === "text/html";
```

# Reponse Bodies

__Assert JSON object contains a value__
```
var jsonData = JSON.parse(responseBody);
tests["Assert JSON data"] = jsonData.value === 100;
```
__Assert XML object contains a value__
```
var jsonData = xml2Json(responseBody);
tests["Assert XML data"] = jsonData.value === 100;
```
__Assert HTML page contains a value__
```
var responseHTML = document.createElement("html");
responseHTML.innerHTML = responseBody;

inputs = responseHTML.querySelector(".w3col > ol > li:nth-child(1)");

tests["First item in list is named 'First item'"] = inputs.innerHTML === "First item";
```
Taken from [Parsing HTML responses](http://www.mwtestconsultancy.co.uk/postman-parsing-html-responses/). This uses CSS Selectors to extract required content. You can discover more on css selectors at [w3schools](https://www.w3schools.com/cssref/css_selectors.asp).

__Assert x-www-form-urlencoded string contains a value__
```
var queryString = {};
responseBody.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) { queryString[$1] = $3; }
);

tests["Assert urlencode payload"] = queryString["name_of_key"] === "value";
```
Regex extractor based on code from [Steven Benner's blog post](http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/).

# Custom logging
```
console.log('Event I am interested in');
```

# Conditional workflows

__Set next request to run__
```
postman.setNextRequest(“Request Name”);
```

__Exit current run__
```
postman.setNextRequest(“null”);
```

Based on information from the following [Postman blog post](http://blog.getpostman.com/2016/03/23/conditional-workflows-in-postman/)