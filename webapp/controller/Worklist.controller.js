sap.ui.define([
	"pg/kanban/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"pg/kanban/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"pg/kanban/utility/utilities",
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
	"sap/ui/comp/filterbar/FilterBar",
	"sap/ui/core/Item",
	"sap/m/Token"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, utilities, ValueHelpDialog, FilterBar, Item, Token) {
	"use strict";

	return BaseController.extend("pg.kanban.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			var oViewModel,
				oResponsibleModel = new JSONModel(),
				iOriginalBusyDelay,
				oTable = this.byId("controlCycleSmartTable");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();

			this._oTable = oTable;
			this.oResponsiblePerson = null;
			/*this.oProduce = null;*/

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");
			this.setModel(oResponsibleModel, "responsible");

			//			this.setWorklistRefreshInterval(); commented by DL6921 to avoid auto refresh

			this.byId("responsibleFilter").setEnableMultiLineMode(sap.ui.Device.system.phone);
			//			this.byId("produceFilter").setEnableMultiLineMode(sap.ui.Device.system.phone);
			this.byId("controlCycleTable").setNoDataText(this.getResourceBundle().getText("tableNoDataText"));

			this.getRouter().getRoute("worklist").attachPatternMatched(this._onObjectMatched, this);

			this.getOwnerComponent().oWhenMetadataIsLoaded.then(function () {
				this.byId("supplyAreaConfiguration").setLabel(this.getResourceBundle().getText("SupplyArea"));
				this.byId("responsibleConfiguration").setLabel(this.getResourceBundle().getText("Responsible"));
			}.bind(this));

			sap.ui.getCore().getEventBus().subscribe("pg.kanban.EventBus", "refreshControlCycleList", this.search, this);

			var oSmartFilterBar = this.getView().byId("smartFilterBar");
			if (oSmartFilterBar) {
				oSmartFilterBar._oSearchButton.setText(this.getResourceBundle().getText("Refresh"));
				oSmartFilterBar._oSearchButton.setIcon("sap-icon://refresh");
			}

			var that = this;
			var timer1, timer2, timer3;
			var timer4, timer5, timer6; //54 minutes for 6 timers
			var timer7, timer8, timer9; //81 minutes for 9 timers
			var timer10, timer11, timer12; //108 minutes for 12 timers
			var timer13, timer14, timer15; //135 minutes for 15 timers
			var timer16, timer17, timer18; //162 minutes for 18 timers
			var timer19, timer20, timer21; //189 minutes for 21 timers
			this._oRefresh = function () {
				that.getModel().read("/BasicInfoSet", {
					success: function (oData, response) {
						console.log("oData is refreshed");
					}.bind(this),
					error: function (oError) {
						console.log("Error ");
					}.bind(this)
				});
			}; // 9min * 60 sec * 1000ms = 540000 milliseconds

			// capture user interaction
			this.resetinterval = function () {
				clearTimeout(timer1);
				clearTimeout(timer2);
				clearTimeout(timer3);
				clearTimeout(timer4);
				clearTimeout(timer5);
				clearTimeout(timer6);
				clearTimeout(timer7);
				clearTimeout(timer8);
				clearTimeout(timer9);
				clearTimeout(timer10);
				clearTimeout(timer11);
				clearTimeout(timer12);
				clearTimeout(timer13);
				clearTimeout(timer14);
				clearTimeout(timer15);
				clearTimeout(timer16);
				clearTimeout(timer17);
				clearTimeout(timer18);
				clearTimeout(timer19);
				clearTimeout(timer20);
				clearTimeout(timer21);
				timer1 = setTimeout(that._oRefresh, 540000);
				timer2 = setTimeout(that._oRefresh, 540000 * 2);
				timer3 = setTimeout(that._oRefresh, 540000 * 3);
				timer4 = setTimeout(that._oRefresh, 540000 * 4);
				timer5 = setTimeout(that._oRefresh, 540000 * 5);
				timer6 = setTimeout(that._oRefresh, 540000 * 6);
				timer7 = setTimeout(that._oRefresh, 540000 * 7);
				timer8 = setTimeout(that._oRefresh, 540000 * 8);
				timer9 = setTimeout(that._oRefresh, 540000 * 9);
				timer10 = setTimeout(that._oRefresh, 540000 * 10);
				timer11 = setTimeout(that._oRefresh, 540000 * 11);
				timer12 = setTimeout(that._oRefresh, 540000 * 12);
				timer13 = setTimeout(that._oRefresh, 540000 * 13);
				timer14 = setTimeout(that._oRefresh, 540000 * 14);
				timer15 = setTimeout(that._oRefresh, 540000 * 15);
				timer16 = setTimeout(that._oRefresh, 540000 * 16);
				timer17 = setTimeout(that._oRefresh, 540000 * 17);
				timer18 = setTimeout(that._oRefresh, 540000 * 18);
				timer19 = setTimeout(that._oRefresh, 540000 * 19);
				timer20 = setTimeout(that._oRefresh, 540000 * 20);
				timer21 = setTimeout(that._oRefresh, 540000 * 21);
			};

			if (window.addEventListener) {
				window.addEventListener('click', that.resetinterval, false);
				window.addEventListener('focus', that.resetinterval, false);
				//window.addEventListener('keydown', that.resetinterval, false);
				window.addEventListener('keypress', that.resetinterval, false);
				//window.addEventListener('scroll', that.resetinterval, false);
				//window.addEventListener('touchmove', that.resetinterval, false);				
			}

			//this.getOwnerComponent().getModel().attachBatchRequestCompleted(that.resetinterval);

		},

		onExit: function () {
			sap.ui.getCore().getEventBus().unsubscribe("pg.kanban.EventBus", "refreshControlCycleList", this.search, this);
			clearInterval(this._oRefresh);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		onAfterRendering: function () {
			// if (document.cookie.indexOf("_walkthrough-introduction") < 0) {
			// 	utilities.generateWalkthrough(this);
			// }

		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onPress: function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		/**
		 * Navigates back in the browser history, if the entry was created by this app.
		 * If not, it navigates to the Fiori Launchpad home page.
		 * @public
		 */
		onNavBack: function () {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Navigate back to FLP home
				oCrossAppNavigator.toExternal({
					target: {
						shellHash: "#"
					}
				});
			}
		},

		/**
		 * When the SmartTable has been initialised with metadata. Save
		 * the column titles for later reuse as generic column titles.
		 * @public
		 */
		onSmartTableInitialised: function (oEvent) {
			var oTable = oEvent.getSource().getTable();
			var aColumns = oTable.getColumns();
			var oColumnCustomData;
			var oResourceBundle = this.getResourceBundle();
			for (var i = 0; i < aColumns.length; i++) {
				oColumnCustomData = utilities.getColumnDataByColumn(aColumns[i]);
				switch (oColumnCustomData.columnKey) {
				case "ControlCycleID":
					aColumns[i].setVisible(false);
					break;
				case "MaterialNo":
					aColumns[i].setVisible(false);
					// aColumns[i].getHeader().setText(oResourceBundle.getText("Material"));
					// aColumns[i].setOrder(2);
					break;
				case "Material":
					aColumns[i].setVisible(true);
					// aColumns[i].getHeader().setText(oResourceBundle.getText("Material"));
					aColumns[i].setOrder(3);
					break;
				case "Plant":
					aColumns[i].setVisible(false);
					break;
				case "SupplyArea":
					aColumns[i].setVisible(true);
					aColumns[i].getHeader().setText(oResourceBundle.getText("SupplyArea"));
					aColumns[i].setOrder(0);
					aColumns[i].setMinScreenWidth("Tablet");
					break;
				case "Responsible":
					aColumns[i].setVisible(true);
					aColumns[i].getHeader().setText(oResourceBundle.getText("Responsible"));
					aColumns[i].setOrder(1);
					aColumns[i].setMinScreenWidth("Tablet");
					break;
					/*					case "Produce":
											aColumns[i].setVisible(true);
											aColumns[i].getHeader().setText(oResourceBundle.getText("Produce"));
											aColumns[i].setOrder(2);
											break;	*/

				case "StoringPos":
					aColumns[i].setVisible(false);
					break;
				case "KanbanOverview":
					aColumns[i].setVisible(true);
					aColumns[i].setOrder(3);
					break;
				default:
					aColumns[i].setVisible(false);
					break;
				}
			}
		},

		onTableDataReceived: function (data) {

			this.byId("controlCycleTable").setShowOverlay(false);
			var aFilters = [];
			var oResults;
			var oEntitySet;
			if (data && data.getParameters().getParameters().data.results) {
				oResults = data.getParameters().getParameters().data.results;
			}
			for (var i = 0; i < oResults.length; i++) {
				aFilters.push(new Filter({
					path: "SupplyArea",
					operator: FilterOperator.EQ,
					value1: oResults[i].ControlCycleID
				}));
			}
			for (var i = 0; i < oResults.length; i++) {
				oEntitySet = "/ControlCycleSet('" + oResults[i].ControlCycleID + "')";
				this.getModel().read(oEntitySet, {
					success: function (oData, response) {
						this.getView().setBusy(false);
					}.bind(this),
					error: function (oError) {
						this.getView().setBusy(false);
					}.bind(this),
					urlParameters: {
						"$expand": "CycleToStatus"
					}
				});
			}
		},

		onBeforeRebindTable: function (oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams");
			var aSelectedSAKeys = this.byId("supplyAreaFilter").getSelectedKeys();
			var aSelectedResKeys = this.byId("responsibleFilter").getTokens();
			/*var aSelectedPLKeys = this.byId("produceFilter").getTokens(); //production line
			 */
			var aFilters = [];
			for (var i = 0; i < aSelectedSAKeys.length; i++) {
				aFilters.push(new Filter({
					path: "SupplyArea",
					operator: FilterOperator.EQ,
					value1: aSelectedSAKeys[i]
				}));
			}
			for (var j = 0; j < aSelectedResKeys.length; j++) {
				aFilters.push(new Filter({
					path: "Responsible",
					operator: FilterOperator.EQ,
					value1: aSelectedResKeys[j].getKey()
				}));
			}
			/*for (var k = 0; k < aSelectedPLKeys.length; k++) {
				aFilters.push(new Filter({
					path: "Produce",
					operator: FilterOperator.EQ,
					value1: aSelectedPLKeys[k].getKey()
				}));
			}*/
			if (aFilters.length > 0) {
				this._addFilters(mBindingParams, aFilters);
			}
			//add Plant field request to select parameter
			mBindingParams.parameters.select += ",Plant,ControlCycleID,MaterialNo,StoringPos";

			if (!this.byId("controlCycleSmartTable").mEventRegistry.dataReceived) {
				this.byId("controlCycleSmartTable").attachDataReceived(this.onTableDataReceived.bind(this));
			}

		},

		onSupplyAreaSlecteionFinish: function () {
			this.search();
		},

		onResonsibleChange: function () {
			this.search();
		},
		/*onProduceChange: function() {
			this.search();
		},*/

		onResponsileValueHelpRequested: function () {
			var handleValueHelp = function (oData, response, oController) {
				var oValueHelpDialog = new ValueHelpDialog({
					basicSearchText: oController.byId("responsibleFilter").getValue(),
					title: oController.getResourceBundle().getText("Responsible"),
					supportMultiselect: true,
					supportRanges: false,
					// supportRangesOnly: false,
					key: "Dispo",
					descriptionKey: "Dsnam",
					stretch: sap.ui.Device.system.phone,

					ok: function (oControlEvent) {
						oController.byId("responsibleFilter").setTokens(oControlEvent.getParameter("tokens"));
						oValueHelpDialog.close();
					}.bind(oController),

					cancel: function (oControlEvent) {
						oValueHelpDialog.close();
					},

					afterClose: function () {
						oValueHelpDialog.destroy();
					}
				});
				var oTable = oValueHelpDialog.getTable();
				var oColModel = new sap.ui.model.json.JSONModel();
				oColModel.setData({
					cols: [{
						label: oController.getResourceBundle().getText("Dispo"),
						template: "Dispo"
					}, {
						label: oController.getResourceBundle().getText("Dsnam"),
						template: "Dsnam"
					}]
				});
				oTable.setModel(oColModel, "columns");
				var oRowsModel = new sap.ui.model.json.JSONModel();
				oRowsModel.setData(oData.results);
				oTable.setModel(oRowsModel);
				if (oValueHelpDialog.getTable().bindRows) {
					oValueHelpDialog.getTable().bindRows("/");
				}
				if (oValueHelpDialog.getTable().bindItems) {
					oTable.bindAggregation("items", "/", function (sId, oContext) {
						var aCols = oTable.getModel("columns").getData().cols;

						return new sap.m.ColumnListItem({
							cells: aCols.map(function (column) {
								var colname = column.template;
								return new sap.m.Label({
									text: "{" + colname + "}"
								});
							})
						});
					});
				}
				oValueHelpDialog.setRangeKeyFields([{
					label: oController.getResourceBundle().getText("Dispo"),
					key: "Dispo"
				}]);

				oValueHelpDialog.setTokens(oController.byId("responsibleFilter").getTokens());

				if (oController.byId("responsibleFilter").$().closest(".sapUiSizeCompact").length > 0) {
					oValueHelpDialog.addStyleClass("sapUiSizeCompact");
				} else {
					oValueHelpDialog.addStyleClass("sapUiSizeCozy");
				}

				oValueHelpDialog.open();
				oValueHelpDialog.update();
			};
			if (this.oResponsiblePerson) {
				handleValueHelp(this.oResponsiblePerson, null, this);
			} else {
				this.getView().setBusy(true);
				this.getModel().read("/ResponsibleSet", {
					success: function (oData, response) {
						this.oResponsiblePerson = oData;
						handleValueHelp(oData, response, this);
						this.getView().setBusy(false);
					}.bind(this),
					error: function (oError) {
						this.getView().setBusy(false);
					}.bind(this)
				});
			}
		},

		supplyAreaFactory: function (sID, oContext) {
			var oItem;
			var oData = oContext.getObject();
			oItem = new Item({
				key: oData.SupplyAreaID,
				text: oData.SupplyAreaID + "--" + oData.SupplyAreaDesc
			});
			if (oData.SupplyAreaDefault === "X") {
				this.byId("supplyAreaFilter").addSelectedItem(oItem);
				this.search();
			}
			return oItem;
		},

		// produce value help 
		/*		onProduceValueHelpRequested: function(){
					var handleValueHelp = function(oData1, response, oController){
						var oValueHelpDialog = new ValueHelpDialog({
								basicSearchText: oController.byId("produceFilter").getValue(),
								title: oController.getResourceBundle().getText("Produce"),
								supportMultiselect: true,
								supportRanges: false,
								// supportRangesOnly: false,
								key: "Mdv01",
								descriptionKey: "Ktext",
								stretch: sap.ui.Device.system.phone,

								ok: function(oControlEvent) {
									oController.byId("produceFilter").setTokens(oControlEvent.getParameter("tokens"));
									oValueHelpDialog.close();
								}.bind(oController),

								cancel: function(oControlEvent) {
									oValueHelpDialog.close();
								},

								afterClose: function() {
									oValueHelpDialog.destroy();
								}
							});
							var oTable = oValueHelpDialog.getTable();
							var oColModel = new sap.ui.model.json.JSONModel();
							oColModel.setData({
								cols: [{
									label: oController.getResourceBundle().getText("Mdv01"),
									template: "Mdv01"
								}, {
									label: oController.getResourceBundle().getText("Ktext"),
									template: "Ktext"
								}]
							});
							oTable.setModel(oColModel, "columns");
							var oRowsModel = new sap.ui.model.json.JSONModel();
							oRowsModel.setData(oData1.results);
							oTable.setModel(oRowsModel);
							if (oValueHelpDialog.getTable().bindRows) {
								oValueHelpDialog.getTable().bindRows("/");
							}
							if (oValueHelpDialog.getTable().bindItems) {
								oTable.bindAggregation("items", "/", function(sId, oContext) {
									var aCols = oTable.getModel("columns").getData().cols;

									return new sap.m.ColumnListItem({
										cells: aCols.map(function(column) {
											var colname = column.template;
											return new sap.m.Label({
												text: "{" + colname + "}"
											});
										})
									});
								});
							}
							oValueHelpDialog.setRangeKeyFields([{
								label: oController.getResourceBundle().getText("Mdv01"),
								key: "Mdv01"
							}]);

							oValueHelpDialog.setTokens(oController.byId("produceFilter").getTokens());

							if (oController.byId("produceFilter").$().closest(".sapUiSizeCompact").length > 0) {
								oValueHelpDialog.addStyleClass("sapUiSizeCompact");
							} else {
								oValueHelpDialog.addStyleClass("sapUiSizeCozy");
							}

							oValueHelpDialog.open();
							oValueHelpDialog.update();	
					};
					if(this.oProduce){
						handleValueHelp(this.oProduce, null, this);	
					} else {
						this.getView().setBusy(true);
						this.getModel().read("/ProduceSet", {
							success: function(oData1, response) {
								this.oProduce = oData1;
								handleValueHelp(oData1, response, this);	
								this.getView().setBusy(false);
							}.bind(this),
							error: function(oError) {
								this.getView().setBusy(false);
							}.bind(this)
						});
					}
				},*/

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function (oItem) {
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("ControlCycleID")
			});
		},

		/**
		 * Bind User and Plant
		 * @private
		 */
		_onObjectMatched: function (oEvent) {
			this.getModel().read("/BasicInfoSet", {
				success: function (oData, response) {
					if (oData.results.length > 0) {
						this.byId("userText").setText(oData.results[0].UserName);
						this.byId("plantText").setText(oData.results[0].Plant);
						this.byId("systemText").setText(oData.results[0].SystemID);
					}
				}.bind(this),
				error: function (oError) {

				}.bind(this)
			});
			if (this.oResponsiblePerson) {
				this.byId("smartFilterBar").setBusy(false);
				return;
			}
			this.byId("smartFilterBar").setBusy(true);
			this.getModel().read("/ResponsibleSet", {
				success: function (oData, response) {
					this.oResponsiblePerson = oData;
					//set default value
					for (var i = 0; i < oData.results.length; i++) {
						if (oData.results[i].Default === "X") {
							this.byId("responsibleFilter").addToken(new Token({
								key: oData.results[i].Dispo,
								text: oData.results[i].Dsnam
							}));
							this.search();
						}
					}
					this.byId("smartFilterBar").setBusy(false);
				}.bind(this),
				error: function (oError) {
					this.byId("smartFilterBar").setBusy(false);
				}.bind(this)
			});
			// Production line read			
			/*if(this.oProduce){
        		this.byId("smartFilterBar").setBusy(false);
        		return;
    		}
			this.byId("smartFilterBar").setBusy(true);
			this.getModel().read("/ProduceSet", {
				success: function(oData1, response) {
					this.oProduce = oData1;
					//set default value
					for(var i = 0; i < oData1.results.length; i++){
						if(oData1.results[i].Default === true){
							this.byId("produceFilter").addToken(new Token({key:oData1.results[i].Mdv01, text:oData1.results[i].Ktext}));
							this.search();
						}
					}
					this.byId("smartFilterBar").setBusy(false);
				}.bind(this),
				error: function(oError) {
					this.byId("smartFilterBar").setBusy(false);
				}.bind(this)
			});*/
		},

		/**
		 * Adds filters to the binding parameters.
		 * @param {map} mBindingParams binding parameters or array thereof
		 * @param {sap.ui.model.Filter} vFilters filter or filters to add
		 * @private
		 */
		_addFilters: function (mBindingParams, vFilters) {
			var aFilters = vFilters;
			if (!aFilters.length) {
				aFilters = [aFilters];
			}
			for (var i = 0; i < aFilters.length; i++) {
				var oFilter = aFilters[i];
				mBindingParams.filters.push(oFilter);
			}
		},

		/* =========================================================== */
		/* public methods                                            */
		/* =========================================================== */

		generateKanbanOverviewBar: function (sId, oContext) {
			// var oBindObject = oContext.getObject();
			// return utilities.getStackedBarMicroChartBar(oBindObject.KanbanNum, oBindObject.KanbanStatus);
			var oBindObject = oContext.getObject();
			return utilities.getMessageStrip(oBindObject.KanbanNum, oBindObject.KanbanStatus);
		},

		search: function () {
			this.byId("smartFilterBar").search(true);
		},

		setWorklistRefreshInterval: function () {
			this.intervalTrigger = new sap.ui.core.IntervalTrigger(120000);
			this.intervalTrigger.addListener(function () {
				this.search();
			}, this);
		}
	});

});