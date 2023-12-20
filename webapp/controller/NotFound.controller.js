sap.ui.define([
		"pg/kanban/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("pg.kanban.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);