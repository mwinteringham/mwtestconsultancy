---
layout: post
title:  "How to build an automated API test framework - Part 3"
date:   2016-05-09 20:26:00 +0100
permalink: automated-api-framework-part-3
tags: automation API-testing
image: /img/test.jpg
---

So here we are.  The final post on building an automated API framework.  We've covered a lot of ground already so if you if you haven't already I would recommend reading [the first post on creating a framework with basic checks](http://www.mwtestconsultancy.co.uk/automated-api-framework-part-1) followed by [the second post on extending the framework to handle POST requests](http://www.mwtestconsultancy.co.uk/automated-api-framework-part-2).  If you are all caught up then let's continue...

Before we start let's take a look at what we have so far:

![](/wp-content/uploads/2016/05/file-structure-itp2.png)

* _spec_ stores our automated checks
* _api_ a library of API endpoints we use in _spec_ to communication with [restful-booker](https://github.com/mwinteringham/restful-booker)
* _payloads_ a suite of builders to create payloads for POST requests 
* _gemfile_ / _Rakefile_ manages the running of our framework and it's dependencies
 
In the [previous posts](http://www.mwtestconsultancy.co.uk/category/api-web-service-testing/) we've focused on creating basic checks around GET and POST endpoints, but what if we need to create something more complex?

# Extending the framework further
For our next check, we want to turn our attention to the DELETE endpoint of [restful-booker](https://github.com/mwinteringham/restful-booker).  The DELETE action itself is simple but there are a few actions we need to cover before executing the DELETE such as:

* Create a booking for deletion and store the ID for later use
* Send a request to the /auth endpoint to get a token to use in the DELETE request

Before we create the check itself lets extend our API library.  First, We need to add an additional method in _api/booking.rb_ 

```Ruby
def delete_booking(id, token)
    begin
      return RestClient.delete 'http://localhost:3001/booking/' + id.to_s, :cookie => 'token=' + token
    rescue => e
      return e.response
    end
  end
```

Next, we need to create a new file in _api/_ named _authorise.rb_ and add the following:

```Ruby
require 'rest-client'

module Authorise

  def post_credentials(payload)
    begin
      return RestClient.post 'http://localhost:3001/auth', payload, :content_type => :json
    rescue => e
      return e.to_s
    end
  end

end
```

Next, ```/auth``` requires a payload with our username and password so let's create a new builder in _payloads_

```Ruby
class AuthorisePayload

  attr_accessor :username, :password

  def initialize(&block)
    instance_eval &block if block_given?
  end

  def toJson
    return "{
        \"username\": \"#{username}\",
        \"password\": \"#{password}\"
    }"
  end

end
```
Also don't forget to add ```require './api/authorise'``` and ```require './payloads/authorise_payload'``` to _spec_helper.rb_

# Creating the DELETE check

With the _api_ and _payloads_ files added let's create our check first include the ```Authorise``` module from _api_ in _integration_spec.rb_ by adding the following under the ```Booking``` include

```Ruby
include Authorise
```

Then create the check itself

```Ruby
it('DELETE /booking/{id} should return a 200') do
    payload = BookingPayload.new do
      self.firstname = 'Sally'
      self.lastname = 'Jenkins'
      self.totalprice = 111
      self.depositpaid = true
      self.checkin = '11-11-2010'
      self.checkout = '12-11-2010'
      self.additionalneeds = 'Breakfast'
    end

    created_response = Booking.create_booking(payload.toJson, :json)

    auth_payload = AuthorisePayload.new do
      self.username = "admin"
      self.password = "password123"
    end

    auth_response = Authorise.post_credentials(auth_payload.toJson)

    delete_response = Booking.delete_booking(JSON.parse(created_response.body)["bookingid"].to_i, JSON.parse(auth_response.body)["token"])
    
    expect(delete_response.code).to be(201)
  end
```

So let's talk through what's going on in this check:
1. First, we create a booking payload and use ```create_booking``` to create the booking we plan to delete.  We also store the response in ```created_response``` for later use.
2. Next are the payload and request to authenticate with [restful-booker](https://github.com/mwinteringham/restful-booker).  Again, we store the response in ```auth_response``` for use in the delete request
3. Finally, we take the booking ID for ```created_response``` to determine which booking to delete and we take the token value from ```auth_response``` to use in our Cookie header to allow us to make the request.  We then assert on the response code.

# Conclusion

So what we have created is a check that depends on multiple requests to be called that share various bits of information to be used to build further requests.  Using this process we can create user workflows through the application that are much more sophisticated than a simple check on a single API call.

## Going forward

And that's it! A copy of the framework can be found [here on GitHub](https://github.com/mwinteringham/api-framework) for you to compare against.  Before I finished I challenge you to take your copy of the framework and extend it.  Why not try:
* Creating a check for the PUT endpoint in [restful-booker](https://github.com/mwinteringham/restful-booker)
* Extend the API library to work on different environments
* Use the framework structure to create a series of checks against a different application