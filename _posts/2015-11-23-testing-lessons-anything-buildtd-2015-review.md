---
layout: post
title:  "Testing lessons learnt: Anything build party & TestLab @ AgileTD 2015"
date:   2015-11-23 21:06:00 +0100
permalink: /testing-lessons-anything-buildtd-2015-review/index.html
tags: conference
image: /img/article/rube.jpg
---

<h2>Day 1</h2>
I had such big plans for <a href="http://agiletestingdays.com" target="_blank">Agile Testing Days</a>. I was going to attend various talks and workshops. I was going to participate and learn. I was going only going to drop by quickly and say hello to <a href="https://twitter.com/workroomprds" target="_blank">James Lyndsay</a> and <a href="https://twitter.com/Btknaack" target="_blank">Bart Knaack</a> at the Anything Build Party &amp; TestLab, see what they were doing, and then be on my way. Then James demonstrated to me how to use a <a href="https://www.particle.io/button" target="_blank">Particle Internet button</a> with wifi enabled powered adaptors, invited me to give it a go and that was it! I didn't see any of the talks, or attend any of the workshops (with a few exceptions) I spent my conference hanging around the build party, developing, testing and working with others to build this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/GW6PVHRDP7g" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Awesome, isn't it! Some may disagree. When I showed this to my family their response was muted to say the least, there were even accusations that I was just playing around with toys and not working. But I don't think that was the case. What I found was that I learnt through the building process many aspects about the development process, some new and some old but all of them in a way I would never have picked up through talks and workshops. Which brings me to this blog post, a brief rundown of what I did and what I learnt during my time in the build party.
<h3>Learning through iteration</h3>
I realised quite early on with the <a href="https://www.particle.io/button" target="_blank">Particle</a> that it's important to allow yourself time to casually play around with a new tool and not just dive in and attempt to solve a complex problem.  I found that attempting small ideas in an iterative kept me engaged and slowly built my knowledge up by repeating common tasks and slowly bringing in new ideas and concepts.

<strong>Lessons learnt</strong>

It's difficult in a environment where there is a pressure to deliver to find this time but I highly recommend when you find you have some downtime to sit down with a new tool and attempt this iterative approach to learning.  You'll find as you begin to learn that you may start identifying solutions to real world problems.
<h3>Engaging others about lessons learnt</h3>
Once I had enough experience with the button (and because I could make the button light up and play the Star Wars theme tune!) I found people were engaging with me on what the <a href="https://www.particle.io/button" target="_blank">Particle</a> could do.  As I discussed what I had learnt, others started suggesting new ideas to try out.  One idea was 'What if you integrated it with Jenkins' so with the information I had picked up through playing around with the button and a solution with a real world application, I was able to set about building a script that could be of use to others.

At the start of the day I had started as a complete novice in the Internet of Things and the <a href="https://www.particle.io/button" target="_blank">Particle</a> Internet button but through experimentation and sharing the lessons I had learnt I had produced a working script that was of use within a development team. Not something I had expected at the start of the day.

<strong>Lessons learnt</strong>

Informing others of what you learn helps solidify your own knowledge and can inspire others to discuss new ideas and problems. Something I might not have thought about doing unless I discussed what I had learnt with others.
<h2>Day 2</h2>
When day 2 began I was very much intending to go to talks and even managed to attend a workshop in the morning but by lunch time I was back!  The information I had shared with others around what the <a href="https://www.particle.io/button" target="_blank">Particle</a> could do had sparked some ideas around integrating the button into the wider machine we were building.  So I was asked to build a script and set up the internet button to trigger a fan to start when it was hit by an object falling down a ramp and into a cup.  Again the learning started...
<h3>Development dependencies</h3>
We worked in parallel on different parts of the machine.  Whilst I was working on the script and how to fit the button inside the cup the others built a windmill that was powered by the fan I was responsible for turning on and off and this caused a problem.  I was unaware that whilst I was testing the button I was turning the fan on and off and that was interfering with the work the others were doing on their fan setup, which lead to frustrations and complaints.

<strong>Lesson learnt</strong>

Firstly you are part of a team and it's worth coming up for air now and then to see what others are working on.  It's easy to find yourself focusing too much on a specific piece of work and forget to see if others need your help.  Secondly if you're working on something in a pipeline such as development or test automation make sure your changes aren't going to cause adverse effects down the line and if they are ensure that any risks have been mitigated.  Which leads us to...
<h3>Stubbing / Mocking</h3>
To solve the issue of the fan turning on and off we removed the WeMo internet plug that was turning on and off the fan and I plugged my laptop into it.  This had two benefits.  With the WeMo removed the others could turn the fan on and off at will and no longer relied on me to ensure the WeMo was switched on.  Additionally because my laptop was now plugged into the WeMo I was getting fast feedback on whether the WeMo was on or not because I could see on my screen if the laptop was charging or not.

<strong>Lesson learnt</strong>

Breaking complex end to end systems into smaller chunks and stubbing / mocking the integration points can help give fast feedback in testing and reduce the risk of things breaking when one needs to focus on a small part of the application.
<h3>Continuous testing</h3>
As I worked on the button, we created and discussed multiple iterations of the windmill without actually putting anything together.  Someone would raise an issue and we would discuss various solutions and weigh up the possibilities.  It was surprising just how many potential problems we ironed out before we started bolting things together.

<strong>Lesson learnt</strong>

It's and old one but a classic, and it was great to see it in action in this context.  Finding issues early on saves times further down the line.  It's always good to be reminded of that.
<h2>Conclusion</h2>
I may have missed out on workshops and talks but the things I learnt from working with the Build party were valuable and I am glad that I did it. I've long held the belief that I learn through action and I probably wouldn't have taken on board the lessons I learnt through the Build party if it was through a talk or workshop. So thank you to <a href="https://twitter.com/workroomprds" target="_blank">James</a> and <a href="https://twitter.com/Btknaack">Baart</a>, I hope to see you guys next year for more Build party fun!