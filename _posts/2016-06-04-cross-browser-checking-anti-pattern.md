---
layout: post
title:  "Anti-pattern: Cross browser checking"
date:   2016-06-04 14:21:00 +0100
permalink: cross-browser-checking-anti-pattern
tags: automation
image: /img/test.jpg
---

Recently I was reading a discussion on the Testing community's automation slack channel in which one of the members was asking others about options around extending their smoke checks to run against multiple browsers.  The others gave great advice around using tools such as [Sauce labs](saucelabs.com) or Virtual machines which are perfectly valid, but unknowingly they fell into a trap.  They were demonstrating what I believe is an important anti-pattern when it comes to checking which I want to discuss today.

### What is this anti-pattern and why is it an anti-pattern?  

Consider we write a check that does the following using WebDriver that we want to run across different browser:

1. Complete and submit a plain HTML form
2. Assert that the backend redirects us to a new page

Running this check across multiple browsers is the anti-pattern.  Why? Well it boils down to what it is we think we are checking, so let's take a look at some different assumptions we could make about what we are checking:

### 1. Checking that each browser renders the form correctly so it can be filled in by a human

The anti-pattern here comes from the assumption around the perception of 'rendering' and WebDriver.  WebDriver allows us to query a DOM that is being built in a browser so this means we CAN check to see if the DOM contains the HTML we require to submit our form but we CAN'T check if the HTML is rendered in a way that a human could have trouble submitting the form (due to CSS or accessibility issues).  Which means that running the check across multiple browsers is redundant.  It bears little influence on how the backend is serving the HTML since all browsers are capable of injecting HTML into a DOM (if it couldn't no-one would use that browser!)

As a side note, WebDriver can inform us if an element can't be reached, say for example if the HTML is missing but if the HTML is missing the issue lies with what is serving the HTML and not the browser (Unless it is created by JavaScript but we will come back to that).  Therefore, it would be better to create an API level check with different User agents (if necessary) to determine if the correct HTML is returned by the backend, an approach which is cheaper and more stable.

### 2. Checking that each browser takes us to the same page after submission

The anti-pattern here is the assumption that each browser might handle a redirect from a backend differently (Which they generally don't, again no-one would use them if they did).  An API level check with different User agents (again, if necessary) to determine that the correct redirect path is returned would suffice.

### 3. Checking that each browser is using JavaScript correctly to create the form

So what if the form was created by JavaScript and not by the backend?  There is a benefit to running the check across different browsers since they all have different JavaScript engines that behave in different ways, and we want to ensure that our form creation works with all of them.

However, the anti-pattern still appears in the submission of form and the assertion we're being redirected to a new page since this is all being handled by the backend.  We should consider breaking the check into two separate checks.  A WebDriver based check for checking the JavaScript renders the HTML, and an API level check for checking the backend returns us a redirect.

### Avoiding this anti-pattern - The TuTTu mnemonic

We fall into this anti-pattern because we don't spend enough time diving into the question of what it is we are specifically checking in our applications and [Richard Bradshaw aka @friendlytester](https://twitter.com/FriendlyTester) explains how we can remedy this in the  Whiteboard testing video ['What to check and where'](https://www.youtube.com/watch?v=InCyDS_uOGk) and I encourage you to watch it.  Ultimately, if you are not asking yourself 'what is this checking checking?' then you are at risk of falling into the anti-pattern above as well as others.

So how do we ensure that we are aware of what we are checking?  To help, I've created a question/heuristic you can ask yourself in the form of a mnemonic: __TuTTu__ (pronounced tutu) which stands for:

### Testing the UI or Testing _Through_ the UI?

* If my WebDriver check is testing a JavaScript feature creates HTML at runtime **then I am Testing the UI** which means cross-browser testing is valid.
* If my WebDriver check is testing a form submission to ensure my data is being stored correctly **then I am Testing through the UI** which means cross-browser testing is invalid.

I use this question to avoid the cross browser anti-pattern and only run the checks that **test the UI** across different browser.  The other checks I would only run against one browser, or better still, as suggested by [Richard](https://twitter.com/FriendlyTester), push those checks down to a lower level.

### Conclusion

So let's go back to the slack conversation I mentioned earlier.  As I said before the advice being given around tooling was perfectly valid, but they had fallen into the trap I've illustrated above. The person asking the question is an ex-work colleague and a friend of mine so I have prior knowledge of the smoke checks they were asking about and I knew that the checks he wants to run are __Testing _through_ the UI__ (they focus on the integration of parts, not specific UI components).  If the __TuTTu__ question had been asked then this information may have come to light and we would know that cross browser checking for these smoke checks might not be the best course of action.