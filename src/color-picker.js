 document.onreadystatechange = () =>
    {
      if(document.readyState === 'complete')
       {
	    
		//created canvas dynamically--------------
			var cr_color_choose_btn=document.createElement('BUTTON');
			var attrs_choose_btn={
					id   :  'btn_color_choose',
					style :  'border:2px solid #000;background-color:#000;border-radius:13px;padding:6px 10px;color:#fff;cursor:pointer'
			};
			for(var attr in attrs_choose_btn){
				cr_color_choose_btn.setAttribute(attr,attrs_choose_btn[attr]);
			}
			cr_color_choose_btn.innerHTML='Color&nbsp;Choose';
			var cr_canvas=document.createElement('CANVAS');
			var attrs_canvas={
					width  : "200",
					height : "200",
					id     : "canvas",
					style  : "border-radius:100%;margin-top:5px;cursor : pointer;display:none;",
					
			};
			for(var attr in attrs_canvas){
				cr_canvas.setAttribute(attr,attrs_canvas[attr]);
			}
			var parent_div=document.getElementById('need_div');
			parent_div.appendChild(cr_color_choose_btn);
			parent_div.appendChild(cr_canvas);
			var canvas=document.getElementById('canvas');
			var elm=canvas.getContext('2d');
			var grd=elm.createLinearGradient(0,0,canvas.width,canvas.height);
			
			grd.addColorStop(0,    "rgb(255,   0,   0)");
			grd.addColorStop(0.10, "rgb(0, 0,   0)");
			grd.addColorStop(0.20, "rgb(255,   0, 255)");
			grd.addColorStop(0.30, "rgb(0,     0, 255)");
			grd.addColorStop(0.40, "rgb(0,   255, 255)");
			grd.addColorStop(0.50, "rgb(0,   255,   0)");
			grd.addColorStop(0.60, "rgb(255, 255,   0)");
			grd.addColorStop(0.62, "rgb(255, 255,   255)");
			grd.addColorStop(0.70, "rgb(0, 0,   0)");
			grd.addColorStop(1,    "rgb(255,   0,   0)");	
			
			elm.fillStyle=grd;
			elm.fillRect(0,0,canvas.width,canvas.height);
		//End of creating canvas dynamically-----------
		
		var flag=0;
		var prev_color=document.getElementById('text').style.color;
	    document.getElementById('btn_color_choose').addEventListener('click',function()
		{	
			if(document.getElementById('canvas').style.display=='block')
			{
				document.getElementById('canvas').style.display='none';
			}
			else
			{	
				main_work();
			}
				if(flag==0)
				{
					document.getElementById('text').style.color=prev_color;
				}
				else
				{
					flag=0;
				}
			
	   });
		function main_work()
        {
			canvas.style.display='block';
			canvas.addEventListener('mousemove',fun3);
			canvas.addEventListener('click',fun1);
			canvas.addEventListener('mouseleave',fun2);
			function fun1(evt)
			{
				var x=evt.pageX - getPositionX(canvas);
				var y=evt.pageY - getPositionY(canvas);
				var colorData=elm.getImageData(x,y,1,1);
				var color='rgb('+colorData.data[0]+','+colorData.data[1]+','+colorData.data[2]+')';
				// console.log(color);
				document.getElementById('text').style.color=color;
				flag=1;
				document.getElementById('canvas').style.display='none';
				canvas.removeEventListener('click',fun1);
				canvas.removeEventListener('mouseleave',fun2);
				canvas.removeEventListener('mousemove',fun3);
				prev_color=color;
			}
			function fun2()
			{
				document.getElementById('text').style.color=prev_color;
			}
			function fun3(evt)
			{
				var x=evt.pageX-getPositionX(canvas);
				var y=evt.pageY-getPositionY(canvas);
				var colorData=elm.getImageData(x,y,1,1);
				var color='rgb('+colorData.data[0]+','+colorData.data[1]+','+colorData.data[2]+')';
				document.getElementById('text').style.color=color;
			}
			//For getting position in x axis
			function getPositionX(elem)
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
			function getPositionY( elem )
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
		}		
	   }
	   
	}