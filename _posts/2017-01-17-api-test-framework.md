---
layout: post
title:  "API test framework templates - A quick start repository"
date:   2017-01-17 17:53:00 +0100
permalink: /api-test-framework/index.html
tags: automation API-testing
image: /img/article/steelwork.jpg
---

I'm pretty busy at the moment preparing for awesome workshops for [CASTx with Abby Bangser](https://www.associationforsoftwaretesting.org/conference/castx17/) and TestBash Brighton with [Software testing clinic](dojo.ministryoftesting.com/events/testbash-brighton-2017).  So sadly it means another short post for now, but it's still one I think that's very exciting.  I want to share with you all a repository I've created that contains templates of framework written in different languages for you to use to create an API test framework.

<h4>Show me the money! Where's my API test framework?</h4>

So the repository can be found [here on GitHub](https://github.com/mwinteringham/api-framework).   At the time of writing, it has templates written in Java, Python, JavaScript and Ruby but more can be added.  It is open for sharing and pull requests so please contribute.  The idea is to create a repository that others can use to quickly setup an API checking framework with minimum fuss.

The frameworks all have the same structure that is based upon the tutorial series I wrote last year on [how to build an automated API test framework](http://www.mwtestconsultancy.co.uk/build-automated-api-test-framework/).  The key to these templates is to demonstrate a way of structuring your API test framework regardless of what tools or languages that are used and is loosely based upon the principles of Page object architecture used for WebDriver.  The idea being that the structure will increase readability, reduce maintenance and prevent brittle tests from appearing.  

The framework contains three areas:

<ul>
<li>Tests - Surprisingly where the tests themselves are stored.  The tests will call functions from the API and Payload areas of the framework and be responsible for asserting responses.</li>
<li>API - All of the HTTP requests that you want to make are stored here.  They are grouped based on the resource you are calling so if there are two resources called Booking and Auth then we create two classes named Booking and Auth.  Each function is tied to an individual request that can be called multiple times.  This means if the request changes it requires a single change to propagate through the framework.</li>
<li>Payloads - Payloads that are required for requests and responses are stored in this area.  The idea is similar to the API area in that one class is responsible for one payload that may be called multiple times.  Again, this means if the payload changes it requires a single change to propagate through the framework.</li>
</ul>

<h4>I want more!</h4>

If you would like more information on getting an API test framework setup then [check out my events page](http://www.mwtestconsultancy.co.uk/events/) to see where my next public workshop will be or my series on [building an API test framework on the Ministry of testing Dojo](https://dojo.ministryoftesting.com/series/let-s-build-an-api-checking-framework-mark-winteringham).