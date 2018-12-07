---
layout: post
title:  "Unexpected Automation: Creating dashboards with ExpressJS and JQuery - Part 2"
date:   2015-03-31 20:52:00 +0100
permalink: /unexpected-automation-creating-dashboards-with-expressjs-and-jquery-part-2/index.html
tags: automation node
image: /img/article/cockpit.jpg
---

And we're back!  So far we've looked at using ExpressJS to create a small Web framework which contains various endpoints that encapsulate actions to get data from Event Generator's log files and database.  Now we need to create the UI to complete the work.

<h3>Part 4 - Starting to build the monitor UI</h3>

We have our endpoints for the monitor in place so let's bring them together into a UI.  We need to create our HTML template, create a file named monitor.html and paste in the following code:

```html
<html>
<head>
	<title>Event Generator - Monitor</title>
</head>
<body>
	<h1>Event Generator - Monitor</h1>
	<h2>Log stats</h2>
	<ul id='logstats'></ul>
	<h2>Database stats</h2>
	<ul id='dbstats'></ul>
</body>
</html>
```

This HTML code is the barebones of the UI for the monitor and before we start consuming the endpoints we've created we need to update <em>monitor.js</em> to allow request the HTML page which we will do by importing the library <em>fs</em> through:

```javascript
fs = require('fs')
```

And then we create a new endpoint:

```javascript
app.get('/', function (req, res) {
  fs.readFile(__dirname + '/monitor.html', function (err, data) {
    if (err) return send404(res);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data, 'utf-8');
    res.end();
  });
});
```

Save the new endpoint and restart <em>monitor.js</em> and access <a href="http://localhost:8000" title="http://localhost:8000">http://localhost:8000/</a> you should now be shown your basic UI.  This is because the endpoint <em>'/'</em> uses <em>fs</em> to open the <em>monitor.html</em> and write it's content to the response with some headers to allow your browser to render the HTML.

<h3>Part 5 - Using JQuery to populate the UI with data</h3>

So we're almost there.  We have the endpoints and the basic UI template all we need now is a way of accessing our endpoints and inserting the endpoint results into the UI, which we will do using JQuery.  Firstly we need the JQuery library which we grab via the Google APIs by pasting the following into our <em>&#60;head&#62;</em>

```
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
```

With the JQuery in place we then insert our javascript to make a call to our endpoints and insert the data into our UI

```
<script type='text/javascript'>
	$(document).ready(function() {
		var getStats = function(type, search, ul){
		$.get('/' + type + '/' + search, processEntries, 'json' );
			function processEntries(data) {
				$(ul).append('<li>' + search + ' - ' + data + '</li>');
		        }
		}

	    getStats('log','DEBUG','#logstats');
	    getStats('log','WARN','#logstats');
	    getStats('log','ERROR','#logstats');
	    getStats('log','FATAL','#logstats');
	    getStats('db','Dave','#dbstats');
	    getStats('db','Daisy','#dbstats');
	});
	</script>
```

Going through the code this is what's happening:

<ol>
	<li><em>$(document).ready</em> is triggered when the page starts up which means as soon as the page loads we start grabbing the data we need</li>
	<li><em>getStats</em> is then declared that takes three parameters. Type sets which endpoint we want to call (db or log), search sets the keyword we want to search for, and ul which sets which &#60;ul&#62; we want to insert the data in.  The function will then use JQuery's <em>$.get</em> method to call the endpoint we want with the term we want and then once complete run the function <em>processEntries</em> to find the &#60;ul&#62; we will insert the resulting data in</li>
	<li>We can then call getStats as many times as we want with different search terms.  So for example the first instance of <em>getStats</em> will call <a href="http://localhost:8000/log/DEBUG" title="http://localhost:8000/log/DEBUG">http://localhost:8000/log/DEBUG</a> and add a new list entry in <em>#logstats</em> with the count from the endpoint.</li>
</ol>

So with everything in place, run the Event Generator one more time and get events generating.  Then load up <em>monitor.js</em> and access <a href="http://localhost:8000" title="http://localhost:8000">http://localhost:8000/</a> and try refreshing the page a few times.  Assuming everything works you will see your stats update, and there you have it a monitoring dashboard for Event Generator.  Congrats!

<h3>Updating the stats</h3>

You may have noticed that you still have to refresh the page manually to get the stats to update.  This was intentional as the interval required will differ based on the user and work.  What I tend to do is use an auto-refresher plugin for my browser which I can then turn on and off and configure without having to change the code.  Failing that you can use the <a href="http://webdesign.about.com/od/metataglibraries/a/aa080300a.htm" title="Meta refresh">meta refresh tag</a> by placing that in your HTML to make it force refresh.

<h3>Wrapping it all up</h3>

What has been demonstrated here is the ability to use a web framework to build an app that can pull disparate sources of data into one area.  The time spent repeatedly getting information manually can now be handled by individual endpoints and these endpoints can then be called by a UI to tie all the data into one easy to read dashboard.

The service we have built a dashboard for has very few restrictions in how we get the data we want, but in a real life situation it won't be that simple.  However, the complexities you might face in getting the data you require can be nicely encapsulated using the ExpressJS framework and ultimately once in place can be built, using JQuery, into multiple dashboards for a monitor that can give you a great source for monitoring your application when you are running exploratory testing, debugging the application or checking the app's health in live.

And that's it.  I hope you found it useful and that you will use the information here to create your own custom dashboards.  If  have any feedback on this tutorial please leave it in the comments section or tweet me @mwtestconsult or share the code for your own dashboards for others to see.