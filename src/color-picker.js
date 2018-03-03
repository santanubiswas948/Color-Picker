document.onreadystatechange = () =>
{
  if(document.readyState === 'complete')
   {
        var prev_color=document.getElementById('text').style.color;
        var flag=0;
        document.getElementById('btn_color_choose').addEventListener('click',function()
      {

                if(document.getElementById('canvas').style.display=='block')
                {
                  document.getElementById('canvas').style.display='none';
                  if(flag==0)
                  {
                    document.getElementById('text').style.color=prev_color;
                  }
                  else
                  {
                      flag=0;
                  }
                }
                else
                {
                    var canvas=document.getElementById('canvas');
                    canvas.style.display='block';
                    var elm=canvas.getContext('2d');
                    var grd=elm.createLinearGradient(0,0,canvas.width,canvas.height);

                    grd.addColorStop(0,    "rgb(255,   0,   0)");
                    grd.addColorStop(0.15, "rgb(255,   0, 255)");
                    grd.addColorStop(0.33, "rgb(0,     0, 255)");
                    grd.addColorStop(0.49, "rgb(0,   255, 255)");
                    grd.addColorStop(0.67, "rgb(0,   255,   0)");
                    grd.addColorStop(0.84, "rgb(255, 255,   0)");
                    grd.addColorStop(1,    "rgb(255,   0,   0)");

                    elm.fillStyle=grd;
                    elm.fillRect(0,0,canvas.width,canvas.height);
                    //mousemove event------------------------
                    canvas.addEventListener('mousemove',function(evt){
                      var x=evt.pageX-getOffsetLeft(canvas);
                      var y=evt.pageY-getOffsetTop(canvas);
                      var colorData=elm.getImageData(x,y,1,1);
                        var color='rgb('+colorData.data[0]+','+colorData.data[1]+','+colorData.data[2]+')';
                        document.getElementById('text').style.color=color;
                    });

                    //click on canvas-------------
                    canvas.addEventListener('click',fun1);

                    //mouseleave canvas---------------
                    canvas.addEventListener('mouseleave',fun2);

              }
              function fun2()
              {
                document.getElementById('text').style.color=prev_color;
              }
              function fun1(evt){
                flag=1;
                var x=evt.pageX-getOffsetLeft(evt.target);
                var y=evt.pageY-getOffsetTop(evt.target);
                var colorData=elm.getImageData(x,y,1,1);
                var color='rgb('+colorData.data[0]+','+colorData.data[1]+','+colorData.data[2]+')';
                document.getElementById('text').style.color=color;
                console.log(color);
                prev_color=color;
                evt.target.style.display='none';
                evt.target.removeEventListener("click",fun1);
                evt.target.removeEventListener("mouseleave",fun2);
              }
              //For getting x position of div element-----------------------------------------
              function getOffsetLeft( elem )
              {
                  var offsetLeft = 0;
                  do {
                          if ( !isNaN( elem.offsetLeft ) )
                          {
                              offsetLeft += elem.offsetLeft;
                          }
                      } while( elem = elem.offsetParent );
                  return offsetLeft;
              }
              //for getting y position of div element------------------------------------------
              function getOffsetTop( elem )
              {
                  var offsetTop = 0;
                  do {
                        if ( !isNaN( elem.offsetTop ) )
                        {
                            offsetTop += elem.offsetTop;
                        }
                    } while( elem = elem.offsetParent );
                  return offsetTop;
              }
  });
 }
}
