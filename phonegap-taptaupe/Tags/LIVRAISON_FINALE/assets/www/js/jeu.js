var Jeu = function(){
    //TODO : Faire une fonction qui augmente certain parametre pour passer au niveau suivant
    var monstage = new createjs.Stage("canvasId");
    canvas = document.getElementById("canvasId");
    var niveau = 0;
    var taupeLoupe = 0;
    var nbTaupeCliquer = 0;
    var nbTaupeLoupeAutori = 10;
    var nbTaupeCliqueAAvoir = 10;
    var score = 0;
    var compteurFrame = 0;
    var compteurFrame2 = 0;
    var nbImageW = Math.round(canvas.width /100);
    var nbImageH = Math.round(canvas.height / 100);
    var tabTaupe = new Array();
    var textGagne;
    var vitesseTaupe =10;
	var dao = new TapTaupeDAO();
	var confirmation = false;


    for(var i = 0; i<nbImageH; i++){
        tabTaupe[i]=new Array();
    }
    for(var i = 0 ; i< nbImageH ; i++){
        for(var j = 0; j< nbImageW ; j++){
            tabTaupe[i][j] =  new Taupe(augmenterScore, diminuerScore);
            tabTaupe[i][j].gotoAndStop("disparu");
            tabTaupe[i][j].x = (j*100) ; // todo ajouter un chiffre pour centrer le jeu
            tabTaupe[i][j].y = (i*100);
            monstage.addChild(tabTaupe[i][j]);
        }
    }



    function augmenterScore(){
        score = score + 5;
        nbTaupeCliquer++;
        if(nbTaupeCliquer == nbTaupeCliqueAAvoir){
            niveau++;
            augmenterLvl();
        }



    }

    function diminuerScore(){
        score = score - 2;
    }

    var rectScore = new createjs.Shape();
    rectScore.graphics.beginFill("white").drawRect(10 ,10,120,25);
    var monscore = new createjs.Text('score : 0', 'bold 24px Helvetica', 'red');
    monscore.x = 0;
    monscore.y =0;
    rectScore.x = monscore.x - 10;
    rectScore.y = monscore.y - 10;
    monstage.addChild(rectScore);
    monstage.addChild(monscore);

    //niveau 0 :
        createjs.Ticker.addEventListener("tick", tickLVL1);
        createjs.Ticker.setFPS(5);


    var iAleatoire = 0;
    var jAleatoire =0 ;

    function tickLVL1() {
        for(var i = 0; i<nbImageH; i++){
            for(var j = 0; j<nbImageW; j++){
                if(tabTaupe[i][j].currentFrame == 5){

                    tabTaupe[i][j].gotoAndStop("disparu");
                    score = score - 2;
                    taupeLoupe++;
                    tabTaupe[i][j].supprimerEvent();
                }
            }
        }
        compteurFrame++;

        monscore.text = 'score : ' + score;
        if(compteurFrame%vitesseTaupe == 0){
            iAleatoire = Math.floor(Math.random() * nbImageH);
            jAleatoire = Math.floor(Math.random() * nbImageW);
           tabTaupe[iAleatoire][jAleatoire].gotoAndPlay("bouger");

        }
        if(taupeLoupe == nbTaupeLoupeAutori){
            var textPerdu = new createjs.Text('PERDU !! Vous avez loupé trop de taupe!', 'bold 24px Helvetica', 'red');
            textPerdu.textAlign = 'center';
            textPerdu.x = canvas.width/2;
            textPerdu.y = canvas.height/2;
            monstage.addChild(textPerdu);

            createjs.Ticker.removeEventListener("tick", tickLVL1);

			var nom =  prompt('merci d\'avoir joué, entrez votre nom : ', '');
            //var scoreFinal = new score(nom, score);
            while(nom == null)
            {
           		confirmation = confirm('Si vous annuler votre nom par defaut sera user1 �tes vous sur de vouloir ce nom ?');
            	if(confirmation == true )
            	{
            		nom = "user1";
            	}
            	else if(confirmation == false)
            	{
            		nom = "";
            	}
            	
            }
           while(nom == ""){
           	while(nom == null)
            {
           		confirmation = confirm('Si vous annuler votre nom par defaut sera user1 �tes vous sur de vouloir ce nom ?');
            	if(confirmation == true )
            	{
            		nom = "user1";
            	}
            	else if(confirmation == false)
            	{
            		nom = "";
            	}
            	
            }
               nom =  prompt('merci d\'avoir joué, entrez votre nom : ', '');
           }

            TapTaupeDAO.instance.ajouterUnScore(nom, score);
			//dao.listerTousScores(ListeScore);
			dao.listerTousScores(ListeScore);
        }

       /* if(niveau == 1){
            vitesseTaupe -= 5;
            textGagne = new createjs.Text('Niveau 2 ! Bravo!', 'bold 24px Helvetica', 'red');
            textGagne.textAlign = 'center';
            textGagne.x = canvas.width/2;
            textGagne.y = canvas.height/2;
            //todo : creer une fonction pour afficher un texte centré
            monstage.addChild(textGagne);
            taupeLoupe = 0;
            iAleatoire = 0;
            jAleatoire =0 ;
            createjs.Ticker.addEventListener("tick", tickLVL2);
            createjs.Ticker.setFPS(5);
            createjs.Ticker.removeEventListener("tick", tickLVL1);
        }*/

        monstage.update();
    }



    /* function tickLVL2() {

        compteurFrame2++;
        monscore.text = 'score : ' + score;
        monstage.removeChild(textGagne);

        for(var i = 0; i<nbImageH; i++){
            for(var j = 0; j<nbImageW; j++){
                if(tabTaupe[i][j].currentFrame == 5){

                    tabTaupe[i][j].gotoAndStop("disparu");
                    score = score - 2;
                    taupeLoupe++;
                    tabTaupe[i][j].supprimerEvent();
                }
            }
        }

//je ne peux pas réduire le compteurFrame car sinon mon sprite n'a pas le temps d'aller jusqu'a 5
        if(compteurFrame2%vitesseTaupe == 0){
            iAleatoire = Math.floor(Math.random() * nbImageH);
            jAleatoire = Math.floor(Math.random() * nbImageW);
            tabTaupe[iAleatoire][jAleatoire].gotoAndPlay("bouger");
           // tabTaupe[iAleatoire][jAleatoire].addEventListener("click", taupeCliquer);
        }

        if(taupeLoupe == 4){
            var textPerdu = new createjs.Text('PERDU !! Vous avez loupé trop de taupe!', 'bold 24px Helvetica', 'red');
            textPerdu.textAlign = 'center';
            textPerdu.x = canvas.width/2;
            textPerdu.y = canvas.height/2;
            monstage.addChild(textPerdu);
            //this.removeAllEventListeners();
            createjs.Ticker.removeEventListener("tick", tickLVL1);

        }

      monstage.update()
    }  */




    function augmenterLvl(){
        vitesseTaupe -= 3;
       /* textGagne = new createjs.Text('Niveau suivant ! Bravo!', 'bold 24px Helvetica', 'red');
        textGagne.textAlign = 'center';
        textGagne.x = canvas.width/2;
        textGagne.y = canvas.height/2;*/
        alert("Niveau suivant Bravo! ")
        nbTaupeCliquer = 0;
        taupeLoupe = 0;
        nbTaupeLoupeAutori -= 1;
        nbTaupeCliqueAAvoir += 3;
    }

    /*function taupeCliquer(evt){
     evt.target.gotoAndStop("disparu");
     score = score + 5;
        if(score > 5*10){
            niveau++;
        }

     evt.target.removeEventListener("click", taupeCliquer);
     }*/


    monstage.update();
}
