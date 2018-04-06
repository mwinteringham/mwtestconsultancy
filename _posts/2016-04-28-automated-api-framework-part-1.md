---
layout: post
title:  "How to build an automated API test framework - Part 1"
date:   2016-04-28 15:07:00 +0100
permalink: automated-api-framework-part-1
tags: automation API-testing
image: /img/article/scaffolding.jpg
---

For a while now I've wanted to do a series of posts on how to build an automated API / web service / integration testing framework and especially how to build one in a robust way.  There is a lot to go over so I plan to break this series up into three posts to focus on specific areas of the framework and in this one we'll focus on getting the framework up and running with a handful of automated checks.

These posts assume you have some working knowledge of how <a href="http://www.tutorialspoint.com/http/">HTTP works</a>.
<h2><strong>The problem</strong></h2>
We want to build a suite of automated checks against the web service <a href="https://github.com/mwinteringham/restful-booker">restful-booker</a>.  However, the service offers no UI so our checks will use HTTP to make requests and then assert against the response.  We also want to be able to run these checks in a continuous integration environment.

For this iteration, we will focus on building checks around the GET endpoints of <a href="https://github.com/mwinteringham/restful-booker">restful-booker</a>.
<h2><strong>Getting started with an automated API test framework</strong></h2>
To run a suite of GET checks we are going to need:
<ul>
 	<li>A framework to run our checks</li>
 	<li>Methods to create our HTTP requests and return a response</li>
 	<li>Checks to trigger our</li>
</ul>
Whilst the model we're designing can be applied using various languages we'll use Ruby for this tutorial and whilst I will attempt to explain everything I am doing it will help if you have <a href="https://www.codecademy.com/learn/ruby">prior experience of using Ruby</a>.   In summary, we will be using the following:
<ul>
 	<li><a href="https://www.ruby-lang.org/en/">ruby-2.2.1</a> - A popular language with testers</li>
 	<li><a href="https://github.com/ruby/rake">Rake</a> - Allows us to create tasks to manage dependencies and run our checks</li>
 	<li><a href="http://rspec.info/">Rspec</a> - Framework to create and organise our checks</li>
 	<li><a href="https://github.com/rest-client/rest-client">Rest-client</a> - Builds and triggers HTTP requests whilst handling responses to be used in our checks</li>
</ul>
<h2><strong>Implement an RSpec framework</strong></h2>
First of all, we want to get our framework up and running, so we'll start by pulling down the gems we require by using Bundler:
<ol>
 	<li>Create a new directory <em>integration-framework</em></li>
 	<li>Inside the new directory create a new file named <em>Gemfile </em>with the following content</li>
</ol>
```ruby
source 'https://rubygems.org'

gem 'rspec', '~> 3.4'
gem 'rest-client', '~> 1.8.0'
gem 'rake', '~> 11.1.2'
```
With the Gemfile created we can run ```bundle install``` to install all the dependencies we need to start building our framework together.  Next, we'll create the skeleton for RSpec and get a single check passing.
<ol>
 	<li>Within our root folder, create a new folder named <em>spec</em></li>
 	<li>Inside the folder, we want to create two files <em>integration_spec.rb </em>and <em>spec_helper.rb</em></li>
 	<li><em>spec_helper.rb </em>is responsible for tying together the framework, but for now, we just need to add in the following:</li>
</ol>
```require 'rspec'```

Next, we want to create an initial check for the framework to run, so we add the following into <em>integration_spec.rb</em>

```ruby
require 'spec_helper'

describe('Restful-booker') do

  it('/booking should return a 200') do
    puts 'Done'
  end

end
```
Of course, this test doesn't actually check anything yet, but we want this dummy test to pass to confirm that we have everything setup correctly.

Finally, we are now at the point of trying to run the framework which we do by creating a <em>Rakefile </em>in our root directory with the following:
```ruby
require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec)

task :default => :spec
```

The <em>RakeTask</em> will find all the checks in the <em>spec </em>folder and run them, feeding back to us whether it has passed or not.  Since our task <em>:spec</em> is tied to <em>:default</em> we can simply navigate to a folder via command line and run: ```rake```

And we should receive something similar to this as an output:

```Finished in 0.04645 seconds (files took 0.41312 seconds to load)
1 examples, 0 failures```

If you did then that means our RSpec framework is in place and we are ready to get start with building our API library.  If not go back and check that your code is correct, your requires are correct and files are in the correct folders (Try comparing your work to my framework stored on GitHub)
<h2><strong>Implement rest-client</strong></h2>
With RSpec in place, we could simply begin writing our checks, dropping our HTTP requests into each request as we require.  However, ultimately this will lead code that is hard to read, maintain and will be brittle to changes in the API.  Therefore, much like how we use <a href="http://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern">Page objects</a> in a Webdriver based framework to create a library of objects/classes that reflect each page on a site, I like to create a library that reflects the various endpoints of the API I am testing.

So how do I structure this library?  Let's look at the structure as we create a library for our current framework.  To begin with we create a new folder in the root directory named <em>api</em> which will contain the API library.

Next, we want to create a file inside the <em>api </em>folder named <em>booking.rb,</em> but why are we creating this file?

If the service under test is a mature RESTful service then the API will be grouped based on the resources that it can serve, and that is how I group my objects (or in this instance modules as we are using Ruby).  For example, if the services' API has URIs that reference to resources such as apple, orange and pear (in the form of <em>/apple</em>, <em>/orange</em>,<em> </em><em>/pear</em>) then I would create three different objects name <em>apple.rb, orange.rb, </em>and<em> pear.rb </em>which will contain a method for each URI related to that resource.

<a href="https://github.com/mwinteringham/restful-booker">Restful-booker</a> only has one resource which is a booking resource, so, therefore, I only need to create <em>booking.rb </em>and add the following inside the file:

```ruby
require 'rest-client'

module Booking

  def all_bookings
    begin
      return RestClient.get 'http://localhost:3001/booking'
    rescue => e
      return e.response
    end
  end

  def specific_booking(id, accept)
    begin
      return RestClient.get 'http://localhost:3001/booking/' + id.to_s, :accept => accept
    rescue => e
      return e.response
    end
  end

end
```
What we have created is two separate functions mapped to two different endpoints in <a href="https://github.com/mwinteringham/restful-booker">restful-booker</a> using <a href="https://github.com/rest-client/rest-client">rest-client</a>
<ul>
 	<li><em>all_bookings </em>will call the endpoint <em>/booking</em></li>
 	<li><em>specific_booking</em> will call the endpoint <em>/booking/{id} </em>or <em>/booking/1</em></li>
</ul>
Adding them to specific functions allows us to also parameterize aspects of our HTTP request such as which booking we want to request (<em>id</em>) and what headers we might want to use in the request (<em>accept</em>).  The calls themselves are wrapped in begin's to ensure whatever response, whether good or bad, is returned to assert within our checks, which we will do in the next step
<h2><strong>Let's create some checks!</strong></h2>
Now that we have an API library we can import the <em>booking</em> module into our checks and then design some tests by adding the following to <em>spec_helper.rb</em>
```require './api/booking'```
This will make the <em>booking</em> module available to our spec files which we will update to the following:

```ruby
require 'spec_helper'

include Booking

describe('Restful-booker') do

  it('/booking should return a 200') do
    response = Booking.all_bookings

    expect(response.code).to be(200)
  end

  it('/booking/{id} should return a 200') do
    response = Booking.specific_booking(1, :json)

    expect(response.code).to be(200)
  end

  it('/booking/{id} should return a 418 when sent a bad accept header') do
    response = Booking.specific_booking(1, :text)

    expect(response.code).to be(418)
  end

end
```

We add the Booking module into the checks by using <em>include Booking</em> and then can use the <em>Booking</em> module to make the calls we need for our checks.  With the checks structured in this way if, say, for example, the <em>specific_booking </em>URI changed we would only need to change the URI in one place to propagate the change into all our checks.

So let's try running <em>rake</em> again in our command line. Hopefully we should get an output similar to this:
<blockquote><em>Finished in 0.04645 seconds (files took 0.41312 seconds to load)</em>
<em>3 examples, 0 failures</em></blockquote>
<h2><strong>Conclusion</strong></h2>
So to recap, we've set up RSpec to run using Rake, created a small automated API library that we then use to create our automated checks.  Hopefully, your framework should look similar to this in structure:

<a href="/img/2016/04/file-structure-itp1.png"><img class="aligncenter wp-image-266 size-full" src="/img/2016/04/file-structure-itp1.png" alt="automated api framework structure" width="538" height="341" /></a>

In the next post, we'll focus on checks around POST endpoints which will involve extending our API library and creating a payload library.
