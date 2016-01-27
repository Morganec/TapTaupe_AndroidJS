var ListeScore = function(listeDesScores)
{
	this.afficher = function()
	{	
		$("body").html(ListeScore.html);
		
		var html_listeDesScores = $("#liste-score");
		
		var htmlenConstruction = "";
		
		for(var no_score in listeDesScores)
		{
			var score = listeDesScores[no_score];
			htmlenConstruction += ListeScore.item_html
				.replace("{NOM}",score.nom)
				.replace("{SCORE}",score.score)
				.replace("{ID}",score.id);
		}
		html_listeDesScores.html(htmlenConstruction);	
	}
	this.afficher();
}
ListeScore.html = $("#page-liste-score").html();
ListeScore.item_html = $("#item-liste-score").html();