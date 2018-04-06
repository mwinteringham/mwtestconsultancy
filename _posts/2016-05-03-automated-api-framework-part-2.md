---
layout: post
title:  "How to build an automated API test framework - Part 2"
date:   2016-05-03 21:09:00 +0100
permalink: automated-api-framework-part-2
tags: automation API-testing
image: /img/article/scaffolding.jpg
---

In the [previous post on creating an automated api framework](http://www.mwtestconsultancy.co.uk/automated-api-framework-part-1) we created a framework and a series of automated checks that will run some basic GET request checks against [restful-booker](https://github.com/mwinteringham/restful-booker). If you haven't gone through  the [previous post](http://www.mwtestconsultancy.co.uk/automated-api-framework-part-1) I would recommend you do so before you continue. 

...Welcome back! So let's recap on what we've created so far:

![](/wp-content/uploads/2016/04/file-structure-itp1.png)

* _spec_ stores our automated checks
* _api_ a library of API endpoints we use in _spec_ to communication with [restful-booker](https://github.com/mwinteringham/restful-booker)
* _gemfile_ / _Rakefile_ manages the running of our framework and it's dependencies

We left the [previous post](http://www.mwtestconsultancy.co.uk/automated-api-framework-part-1) with three checks focused on GET requests but now we want to expand it to cover more than just GET requests.  So let's look into how we can extend the framework to create and send a POST request.

# Payloads and the builder pattern

Traditionally POST requests require some [sort of data that we want to be consumed and actioned upon by our web service / application](http://stackoverflow.com/questions/23118249/whats-the-difference-between-request-payload-vs-form-data-as-seen-in-chrome).  For [restful-booker](https://github.com/mwinteringham/restful-booker) it wants a JSON payload in the POST request to /booking so we need to create the ability to generate payloads, which we can do using the builder pattern model.

**Erm, What is the builder pattern?**

[@FriendlyTester](https://twitter.com/friendlytester) has a [great blog post on what the builder pattern is](http://www.thefriendlytester.co.uk/2015/06/an-introduction-to-data-builder-pattern.html) and it's context to data creation, which is what we'll be using the pattern for.  I would suggest giving it a read before continuing.

[Restful-booker](https://github.com/mwinteringham/restful-booker) takes a 'booking' payload (naturally), so first create a new folder within the root of your project named _payloads_ and within that folder create a new file named _booking_payload.rb_ and paste the following in:

```ruby
class BookingPayload

  attr_accessor :firstname, :lastname, :totalprice, :depositpaid, :checkin, :checkout, :additionalneeds

  def initialize(&block)
    instance_eval &block if block_given?
  end

  def toJson
    return "{
        \"firstname\": \"#{firstname}\",
        \"lastname\": \"#{lastname}\",
        \"totalprice\": #{totalprice},
        \"depositpaid\": #{depositpaid},
        \"bookingdates\": {
            \"checkin\": \"#{checkin}\",
            \"checkout\": \"#{checkout}\"
        },
        \"additionalneeds\": \"#{additionalneeds}\"
    }"
  end

end
```

So how does this builder work?

1. The _attr_accessor_ in the class is a shortcut method that allows you to store a variable of say, for example, _firstname_ and create getter and setter methods for it to allow you to update at any point in our checks
2. The _intialize_ method is where the magic happens.  It allows us to instantiate a new _BookingPayload_ object and the _&block_ allows to set the values we want to set for that object
3. Finally _toJson_ takes the values we stored in the payload and generates a stringified version of the booking JSON that we will use to add to our request

And that's it!  So let's create that POST /booking check.

# Let’s create some checks!

Since we are sending a POST request to the web service we need to create a new method to create the POST request.  So we add the following:

```ruby
def create_booking(payload, content_type)
    begin
      return RestClient.post 'http://localhost:3001/booking', payload, :accept => :json, :content_type => content_type
    rescue => e
      return e.response
    end
end
```

Notice how we now add a _payload_ along with additional headers around _accept_ and _content_type_.

Next, add a link to your new payload builder in _spec_helper.rb_ by adding the following into the file:

```ruby
require './payloads/booking_payload'
```

And finally with the booking payload class available to use we can add our new check-in _integration_spec.rb_

```ruby
it('POST /booking should return a 200') do
    payload = BookingPayload.new do
      self.firstname = 'Sally'
      self.lastname = 'Jenkins'
      self.totalprice = 111
      self.depositpaid = true
      self.checkin = '11-11-2010'
      self.checkout = '12-11-2010'
      self.additionalneeds = 'Breakfast'
    end

    response = Booking.create_booking(payload.toJson, :json)

    expect(response.code).to be(200)
  end
```

What is happening here is that in addition to the request and assertion in the check we are creating a _BookingPayload_ specific to the check by instantiating a new _BookingPayload_ and passing values that we want to be added to the payload.  We then call _payload.toJson_ when sending the request to create the stringified JSON object that _create_booking_ adds to the request and creates the booking and returns a 200.

# Conclusion

So in summary what we've done is:

![](/wp-content/uploads/2016/05/file-structure-itp2.png)

1. Extended our framework to now include a library of payload builders that can be shared across any checks or requests we want to make (For example _BookingPayload_ can be used for both POST and PUT requests)
2. Also extended our API library to now include both GET and POST HTTP requests

For the final post in the series, we will look at combining multiple requests in a check for more complex scenarios.