---
layout: post
title:  "Unexpected Automation: Creating dashboards with ExpressJS and JQuery - Part 1"
date:   2015-03-19 13:51:00 +0100
permalink: unexpected-automation-custom-dashboards-with-expressjs-and-jquery
tags: automation node
image: /img/test.jpg
---

After giving my talk on the testing community's focus on a small subset of automation tools I decided to put this blog together to share ways in which I've used automation for tasks other than simply asserting a check.  Since these are outside the normal sphere of what is considered automation I've named these blogs 'Unexpected Automation'

<h3>Custom Dashboards</h3>
Dashboards are a very helpful way of viewing what is going on with a service or application and there are many off the shelf tools out there to create them.  However sometimes the sources of information you require can come from very different areas of the application or may come from the same are but are not easy to capture together, which is something a lot of monitors either can't handle or will cost a lot in money and time to get setup and use.  

What if you want to monitor a log file, content going into a database and the amount of disk space the DB is using at the same time?  That may mean a lot of windows or tabs open and a lot of context switching between them to keep an eye on everything. And there's also all the time to get everything setup at the start of the day!

What this tutorial is going to explore is the idea of using open source libraries that are available to us to create an application that can do the heavy lifting of getting the data we want, manipulating it and then presenting it to us in a single easy to read dashboard.

<h3>Getting started</h3>
So before we start building the monitor we will need a few things. The app that we are going to monitor and the monitor tool we will eventually create both rely on the following tools that will need installing:

- <a title="NodeJS" href="https://nodejs.org/" target="_blank">Node v0.12</a>
- <a title="SQLite" href="https://sqlite.org/download.html" target="_blank">SQLite - 3.8.5</a>

Additional install for Windows:

- <a title="WinGrep" href="http://gnuwin32.sourceforge.net/packages/grep.htm">Grep - 2.5.4</a>

Once they've been installed and setup you can find a small app that we will be building a monitor for <a title="monitor-tutorial" href="https://github.com/mwinteringham/monitor-tutorial" target="_blank">here</a>. Download or clone the repositoryon your local machine and go through the README to get the app running.  Also take a look at the monitor example included for reference as we go through the tutorial.

<h3>The problem</h3>

Inside the monitor-tutorial is an application called 'Event Generator' which, when started, will randomly generate events.  These events are recorded in two places in a log file named eventgenerator.log and in the SQLite database events.sqlt.

What we need is a way to centralise all this data into one dashboard that can give us a live dashboard of what the app is producing.

<h3>Part 1 - Creating the ExpressJS WebApp</h3>

So the first piece of the puzzle is to setup the framework, which our monitor will rely upon and for this we will be using <a href="http://expressjs.com/" title="expressjs">ExpressJS</a> which is a fantastic, lightweight library that will allow you to create a web framework quickly.  This can also be deployed very easily on other machines.  We need to firstly create a folder named <em>monitor</em>, navigate into it and then run:

```
npm install express
```

This will install the Express libraries ready for you to use.  With Express installed, let's begin by creating a file named monitor.js and pasting the following code into the file:

```javascript
var express = require('express');

var app = express();

app.get('/log/:logtype',function(req,res){
  res.sendStatus(200);
})

app.get('/db/:term',function(req,res){
  res.sendStatus(200);
})

app.listen(8000,function(err){
	if(err) return console.error(err);
});
```

The code in summary does the following:

<ol>
	<li>The first two variable declarations pull in the Express library and create an instance of Express for us to use</li>
	<li>Next we have two instances of calling <em>app.get</em>.  These are the endpoints for the monitor that we will eventually call to get the data we want.  The first parameter of <em>app.get</em> function sets the path of the endpoint.  Notice the terms <em>:logtype</em> and <em>:term</em> we will come to these in just a minute but they are the power behind the monitor.  The second parameter is a function that contains its own parameters of request and response.  At the moment we only use the response or <em>res</em> to send back a status code of 200 as we aren't doing anything yet.</li>
	<li>Finally we use <em>app.listen</em> which starts up the Express application to listen to http requests on port 8000 on your localhost</li>
</ol>

So let's try this code out by running:

```
node monitor.js
```

Assuming no errors occurred when you started the app up, head over to your browser and go to <a href="http://localhost:8000/log/success" title="localhost">http://localhost:8000/log/success</a> where you should see a response of OK.

That's your framework up and running, yay!  

However before we move on, notice how we put in the path <em>/log/success</em> and not <em>/log/:logtype</em>.  This is because the colon before the word logtype tells express to accept any path after <em>/log/</em> and assign it to the variable <em>req.params.logtype</em>, which we are going to use in the next part of the tutorial.

<h3>Part 2 - Wiring in the <em>log</em> endpoint</h3>

With the framework now in place we can begin to put code into each of the endpoints to retrieve the data we want.  The first endpoint is going to run a search based on a chosen keyword in the log file and return the amount of times that keyword appears.  We can do this by using the <em>grep1</em> library for node which we can install by running:

```
npm install grep1
```

With the library installed, we update our code by importing the <em>grep1</em> library at the top of the script:

```
grep = require('grep1');
```

And then we update the <em>/log/:logtype</em> endpoint with the following code:

```javascript
app.get('/log/:logtype',function(req,res){
  grep([req.params.logtype,'-c','../app/logs/eventgenerator.log'],function(err, stdout, stderr){
    if (err || stderr) {
      res.sendStatus(404);
    } else {
      res.status(200).send(stdout);
    }
  })
})
```

In summary what we are doing is this

<ol>
	<li>Run the grep command with the following parameters:
		<ul>
			<li><em>req.params.logtype</em> - This is the keyword we want to search for which is taken from :logtype wildcard in the path.  So if you were to use the path <em>/log/warn</em> it will search for the keyword <em>warn</em></li>
			<li><em>-c</em> - This is to tell grep to return a count of the keyword rather than the content itself</li>
			<li><em>../app/logs/eventgenerator.log</em>  - This the location of the log file you want to monitor which can be a relative or absolute path</li>
		</ul></li>
	<li>Once the grep command is run it will return either an error, a console error or console output.  If we get an error or a console error then we send back a 404.  If not we return a 200 code along with the keyword count.</li>
</ol>

With the new code saved let's run the Event Generator and trigger it to start generating events and then start up the monitor and in your browser go to <a href="http://localhost:8000/log/WARN" title="localhost">http://localhost:8000/log/WARN</a>.  Once the Event Generator starts generating WARN events you will see a count appear on the page and as you refresh the count will increase as more Events are created.  

Now here comes the cool part.  Try updating the url from WARN to DEBUG and notice that you get a response and a count.  The use of the wildcard parameter in the path means that you can use one endpoint to search for multiple different strings, something we are going to leverage later on.

<h3>Part 3 - Wiring in the <em>db</em> endpoint</h3>

Now let's wire in the DB endpoint.  The database for the Event Generator is a SQLite3 database so we need the Node SQLite3 library to access the DB.  To install it run

```
npm install sqlite3
```

Once that's installed, like the other libraries, we need to import the <em>sqlite3</em> library into the script:

```
sqlite3 = require('sqlite3').verbose();
```

And then with the library imported we need to open a connection to the database with the <em>../app/events.sqlt</em> parameter of course being the path to where the events database is.

```
var db = new sqlite3.Database('../app/events.sqlt');
```

With the code in place to import the library and open the connection to the database we can update the <em>/db</em> endpoint to the following:

```
app.get('/db/:term',function(req,res){
  db.all('SELECT * FROM events WHERE eventDescription LIKE "%' + req.params.term + '%"',function(err, row){
    if(err){
      res.sendStatus(500);
    } else {
      res.status(200).send(row.length.toString());
    }
  })
})
```

This code is similar to the <em>/log</em> endpoint but instead of running the <em>grep</em> command we run a sql query using <em>db.all</em> to do a wildcard search in the column <em>eventDescription</em> based on the keyword you entered in place of </em>:term</em>.  Finally we return either a 500 error if there was a problem with the search or send a 200 response with the count of rows found with your keyword selected.

So once again with the code saved, lets restart Event Generator to create events and load up the monitor and access <a href="http://localhost:8000/db/warn" title="localhost">http://localhost:8000/db/warn</a>.  You should see a count be returned just like with the <em>log</em> endpoint except this time it's coming from the DB.  Again you can also update <em>/warn</em> to something else that appears in the events and will return counts.

In the end you should have a script that looks something like this

```javascript
var express = require('express'),
    grep    = require('grep1'),
    sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('../app/events.sqlt');

var app = express();

app.get('/log/:logtype',function(req,res){
  grep([req.params.logtype,'-c','../app/logs/eventgenerator.log'],function(err, stdout, stderr){
    if (err || stderr) {
      res.sendStatus(404);
    } else {
      res.status(200).send(stdout);
    }
  })
})

app.get('/db/:term',function(req,res){
  db.all('SELECT * FROM events WHERE eventDescription LIKE "%Dave%"',function(err, row){
    if(err){
      res.sendStatus(500);
    } else {
      res.status(200).send(row.length.toString());
    }
  })
})

app.listen(8000,function(err){
  if(err) return console.error(err);
});
```

<h3>More to come</h3>

So that's it for now... in the next post we'll look creating at tying our endpoints together with a UI for the monitor 

