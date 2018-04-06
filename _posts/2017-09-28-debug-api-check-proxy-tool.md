---
layout: post
title:  "Debug API checks quickly with proxy tools"
date:   2017-09-28 20:26:00 +0100
permalink: debug-api-check-proxy-tools
tags: API-testing
image: /img/test.jpg
---

TL;DR You can debug API checks by pointing them at a proxy tool to view and compare captured HTTP requests to discover the issue

<h2>How to Debug API checks - The problem</h2>

Over the last couple of weeks, I have found myself having to debug API checks. During a mentoring session around building [automated API checking architectures](https://github.com/mwinteringham/api-framework) and when I was working on my own API checking architecture I found I was running into issues around misconfigured HTTP requests. The issues ranged from incorrectly structure payloads in POST requests to missing headers. I was struggling to debug the code using IntelliJ so I tried a different debugging technique that I've been using for a while now.

<h2>Burp suite to the rescue</h2>

I'm a big fan of [BurpSuite's](https://portswigger.net/burp). Although the free version has limited features, I find both the proxy feature (which saves both requests and response in the history) and the repeater feature (which allows me to resend captured requests) to be extremely useful when you need to debug API checks. If you're not familiar with BurpSuite I would encourage you to check out [my blog here](http://www.mwtestconsultancy.co.uk/proxies-setting-up-burpsuite-proxy) and have a play with it.

Sometimes when I am working with API checks there is something incorrect in my code that results in an HTTP request that gives me the wrong response. So here is how you can use BurpSuite to help debug the issue based on a recent experience I had:

<h3>Capturing the initial request</h3>

I started by using the BurpSuite proxy to capture the original HTTP request from the browser and sent it to the repeater feature. The captured request was a login request to Bugzilla which you can see below (with all the optional headers removed):

<a href="/img/2017/09/apidebug1.png"><img src="/img/2017/09/apidebug1.png" alt="API Debug screenshot 1" style="width: 100%" class="alignnone size-full wp-image-759" /></a>

Whenever I re-sent that request via the BurpSuite repeater I could see from the HTML in the response that I was logged in. But, whenever I attempted to do the same HTTP request within my API check I found that I was not logged in. What was wrong?

<h3>Capturing the API check request</h3>

The API check was written using [RestAssured](http://rest-assured.io) so I use the proxy method in RestAssured to point it BurpSuite:

```RestAssured.proxy("127.0.0.1", 8080);```

I could have also updated my network settings too but this did the job. With RestAssured now hooked into BurpSuite, I ran the API check again and captured the request in the proxy before sending it over to the Repeater:

<a href="/img/2017/09/apidebug2.png"><img src="/img/2017/09/apidebug2.png" alt="API Debug screenshot 2" style="width: 100%" class="alignnone size-full wp-image-760" /></a>

Once I had both HTTP requests within BurpSuite I could compare the two requests to see what was different. I could have used a [diff tool](https://www.diffchecker.com) but I quick glance showed me that I was missing an a specific header. Knowing that I was missing a header, I updated my code and re-ran the check. After the check ran the requests were now the same and I could now log into Bugzilla within my check.

<h2>Conclusion</h2>

Plain HTTP requests and response follow a strict set of guidelines. So, capturing HTTP request in BurpSuite can help you quickly determine what's wrong. I found the visual exercise of seeing both requests made it faster to debug and move onto the new API check. Finally, it's worth saying that BurpSuite is a personal preference. This approach would work with any proxy tool that saves HTTP requests and response for further analysis.