---
layout: post
title:  "Data driven testing: Moving your Gherkin scenarios to API"
date:   2017-01-04 22:16:00 +0100
permalink: data-driven-testing-gherkin-api
tags: automation postman API-testing
image: /img/article/cucumbers.jpg
---

For this post, I want to cover something a bit more practical.   I want to bring together my posts on [BDD](http://www.mwtestconsultancy.co.uk/is-bdd-testing/) and [anti-patterns](http://www.mwtestconsultancy.co.uk/cross-browser-checking-anti-pattern/) demonstrate how to build robust automated data driven testing.

<h4>Misusing Gherkin for automating in testing</h4>
I've discussed in my [series on BDD](http://www.mwtestconsultancy.co.uk/is-bdd-testing/) how Gherkin tools are not designed for automation in testing, but for guiding Developers.  However, there are a lot of Automators out there who use Gherkin for automation, creating scripts like this:

```
Feature: TodoMVC Demo

 Scenario outline:
  Given I am on the TodoMVC home page
  When I submit the title "<todoTitle>"
  Then I will see the title "<todoTitle>" appear in the list
    
  Examples:
   | todoTitle |
   | TestTitle |
   | 123456    |
   | !@£$%^    |
     
```

What we have above is a scenario that will:

1. Access this [TodoMVC app](http://www.todobackend.com/client/index.html?https://todo-backend-sinatra.herokuapp.com/todos)
2. Locate the input field, fill it with data from the examples table and submit
3. Assert that the newly added test data appears in the Todo list

This is typically run using a Cucumber backed with WebDriver against a full stack application.

Now ask yourself, is this a scenario for guiding Developers to build a feature correctly or is it a test script? The fact that the examples table is being used not as a means to demonstrate different behaviour but to inject different test data says to me that this is a test script.  Therefore, why should this script exist in a Gherkin scenario? It's not benefitting Developers as there is little feedback on whether it meets business expectations.  And it's not benefitting Testers as it's slow to run and has vague feedback (more on this later).  So what if we move this script to another tool?

<h4>Problems first, Tools second</h4>
It's very easy to be seduced by tools, they're all shiny and new and fun to play with.  But it's important to remember to ask before choosing a tool, what am I testing?  I've talked before about [using the mnemonic TuTTu](http://www.mwtestconsultancy.co.uk/cross-browser-checking-anti-pattern/) to ask the question am I 'Testing the UI Testing Through the UI'.  So what is the scenario above actually testing?

<h5>Is it testing the UI?</h5>
The examples table contains lots of different data types, perhaps there is some sort of JavaScript validation that we want to test?  This would mean that the backend isn't necessarily required and we could remove it.  Perhaps a JavaScript unit testing framework such as [Jasmine](https://jasmine.github.io/) or [JSDom](https://github.com/tmpvar/jsdom)/[Mocha](https://mochajs.org/) could be used?

<h5>Is it testing through the UI?</h5>
It may be that the scenario is actually testing specific data are accepted/stored by the backend.  Therefore, we could take the UI out of the equation and look at capturing the HTTP request going to the backend.  Maybe we could use tools such as [Postman](https://www.getpostman.com/), [SoapUI](https://www.soapui.org/) or [JMeter](http://jmeter.apache.org/)?

When you are asking these questions it may be that you are testing both.   You may believe that you are saving time by testing both the frontend and Backend at the same time. However, there is a trade-off.

1. The automation you create will be slower, as it requires the full app to be loaded in a browser 
2. The automation will give you shallow feedback.  Imagine if the scenario failed, what actually failed?  Was it the UI not rendering, did the JavaScript fail or did the backend simply fail?  

The time you hoped to gain is lost in debugging your test and maintaining it (since there are more areas prone to failure).

If you know what you are specifically testing then you should aim to use a framework that is as close to the code under test as possible.  This means that if you are testing both the Frontend and Backend, split your tests into separate frameworks.   They will return relevant information about different risks and will be easier to maintain.

<h4>Data driven automation with Postman</h4>

Enough theory for now! Let's assume that the scenario is specifically testing the backend.  We can use Postman to create a script that checks exactly the same thing as the scenario above but faster and more efficiently.

<h5>Intercept the request</h5>

Our first step is to open up the [TodoMVC app](http://www.todobackend.com/client/index.html?https://todo-backend-sinatra.herokuapp.com/todos) and intercept the request from the frontend to the backend when submitting a title.  We can do this a few ways:

1. Use a proxy to capture requests between the backend and frontend.  I have some blogs on [setting up different proxies here](http://www.mwtestconsultancy.co.uk/category/proxies/)
2. Copy the details of the POST request from the Network tab in Developer tools/Firebug and import it into Postman

Once you have your request set up in Postman you will want to create a new Collection and add the request to it.  If you don't know how to do the above or just feel lazy, then you can import this [Postman collection](https://app.getpostman.com/run-collection/31f76c7f2a9d97bdc6f0)

<h5>Parameterise your request</h5>

The intention is to use the Runner in Postman to execute the same request multiple times and assert the Todo item is saved.  Just like the scenario above changed the title each run, we want to be able to change the title in the request.  To do this our first step is to update the request so that the title in the **body** and the title in **tests** is parameterised.  We do this by:

1. Locating where it says "Update me" (quotes not included) in the **body** and replacing it with ```{{title}}```
2. Locating where it says "Updated me" (quotes included) in the **tests** and replacing it with ```"" + data['title']```

Notice how in the tests section it has to be entered slightly differently.  This is because the tests section uses pure JavaScript and ```{{title}}``` is invalid syntax.  So we call ```data``` that will contain our parameterised data along with a double quote to ensure it matches strings only (A bug in Postman means it will compare the numbers entry as string == number).

Finally, save your request in your collection

<h5>Create your CSV file</h5>

Next, we want to create some data.  So create a new CSV file and save the following in it:

```
title
TestTitle
123456
!@£$%^ 
```

Notice how the first row is called title.  This matches with the parameter you set in your request, which Postman will use to know the next three rows are tied to the name 'title'.  

<h5>Execute your data driven testing</h5>

So we have a parameterised request and a CSV file, let's get our data driven testing started!

1. Click on Runner
2. Select your collection from the list of collections you can run
3. Set the iteration to 3 (One for each row after the first row)
4. Add your test CSV file as the data file for the run
5. Click start test

You should hopefully see that three tests were run and have passed.  Also if you navigate to the [TodoMVC app](http://www.todobackend.com/client/index.html?https://todo-backend-sinatra.herokuapp.com/todos) you will see your created titles!

<h4>Conclusion</h4>
What we have created is a Postman collection that executes data driven testing that is:

- Targeted - If it fails we know that something in the Backend has failed and have less debugging to do
- Robust - We're not concerned with changing CSS selectors or HTML or running in browsers making it less prone to errors
- Fast - The speed it takes to make those three requests compared to running in a Browser is noticeably different
- Easy to maintain - If you need more tests, simply add more entries into the CSV file.  If the contract changes for the API call, update the body.  Nice and simple!

Of course, this was a simple Todo app with an easy request to grab and manipulate, but you can do more!  See if you can do something similar with the application you test or a demo app on the internet and share your results.

If you have any questions then please get in touch with on Twitter [@2bittester](https://twitter.com/2bittester)

<h4>References</h4>
- [http://blog.getpostman.com/2014/10/28/using-csv-and-json-files-in-the-postman-collection-runner/](http://blog.getpostman.com/2014/10/28/using-csv-and-json-files-in-the-postman-collection-runner/)