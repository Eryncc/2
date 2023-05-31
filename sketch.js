
//var bullet_colors= "1c2321-7d98a1-5e6572-a9b4c2".split("-").map(a=>"#"+a)

//畫points所有"點"的物件定義
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[]//把產生的"所有"的物件，為物建倉庫，所有的物件資料都在此

//設定飛彈物件的變數
var bullet
var bullets =[]//把產生的"所有"的物件，為物建倉庫，所有的物件資料都在此

//設定怪物物件的變數
var monster
var monsters =[]//把產生的"所有"的物件，為物建倉庫，所有的物件資料都在此
//設定砲台位置
var shipP

//設定分數
var score = 0

function preload(){ //程式碼準備執行之前，所執行的程式碼內容，比sut up()更早執行
	 //elephant_sound = loadSound("sound/elephant.wav");
   bullet_sound = loadSound("sound/Launching wire.wav");

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2) //預設砲台位置為(width/2,height/2)
  for(var i=0;i<20;i=i+1){//i=0,1,2,3,4....9
    ball = new Obj({})//產生一個Obj class元件
    balls.push(ball) //把ball物件放入到balls陣列內

  }
  createCanvas(windowWidth, windowHeight);
  for(var i=0;i<10;i=i+1){//i=0,1,2,3,4....9
    monster = new Monster({})//產生一個Obj class元件
    monsters.push(monster) //把ball物件放入到balls陣列內
  }
}
function draw() {
  background("#fee9e1");
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  //}
 //上下左右建
  if(keyIsPressed){
     
    if(key=="ArrowLeft" || key=="a"){ //按下左鍵
      shipP.x = shipP.x - 5
    }
    if(key=="ArrowRight"|| key=="d"){ //按下右鍵
      shipP.x = shipP.x + 5
  }
    if(key=="ArrowUp"|| key=="w"){ //按下往上鍵
      shipP.y = shipP.y - 5
  }
    if(key=="ArrowDown"|| key=="s"){ //按下往下鍵
      shipP.y = shipP.y + 5
  }

  }
  //大象的顯示
  for(let ball of balls)//只要是陣列的方式，都可以利用在此方式處理
  {
    ball.draw()
    ball.update()
      //在物件上按下滑鼠，物件消失不見，分數+1分
      for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有無接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score +1
        // elephant_sound.play()
      }
    }
   }
  
  //飛彈的顯示
  for(let bullet of bullets)//只要是陣列的方式，都可以利用在此方式處理
  {
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示
  for(let monster of monsters)//只要是陣列的方式，都可以利用在此方式處理
  {
    if(monster.dead == true && monster.timenum>40){
      monsters.splice(monsters.indexOf(monster),1)//從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取1個
    }
    monster.draw()
    monster.update()
      //在物件上按下滑鼠，物件消失不見，分數+1分
      for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有無接觸現在的ball
        // monsters.splice(monsters.indexOf(monster),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取1個
        bullets.splice(bullets.indexOf(bullet),1)
        score = score -1
        monster.dead = true //代表該怪物死亡
      }
    }
  }

  textSize(60)
  text(score,50,50) //在座標為(50，50)上，顯示score分數內容
  push() //重新規劃畫原點(0,0)，在視窗中心
  let dx = mouseX - width/2
  let dy = mouseY - height/2
  let angle = atan2(dy,dx)
  //translate(width/2,height/2)
  translate(shipP.x,shipP.y)
  fill("#ec7d10")
  noStroke()
  rotate(angle)
  triangle(-25,25,-25,-25,50,0)// 設定三個點，畫成一個三角形
  pop()//恢復原本設定，原點(0,0)在視窗左上角
}
//滑鼠按下產生新物件
function mousePressed(){
  //按一下產生一個飛彈
  bullet = new Bullet({})//在滑鼠按下的地方，產生一個ullet class元件(產生一個飛彈)
  bullets.push(bullet) //把bullet物件放入到bullets陣列內(丟到倉庫)
  bullet_sound.play()
}
//按下空白建
function keyPressed(){      
  if(key==" "){ //按下空白建，發射飛彈，其實跟按下滑鼠功能一樣
    bullet = new Bullet({})//在按下空白建的地方，產生一個ullet class元件(產生一個飛彈)
    bullets.push(bullet) //把bullet物件放入到bullets陣列內(丟到倉庫)
     bullet_sound.play()
    
  }
  

}    
         