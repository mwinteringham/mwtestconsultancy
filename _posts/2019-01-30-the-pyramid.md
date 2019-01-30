---
layout: post
title:  "The test automation pyramid is a heuristic not a strategy"
date:   2019-01-30 10:00:00 +0100
permalink: /the-test-automation-pyramid-is-a-heuristic-not-a-strategy/index.html
tags: automation pyramid automation-strategy
image: /img/article/pyramid.jpg
description: The automation pyramid is better used as a health check heuristic than a basis for a strategy
---

Ah, great, another blog post on the Automation pyramid! Just what we all need...!

When I read these types of posts, they tend to contain a lot of emotion from both advocates and critics alike and I'm no different. For a long time whenever I have seen 'The Pyramid' mentioned as a proposed strategy for test automation in talks, blogs, consultancy work or interviewing and training others I get very frustrated. It's hard not to take 'The Pyramid' personally. The hard work that me and my peers carry out to develop robust automation strategies is abstracted and reduced and you are left with a brief mention to three arbitrary interfaces, and that can feel a little insulting.

To create a strategy for automation, much like any other type of strategy, an individual or team needs to put in a lot of work to understand their context. To create an informed automation strategy a team needs to understand details such as:

* The teams skillsets and experience with automation
* The project deadlines and budget
* What features the product consists of and the value of them
* What language and libraries are used in the production code
* How the production code is deployed to a server
* Who is the end user or stakeholder and what do they want

This is just a sample of the many sources of information that we need to discover to make informed decisions, and this is the issue I have with 'The Pyramid', none of this work and information is described or even referenced. Yet we see teams constantly charge into automation citing 'The Pyramid' as the basis of a strategy. Focusing on interfaces and ratios of checks, rather than risks. 

So, yeah, it can be a little personal but the irony is no matter how much I criticise and grumble, I find myself both implementing and teaching about automation strategies that ultimately result in a pattern of checks that are similar to 'The Pyramid'. Implementing automation strategies, typically with modern web based architectures based on informed decisions can, in certain contexts but not all contexts, result in similar ratios of checks that work with against similar interfaces. 

Through a risk based strategy that helps a team understand their context, promote testability and targeted checks at the right interface. It can, depending on the application, result in lots of unit checks in many places, fewer integration checks and a handful of end-to-end checks, much like what 'The Pyramid'. So there is similarity in the end result, however the execution is different. Starting from a clean slate and learning as much about a current context can guide a team to create an awesome automation strategy, starting from 'The Pyramid' will never guide you in gaining that knowledge.

But, as stated earlier, they do reflect a similar end result and this is where value can be gained from using 'The Pyramid' not as a primer for an automation strategy, but a heuristic to check the health of the current strategy. Teams can use 'The Pyramid' to determine what state their automation strategy is in. If the current implemented checks result in an upside down Pyramid, then the Team can discuss why the strategy is in it's current state and work out if things can or cannot be changed (Not all projects can be Pyramid shaped).

So, in the end, if I am honest with myself the Automation pyramid does have a value, but not in the way teams typically use it. By using the Pyramid as a heuristic to determine the health of my automation strategy, I can use it to trigger further conversations. Rather than use it as the basis of my strategy.
