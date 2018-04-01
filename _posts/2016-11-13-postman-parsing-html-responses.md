---
layout: post
title:  "Postman - Parsing HTML responses"
date:   2016-11-13 15:44:00 +0100
permalink: postman-parsing-html-responses
tags: automation postman API-testing
image: /img/test.jpg
---

<a href="https://www.getpostman.com/"><img src="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2016/10/postman.png" alt="Postman logo" width="320" height="132" class="alignright size-full wp-image-335" alt="Postman - Parsing HTML response" /></a>

I recently did a blog post on [sharing and comparing values in XML and JSON payloads](http://www.mwtestconsultancy.co.uk/postman-sharing-payloads/) after getting some questions around the topic.  Another common question I get in my training sessions that are similar to parsing payloads is around parsing HTML so that you can store values or assert on them for checking purposes, so again I thought I would share my solution on how you can parse an HTML response.

## The problem

Let's say we have a web page like the one below that we are running checks against:

<a href="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2016/11/parsing-html-postman-example.png"><img src="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2016/11/parsing-html-postman-example-1024x458.png" alt="Parsing HTML response - a screenshot of w3schools list page" width="768" height="344" class="aligncenter size-large wp-image-345" /></a>

What if we wanted to check, say for example, that the correct text was added to the first and second items of the ordered list?  When HTML is retrieved by [Postman](https://www.getpostman.com/) it's stored as a string in a variable named ```responseBody``` meaning we could do a string comparison asserting that the sub-string 'First item' and 'Second item' exist in ```responseBody```.  However, this is a very simplistic way of asserting with little flexibility.  What if there was more than one 'First item' or 'Second item' on the page, what if you wanted to get the values from those items to use in a future request?

## Parsing HTML payloads

Firstly, click [here to download the Postman collection](https://app.getpostman.com/run-collection/c00dd05c5cfd6f192b24) to access the requests and tests.  You will find a single request that requests the page then runs a couple of checks.  So let's take a look at the code in the Test tab:

__1. Native JavaScript solution__

```GET www.w3schools.com/html/html_lists.asp```
```
var responseHTML = document.createElement("html");
responseHTML.innerHTML = responseBody;

inputs = responseHTML.querySelector(".w3col > ol > li:nth-child(1)");

tests["First item in list is named 'First item'"] = inputs.innerHTML === "First item";
```
Let's review this test code:
1. Since [Postman](https://www.getpostman.com/) uses JavaScript we can build [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) (Document object model) on the fly by calling [```document.createElement("html")```](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and then adding the ```responseBody``` into the DOM to fill it with the HTML under tests
2. We can use the method [```querySelector``` ](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to execute a [CSS locator](http://www.w3schools.com/cssref/css_selectors.asp) search for the first list item we want to assert against

__2. JQuery solution__

The first solution uses native JavaScript functions but you Postman also supports [jQuery](http://jquery.com) and you can use it to achieve the same outcome as the native JavaScript approach.

```GET www.w3schools.com/html/html_lists.asp```
```
var html = $.parseHTML(responseBody); 
var jqResponseHTML = $(html);
result = jqResponseHTML.find('.w3col > ol > li:nth-child(2)');

tests["First item in list is named 'Second item'"] = result[0].innerHTML == "Second item";
```
Let's review this test code:
1. We use [```parseHTML()```](https://api.jquery.com/jquery.parsehtml/) to convert the ```responseBody``` string into a [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) and then call ```$(html)``` to allow us to access [jQuery](http://jquery.com) functions
2. The [jQuery](http://jquery.com) function [```find()```](https://api.jquery.com/find/) allows us to do a [CSS locator](http://www.w3schools.com/cssref/css_selectors.asp) search for the second list item we want to assert against

## Conclusion

The above examples show that parsing HTML by using either approach results in a quick and easy way to create a searchable DOM based on your requested HTML with all the standard JavaScript and/or [jQuery](http://jquery.com) methods you need to assert and store information from your original request. 

### References

1. W3Schools - [http://www.w3schools.com](http://www.w3schools.com)
2. JavaScript API - [https://developer.mozilla.org](https://developer.mozilla.org)
3. jQuery API - [https://api.jquery.com](https://api.jquery.com)