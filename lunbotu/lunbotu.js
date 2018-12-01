var box = document.getElementById("container");
   var ul = box.children[0].children[0];
   var ol = box.children[0].children[1];
   var gc = ul.children;
   
   var Newli = gc[0].cloneNode(true);
   ul.appendChild(Newli);

   for(var i=0;i<gc.length-1;i++)
   {
       var NewOlli = document.createElement("li");
       NewOlli.innerHTML=i+1;
       ol.appendChild(NewOlli);
   }

   var olli = ol.children;
   ol.children[0].className = "now";

   for(var i=0;i<olli.length;i++)
   {
       olli[i].index = i;
       olli[i].onclick = function ()
       {
           for(var j=0;j<olli.length;j++)
           {
               olli[j].className="";
           }
           olli[this.index].className="now";
           animate(ul,-this.index*ul.children[0].offsetWidth);
           key = square = this.index;
       }
   }

   var timer = null;
   var key = 0;
   var square = 0;
   timer = setInterval(play,3000);

   function play(){
       key++;
       square++;
       if(key>olli.length)
       {
           key=1;
           ul.style.left=0;
       }
       animate(ul,-key*ul.children[0].offsetWidth);

       square = square>olli.length-1 ? 0:square;
       for(var j=0;j<olli.length;j++)
       {
           olli[j].className="";
       }
       olli[square].className="now";

   }

   box.onmouseover = function(){
       clearInterval(timer);
   }
   box.onmouseout = function(){
       timer = setInterval(play,3000);
   }

   var arr = box.children[0].children[2].children;
  arr[0].onclick=function(){
      key--;
      square--;
      if(key<0)
      {
          key=4;
          ul.style.left=-5*ul.children[0].offsetWidth+"px";
      }
      animate(ul,-key*ul.children[0].offsetWidth);

      square = square <0? olli.length-1:square;
      for(var j=0;j<olli.length;j++)
      {
          olli[j].className="";
      }
      olli[square].className="now";
  }
  arr[1].onclick=function()
  {
      play();
  }
   
   function animate(obj,target)
   {
       clearInterval(obj.timer);
       var speed = obj.offsetLeft < target ? 55:-55;
       obj.timer=setInterval(function(){
           var result = target - obj.offsetLeft;
           obj.style.left=obj.offsetLeft +speed +"px";
           if(Math.abs(result)<=55){
               obj.style.left = target + "px";
               clearInterval(obj.timer);
           }
       },10);
   }