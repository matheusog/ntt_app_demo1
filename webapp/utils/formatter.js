sap.ui.define([

], function(
) {
	"use strict";

	return {
        formatValueState: function(sRegion, sCountry) {
            return ( sRegion === "SP" || sCountry === "US") ? 
                sap.ui.core.ValueState.Success : sap.ui.core.ValueState.Error; 

        }
    };
});