var count = 1;

var addElement = function() {
  var input = document.createElement("input");

  var att = document.createAttribute("placeholder");
  att.value = "Field " + count;

  var att2 = document.createAttribute("name");
  att2.value = "field" + count;
  count++;

  input.setAttributeNode(att);
  input.setAttributeNode(att2);

  var li = document.createElement("li");
  li.appendChild(input);

  var ul = document.getElementById("list");
  ul.appendChild(li);
}
