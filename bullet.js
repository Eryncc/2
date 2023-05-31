//定義一個bullet 物件的class
let cpoints = [[0,0],[0,6],[-3,-1],[-1,-1],[0,-6],[3,1],[1,1],[0,6],[0,0]];
var bullet_colors= "ffb700-ffc300-ffd000-ffdd00-ffea00".split("-").map(a=>"#"+a)

class Bullet{
    constructor(args){ //預設值，基本資料(物件顏色，移動速度，大小，初始顯示位置...)
        //this.r = args.r || 40 //設定的飛彈有大小時 就傳參數args.r來設定飛彈大小，沒傳參數，就已10為主
        this.p = args.p || shipP.copy() //createVector(width/2,height/2) //建立一個向量，{x:width/2,height/2}
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
        this.size = random (3,6)
        this.color = args.color ||random(bullet_colors)

  
    }
    draw(){ //繪出物件程式碼
        push() //
            translate(this.p.x,this.p.y)
            scale(this.v.x<0?1:-1,-1)
            fill(this.color)
            //noStroke()
            //ellipse(0,0,this.r)
            strokeWeight(3)
            beginShape()
            for(var c=0;c<cpoints.length;c=c+1){
                curveVertex(cpoints[c][0]*this.size,cpoints[c][1]*this.size)
            }
            endShape()
        pop()
  
    }
    update(){ //計算出移動後的位子
        // this.p.x = this.p.x +this.v.x //x目前位置(this.p.x)加上x軸的移動速度(this.v.x)
        // this.p.y = this.p.y +this.v.y //y目前位置(this.p.y)加上y軸的移動速度(this.v.y)
        this.p.add(this.v)
    }
  }