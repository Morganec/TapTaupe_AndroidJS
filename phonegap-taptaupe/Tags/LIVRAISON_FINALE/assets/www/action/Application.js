var applicationTapTaupe= {

	lancer:function()
	{	
		this.TapTaupeDAO = TapTaupeDAO.instance;

		$(window).on('hashchange', $.proxy(this.naviguer, this));
		
		this.naviguer();
	},
	
	naviguer:function()
	{

		var ancre = window.location.hash;
	
		if(ancre== "")
		{
			this.TapTaupeDAO.afficherAcceuil(AcceuilVue);		
		}
		else if(ancre.match(/^#Jouer/))
		{
			new jeuxVue();
		}
        else if(ancre.match(/^#Score/))
        {
            this.TapTaupeDAO.listerTousScores(ListeScore);

        }
        else if(ancre.match(/^#apropos/))
        {
            new AProposVue();

        }
		else
		{
			
			
		}
		
		
	}
};

applicationTapTaupe.lancer();
