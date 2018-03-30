---
layout: default
title: Training
permalink: /training/
---

<h1>Training</h1>

{% for page in site.training %}
<div>
  <a href="{{ page.url }}">{{ page.title }}</a>
</div>
{% endfor %}