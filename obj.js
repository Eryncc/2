let points = [[0,0],[0,-6], [8,3], [8,7],[4,9],[0,6],[-4,9],[-8,7],[-8,3],[0,-6],[0,0]]; //list資料
var fill_colors = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
var line_colors = "0d1b2a-1b263b-415a77-778da9-1d3557".split("-").map(a=>"#"+a)

class Obj {
  constructor(args) {
    this.p = args.p || createVector(random(width), random(height)); //描述該物件的初始位置
    this.v = createVector(random(-1, 1), random(-1, 1)); //設定一個物件的移動速度
    this.size = random(5, 10); //一個物件的放大倍率
    this.color = random(fill_colors); //物件充滿顏色
    this.stroke = random(line_colors); //物件外框顏色
    this.hit = 'default';
    this.timenum1 = 0;
  }

  draw() {
    push();
    translate(this.p.x, this.p.y);
    scale(this.v.x < 0 ? 1 : -1, -1);
    if (this.hit === 'default') {
      fill(this.color);
    } else if (this.hit === 'hit') {
      fill('red');
    }
    stroke(this.stroke);
    strokeWeight(5);
    beginShape();
    for (let k = 0; k < points.length; k++) {
      curveVertex(points[k][0] * this.size, points[k][1] * this.size);
    }
    endShape();
    pop();
  }

  update() {
    this.p.add(this.v);
    if (this.p.x <= 0 || this.p.x > width) {
      this.v.x = -this.v.x;
    }
    if (this.p.y <= 0 || this.p.y > height) {
      this.v.y = -this.v.y;
    }
  }

  isBallInRanger(x, y) {
    let d = dist(x, y, this.p.x, this.p.y);
    return d < 4 * this.size;
  }
}