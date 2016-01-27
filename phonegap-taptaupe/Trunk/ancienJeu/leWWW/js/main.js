require([	'when',
        'createjs',
        'scenes/loading',
        'scenes/game'
        ],  //chargement des librairies à partir de reguire.js
    function(	when,
                 createjs,
                 LoadingScene,
GameScene) {

        'use strict';	// grab the canvas using good-ol' vanilla js
        var canvasElement = document.getElementById('gameCanvas');


        var clearStage = function() {
            TAPTAUPE.stage.removeAllChildren();

            TAPTAUPE.stage.update();
        };




        var initializeGame = function() {
            alert("you win!");
            clearStage();  //retire le stage et charge le jeu

            // set the loading scene to null in order to assist with garbage collection
            loadingScene = null;

            // remove the event listeners currently attached to the canvas; normally, these events
            //	would be attached to an element within the stage, and would be removed as part of the
            //	stage cleanup process
            TAPTAUPE.canvas.element.removeEventListener('click', initializeGame);

            var gameScene = new GameScene();

            gameScene.attachAssets().then(function() {
                return gameScene.attachListeners();
            }).then(function() {
               // return gameScene.startTicker();
            }).then(function() {
                gameScene.render();
            }, function() {
                console.log('failed to instantiate game scene');
            });

        };

        // create the canvas and cache some references to its metrics
        TAPTAUPE.canvas = {
            element: canvasElement,
            width: canvasElement.offsetWidth,
            height: canvasElement.offsetHeight
        };

        // create the createjs stage
        TAPTAUPE.stage = new createjs.Stage(TAPTAUPE.canvas.element);

        // create a createjs asset loadqueue and install the createjs sound plugin
        TAPTAUPE.loadQueue = new createjs.LoadQueue(); // pré load image


        // instantiate the first scene: a 'loading' screen
        var loadingScene = new LoadingScene();

        // loading scene is rendered first because we want to show the loading progress to the
        //	user; after the assets are loaded, attach a click handler to begin the game

        //quand la scene est chargé on l'affiche
        loadingScene.render().then(function() {
            return loadingScene.loadAssets();
        }).then(function() {
            TAPTAUPE.canvas.element.addEventListener('click', initializeGame);

        }, function(errorMsg) {
            console.log('error loading assets: ', errorMsg);
        });

    });