---
layout: default
title: Archive
permalink: /archive/
---

# Blog list

{% for post in site.posts %}
<div>
  <a href="{{ post.url }}">{{ post.title }}</a>
  <p><small><strong>{{ post.date | date: "%B %e, %Y" }}</strong> . {{ post.category }} . <a href="http://erjjones.github.com{{ post.url }}#disqus_thread"></a></small></p>
</div>
{% endfor %}