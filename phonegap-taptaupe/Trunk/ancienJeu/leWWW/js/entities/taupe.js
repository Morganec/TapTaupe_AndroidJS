define([	'createjs'],
    function(	createjs) {

        var Taupe = function(){
            this.x = 0;
            this.y = 0;
            this.width = 50;
            this.height = 50;



        }

       Taupe.prototype = new createjs.Bitmap(TAPTAUPE.loadQueue.getResult("taupe"));
        //Taupe.prototype = new createjs.Sprite()



        return Taupe;

    });