var AdministrationScoreAction = function()
{
	this.ajouterScore = function()
	{
		var nom = $("#nom").val();
		var score = $("#score").val();
		
		var score = new Score(nom, score);
		
		JeuxVideoDAO.instance.ajouterUnScore(score);		
	}
	
	this.naviguerAccueil = function()
	{
			window.location.hash = "";		
	}	 
}