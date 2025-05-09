sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'projectfiori/project2/test/integration/FirstJourney',
		'projectfiori/project2/test/integration/pages/pessoaList',
		'projectfiori/project2/test/integration/pages/pessoaObjectPage'
    ],
    function(JourneyRunner, opaJourney, pessoaList, pessoaObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('projectfiori/project2') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThepessoaList: pessoaList,
					onThepessoaObjectPage: pessoaObjectPage
                }
            },
            opaJourney.run
        );
    }
);