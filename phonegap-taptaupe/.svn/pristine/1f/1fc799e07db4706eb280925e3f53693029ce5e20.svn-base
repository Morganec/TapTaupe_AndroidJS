var TapTaupeDAO = function()
{
	this.listeDesScores = [];

	this.savoirScoreSelonId = function(id, finalisation)
	{
		var self = this;		

		self.baseDeDonnees.transaction(
						
			// operation
			function(operation)
			{
				var SQL_SELECTION_SELON_ID = "SELECT * FROM tapTaupe WHERE id = ?";
				operation.executeSql(SQL_SELECTION_SELON_ID, [id], function(operation, resultat)
				{					
					for(var position=0; position<resultat.rows.length; position++)
					{
						var score = resultat.rows.item(position);
						this.score = {"id":score.id,"nom":score.nom,"score":score.score};						
					}
				});
			},
			
			// erreur
			this.reagirErreur,
			
			// succes
			function(){
				finalisation(this.jeuxVideo);
			}
		);	
	}
	
	this.initialiser = function()
	{
		var SQL_CREATION = "CREATE TABLE IF NOT EXISTS tapTaupe(id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR(50), score VARCHAR(100))";
		this.baseDeDonnees = window.openDatabase("ListeScore", "1.0", "Liste des scores", 200000);
		
		this.baseDeDonnees.transaction(
			function(operation)
			{
				var SQL_CREATION = "CREATE TABLE IF NOT EXISTS tapTaupe(id INTEGER PRIMARY KEY, nom, score)";
				operation.executeSql(SQL_CREATION);
			},
			this.reagirErreur,
			this.reagirSucces
		);	
	}
	
	this.reagirErreur = function(erreur)
	{
		console.log("ERREUR MEC:SQL:" + erreur.code + ":" + erreur.message);
	}
	
	this.reagirSucces = function()
	{
		console.log("SUCCES:SQL:");
	}
	
	this.ajouterUnScore = function(nomJoueur, scoreJoueur)
	{
		this.baseDeDonnees.transaction(
			function(operation)
			{
				var SQL_AJOUT = "INSERT INTO tapTaupe(nom, score) VALUES(?,?)";
				var parametres = [nomJoueur, scoreJoueur];
				operation.executeSql(SQL_AJOUT, parametres);
			},
			this.reagirErreur,
			this.reagirSucces
		);
		
		window.location.hash = "";
	}	
	
	this.listerTousScores = function(finalisation)
	{
		var self = this;		

			self.baseDeDonnees.transaction(

				function(operation)
				{
					var SQL_SELECTION = "SELECT * FROM tapTaupe";
					operation.executeSql(SQL_SELECTION, [], function(operation, resultat)
					{					
						self.listeDesScores = [];
						for(var position=0; position<resultat.rows.length; position++)
						{
							var score = resultat.rows.item(position);
							self.listeDesScores[self.listeDesScores.length] = {"id":score.id,"nom":score.nom,"score":score.score};						
						}
					});
				},
				
				// erreur
				this.reagirErreur,
				
				// succes
				function(){
					finalisation(self.listeDesScores);
				}
			);
	}
	
	
	this.afficherAcceuil = function(finalisation)
	{
		finalisation();
	
	}
			
	self = this;
	
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", self.initialiser(), false);
    } else {
        this.initialiser();
    }  
}
			
TapTaupeDAO.instance = new TapTaupeDAO();
