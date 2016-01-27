var AjouterScore = function()
{

	this.afficher = function()
	{
		$("body").html(AjouterScore.html);
		$("#formulaire-ajouter").on("submit", function(e){
		
		var action = new AdministrationScoreAction();
		
		action.ajouterScore();
		action.naviguerAccueil();
		e.preventDefault();
		});
	}
}
AjouterScore.html = $("#page-ajouter-score").html();