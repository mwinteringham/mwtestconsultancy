---
layout: post
title:  "Is BDD Testing? Collaboration and testers"
date:   2016-12-09 12:00:00 +0100
permalink: bdd-testing-part-2
tags: BDD
image: /img/test.jpg
---

This is the second part of my blog series looking into exploring the question, is BDD testing? In the [previous post](http://www.mwtestconsultancy.co.uk/bdd-testing-part-1/) I discussed my motivations for creating this series and I also shared this model:

<a href="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2016/12/BDD-Model.png"><img src="http://www.mwtestconsultancy.co.uk/wp-content/uploads/2016/12/BDD-Model-1024x652.png" alt="Is BDD Testing? A model to help testers understand BDD better" class="aligncenter size-large wp-image-383" /></a>

For this next post, I want to explore the first part of this model, collaboration, in more detail.

<h3>Collaboration</h3>

> 'If you’re not having conversations, you’re not doing BDD'
> Liz Keogh - https://lizkeogh.com/2011/09/22/conversational-patterns-in-bdd/

Through interviews and conversations with testers I seen that a lot of tests tend to perceive BDD as the use of Gherkin syntax and automation tools.  Testers tend to pay very little attention to the collaborative aspects of BDD.  I suspect that part of the reason is due to testers first exposure to BDD coming from Dan North's article 'Introduction to BDD', which is heavy on tooling and light on collaborative exercises.  This isn't a criticism of the article since it was one of the first to be written.  However, BDD has changed over the years and even Dan himself has said that the work he did with JBehave was more of a 'thought experiment'[1].

> 'There are things about your domain that you don’t know, or you’ve misunderstood, or that nobody’s thought of yet. By talking through examples in groups, the chances of uncovering these gaps and misunderstandings is increased.'
> Liz Keogh - https://lizkeogh.com/2011/03/04/step-away-from-the-tools/

<h3>BDD is about conversations</h3>

It's about talking about your domain from the user's perspective to ensure you are building the right thing, and this can be achieved by coming together as a team to have conversations.  We involve members from testing, development, design and the business in an informal meeting that is more typically known as '[Three amigos](https://www.stickyminds.com/sites/default/files/magazine/file/2013/3971888.pdf)' to discuss and question what we plan to build.   The goal is to dispel any incorrect assumptions we may have, and remove any ignorance we have around what we want to deliver. [https://dannorth.net/2010/08/30/introducing-deliberate-discovery/](https://dannorth.net/2010/08/30/introducing-deliberate-discovery/)

There are tools we can use during our three amigos sessions to help us.  A testers goal is to generate questions and ensure the conversation stays inside the scope of the feature.  As a tester, questions are your best tool for collaboration sessions.  I find the following techniques or phrases help in a session

* [The five Ws - What, Who, Where, When, Why](https://en.wikipedia.org/wiki/Five_Ws)
* 'This maybe a stupid question but...' - Those stupid questions weed out a lot of assumptions
* 'So just to confirm....' - Again, verbalising what is required will weed out assumptions

<h3>Gherkin and Examples</h3>

Another tool, that is synonymous with BDD is Gherkin.  Gherkin uses Given, When, Then syntax to allow us to create examples in the form of Scenarios to demonstrate how we might expect acceptance criteria to behave.  For example:

```
Given the user has not ordered yet
When the user adds a book into the shopping cart
Then a discount of 10% is applied to the total.
```

Unfortunately, Gherkin syntax is another of the tripping points for testers. To be clear __Gherkin should not be used to create test cases__, the goal of Gherkin is to help distill examples of how we expect Acceptance-criteria to behave.  For example, a series of examples may focus on behaviour around a boundary of a specific value that results in different behaviour.  It's important to remember, as testers, that these boundaries are put into examples __because they are core to what the business wants to deliver__. They are not there as boundary value tests.

Gherkin examples are there to illustrate behaviour not to exhaustively test and it's important that testers, when involved in Three amigo sessions, use their skills and knowledge to raise questions and share information, not design hundreds of tests. As an aside, if you are still using test cases in your day to day testing, then keep them separate from Gherkin examples and consider adopting new approaches such as exploratory testing.

<h4>Example mapping</h4>

Writing examples in Gherkin is hard. However, there is a new approach called [Example mapping created by Matt Wynne](https://cucumber.io/blog/2015/12/08/example-mapping-introduction) that has been designed to help teams keep their discussion in scope, handle questions and ensure the right examples are being created.  [Matt Wynne has described in detail Example mapping here](https://cucumber.io/blog/2015/12/08/example-mapping-introduction) but in short it uses different coloured post-it notes as visual aids to help keep track of rules (acceptance-criteria), examples (Gherkin scenarios) and questions.  You can read more about how Testers have got on with Example mapping here: 

* [Lisa Crispin](https://twitter.com/lisacrispin) - [lisacrispin.com/2016/06/02/experiment-example-mapping/](http://lisacrispin.com/2016/06/02/experiment-example-mapping/) 
* [Toby Sinclair](https://twitter.com/tobythetester) - [tobythetesterblog.wordpress.com/2016/05/25/how-to-do-example-mapping/](https://tobythetesterblog.wordpress.com/2016/05/25/how-to-do-example-mapping/)

<h3>Conclusion</h3>

As I've said at the start of this section most of the testers I've met, when they think about BDD, think about Gherkin as a means to create test cases for automation.  Although the outside in development section hasn't been discussed yet. To me, the collaborative phase is the single most important part of BDD.  The focus on discovery, raising questions and revealing information about what we plan to build is a cornerstone of testing.  So it's vital that we ensure this part of the process is carried out and that testing is involved.  

Testers input into the delivery of a feature is more profound in the collaborative phase than in outside in development. I would even argue that you could execute the collaborative phase, not pursue the automation side of things and still see huge benefits.  I firmly believe now that to carry out BDD successfully you must have the collaborative phase and to miss this part out will leave you exposed to failure.