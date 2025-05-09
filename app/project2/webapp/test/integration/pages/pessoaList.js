sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'projectfiori.project2',
            componentId: 'pessoaList',
            contextPath: '/pessoa'
        },
        CustomPageDefinitions
    );
});