sap.ui.define([
	] , function () {
		"use strict";

		return {

			/**
			 * Rounds the number unit value to 2 digits
			 * @public
			 * @param {string} sValue the number string to be rounded
			 * @returns {string} sValue with 2 digits rounded
			 */
			numberUnit : function (sValue) {
				if (!sValue) {
					return "";
				}
				return parseFloat(sValue).toFixed(2);
			},

			formatDecimalScale : function (sValue) {
				if (!sValue) {
					return "";
				}
				return parseInt(sValue, 10);
			},
		
			formatConfirmButton: function(StatusSequence){
				debugger;
				let L6System = this.SystemID.contains("L6");
				return StatusSequence === 'ZM04' && L6System;
			}

		};

	}
);