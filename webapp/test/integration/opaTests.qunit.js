/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["com/nttdata/sap/training2022/mog/ca/appdemo1/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
