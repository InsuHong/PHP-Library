
function WOW_Rotation_Banner(class_name)
{
  this.css_class = class_name;
  this.effect = 'fade';
  this.direction = 'left';
  this.delay = 5000;
  this.old_num = 1;  
  this.now_num = 1;
  this.max_num = 0;
  this.time_obj;
  this.zindex = 10;  
  this.out_obj;
  this.pagebutton;  
  this.pagetext = "";
  this.items;
  this.arrow;  
  this.loop = 'true';    
  this.autostart = 'true';      
  this.arrow_pre = "";    
  this.arrow_next = "";      
  this.start();
}

WOW_Rotation_Banner.prototype.start = function()
{
  let layout_obj = document.getElementsByClassName(this.css_class);
  this.out_obj = layout_obj[0];
  this.out_obj.style.width = '100%';  
  //외부 설정파일 읽기시작
  if(this.out_obj.getAttribute("effect") != null) this.effect = this.out_obj.getAttribute("effect");    
  if(this.out_obj.getAttribute("delay") != null) this.delay = this.out_obj.getAttribute("delay");  
  if(this.out_obj.getAttribute("zindex") != null) this.zindex = this.out_obj.getAttribute("zindex");    
  if(this.out_obj.getAttribute("pagebutton") != null) this.pagebutton = this.out_obj.getAttribute("pagebutton");      
  if(this.out_obj.getAttribute("pagetext") != null) this.pagetext = this.out_obj.getAttribute("pagetext");        
  if(this.out_obj.getAttribute("arrow") != null) this.arrow = this.out_obj.getAttribute("arrow");        
  if(this.out_obj.getAttribute("arrow_pre") != null) this.arrow_pre = this.out_obj.getAttribute("arrow_pre");        
  if(this.out_obj.getAttribute("arrow_next") != null) this.arrow_next = this.out_obj.getAttribute("arrow_next");            
  if(this.out_obj.getAttribute("loop") != null) this.loop = this.out_obj.getAttribute("loop");          
  if(this.out_obj.getAttribute("autostart") != null) this.autostart = this.out_obj.getAttribute("autostart");            
  
  //외부 설정파일 읽기완료 
  
  
  this.out_obj.style.position = 'relative';
  this.out_obj.style.overflow = 'hidden';
  this.items = this.out_obj.getElementsByClassName('item');  
  this.max_num = this.items.length;
  
  if(this.max_num > 1)
  {
    for(i = 0 ; i < this.items.length ; i++)
    {
      this.items[i].style.position = 'absolute';
      this.items[i].style.opacity = 0;          
      this.items[i].style.top = 0;                
      this.items[i].style.width = "100%";                
      this.items[i].style.height = "100%";                            
      if(i == 0) 
      {
         this.items[i].style.opacity = 1;     
         this.items[i].style.zIndex = this.zindex;
      }
      else 
      {
        this.items[i].style.zIndex = 0;       
        if(this.effect == 'slide') 
        {
          this.items[i].style.opacity = 1;     
          this.items[i].style.zIndex = this.zindex;      
          this.items[i].style.transform = "translateX(100%)";           
        }        
      }

    }  
    clearTimeout(this.time_obj);
    this.old_num = 1;     
    if(this.autostart == 'true')
    {
      this.time_obj = setTimeout(this.Next.bind(this), this.delay);
    }
//페이지 버튼추가
     this.page_btn();        

    
  } 
};

WOW_Rotation_Banner.prototype.page_btn = function()
{
  //페이지 번호 추가
  newDiv = document.createElement('div');
  newDiv.style.position = 'absolute';
  newDiv.style.zIndex = this.zindex + 1;
  newDiv.style.textAlign = "center";  
  newDiv.style.width  = "100%";  
  newDiv.className = 'WB_btn_layout';
  if(this.pagebutton == null || this.pagebutton == "" || this.pagebutton == "none")  
  {
     newDiv.style.display = 'none';
  }
  let this_obj = this;
  let i = 0;
  let btns;
  let newButton = new Array(); 
  for(i = 1 ; i <= this.max_num ; i++)
  {
    newButton[i] = document.createElement('input');  
    newButton[i].type = 'button';      
    if(i == 1) 
    {
      btns = newButton[i];
      newButton[i].className = 'WB_button_on WB_button' + i;      
    }  
    else
    {    
      newButton[i].className = 'WB_button_off WB_button' + i;
    }
    newButton[i].idx = i;
    if(this.pagetext == 'num') newButton[i].value = i;      
    newButton[i].addEventListener("click", function() 
    {
      this_obj.Set(this.idx);
    });    

    newDiv.appendChild(newButton[i]);  
  } 
  
  this.out_obj.appendChild(newDiv);  
  console.log(this.out_obj);
  //버튼위치 추가
  if(this.pagebutton == 'top') 
  {
    newDiv.style.top = 0;  
  }  
  if(this.pagebutton == 'middle') 
  {
    newDiv.style.top = '50%';    
    newDiv.style.marginTop = -1*(newDiv.clientHeight / 2) + 'px';
  }
  if(this.pagebutton == 'bottom') 
  {
    newDiv.style.bottom = 0;
  }
  
  if(this.pagebutton == 'left') 
  {
    newDiv.style.width = btns.clientWidth + 'px';
    newDiv.style.top = '50%';
    newDiv.style.marginTop = -1*(newDiv.clientHeight / 2) + 'px';
    newDiv.style.left = 0;    
  }  
  if(this.pagebutton == 'right') 
  {
    newDiv.style.width = btns.clientWidth + 'px';
    newDiv.style.top = '50%';
    newDiv.style.marginTop = -1*(newDiv.clientHeight / 2) + 'px';
    newDiv.style.right = 0;    
  }  

    let preDiv = document.createElement('div');

    preDiv.style.position = 'absolute';
    preDiv.style.zIndex = this.zindex + 2;
    preDiv.style.textAlign = "center";  
    preDiv.className = 'btn_pre';    

    this.out_obj.appendChild(preDiv);  


    let newButton1 = document.createElement('input');  
    newButton1.style.position = '';
    newButton1.type = 'button';      
    newButton1.value = this.arrow_pre;
    newButton1.className = 'WB_button_pre';      
    newButton1.addEventListener("click", function() 
    {
      this_obj.Pre();
    }); 
    preDiv.appendChild(newButton1);  
    

    preDiv.style.left = 0;            
    preDiv.style.top = '50%';    
    preDiv.style.marginTop = -1*(newButton1.clientHeight / 2) + 'px';    
    preDiv.style.display = "none";      
    




    let nextDiv = document.createElement('div');

    nextDiv.style.position = 'absolute';
    nextDiv.style.zIndex = this.zindex + 2;
    nextDiv.style.textAlign = "center";  
    nextDiv.className = 'btn_next';    

    this.out_obj.appendChild(nextDiv);  


    let newButton2 = document.createElement('input');  
    newButton2.style.position = '';
    newButton2.type = 'button';      
    newButton2.value = this.arrow_next;
    newButton2.className = 'WB_button_next';      
    newButton2.addEventListener("click", function() 
    {
      this_obj.Next();
    }); 
    nextDiv.appendChild(newButton2);  
    

    nextDiv.style.right = 0;            
    nextDiv.style.top = '50%';    
    nextDiv.style.marginTop = -1*(newButton2.clientHeight / 2) + 'px';    
    if(this.arrow != 'true')     nextDiv.style.display = "none";      

    
    

};

WOW_Rotation_Banner.prototype.Next = function()
{
  this.direction = 'left';
  this.now_num++;
  if(this.now_num > this.max_num) this.now_num = 1;
  this.Set(this.now_num);
};

WOW_Rotation_Banner.prototype.Pre = function()
{
  this.direction = 'right';
  this.now_num--;
  if(this.now_num <= 0) this.now_num = this.max_num;
  this.Set(this.now_num);
};


WOW_Rotation_Banner.prototype.Set = function(img_num)
{
  if(this.old_num == img_num) return;  //같은번호 연속으로 클릭시 작동멈춤
  this.now_num = img_num;
  let ck_num = 0;

  let btns_layout = this.out_obj.getElementsByClassName('WB_btn_layout')[0];    
  
  let btn_item, btn_item_id;
  let ani_in = "", ani_out = "";
  if(this.effect == 'fade') 
  {
     ani_in = "fade_in";
     ani_out = "fade_out";     
  }    
  if(this.effect == 'slide')   
  {

    if(this.direction == 'left')
    {
       ani_in = "left_in";
       ani_out = "left_out";     
    }  
    else
    {
       ani_in = "right_in";
       ani_out = "right_out";     
    }  
  }  
  
  
  for(i = 0 ; i < this.max_num ; i++)
  {
     ck_num = i + 1;
     btn_item_id ="WB_button" + ck_num;
     btn_item = btns_layout.getElementsByClassName(btn_item_id)[0];  
     if(ck_num == this.now_num) 
     {
       this.items[i].style.animation = ani_in + " 2s ease alternate both";       
       if(this.effect == 'fade') this.items[i].style.zIndex = this.zindex; 
       btn_item.className = 'WB_button_on WB_button' + ck_num;
     }  
     if(ck_num == this.old_num) 
     {
       this.items[i].style.animation = ani_out + " 2s ease alternate both";       
       if(this.effect == 'fade') this.items[i].style.zIndex = 0;      
       btn_item.className = 'WB_button_off WB_button' + ck_num;
     }
  }  

  //처음일땐 이전버튼 감추기
  let btns_pre = this.out_obj.getElementsByClassName('btn_pre')[0];      
  let btns_next = this.out_obj.getElementsByClassName('btn_next')[0];        
  if(this.arrow == 'true')   
  {
    if(this.now_num == 1)
    {
      btns_pre.style.display = 'none';
    }  
    else
    {
      btns_pre.style.display = 'block';
    }  
    if(this.now_num == this.max_num)
    {
      btns_next.style.display = 'none';
    }
    else
    {
      btns_next.style.display = 'block';
    }
    
    
  }
  else  
  {
     btns_pre.style.display = 'none';
     btns_next.style.display = 'none';     
  }


  this.old_num = this.now_num;   
  clearTimeout(this.time_obj);    
  if(this.now_num == this.max_num)
  {
      if(this.loop == 'true' && this.autostart == 'true')
      {
        this.time_obj = setTimeout(this.Next.bind(this), this.delay);    
      }
 }  
 else
 {
      if(this.autostart == 'true')
      {
        this.time_obj = setTimeout(this.Next.bind(this), this.delay);    
      }
 } 


  



};