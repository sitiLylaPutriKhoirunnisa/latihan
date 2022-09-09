window.addEventListener("DOMContentLoaded",() =>{
    const{random,sin,cos,PI,round,hypot,sqrt,cbrt} =Math
    class Particles{
        constructor(x,y,fill,life,splice = true){
            this.pos = new Vec2d(x,y);
            this.vel = new Vec2d(0,0);
            this.acc = new vec2d(0,0);
            this.splice = splice;
            this.randomVec = randomVec2d(30);
            this.fill = fill; 
            this.life = life;
            this.r = 5;
        }
        draw(ctx){
            ctx.fillStyle = this.fill;
            ctx.beginPath();
            ctx.fill();
        }
        update(){
            if(this.splice){
                this.life -= 1;
                this.r -= this.r/this.life;
            }
            this.vel = this.vel.add(this.acc);
            this.pos = this.pos.add(this.vel);
        }
        updateRandomVec(){
            this.update();
            this.pos = this.pos.add(this.randomVec);
        }
        conectLines(other,ctx,dist,fill){
            let dx = this.pos.x - other.pos.x;
            let dy = this.pos.y - other.pos.y;
            let d = hypot(dx,dy);

            if(d < this.r * dist){
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeStyle = fill;
                ctx.moveTo(this.pos.x+this.r/2,this.pos.y+this.r/2)
                ctx.lineTo(other.pos.x+other.r/2,other.pos.y+other.r/2);
                ctx.stroke();
            }
        }
    }
    class vec2d{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
        add(v){
            return new Vec2d(this.x + v.x , this.y + v.y);
        }
        sub(v){
            return new Vec2d(this.x - v.x , this.y - v.y);
        }
        mult(n){
            return new Vec2d(this.x * n , this.y * n);
        }
    }
    const randomVec2d = (n = 10) =>{
        let spread = n * random();
        let x = cos(spread)*n;
        let y= sin (spread)*n;
        return new Vec2d(x,y)
    }
    const cvx =
    document.querySelector(".canvas");
    const ctx = cvx.getContext("2d");
    let touchParticles = [];
    let s =4;
    let W = cvx.width = (innerWidth)*s;
    let H = cvx.height = (innerHeight)*s;
    let color;
    function userTouch(e){
        for(let k = 0;k < e.changedTouches.length;k++){
            let tx = e.changedTouches[k].clientX*s;
            let tY = e.changedTouches[k].clientY*s;
            color = getRandomRgb();
            for(let j = 0;j <20;j++){
                touchParticles.push(new Particles(tx,ty,color,50));
            }
        }
    }
    cvx.addEventListener("touchstart",userTouch);
    const getRandomRgb = (fr=255,fg=255,fb=255)=>{
        let r = round(random()*fr+100);
        let g = round(random()*fg+100);
        let b = round(random()*fb+100);
        return `rgb(${r},${g},${b})`;
    }
    function animation(){
        ctx.clearRect(0,0,W,H);
        for (let j = 0;j < touchParticles.length;j++){
            touchParticles[j].draw(ctx);
            touchParticles[j].stroke = true;
            touchParticles[j].updateRandomVec();
            touchParticles[j].fill = getRandomRgb();
            if(touchParticles[j].life<= 0){
                touchParticles.splice(j,10);
            }

        }
    
    for(let j = 0;j < touchParticles.length;j++){
        for(let i = touchParticles.length-1;i>=0;1--)
        {
            touchParticles[j].connectLines
            (touchParticles[i],ctx,50,color);
        }
    }
    requestAnimationFrame(animation);
    }
    animation();
    window.addEventListener("resize",()=>{
        W = cvx.width = (innerWidth)*s;
        H = cvx.height = (innerHeight)*s;
        ctx.clearRect(0,0,W,H);
    });
});

alert(`tap/MultiTap`);
