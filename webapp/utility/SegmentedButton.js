sap.ui.define([
	"sap/m/SegmentedButton"
], function(SegmentedButton) {
	"use strict";

	return SegmentedButton.extend("pg.kanban.utility.SegmentedButton", {
		onAfterRendering: function(){
			SegmentedButton.prototype.onAfterRendering.apply(this, arguments);
			sap.ui.getCore().getEventBus().publish("pg.kanban.EventBus", "setSegmentButtonStyle");
		}
	});

});