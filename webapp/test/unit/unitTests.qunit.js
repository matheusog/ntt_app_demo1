/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comnttdatasaptraining2022mogca/app_demo1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
