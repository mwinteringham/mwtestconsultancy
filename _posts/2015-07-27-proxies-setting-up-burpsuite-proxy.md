---
layout: post
title:  "Proxies: Setting up and using BurpSuite"
date:   2015-07-27 20:00:00 +0100
permalink: proxies-setting-up-burpsuite-proxy
tags: proxies
image: /img/test.jpg
---

I recently blogged about one of my favourite tools POSTMAN and how to set up its proxy server.  POSTMAN is a great a tool but there are a few limitations I find with it:
<ol>
	<li>It's a Chrome app so therefore you can't use it with other browsers or other tools (I use proxies to debug HTTP calls from IDEs a lot to compare and contrast for debug purposes)</li>
	<li>Whilst POSTMAN saves requests it doesn't save responses which can be a problem when you are trying to capture context specific requests, such as deleting data that has been specifically setup before that request.</li>
</ol>
So while I use POSTMAN regularly there are times I require a different proxy server that offer solutions to the problems above and that proxy is <a href="http://portswigger.net/">BurpSuite</a>.  So in spirit of balance and because I think others may benefit from using <a href="http://portswigger.net/">BurpSuite</a> I thought I would blog about setting up the BurpSuite proxy and demonstrate some of the features that I use regularly.
<h3>Install BurpSuite</h3>
Unless a client has a pro license I tend to use the free version of <a href="http://portswigger.net/">BurpSuite</a> since it contains all the features I need.  You can download the free version for the <a href="https://portswigger.net/burp/download.html">Portswigger site</a> and it is a standalone JAR file that you can double click on to load up.
<h3>Setting up BurpSuite Proxy</h3>
<a href="http://portswigger.net/">BurpSuite</a> proxy comes out of the box pre-configured and I find that those settings work for me, so the act of loading up BurpSuite means that its proxy server is on.  However, as default <a href="http://portswigger.net/">BurpSuite</a> enables it interceptor which can be used for things like <a href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">man in the middle attacks</a> or data driven testing, but I tend to use proxies in a passive manner so I prefer to turn it off.

To turn it off click on the 'Proxy' tab and click on 'Intercept is on' to turn it off.

It's worth adding that if you do need to change the port or IP for your proxy you can update it in the 'Options' tab in the 'Proxy Listeners' section.  Be warned though that the free version doesn't save your settings so you will need to do this each time.
<h3>Pointing a browser to the BurpSuite proxy</h3>
Since the last blog post was focused on Chrome lets look at configuring Firefox to use <a href="http://portswigger.net/">BurpSuite</a>.  All you need to do is update the browsers settings to include details of the <a href="http://portswigger.net/">BurpSuite</a> proxy which you can do in a couple of ways:
<h4>Through the Firefox settings</h4>
Navigate to Preferences &gt; Advanced &gt; Network and click on the 'Settings' button under the 'Connection' banner.  You should see options for setting a proxy.  We are going to manually set ours so click on 'Manual proxy configuration' and enter your <a href="http://portswigger.net/">BurpSuite</a> ip and port which is defaulted to 127.0.0.1:8080 and opt to 'Use this proxy server for all protocols' and save those settings.

Once saved, open a tab and navigate to a page and observe in the 'HTTP history' tab the HTTP requests appearing as you request a page.  This is the simplest way of setting up a browser, but it can be a pain to do this each time you have to turn on and off your proxy connection (You will get a connection error if you close <a href="http://portswigger.net/">BurpSuite</a> down and don't turn of the proxy settings).  There is another option though.
<h4>Using an extension like FoxyProxy</h4>
<a href="https://addons.mozilla.org/en-us/firefox/addon/foxyproxy-standard/">FoxyProxy</a> is a great tool because it allows you to easily switch proxy connections on and off with the click of a button from your browser toolbar, it can manage multiple proxies and setup filters to determine which sites should be forwarded to the proxy and which shouldn't.  I'm not going to go into the setup in this blog but you can find details on how to use it <a href="https://getfoxyproxy.org/mozilla/configuring/proxyservice-with-browser-extension.html">here</a>.

So with the <a href="http://portswigger.net/">BurpSuite</a> proxy setup and receiving requests let's take a look at some of the features.
<h3>Reviewing requests and response</h3>
One of the key features I use a lot is the request and response tabs that can found in 'HTTP History'.  They are basic tools but having all the details laid in plain text to search can very helpful for test design, debugging automation or learning about an application.  Additionally both views have find functionality that takes strings and regexes which is great for finding content in large HTML bodies or testing out regexes for automation.
<h3>Repeater</h3>
The other main feature I use is the repeater feature which allows me to store an HTTP request, manipulate it and send it again as many times I like (context dependent of course).  I find this feature useful for a few reasons:
<ol>
	<li>Great for exploratory testing.  If you are running testing on a web form and are focused on how test data is consumed, I find capturing the initial request from the site and then using the repeater to try different data payloads is a rapid and focused way of running an exploratory test session.</li>
	<li>Debugging bad requests in automation.  There are times when I automate HTTP requests in a tool but may have built them incorrectly wrong or missing headers, bad cookies, etc.  So I find capturing the original request from the application and my request into repeater then slowly copying content from one request to the other, each time re-sending my request, can help determine what I have done wrong or am missing.</li>
</ol>
So there you have it.  There are a boat load of more features that <a href="http://portswigger.net/">BurpSuite</a> can offer and <a href="https://twitter.com/eviltester">@eviltester</a> has some great YouTube videos on <a href="https://www.youtube.com/user/EviltesterVideos/search?query=burp+suite">BurpSuite here</a>.  I highly recommend you check them out.