sap.ui.define([
    "com/nttdata/sap/training2022/mog/ca/appdemo1/controller/BaseController", 
    "com/nttdata/sap/training2022/mog/ca/appdemo1/model/ApprovePopup"
], function(Controller, ApprovePopup) {
    "use strict";  

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    return Controller.extend("com.nttdata.sap.training2022.mog.ca.appdemo1.controller.s1_MainPage", {
        /* Métodos de lifecycle da UI/VIEW */
        onInit: function () {
            this._ApprovePopup      = new ApprovePopup(this); 
            this._oListCustomers    = this.getView().byId("listCustomers"); 

            /*(var oObject = { 
                treinamento: "FIORI NTT 2022", 
                showMessage: function() { alert("Message " + this.treinamento); }
            }; 
            //oObject.showMessage(); 

            var oObjectChild = 
                $.extend(null, oObject, {
                    turma: [], 
                    appendAluno: function(sAluno) {
                        this.turma.push(sAluno); 
                    },  
                    getTextAlunos: function() {
                        var sText = ""; 
                        for(var i = 0; i < this.turma.length; i++){
                            sText = sText + this.turma[i] + ", ";
                        }
                        return sText; 
                    }, 
                    showMessage: function() { 
                        alert("Message " + this.treinamento + "\n" + this.getTextAlunos()); 
                    }
                });

            oObjectChild.appendAluno("Brenda");
            oObjectChild.appendAluno("Eder");
            oObjectChild.appendAluno("Valdeci");
            oObjectChild.showMessage();
            //alert(oObjectChild.getTextAlunos());*/

        }, 

        onBeforeRendering: function() {

        }, 
        onAfterRendering: function() {

        },
        onExit: function() {

        }, 

        /* Evento de Controls de UI/VIEW */ 
        onNextPress: function(oEvent) {
                                    
            //me = Controller
            //data oRouter = me->getOwnerComponent()->getRouter().
            //data lo_parameters = 
            //  new cl_route_parameters( param = value #( ( name = "companyId" value = "1000" ) ) ).
            //oRouter->navTo( exporting route = "NextPageRoute2" param = lo_parameters )

            let oRouter = this.getOwnerComponent().getRouter(); 
            oRouter.navTo("NextPageRoute2", {
                "companyId": "1000"
            });

        }, 
        
        onListAction: function(oEvent) {
            let oList = oEvent.getSource().getParent().getParent();
            if(!oList) { return; }

            /*
            let aItems = oList.getItems();
            aItems.forEach((oItem, iIndex) => {
                //let oStatus = oItem.getFirstStatus();
                //oStatus.setState(sap.ui.core.ValueState.Error);
                let oBinding = oItem.getBindingContext("myData");
                let oObject = oBinding.getObject();
                oObject.valueState = sap.ui.core.ValueState.Error; 
            });
            */

            let sPath = oList.getBindingInfo("items").path; 
            let aCustomers = this.getModel("myData").getProperty(sPath);
            aCustomers.forEach((oCustomer, iIndex) => {
                oCustomer.valueState = sap.ui.core.ValueState.Error; 
            });
            this.getModel("myData").updateBindings(true);

        }, 

        onApprovePress: function(oEvent) {
            let oButton = oEvent.getSource(); 
            let sText = "Click do button: " + oButton.getText() + " id: " + oButton.getId(); 
            this._ApprovePopup.alertMessage(sText); 
        }
        
    });
});