---
layout: post
title:  "Is BDD testing? Outside in development and testers"
date:   2016-12-13 17:35:00 +0100
permalink: /bdd-testing-part-3/index.html
tags: BDD
image: /img/article/bdd.jpg
---

In the [previous posts](http://www.mwtestconsultancy.co.uk/category/bdd/) I've introduced a model to help me understand BDD, shown below. I've also discussed the [collaboration side of the model](http://www.mwtestconsultancy.co.uk/bdd-testing-part-2/) and the Testers role with it.  All with the intent to ask, is BDD Testing?

<img src="/img/2016/12/BDD-Model-1024x652.png" alt="Is BDD Testing? A model to help testers understand BDD better" style="width: 100%" />

In this post, I want to look at the Outside in Development side of BDD and explore how Testing fits into it.

<h4>Outside in development</h4>

It seems to me that 'Outside-in Development', which I will refer to as OID from now on, is what confuses Testers most. Essentially, OID works by using automation tools combined with scenarios from a collaborative session to create a guide for Developers. This results in ensuring Developers develop what the business wants.  The process is formed of three states, which you can see in the model above, but let's look at each state in more detail:

__Red state__
A Developer starts on the 'outer wheel' by using a Gherkin based tool to tie explicit user actions to the step of a scenario that creates a scenario that can't be executed (Because the feature doesn't exist).  For example, a Developer may use Cucumber to trigger a series of Selenium WebDriver actions on a browser to simulate how a user would execute a scenario. 

__Green state__
The Developer will then move into the 'inner wheel' and run a similar red, green and amber process on a lower lever. The Developer will use this pattern against individual methods using a different unit level automation tool multiple times to get all the production code working.  This, in turn, provides code that means the 'outer wheel' automated scenario can be executed without issue.

This process ensures that the Developer has delivered what is expected from the business, as well as informing the Developer when they are done.

__Amber state__
The Developer is now able to refactor their code and be informed if their changes are no longer delivering what the business expects.

<h4>Business guided development</h4>

> 'If I could change one word in BDD it would be Driven to Guidance```
> Dan North - https://skillsmatter.com/skillscasts/8633-bdd-is-not-about-testing

I've been very careful not to mention Testers, Tests or Pass/Fail in the above description. That's because OID _is not about Testing it's about guidance_, and this is what Testers get wrong.  The assumption from Testers is that because OID uses tools that are typically related to automated testing that must mean OID is automated testing.

OID is an evolution of Acceptance Test Driven Development and Test Driven Development which means it has inherited some misconceptions from ATDD/TDD.  Testers struggle with ATDD and TDD, believing it's a testing approach and not a design process.  This isn't helped with the word 'Test' existing in both names, which adds to the confusion.

However, Testers should be aware that test automation tools are not exclusively used for test automation, they can be used for other things.  Much like you can use a screwdriver in its traditional way but also use it to open a can of paint.  Yes, these approaches use test automation tools but they are using them as a means to keep the Developer honest.  OID helps Developers design good code and deliver what the business really wants. Not deliver testing.

<h4>Conclusion</h4>

In my [first post](http://www.mwtestconsultancy.co.uk/bdd-testing-part-1/) of the series, I talked about how I struggled with BDD as a concept.  More specifically it was OID that I struggled with the most.  The assumptions and errors I've claimed Testers make are all ones I've made personally, thinking that OID, ATDD and TDD were testing approaches when they are not. However, as I created my model I began to realise that OID is a development practice and not testing.  That said, Testers can support Developers by pairing with them during the OID process to ask questions, give information about the application and observe what is being created for future testing.

So what does that mean for test automation?  Surely, we need good test automation in place to help Testers deal with the mountains of work we face regularly? Yes, we do need test automation but it should sit alongside the work done by OID not be replaced by it. They both have very different concerns. OID focuses on guiding Development whereas test automation focuses on supporting testing in terms rapid feedback and executing actions.  Attempting to cover all those actions with OID results in a process that can neither deliver guidance (because of the noise generated) nor can it provide robust test automation (because the tools used aren't the right ones for the job).

In the final post I will bring together everything to answer the question, is BDD testing?