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
            this._getData(false); 


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
            /*
            let oList = oEvent.getSource().getParent().getParent();
            if(!oList) { return; }

            
            let aItems = oList.getItems();
            aItems.forEach((oItem, iIndex) => {
                //let oStatus = oItem.getFirstStatus();
                //oStatus.setState(sap.ui.core.ValueState.Error);
                let oBinding = oItem.getBindingContext("myData");
                let oObject = oBinding.getObject();
                oObject.valueState = sap.ui.core.ValueState.Error; 
            });
            
            let sPath = oList.getBindingInfo("items").path; 
            let aCustomers = this.getModel("myData").getProperty(sPath);
            aCustomers.forEach((oCustomer, iIndex) => {
                oCustomer.valueState = sap.ui.core.ValueState.Error; 
            });
            this.getModel("myData").updateBindings(true);
            */

            this._getData(true); 
        }, 

        onApprovePress: function(oEvent) {
            let oButton = oEvent.getSource(); 
            let sText = "Click do button: " + oButton.getText() + " id: " + oButton.getId(); 
            this._ApprovePopup.alertMessage(sText); 
        }, 

        _getData: function(bRefresh) {
            
            var sUrl = "/sap/opu/odata/sap/ZGWNTTXX_SERV01_SRV/I_Customer?$format=json&$select=Customer,CustomerName,Country,Region,StreetName"; 
            //validateInput().then()
            this._readToken(sUrl)
                .then((sToken) => {
                    return this._readData(bRefresh, sUrl);
                })            
                .then((aCustomersService) => {
                    
                    var aCustomers = [];
                    aCustomersService.forEach((oItem, iIndex) => {
                        aCustomers.push(this._mapCustomerDataFromService(oItem));
                    }); 

                    this.getModel("myData").setProperty("/data/customers", aCustomers);
                }).catch((oError) => {
                    alert("Erro ocorreu"); 
                });
        }, 

        _mapCustomerDataFromService: function(oServiceData) {

            return {
                id: oServiceData.Customer, 
                name: oServiceData.CustomerName, 
                adress: {
                    country: oServiceData.Country,
                    region: oServiceData.Region, 
                    street: oServiceData.Street
                }
            }; 

        }, 

        _readData: function(bRefresh, sUrl, sToken) {
            return new Promise((fnResolve, fnReject) => {
                //Código
                $.ajax({
                    "type": "GET",
                    "contentType": "application/json", 
                    "url": sUrl, 
                    "dataType": "json", 
                    "async": true,  
                    "success": (oResponse) => {
                        if (!oResponse || !oResponse.d.results || oResponse.d.results.length === 0) {
                            //Error
                            fnReject("Ocorreu um erro");
                            return; 
                        }

                        fnResolve(oResponse.d.results); 
                        
                    },  
                    "error": fnReject
                }); 
            });
        }, 

        _readToken: function(sUrl) {
            return new Promise((fnResolve, fnReject) => {
                //Leitura do Token
                /*
                setTimeout(() => {
                    fnResolve("1234567890");
                }, 5000 ); */
                fnResolve("1234567890");
            });
        }
    });
});