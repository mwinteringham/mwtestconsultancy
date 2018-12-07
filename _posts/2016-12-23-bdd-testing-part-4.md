---
layout: post
title:  "Is BDD testing? Answers and test strategy"
date:   2016-12-23 12:12:00 +0100
permalink: /bdd-testing-part-4/index.html
tags: BDD
image: /img/article/bdd.jpg
---

Over the [past few posts I've been exploring the BDD process](http://www.mwtestconsultancy.co.uk/category/bdd/) in an attempt to answer the question, is BDD testing?  I've done this by building a model of BDD and explored both the collaborative and Outside in development sections.  If you've not already read them [I would recommend you do to give some context](http://www.mwtestconsultancy.co.uk/category/bdd/) to my conclusion on is BDD testing?

<img src="/img/2016/12/BDD-Model-1024x652.png" alt="Is BDD Testing? A model to help testers understand BDD better" style="width: 100%" />

<h3>Well come on then, is BDD Testing?!</h3>

The easiest option would be to say simply no, but it's more nuanced than that.  Yes, BDD is not a solely a testing activity, it's a process that is owned and carried out by the whole.  However, there are aspects of BDD than can help facilitate testing activities, especially during the collaborative phase.  The trick is to know what aspects of BDD are beneficial to Testing and what are not.

<h3>Leveraging BDD in a test strategy</h3>
For me, a good test strategy is a rich collage of different processes, techniques and tools.  The various testing activities support one another whilst also having their own unique place with Testing. BDD allows a tester to exercise activities within their test strategy, allowing them to engage with their team.   A tester using BDD will be able to ask questions, collect information and help identify risks to inform other testing activities.  For example:
<ul>
<li>A tester engaged in the collaborative phase of BDD can talk to and learn from the business and development sides of the team.</li>
<li>Examples can be used as a heuristic to generate test ideas.  Much like a diagram or design document can be used to generate ideas.</li> 
<li>Testers can pair with developers during Outside in development to learn how a feature is being implemented technically to inform testing at a later date.  Whilst providing feedback to the Developer.</li>
</ul>

A good strategy will use BDD to carry out these activities but will also carry out other testing activities.  Much like Developers and business owners will carry out other activities outside the BDD process.

<h3>Using BDD as a test strategy</h3>

> It's easy to lose sight of the fact that this is documentation.  The whole point is executable specification, it's documentation.  And in the same way, because people think 'oh no this is tests, more tests must be better, because tests are good'  More documentation isn't better, the right documentation is better, the right level of documentation and the right focus is better.

> Dan North, GOTO 2013 Interview with Liz Keogh & Dan North [https://www.youtube.com/watch?v=g5WpUJk8He4](https://www.youtube.com/watch?v=g5WpUJk8He4)

Unfortunately, it's currently popular for test teams to use BDD as the basis of their test strategy.  There are teams ignoring the collaborative side of BDD, focusing too much on using a Gherkin syntax as means to build test cases and misunderstanding the purpose of Outside-in development to focus on automating test coverage.  It's understandable why these mistakes are made.  Testing has for a long time been too reliant on test case management-based strategies and it's led teams to make incorrect connections between Gherkin examples and test cases.  Both are step based, concerned with asserting behaviour and are written in plain language.

I've talked at length at conferences about how attempting to use Gherkin based scenarios over test cases is a false economy.  This results in teams following the same test case management strategy but with a different syntax.  It's important to remember that __Gherkin is for development guidance, not test coverage.__  Accepting that distinction means teams can begin to discover better processes, techniques and tools to improve testing.

Ultimately, for me, testing is much than asserting an application meets scripted expectations so using BDD as the sole basis for a test strategy will never deliver a robust test strategy a team will need.  BDD was never designed to be a solely testing process.

<h3>Beyond BDD</h3>

As I began developing this series it just so happened that Dan North [gave a talk about BDD not being testing](https://skillsmatter.com/skillscasts/8633-bdd-is-not-about-testing) (which I encourage you to watch) in which he declares a call to arms to testers to start focusing on approaches that solve problems that BDD was never designed to solve such as test coverage or automation.

From a sapient perspective there is a lot of great work around exploratory testing which is already being used successfully by teams in conjunction with BDD, but what about test automation.  As far as I am concerned, this is a question that hasn't been answered. Answering those questions was one of my motivation for this series.  To look at the current state of popular test automation and unpick it from BDD and ask what next? If BDD isn't the answer to automating in testing, what takes it place?