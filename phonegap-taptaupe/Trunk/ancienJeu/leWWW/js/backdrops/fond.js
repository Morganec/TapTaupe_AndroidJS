define([	'createjs'],
    function(	createjs) {

        'use strict';

        var bitmap = new createjs.Bitmap(TAPTAUPE.loadQueue.getResult('fond'));
        var scaleH = TAPTAUPE.canvas.height / bitmap.getBounds().height;
        var scaleW = TAPTAUPE.canvas.height / bitmap.getBounds().width;

        var Fond = function () {
            this.matrix2d = new createjs.Matrix2D(); //permet de faire des translation
            alert("scale H"+scaleH+"scale W"+scaleW);
            this.matrix2d.scale(scaleW, scaleW);
            this.image = TAPTAUPE.loadQueue.getResult('fond');
            this.x = 0;
            this.y = 0;
        };

        Fond.prototype = new createjs.Shape();


        Fond.prototype.scroll = function (speed) {
        this.matrix2d.translate(-speed, 0); //deplacement de l'image
        //je vide le graphic et j'ajoute l'image , on lui dis que la shape est un rectangle on lui dis ou le placer
        this.graphics.clear().beginBitmapFill(this.image, "repeat", this.matrix2d).rect(0, 0, TAPTAUPE.canvas.width, TAPTAUPE.canvas.height);
        }

        return Fond;

    });