var TapTaupeDAO = function()
{
	
	this.initialiser = function()
	{
		var SQL_CREATION = "CREATE TABLE IF NOT EXISTS tapTaupe(id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR(50), score integer)";
		this.baseDeDonnees = window.openDatabase("ListeDesScores", "1.0", "Liste des scores", 200000);
		
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
		alert("ERREUR MEC:SQL:" + erreur.code + ":" + erreur.message);
		alert("Sa n'a pas marcher gros !!!")
	}
	
	this.reagirSucces = function()
	{
		console.log("SUCCES:SQL:");
	}
	
	this.ajouterUnScore = function()
	{
		var nomJoueur = "TOTO";
		var scoreJoueur = "666";
		this.baseDeDonnees.transaction(
			function(operation)
			{
				alert("Ajout a la base");
				operation.executeSql('INSERT INTO tapTaupe(nom,score) VALUES(?,?)',[nomJoueur,scoreJoueur]);
			},
			this.reagirErreur,
			this.reagirSucces
		);
	}
	
	
	
	
	
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready", self.initialiser(), false);
    } else {
    	alert("Initialiser Mec !!!");
        this.initialiser();
        this.ajouterUnScore();
    }  
	
}


TapTaupeDAO.instance = new TapTaupeDAO();