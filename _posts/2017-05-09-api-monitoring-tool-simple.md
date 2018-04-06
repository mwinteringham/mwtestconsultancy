---
layout: post
title:  "Unexpected Automation: Create a simple API monitoring tool in 5 steps"
date:   2017-05-09 11:08:00 +0100
permalink: api-monitoring-tool-simple
tags: API-testing postman unexpected-automation
image: /img/test.jpg
---

API Monitoring of your application is an essential tool for any team. It's fast to feedback the state of your application, can be graphed or presented in many different ways for your team to consume and a great testing tool to use alongside exploratory testing. However, a lot of the options for API Monitoring are paid for and can require a bit of setup which may be a hard sell when your team is up against the clock to deliver the next big feature. This might be a time-consuming activity to carry out, especially if you just need basic API monitoring when you are executing your testing. So why not build your own, even if you have very little coding experience, using these five steps:

## 1. Create a Postman request

The first step is to create a request you can send to monitor an API. For this example, I am using [restful-booker](https://github.com/mwinteringham/restful-booker) which has a simple GET request to the endpoint /ping that I can call to get a health check on the API. The resulting [Postman](https://www.getpostman.com/) request looks like this:

<a href="/img/2017/05/apimonitoring1.png"><img src="/img/2017/05/apimonitoring1.png" alt="API Monitoring tool - Postman request example" style="width: 100%" class="alignnone size-full wp-image-665" /></a>

## 2. Generate the Request code for Postman

Once you have created your request the next step is to generate the code that will call your API endpoint. We can do this by clicking on the 'Code' link in [Postman](https://www.getpostman.com/), located here:

<a href="/img/2017/05/apimonitoring2.png"><img src="/img/2017/05/apimonitoring2.png" alt="API Monitoring tool - Postman code link guide" style="width: 100%" class="alignnone size-full wp-image-667" /></a>

Once you have the generate code snippets pop up selected, select NodeJS and Request from the drop down to be presented with generated code to use, like so:

<a href="/img/2017/05/apimonitoring3.png"><img src="/img/2017/05/apimonitoring3.png" alt="API Monitoring tool - Postman code example" style="width: 100%" class="alignnone size-full wp-image-668" /></a>

## 3. Create your API monitoring script

Now we have to create our API monitoring script and as you may have guessed by the selection we made in the previous step we are going to use [NodeJS](https://nodejs.org) (I am using v6.10.3). So start by installing [NodeJS](https://nodejs.org) if you don't already have it and then creating a folder for your script to live in. Inside the folder run:

```npm install request```

Request is the library we will use to make our call to the API so we need this to get our script running. Once Request is installed, create a file named ```app.js``` and copy and paste the generated code from [Postman](https://www.getpostman.com/) and save. Finally, run the script by calling:

```node app.js```

When I run this I see a single output message of: ```Created```

Your output might be different as it's logging the body of the request. If your output is a bit noisy, then you can try changing the line ```console.log(body)``` to ```console.log(response.statusCode)``` to output the status code instead.

## 4. Get your script to loop regularly

Now you could stop there as you have a simple script that can make a call for you, but since we want an API monitoring script, let's extend the script to loop every 1 second to give you more feedback. Since [NodeJS](https://nodejs.org) works asynchronously we have to create a [self-referencing function](http://stackoverflow.com/questions/26283868/function-self-reference) that will execute, wait for a second and then call itself. It' may be a bit confusing but to get things working all you need to do to create your loop is drop this code into your script below your current code:

```
(function loop() {
  setTimeout(function() {
    console.log("LOOP!");
    loop();
  }, 1000);
}());
```

We're using the ```setTimeout``` method to wait a second before calling ```console.log``` then ```loop()``` to start the process again. We wrap the whole thing in brackets so [NodeJS](https://nodejs.org) knows to execute the function straight away.

Run the script again and after your initial code you will see the word ```LOOP!``` appear every second. We now have a loop running!

## 5. Using the loop to make your request

We now have to tie the request code and the loop code together so we do this in two simple steps:

1. Copy your request code and replace the ```console.log('LOOP!')``` line with your request code;
2. Move the ```loop()``` method so it is on the line below ```console.log(body)```

You should have code that looks similar to mine below:

```
var request = require("request");

(function loop() {
  setTimeout(function() {
    var options = { method: 'GET',
      url: 'http://localhost:3001/ping'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      
      loop();
    });
  }, 1000);
}());
```

Now for the final time run your script and hey presto! A working api monitoring script. You can check out the script I created for this post here [https://github.com/mwinteringham/simple-api-monitor](https://github.com/mwinteringham/simple-api-monitor)

If you want to explore more options look at how you could create a script with a POST endpoint or multiple GET endpoints. Also, if you have any issues with setting this script up or have any other questions then please get in touch with me on [Twitter @2bittester](https://twitter.com/2bittester)

