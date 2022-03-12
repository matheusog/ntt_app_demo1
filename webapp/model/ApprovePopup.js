sap.ui.define([
    "sap/ui/base/Object"
], function(BaseObject) {
    "use strict"; 

    var mDialog = undefined; 
    function getMethods(oController) {
        function _createDialog() {
            //mDialog = new mDialog; 
        }
        
        function _alertMessage(sMessage){
            //sMessage = "Chamado por " + _oController.getView().getId() + " " + sMessage; 
            sMessage = `Chamado por ${oController.getView().getId()} ${sMessage}`; 
            alert(sMessage);
        }
        
        return {
            alertMessage: _alertMessage
        } 
    }

    return BaseObject.extend("com.nttdata.sap.training2022.mog.ca.appdemo1.model.ApprovePopup", {

        //_oController: undefined, 

        constructor: function(oController) {
            //this._oController = oController; 
            $.extend(this, getMethods(oController));
        }, 

        /*
        alertMessage: function(sMessage) {
            this._alertMessage(sMessage);
        }*/

    }); 
});