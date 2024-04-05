let interval=[];
let second=1;
let minute=0;
let hour=0;
let errors=0;
let successes=0; 
let speed=1000;
let speedup=500;
const $input = document.querySelector("input");
const $article =  document.querySelector("article");
function initialGame(level){
  if(level=="easy"){
      speed=2000;
      speedup=600;
  }
  if(level=="normal"){
      speed=1000;
      speedup=500;
  }
  if(level=="hard"){
      speed=700;
      speedup=200;
  }
  document.getElementById("menu").style.display="none";
  document.getElementById("result").style.display="none";
  document.getElementById("game").style.display="block";        
  let listLettre=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  $input.focus();
  let tm=document.querySelector("time");

  interval.push
  (setInterval(()=>{ 
      second++     
      if(second==60){
          second=0
          minute+=1
      }
      if(minute==60){
          minute=0
          hour+=1
      }
       if(hour>0)
        tm.textContent="Time: "+hour+":"+minute+":"+second;
       else{
          tm.textContent="Time: "+minute+":"+second;
       }       
  },200));
  interval.push(setInterval(()=>{
        let num=Math.floor(Math.random()*25);
        let lettre=listLettre[num]
        $article.innerHTML+=`
        <x-lettre onclick="screenTouch(this)" id="${lettre}" style=" top:90%; left:${Math.floor(Math.random()*80)}%" >
          ${lettre}
      </x-lettre>
        `;
    },speed)); 
  interval.push(setInterval(()=>{
     document.querySelectorAll("x-lettre").forEach(c=>{
       let top=c.style.top.replace("%","")
      if( top<=0){
            c.remove();
            errors++;
            document.getElementById("Errors").innerText=` Errors: ${errors}/10 `;
            if(errors==10)
             gameOver();
          }
          c.style.top=top-5+"%"
     })

    },speedup));
  $input.addEventListener("keyup",function(event){
      let {key}=event;
      let $element=document.getElementById(`${key}`)
      if($element!=null){
        successes++;    
        document.getElementById("Successes").innerText=` Successes: ${successes}`;        
        $element.remove();
      }
  })


}
function gameOver(){
 interval.map(e=>clearInterval(e));
 interval=[]
 second=1;
 minute=0;
 hour=0;
 errors=0;
 successes=0; 
 document.getElementById("game").style.display="none";
 document.getElementById("result").style.display="flex";
 $article.innerHTML="";
}
function backMenu(){
 document.getElementById("game").style.display="none";
 document.getElementById("result").style.display="none";
 document.getElementById("menu").style.display="flex";
}
function screenTouch(e){
e.remove()
successes++;    
document.getElementById("Successes").innerText=` Successes: ${successes}`;        
}