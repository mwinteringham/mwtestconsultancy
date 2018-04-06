---
layout: post
title:  "Proxies: Setting up POSTMAN proxy"
date:   2015-07-27 17:32:00 +0100
permalink: proxies-setting-up-postman-proxy
tags: proxies
image: /img/article/binocular.jpg
---

Since being introduced to <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> a few years back it's become one of the main tools I use in my day to day testing and it's a cracking piece of kit for testing with a lot of great features to boot. For those unfamiliar with <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> it's an app for Chrome that allows you to create HTTP requests for Web and API testing as well as save requests into collections for future use.

Recently <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> has been extended to include a proxy that will save a copy of each request you make in your browser, when enabled, and is extremely useful for various tasks such as rapidly creating collections of requests and modeling a web application.

However, when I first started to use the proxy I found it a bit tricky to setup due to some security restrictions in Chrome that <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> has to work around. I didn't find much help on Google or StackOverflow so after a bit of fiddling and complaining I  managed to get it working and I thought it would be good to put together a blog post on how to setup the <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> proxy.

Before we start it's worth saying that <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> is a Chrome application so you will need the Chrome browser installed. If you don't use Chrome browser there are other tools similar to <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> available (I'm a big fan of <a href="https://portswigger.net/burp/" target="_blank">BurpSuite</a>, something I may blog on another time).
<h3>Install POSTMAN</h3>
So if you haven't already got <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> installed, head over to the <a href="http://getpostman.com/" target="_blank">POSTMAN site</a> or download it directly from the <a href="https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop" target="_blank">Google Store</a>. Once installed head over to your <a href="chrome://apps/" target="_blank">Apps</a> page and load up <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a>.
<h3>Install Interceptor</h3>
As I previously mentioned, Chrome has security restrictions in place that limit <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> ability to create requests with custom headers and Cookies (or at least that's my take on it).   So there is an extension for <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> to workaround these restrictions which is an app in it's own right called <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a>. We want to install <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a> which you can grab from the <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> site or again download directly from <a href="https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo/" target="_blank">Google Store</a>.

Once installed you should see an icon that looks like the one below in the top right corner of the browser which indicates <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a> is installed
<img class="alignnone size-full wp-image-93" src="http://mwtestconsultancy.co.uk/wp-content/uploads/2015/07/interceptoricon.png" alt="interceptoricon" width="250" height="68" />
<h3>Enable Interceptor</h3>
With <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a> installed, click on the traffic light icon to see a popup with a switch set to off. Click on it to turn <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a> on and you will see a 'Filter request' textbox and 'Last 10 requests' label appear. There will be no requests yet as we still have to connect <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> to <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a>.
<h3>Connect POSTMAN to Interceptor</h3>
Head to <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> and locate the highlighted icon shown below in the top toolbar and click on it
<img class="alignnone size-medium wp-image-95" src="http://mwtestconsultancy.co.uk/wp-content/uploads/2015/07/postmanproxy.png" alt="postmanproxy" width="620" height="19" />
You will see two options.  The first is a toggle for <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a>, click on that to connect <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> to <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a>. The second is for the proxy and clicking on that will open a popup with proxy settings. We don't need to change any of the settings for now so simply click on 'Connect'. If everything has gone to plan the popup will indicate the proxy is setup!
<h3>Using the POSTMAN proxy</h3>
Now, with everything setup you can open a new Tab in Chrome, navigate to a site and see requests appear in the History tab of <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> as well in the 'Last 10 requests' list of the <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a> app. If you only want a specific domain to be fed through into the <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> proxy you can update the wildcard 'Filter requests' setting within <a href="https://www.getpostman.com/features#interceptor" target="_blank">Interceptor</a>. For example if you only wanted Wikipedia requests you could update it to 'en.wikipedia.org'.

And there you have it, <a href="https://www.getpostman.com/" target="_blank">POSTMAN</a> proxy setup. Enjoy and feel free to get in touch with me at <a href="https://twitter.com/mwtestconsult" target="_blank">@mwtestconsult</a> if you're having any difficulties.