---
layout: post
title:  "Code coverage and automated checks: Is 100% coverage enough?"
date:   2017-08-21 17:00:00 +0100
permalink: /code-coverage/index.html
tags: automation devops
image: /img/article/whackamole.jpg
---

<h2><a id="Questions_on_code_coverage_0"></a>Questions on code coverage</h2>
<p>Recently <a href="www.tjmaher.com">TJ Maher</a> (<a href="https://twitter.com/tjmaher1">@tjmaher1</a>) posted some great questions <a href="http://www.tjmaher.com/2017/08/need-your-expert-opinion-for-article.html">in his article</a> "Are unit tests and 100% code coverage enough?". Questions that we should be asking ourselves in regards to Continuous Development and DevOps. There was one question that jumped out at me. And it’s a question I find myself challenging a lot when it comes to automated checking.</p>
<blockquote>
<p>‘Do you think 100% code coverage of unit tests and integration tests is enough in environments using Continuous Deployment? What do you use as supplements in your testing efforts?’</p>
</blockquote>
<p>The discussion and pursuit of 100% code coverage with automated checks are nothing new. But, as continuous deployment’s goal is to enable teams to release regular, small releases and adopting a testing first culture.  And Automated checks have taken on a more vital role. It’s important to scrutinise automated checks more and ask:</p>
<blockquote>
<p><strong>What is the role of automated checks in helping us understand what sort of product we are actually releasing? What are the weaknesses of automated checks?</strong></p>
</blockquote>
<h2><a id="Is_100_Code_Coverage_enough_10"></a>Is 100% Code Coverage enough?</h2>
<p>When I think about code coverage I’m reminded of <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway’s game of life</a>. The Game of life, created by John Horton Conway, consists of four rules. These rules apply to an infinite two-dimensional grid, in which cells can be set as ‘alive’ or ‘dead’. The Game of Life’s four rules are:</p>
<ul>
<li>Any live cell with fewer than two live neighbours dies as if caused by underpopulation.</li>
<li>Any live cell with two or three live neighbours lives on to the next generation.</li>
<li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
<li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
</ul>
<p>You can find a more in-depth explanation of the Game of Life <a href="https://www.youtube.com/watch?v=ouipbDkwHWA">here</a>. However, the point I am making is that The Game of Life at first glance looks to be a simple set of rules.</p>
<p>So let’s imagine we are creating a product that follows these four rules. Each rule has clear criteria that we could create an automated check for, to confirm whether the rule is correct. With all four rules automated we have 100% code coverage and assuming our checks pass we are happy to release. Right?</p>
<h2><a id="Challenging_our_assumptions_of_the_product_23"></a>Challenging our assumptions of the product</h2>
<p>At the point of those automated checks passing, what do we know about them? We know that each rule passes our programmed expectation, but what else do we know? Consider how an end-user might use or consume the program. <a href="https://bitstorm.org/gameoflife/">There are many versions of The Game of Life that you can try out online</a>. What do you notice? The Game of Life offers many different outcomes. Depending on what state you put your game in before you begin, leading to all sorts of possibilities. Does 100% code coverage inform us of all these different end results?</p>
<p>Now let’s consider different contexts for our product and the risks that might affect them:</p>
<ul>
<li>Imagine if the Game of Life was being used in a video game to create bots? How might that initial state affect the game?</li>
<li>What if it was being used to create visualisations in a club? Would it create visuals that enhance the space? How would it avoid creating patterns that might be undesirable?</li>
<li>If we left our product to run for days, weeks, years to create mathematical models, what would happen? What if we filled the grid with many live cells? Would it have an effect on the performance and stability of whatever was running it?</li>
</ul>
<p>These are hypothetical situations, but whatever your product is it is vulnerable to many, many risks. It shows us the importance of risks such as environmental or the desires of end users. Something that automation cannot inform us about. 100% code coverage is unable to tell us everything about our product, so what’s the value in automation? Are there other testing activities we need?</p>
<h2><a id="Knowing_the_limits_of_automation_35"></a>Knowing the limits of automation</h2>
<p>Automation is useful but has limitations. 100% Code coverage <strong>cannot</strong> give us a full picture, but it can support testing and encourage testing activities. We <strong>can</strong> use automation to detect changes in our product to trigger other testing activities.</p>
<p>So is 100% code coverage enough? My opinion is a big fat <em>NO</em>. But, the more code coverage we have the better we can react to the unexpected changes in the system. Tester’s can use their skills and knowledge of the product to support Developers with code coverage. But we can also use our Testing skills in other phases of the development lifecycle.</p>
<p>What might these other testing activities look like? Here are a few recommendations that have some great answers:</p>
<ol>
<li>The release of <a href="https://leanpub.com/testingindevops">‘Testing in Devops’</a> by Katrina Clokie</li>
<li>Rob Meaney and Gus Evangelisti talks <a href="https://dojo.ministryoftesting.com/series/testbash-belfast-2017">from TestBash Belfast</a> (Requires subscription access).</li>
<li><a href="https://twitter.com/DanAshby04">Dan Ashby’s</a> blog post on <a href="https://danashby.co.uk/2016/10/19/continuous-testing-in-devops/">Continuous Testing in DevOps</a></li>
</ol>