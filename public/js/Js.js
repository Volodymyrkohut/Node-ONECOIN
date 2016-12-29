function show (){
  this.children[0].id = "c";
  var ul = this.getElementsByTagName("ul")[0];
  if(ul){
    ul.style.display = "block";
  }
}

function hide (){
  this.children[0].id = "c2"
  var ul = this.getElementsByTagName("ul")[0];
  if(ul){
    ul.style.display = "none";
  }
}

var li = document.getElementById("ad").getElementsByTagName("li");

for(var i = 0; i < li.length; i++ ){    
    li[i].addEventListener('mouseover',show,false);
    li[i].addEventListener('mouseout',hide,false);
}