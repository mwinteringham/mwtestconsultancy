---
layout: post
title:  "Introducing the Selenium to Rest-assured adapter"
date:   2018-11-07 10:00:00 +0100
permalink: selenium-to-rest-assured-adapter
tags: selenium rest-assured api-testing automation
image: /img/article/multiplug.jpg
description: Learn about a new adapter that allows you to easily convert Cookies between Selenium and Rest-assured
---

Last year I gave a talk at the Selenium Conference in Berlin about using API calls to help speed up automated checks and make them more deterministic. The main point of the talk was that some of the actions we carry out in the UI, such as creating data or configuring an app to be in a certain state, can sometimes be carried out on the HTTP API level. The talk itself went down very well and I'm glad to hear that a lot of people have tried out the techniques that I presented in Berlin.

<iframe width="560" height="315" style="display:block;  margin: 0 auto;"  src="https://www.youtube.com/embed/ugAlCZBMOvM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br />

Which brings me to the adapter. At one part in the talk, I demonstrate how we can use HTTP tools like [Rest-assured](http://rest-assured.io/) to:
1. Make an initial HTTP call to log into our application
2. Take the Cookies from the response and store them in the browser using Selenium.
3. Refresh the UI to use the Cookies to log into the application.

This results in you being able to log in quickly and cleanly but it does require a bit of work to support converting the Cookies. Since the talk, I've had numerous requests for help around sharing Cookies between [Rest-assured](http://rest-assured.io/) and [Selenium](https://www.seleniumhq.org/). So I have created a small adapter to help people writing checks to quickly share Cookies between [Rest-assured](http://rest-assured.io/) and [Selenium](https://www.seleniumhq.org/).

## What does the adapter do?
The adapter is [a small Jar file](https://github.com/mwinteringham/selenium-to-restassured/releases) that you can add to your project that gives you two options. You can either convert Cookies from [Rest-assured](http://rest-assured.io/) to [Selenium](https://www.seleniumhq.org/):

```java
io.restassured.http.Cookie cookieToConvert = response.getDetailedCookie("COOKIE NAME")

CookieAdapter cookieAdapter = new CookieAdapter();
org.openqa.selenium.Cookie convertedCookie = cookieAdapter.convertToSelenium(cookieToConvert);
```

This can be handy when you have made an HTTP login request and you want to take the response Cookies and store them in the browser. Once you have the converted cookies you can add them to your browser like so:

```java
driver.manage().addCookie(convertedCookie);
driver.navigate().refresh(); // We refresh the page so it reads the newly added cookies
```

Alternatively, you can convert from [Selenium](https://www.seleniumhq.org/) to [Rest-assured](http://rest-assured.io/):

```java
org.openqa.selenium.Cookie cookieToConvert = driver.manage().getCookieNamed("COOKIE NAME");

CookieAdapter cookieAdapter = new CookieAdapter();
io.restassured.http.Cookie adaptedCookie = cookieAdapter.convertToRestAssured(seleniumCookie);
```

I find this particularly helpful if I am doing API testing with an application that has a complex login process. I can log into the application via the UI, grab the necessary logged in Cookies from the browser, close the browser down, and then use the Cookies in my HTTP requests like so:

```java
given()
  .cookie(convertedCookie) // I add in the converted cookie here
  .get("http://my-url");
```

## Where can I find it?

The adapter can be found on GitHub in the following repository: [https://github.com/mwinteringham/selenium-to-restassured](https://github.com/mwinteringham/selenium-to-restassured)

To install, simply head to the releases folder and pull down the latest JAR and add it to your project. Hopefully, there will be proper Maven support in the future.

## Feedback welcome

So there you have it! It's a small project but it's a work in progress. So if you are planning to use it, or are currently using it, I'd love to hear your feedback to improve it further. Any issues or feature requests, please raise them in the issues section of the repository [https://github.com/mwinteringham/selenium-to-restassured/issues](https://github.com/mwinteringham/selenium-to-restassured/issues)