---
layout: post
title:  "Quick copying HTTP requests from Developer tools to Postman"
date:   2017-01-11 13:00:00 +0100
permalink: copying-http-requests-dev-tools-postman
tags: postman proxies
image: /img/test.jpg
---

My last few blogs have been fairly full on, so this post I wanted to give a quick demonstration on copying HTTP requests from Developer tools to Postman.  Before I begin it's worth mentioning that this works for both Developer Tools and Firebug.

<h4>Problem</h4>

I'm a big fan of using proxies and I've even posted about [getting them setup](http://www.mwtestconsultancy.co.uk/category/proxies/) a few times, but they can sometimes be an interference when testing.  So naturally there are times I don't use them when carrying out certain testing, but then this happens:

I will be in the middle of testing an application when an error occurs on the page.  I'll go to my developer tools and check the Network tab to see a request has been returned a 500 or 400 status code error.  The issue I might have is that I want to explore the request further, or save it for later to add to a bug.  Whilst it's not impossible to do some of these tasks in Developer tools, it can be a bit of a pain and I certainly can't save the request for the future.  However, I can with Postman so let's look at how we can do that...

<h4>Copying HTTP requests from Developer tools to Postman</h4>

<h5>1. With the network tab open, right click on the request and select 'copy as Curl'</h5>

<a href="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep1.png"><img src="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep1-300x133.png" alt="Copying HTTP requests from Dev Tools to Postman Step 1" width="300" height="133" class="aligncenter size-medium wp-image-526" /></a>

<h5>2. Next open up Postman and click on Import</h5>

<a href="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep2.png"><img src="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep2-300x93.png" alt="Copying HTTP requests from Dev Tools to Postman Step 2" width="300" height="93" class="aligncenter size-medium wp-image-527" /></a>

<h5>3. Select past raw text and copy in the Curl request</h5>

<a href="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep3.png"><img src="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep3-263x300.png" alt="Copying HTTP requests from Dev Tools to Postman Step 2" width="263" height="300" class="aligncenter size-medium wp-image-528" /></a>

<h5>4. Click import and your request will be imported to use and save in collections</h5>

<a href="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep4.png"><img src="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2017/01/devToolsPostmanStep4-300x135.png" alt="Copying HTTP requests from Dev Tools to Postman Step 4" width="300" height="135" class="aligncenter size-medium wp-image-529" /></a>