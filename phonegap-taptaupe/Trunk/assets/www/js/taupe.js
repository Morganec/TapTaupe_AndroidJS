var Taupe = function(augmenter,diminuer){


    var data = {
        images: ["img/taupe2.png"],
        frames: {width:168, height:125},
        animations: {
            bouger: [1,5,"bouger",0.5],  //le 0,5 sert a ralentir le sprite on peut metre 1 pour aller plus vite
            disparu: [0,"disparu"]
        }
    };
    var spriteSheet = new createjs.SpriteSheet(data);

    var animation = new createjs.Sprite(spriteSheet,"bouger");
    animation.scaleX = animation.scaleY = 0.5;
    animation.gotoAndPlay("bouger");
    animation.addEventListener("click", taupeClick);
    function taupeClick(evt){
        evt.target.gotoAndStop("disparu");
        augmenter()
        this.removeEventListener("click", taupeClick);
    }
    function supprimerEvent(){
        this.removeEventListener("click", taupeClick);
    }
    return animation;
 }
