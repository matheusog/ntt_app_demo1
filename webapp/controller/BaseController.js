sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/core/routing/History", 
    "../utils/formatter"
], function(Controller, History, Formatter) {
    "use strict";  

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    return Controller.extend("com.nttdata.sap.training2022.mog.ca.appdemo1.controller.BaseController", {
        oFormatter: Formatter, 

        /* Evento de Controls de UI/VIEW */ 
        onNavBack: function() {
            let oHistory = History.getInstance();
			let sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				let oRouter = this.getRouter();
				oRouter.navTo("MainPageRoute2", null, true);
			}
        }, 

        /**
         * @param {string} ?sModel
         * **/
        getModel: function(sModel)  {
            return this.getOwnerComponent().getModel(sModel); 
        }, 

        getResource: function() {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        }, 

        getRouter: function() {
            return this.getOwnerComponent().getRouter(); 
        }
        
    });
});