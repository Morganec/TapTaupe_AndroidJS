define([	'when',
        'createjs'],
    function(	when,
                 createjs) {

        'use strict';

        // manifest array representing all the assets required within the game
        var manifest = [
            // define images
            {
                id: 'fond',
                src: 'img/fond.png'
            },

            {
                id: 'taupe',
                src: 'img/taupe2.png'
            }
        ];

        var LoadingScene = function() {
            this.filesLoaded = 0;

            this.initialize();
        };

        // don't have to override prototype because it's not an actual
        //	createjs construct with a default initialize()
        LoadingScene.prototype.initialize = function() {
            this.loadingMessage = new createjs.Text('Loading', 'bold 24px Helvetica', '#FFFFFF');

            this.loadingMessage.textAlign = 'center';
            this.loadingMessage.x = TAPTAUPE.canvas.width / 2;
            this.loadingMessage.y = TAPTAUPE.canvas.height / 2;
        };

        LoadingScene.prototype.render = function() {
            var deferred = when.defer();

           TAPTAUPE.stage.addChild(this.loadingMessage);

           TAPTAUPE.stage.update();

            deferred.resolve();

            return deferred.promise;
        };

        LoadingScene.prototype.loadAssets = function() {
            var deferred = when.defer();

            var handleLoad = function() {
                this.filesLoaded++;

                this.loadingMessage.text = this.filesLoaded + ' of ' + manifest.length + ' files loaded';

                TAPTAUPE.stage.update();
            };

            var handleComplete = function() {
                this.loadingMessage.text = 'Cliquer pour jouer!';

                TAPTAUPE.stage.update();

                deferred.resolve();
            };

            // we have to proxy the callbacks to ensure 'this' within them is still bound to
            //	the scene; note that you could also either simply alias 'this' or utilize underscore's
            //	bind() functions to accomplish the same end goal

            var handleLoadProxy = createjs.proxy(handleLoad, this);
            TAPTAUPE.loadQueue.addEventListener('fileload', handleLoadProxy);

            var handleCompleteProxy = createjs.proxy(handleComplete, this);
            TAPTAUPE.loadQueue.addEventListener('complete', handleCompleteProxy);

            TAPTAUPE.loadQueue.addEventListener('error', function(evt) {
                deferred.reject(evt.text);
            });

            TAPTAUPE.loadQueue.loadManifest(manifest);

            return deferred.promise;
        };

        return LoadingScene;

    });