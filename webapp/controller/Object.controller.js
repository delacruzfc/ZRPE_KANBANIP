sap.ui.define([
	"pg/kanban/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"pg/kanban/model/formatter",
	"sap/ndc/BarcodeScanner",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"pg/kanban/utility/utilities",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Button",
	"sap/m/Dialog"
], function (BaseController, JSONModel, History, formatter, BarcodeScanner, MessageToast, MessageBox, utilities, Filter, FilterOperator,
	Button, Dialog) {
	"use strict";

	return BaseController.extend("pg.kanban.controller.Object", {

		formatter: formatter,

		color: {
			Red: "#ff0000",
			Green: "#00ff00"
		},

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy: true,
					delay: 0,
					quantityEnabled: true,
					cpBtnEnabled: false //complete button
				});
			
			//this.SystemID = this.getOwnerComponent().getModel("systemModel").getProperty("/sap-system/0");
			
			var oProdModel = new JSONModel();
			this.getView().setModel(oProdModel, "oProdModel");

			var oProdVerModel = new JSONModel();
			this.getView().setModel(oProdVerModel, "oProdVerModel");

			var oProdLineVerModel = new JSONModel();
			this.getView().setModel(oProdLineVerModel, "oProdLineVerModel");

			this.fDefaultUpperLimit = 0.1;
			this.sControlCycleId = "";

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().oWhenMetadataIsLoaded.then(function () {
				// Restore original busy indicator delay for the object view
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			});

			this.getOwnerComponent().oWhenMetadataIsLoaded.then(function () {
				var oKanbanModel = new sap.ui.model.odata.v2.ODataModel(this.getOwnerComponent().serviceUrl);
				oKanbanModel.attachRequestFailed(function (oEvent) {
					utilities.showServiceError(oEvent, this.getOwnerComponent());
				}.bind(this));
				this.byId("kanbanForm").setModel(oKanbanModel, "kanbanModel");
			}.bind(this));

			this.setSwitchVisibility();

			this.byId("quantitySlider").onAfterRendering = function () {
				var sScanSegementKey = this.byId("scanSegement").getSelectedKey();
				var sBackSizeHorizontal = (1 / (1 + this.fDefaultUpperLimit)) * 100 + "%";
				if (sScanSegementKey === "reverse" || sScanSegementKey === "empty") {
					sBackSizeHorizontal = "100%";
				}
				$(".sliderBackground").css("background-size", sBackSizeHorizontal + " 40%");
			}.bind(this);

			this.byId("headerTitle").addStyleClass("headerTitle");
			sap.ui.getCore().getEventBus().subscribe("pg.kanban.EventBus", "setSegmentButtonStyle", this.setSegmentButtonStyle, this);

			var that = this;
			//each tim
			var timer1, timer2, timer3; //27 minutes for 3 timers
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
			/**
			 * 09/23/2020
			 * Joe Francisco - to addd customMargin class to segment button
			 **/
			this.byId("scanSegement").onAfterRendering = function () {
				$($("#" + that.byId("scanSegement").getId()).find("li")[1]).addClass("segmentBtnGap");
			};
		},

		onExit: function () {
			sap.ui.getCore().getEventBus().unsubscribe("pg.kanban.EventBus", "setSegmentButtonStyle", this.setSegmentButtonStyle, this);
			clearInterval(this._oRefresh);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack: function () {
			sap.ui.getCore().getEventBus().publish("pg.kanban.EventBus", "refreshControlCycleList");
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("worklist", {}, bReplace);
			}
		},

		onSwitchSelect: function (oEvent) {
			this.setSwitchVisibility();
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
			for (var i = 0; i < aColumns.length; i++) {
				oColumnCustomData = utilities.getColumnDataByColumn(aColumns[i]);
				switch (oColumnCustomData.columnKey) {
				case "ControlCycleID":
					aColumns[i].setVisible(false);
					break;
				case "OrderNo":
					aColumns[i].setVisible(false);
					break;
				case "OrderNoNZero":
					aColumns[i].setVisible(true);
					aColumns[i].setOrder(0);
					break;
				case "Material":
					aColumns[i].setVisible(false);
					break;
				case "Batch":
					aColumns[i].setVisible(true);
					aColumns[i].setOrder(2);
					aColumns[i].setMinScreenWidth("Tablet");
					break;
				case "DefinedKanban":
					aColumns[i].setVisible(false);
					break;
				case "PlannedKanban":
					aColumns[i].setVisible(true);
					aColumns[i].setOrder(3);
					aColumns[i].getHeader().setText(this.getResourceBundle().getText("OrderKanbans"));
					aColumns[i].setMinScreenWidth("Tablet");
					break;
				case "ProducedKanban":
					aColumns[i].setVisible(true);
					aColumns[i].setOrder(4);
					aColumns[i].getHeader().setText(this.getResourceBundle().getText("ProducedKanban"));
					aColumns[i].setMinScreenWidth("Tablet");
					break;
				case "CoupledKanbanID":
					aColumns[i].setVisible(true);
					aColumns[i].setOrder(5);
					aColumns[i].setHAlign("End");
					aColumns[i].setMinScreenWidth("Tablet");
					break;
				case "ProcessOrderStatus":
					aColumns[i].setVisible(true);
					aColumns[i].setOrder(6);
					// aColumns[i].setHAlign("End");
					aColumns[i].setMinScreenWidth("Tablet");
					break;
				default:
					aColumns[i].setVisible(false);
					break;
				}
			}
		},

		onBeforeRebindTable: function (oEvent) {
			var aFilters = [],
				prodLine = this.getView().getModel("oProdLineVerModel").getProperty("/ProdLine"),
				prodVersion = this.getView().getModel("oProdLineVerModel").getProperty("/ProdVersion");
			var mBindingParams = oEvent.getParameter("bindingParams");
			//add DefinedKanban field request to select parameter
			mBindingParams.parameters.select += ",OrderNo,DefinedKanban";

			if (prodLine) {
				aFilters.push(new sap.ui.model.Filter("ProdLine", sap.ui.model.FilterOperator.EQ, prodLine));
			}
			if (prodVersion) {
				aFilters.push(new sap.ui.model.Filter("ProdVersion", sap.ui.model.FilterOperator.EQ, prodVersion));
			}
			if (aFilters.length === 2) {
				mBindingParams.filters = [];
				mBindingParams.filters = aFilters;
				if (prodLine && prodVersion) {
					this.byId("ProdLineVerText").setText(prodLine + ' / ' + prodVersion);
				}
			}

		},

		onTableDataReceived: function (oEvent) {
			var aItems = oEvent.getSource().getTable().getItems(),
				sPath,
				oControlCycle;
			//if just one item for process order, set selected by default
			if (aItems.length === 1) {
				aItems[0].setSelected(true);
			}
			for (var i = 0; i < aItems.length; i++) {
				var oItemData = aItems[i].getBindingContext().getObject();
				var aCells = aItems[i].getCells();

				//if some item has been selected before, remember
				if (this.sSelectedPO === oItemData.OrderNo) {
					aItems[i].setSelected(true);
					this.sSelectedPO = null;
				}
				//fill the order no without leading zero
				aCells[8].setText(oItemData.OrderNo.replace(/^0+/, ""));
				
				//Check TecoIdentifier
				if(oItemData.TecoIdentifier){
					aCells[6].setText(oItemData.CoupledKanbanID +" (TECO)");
				} else {
					aCells[6].setText(oItemData.CoupledKanbanID)
				}
				//fill the alert message
				aCells[7].removeAllContent();
				// fill content for ZM02 and ZM03 only
				sPath = this.getView().getBindingContext().getPath();
				oControlCycle = this.getModel().getProperty(sPath);
				if (oControlCycle.StatusSequence !== 'ZM04') {

					if (oItemData.DefinedKanban !== oItemData.PlannedKanban) { // change planned order
						if (oItemData.PlannedKanban - oItemData.ProducedKanban === 1) {
							//show alert "Kanban Quantity Change; Last Kanban"
							this.generateKanbanMessageCell(aCells[7], this.color.Red, "MSG_KQC_LAST_KANBAN");
						} else if (oItemData.PlannedKanban === oItemData.ProducedKanban) {
							//show alert "Kanban Quantity Change; Kanban Complete"
							this.generateKanbanMessageCell(aCells[7], this.color.Green, "MSG_KQC_KANBAN_COMPLETE");
						} else {
							//show alert "Kanban Quantity Change"
							this.generateKanbanMessageCell(aCells[7], this.color.Red, "MSG_KANBAN_QUANTITY_CHANGE");
						}
					} else { // not change planned order
						if (oItemData.PlannedKanban - oItemData.ProducedKanban === 1) {
							//show alert "Last Kanban"
							this.generateKanbanMessageCell(aCells[7], this.color.Red, "MSG_LAST_KANBAN");
						} else if (oItemData.PlannedKanban === oItemData.ProducedKanban) {
							//show alert "Kanban Complete"
							this.generateKanbanMessageCell(aCells[7], this.color.Green, "MSG_KANBAN_COMPLETE");
						}
					}
				}
			}
		},

		onScanBtnPress: function () {
			if (!this.getSelectedProcessOrder()) {
				MessageBox.show(this.getResourceBundle().getText("MSG_ERROR_NO_ORDER"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: this.getResourceBundle().getText("errorTitle")
				});
				return;
			}
			if (this.byId("kanbanID").getValue().trim() !== "") {
				this._processScan(this.getKanbanObject(), true);
			} else {
				this._scanBarcode();
			}
		},

		// onCloseBtnPress: function() {
		//  var sProcessOrder = this.getSelectedProcessOrder();
		//  if (!sProcessOrder) {
		//    MessageBox.show(this.getResourceBundle().getText("MSG_ERROR_NO_ORDER"), {
		//      icon: sap.m.MessageBox.Icon.ERROR,
		//      title: this.getResourceBundle().getText("errorTitle")
		//    });
		//  } else {
		//    this.getModel().callFunction("/CloseOrder", {
		//      urlParameters: {
		//        ProcessOrder: sProcessOrder
		//      },
		//      success: function(oData, response) {
		//        MessageToast.show(this.getResourceBundle().getText("MSG_SUCC_CLOSE", [sProcessOrder]));
		//      }.bind(this),
		//      error: function(oError) {

		//      }.bind(this)
		//    });
		//  }
		// },

		onCompleteBtnPress: function () {
			this._processScan(this.getKanbanObject(), false);
		},

		onResetBtnPress: function () {
			this.clearKanbanDetailForm();
		},

		onQuantityInputChanged: function (oEvent) {
			var iValue = parseInt(oEvent.getParameter("value"), 10);
			this.setQuantityInputStatus(iValue);
			if (isNaN(iValue)) {
				iValue = 0;
			}
			this.byId("quantitySlider").setValue(iValue);
		},

		onQuantitySliderChanged: function (oEvent) {
			this.byId("quantity").setValue(oEvent.getParameter("value"));
			this.setQuantityInputStatus(oEvent.getParameter("value"));
		},

		onBarcodeInputChanged: function (oEvent) {
			var sScanText = this.byId("barcodeInput").getValue().trim();
			if (sScanText.length === 11) {
				this._bindKanbanForm(sScanText.substr(0, sScanText.length - 1));
				this.byId("barcodeInput").setValue("");
				this.byId("scanDialog").close();
			}
		},

		onScanDialogOK: function (oEvent) {
			var sScanText = this.byId("barcodeInput").getValue().trim();
			if (sScanText !== "") {
				this._checkScanText(sScanText);
			} else {
				this.byId("scanDialog").close();
			}
		},

		onScanDialogCancel: function (oEvent) {
			this.byId("barcodeInput").setValue("");
			this.byId("scanDialog").close();
		},

		onListItemPressed: function (oEvent) {
			this.byId("orderTable").setSelectedItem(oEvent.getSource());
		},

		/* =========================================================== */
		/* public methods                                              */
		/* =========================================================== */

		/**
		 * generate the alert message cell for process order list
		 * @param {sap.ui.core.Control} oCell which cell to generate this message
		 * @param {string} sSingalColor the color for alert singal
		 * @param {string} sMessageText message text
		 */
		generateKanbanMessageCell: function (oCell, sSingalColor, sMessageText) {
			oCell.addContent(new sap.ui.core.Icon({
				src: "sap-icon://alert",
				color: sSingalColor
			})).addContent(new sap.m.Text({
				text: "\u00a0" + this.getResourceBundle().getText(sMessageText)
			}));
		},

		clearKanbanDetailForm: function () {
			this.byId("kanbanForm").unbindElement("kanbanModel");
			this.byId("quantitySlider").setMax(1);
			this.byId("quantity").setValue("").setValueState("None");
		},

		formatQuantity: function (sValue) {
			return sValue ? parseInt(sValue, 10) : 0;
		},

		formatMaxQuantity: function (sKanbanQuantity, sActualQuantity) {
			if (!sKanbanQuantity) {
				return 0;
			}
			var iMaxQuantity = parseInt(sKanbanQuantity, 10);
			var sScanSegementKey = this.byId("scanSegement").getSelectedKey();
			if (sScanSegementKey === "full" || sScanSegementKey === "line_return") {
				iMaxQuantity = parseInt(iMaxQuantity * (1 + this.fDefaultUpperLimit), 10);
			} else {
				iMaxQuantity = parseInt(sActualQuantity, 10);
			}
			return iMaxQuantity;
		},

		formatTitle: function (sSupplyArea, sMaterialNo, sMaterialDesc) {
			return this.getResourceBundle().getText("LABEL_OBJECT_TITLE", [sSupplyArea, sMaterialNo, sMaterialDesc]);
		},
		
		/*
		 * Checks if System ID is equal tp L6 system
		 * @param{string} SystemID Current system ID
		 */
		formatConfirmButton: function(SystemID){
			let L6System = SystemID,
				sPath = this.getView().getBindingContext().getPath(),
				oControlCycle = this.getModel().getProperty(sPath),
				isValidSystem = L6System.includes("L6") || L6System.includes("KLD") ? true : false;
			this.byId("confirmButton").setVisible(oControlCycle.StatusSequence === 'ZM04' && isValidSystem);
		},

		getKanbanObject: function () {
			var oElementBinding = this.byId("kanbanForm").getElementBinding("kanbanModel");
			var oElementContext = oElementBinding ? oElementBinding.oElementContext : null;
			var sBindingPath = oElementContext ? oElementContext.getPath() : "";
			var oKanbanModel = this.byId("kanbanForm").getModel("kanbanModel");
			var oBindingData = oKanbanModel ? oKanbanModel.getProperty(sBindingPath) : null;
			return {
				sKanbanID: this.byId("kanbanID").getValue(),
				sQuantity: this.byId("quantity").getValue(),
				sProcessOrder: this.getSelectedProcessOrder(),
				sBlocking: oBindingData ? oBindingData.Blocking : "",
				sKanbanStatus: oBindingData ? oBindingData.KanbanStatus : "",
				sActualQuantity: oBindingData ? oBindingData.ActualQuantity : "",
				sKanbanQuantity: oBindingData ? oBindingData.KanbanQuantity : "",
				sControlCycleID: oBindingData ? oBindingData.ControlCycleID : ""
			};
		},

		getSelectedProcessOrder: function () {
			var oSelectedOrderItem = this.byId("orderTable").getSelectedItem();
			var sProcessOrder;
			if (oSelectedOrderItem) {
				sProcessOrder = oSelectedOrderItem.getBindingContext().getObject().OrderNo;
			}
			return sProcessOrder;
		},

		setQuantityInputStatus: function (iValue) {
			var sScanSegmentKey = this.byId("scanSegement").getSelectedKey();
			var oKanbanObject = this.getKanbanObject();
			var sValue = iValue;
			var sActualQuantity = oKanbanObject.sActualQuantity;
			var iQuantitySliderMax = this.byId("quantitySlider").getMax();
			var iQuantitySliderMin = (sScanSegmentKey === "line_return" && oKanbanObject.sKanbanStatus === "2") ? 0 : parseInt(sActualQuantity,
				10);
			if (iValue > iQuantitySliderMax) {
				sValue = iQuantitySliderMax;
				this.byId("quantity").setValueState("Error").setValueStateText(this.getResourceBundle().getText("MSG_ERROR_QUANTITY_UPPER", [
					iQuantitySliderMax
				]));
			} else if (sScanSegmentKey === "line_return" && iValue <= iQuantitySliderMin) {
				this.byId("quantity").setValueState("Error").setValueStateText(this.getResourceBundle().getText("MSG_ERROR_QUANTITY_MINIMUM", [
					iQuantitySliderMin
				]));
			} else {
				this.byId("quantity").setValueState("None");
			}
			return sValue;
		},

		setSwitchVisibility: function () {
			var sScanSegementKey = this.byId("scanSegement").getSelectedKey();
			var oKanbanInfo = this.getKanbanObject();
			var fActualQuantity = parseInt(oKanbanInfo.sActualQuantity, 10);
			var fKanbanQuantity = parseInt(oKanbanInfo.sKanbanQuantity, 10);
			var fInputQuantity = parseInt(oKanbanInfo.sQuantity, 10);
			var fMaxQuantity = fActualQuantity; //just set a initial value
			var fMinQuantity = (sScanSegementKey === "line_return" && oKanbanInfo.sKanbanStatus === "2") ? 0 : fActualQuantity;
			//set componnet visibility
			if (sScanSegementKey === "empty") {
				this.byId("Component").setVisible(true);
			} else {
				this.byId("Component").setVisible(false);
			}
			//set quantity and slider enablement
			if (sScanSegementKey === "reverse") {
				this.getModel("objectView").setProperty("/quantityEnabled", false);
				this.byId("quantity").setValue(fActualQuantity).setValueState("None");
				this.byId("quantitySlider").setValue(fActualQuantity);
			} else {
				this.getModel("objectView").setProperty("/quantityEnabled", true);
			}
			//set slider max and check quantity
			if (!isNaN(fActualQuantity)) {
				if (sScanSegementKey === "full" || sScanSegementKey === "line_return") {
					fMaxQuantity = parseInt(fKanbanQuantity * (1 + this.fDefaultUpperLimit), 10);
				} else {
					fMaxQuantity = fActualQuantity;
				}
				this.byId("quantitySlider").setMax(fMaxQuantity);
				//check upper limit
				if (fInputQuantity > fMaxQuantity && sScanSegementKey !== "reverse") {
					this.byId("quantity").setValueState("Error").setValueStateText(this.getResourceBundle().getText("MSG_ERROR_QUANTITY_UPPER", [
						fMaxQuantity
					]));
				} else if (sScanSegementKey === "line_return" && fInputQuantity <= fMinQuantity) { // check minimum limit
					this.byId("quantity").setValueState("Error").setValueStateText(this.getResourceBundle().getText("MSG_ERROR_QUANTITY_MINIMUM", [
						fMinQuantity
					]));
				} else {
					this.byId("quantity").setValueState("None");
				}
			}
			this.byId("quantitySlider").rerender();
		},

		setSegmentButtonStyle: function () {
			$($("#" + this.byId("scanSegement").getId()).find("li")[1]).addClass("segmentBtnGap");
			//IE browser is different from others, must change css manually...
			$("#" + this.byId("btnScan").getId()).css("padding-left", "6%");
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		_bindKanbanForm: function (sKanbanID) {
			var oViewModel = this.getModel("objectView");
			var sSelKey = this.byId("scanSegement").getSelectedKey();
			this.byId("kanbanID").setValue(sKanbanID);
			var sObjectPath = "/" + this.getModel().createKey("KanbanDetailSet", {
				KanbanID: sKanbanID,
				Source: sSelKey
			});
			this.byId("kanbanForm").bindElement({
				path: sObjectPath,
				model: "kanbanModel",
				events: {
					dataRequested: function () {
						this.getOwnerComponent().oWhenMetadataIsLoaded.then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					}.bind(this),
					dataReceived: function (oData) {
						var sBindingPath = oData.getSource().getPath();
						var aMessages = oData.getSource().getModel().getMessagesByPath(sBindingPath + "/");
						if (aMessages && aMessages.length > 0) {
							//check if error from backend
							utilities.showErrorMessage(aMessages[0].message, this);
							this.byId("kanbanID").setValue("");
						} else if (this.byId("scanSegement").getSelectedKey() === "full" && oData.getParameter("data").ControlCycleID !== this.sControlCycleId) {
							//check if the Kanban belongs to selected control cycle
							utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_KANBAN_NOT_IN_CCID"), this);
							// this.byId("kanbanID").setValue("");
							this.clearKanbanDetailForm();
						}
						this.byId("quantity").setValueState("None");
						oViewModel.setProperty("/busy", false);
					}.bind(this)
				}
			});
			
			this.byId("kanbanForm").getModel("kanbanModel").attachRequestFailed(function(oError) {
				var oParams = oError.getParameters();
				oViewModel.setProperty("/busy", false);
				if (oParams.response.statusCode !== "404" || (oParams.response.statusCode === 404 && oParams.response.responseText.indexOf("Cannot POST") === 0)) {
						this._showServiceError(oParams.response);
					}
			}.bind(this));
		},
		
		/**
			 * Shows a {@link sap.m.MessageBox} when a service call has failed.
			 * Only the first error message will be display.
			 * @param {string} sDetails a technical error to be displayed on request
			 * @private
		 */
		_showServiceError : function (sDetails) {
			if (this._bMessageOpen) {
				return;
			}
			this._bMessageOpen = true;
			var oErrorDetail = JSON.parse(sDetails.responseText);
			var sErrorMessage;
			if(oErrorDetail && oErrorDetail.error && oErrorDetail.error.message){
				sErrorMessage = oErrorDetail.error.message.value;
			}
			MessageBox.show(
				sErrorMessage ? sErrorMessage : this._sErrorText,
				{
					id : "serviceErrorMessageBox",
					icon: MessageBox.Icon.ERROR,
					title: this._sErrorTitle,
					details: sDetails,
					styleClass: this.getOwnerComponent().getContentDensityClass(),
					actions: [MessageBox.Action.CLOSE],
					onClose: function () {
						this._bMessageOpen = false;
					}.bind(this)
				}
			);
		},

		_checkScanText: function (sScanText) {
			if (sScanText !== "") {
				if (sScanText.length !== 11) {
					MessageBox.show(this.getResourceBundle().getText("MSG_ERROR_KANBAN_LEN"), {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: this.getResourceBundle().getText("errorTitle")
					});
				} else {
					this._bindKanbanForm(sScanText.substr(0, sScanText.length - 1));
				}
			} else {
				this.clearKanbanDetailForm();
			}
		},

		_scanBarcode: function () {
			var bCameraEnabled = this.byId("enableCameraSwitch").getState();
			if (bCameraEnabled) {
				BarcodeScanner.scan(
					function (oResult) {
						/*oResult { text: "http://weixin.qq.com/r/ztKnvybEpXvarWLc94fc", 
						      format: "QR_CODE", 
						      cancelled: false}*/
						if (!oResult.cancelled) {
							var sScanText = oResult.text.trim();
							this._checkScanText(sScanText);
							// if (sScanText !== "") {
							//  if (sScanText.length !== 11) {
							//    MessageBox.show(this.getResourceBundle().getText("MSG_ERROR_KANBAN_LEN"), {
							//      icon: sap.m.MessageBox.Icon.ERROR,
							//      title: this.getResourceBundle().getText("errorTitle")
							//    });
							//  } else {
							//    this._bindKanbanForm(sScanText.substr(0, sScanText.length - 1));
							//  }
							// } else {
							//  this.clearKanbanDetailForm();
							// }
						}
					}.bind(this),
					function (oError) {
						// var sError = "Scanning failed: " + Error;
					},
					function (mParams) {
						// var sInput = "Value entered: " + mParams.newValue;
					}
				);
			} else {
				var oScanDialog = this.byId("scanDialog");
				if (!oScanDialog) {
					oScanDialog = sap.ui.xmlfragment(this.getView().getId(), "pg.kanban.view.ScanDialog", this);
					// connect dialog to view (models, lifecycle)
					this.getView().addDependent(oScanDialog);
				}
				oScanDialog.open();
				this.byId("barcodeInput").focus();
			}
		},

		_scanSuccess: function (oKanbanInfo, bScanNext, sScanSegementKey) {
			var sStatus = "";
			if (sScanSegementKey === "full") {
				sStatus = this.getResourceBundle().getText("Full");
			} else if (sScanSegementKey === "empty") {
				sStatus = this.getResourceBundle().getText("Empty");
			} else if (sScanSegementKey === "line_return") {
				sStatus = this.getResourceBundle().getText("LineReturn");
			} else if (sScanSegementKey === "reverse") {
				sStatus = this.getResourceBundle().getText("Reverse");
			}
			MessageToast.show(this.getResourceBundle().getText("MSG_SUCC_SCAN", [oKanbanInfo.sKanbanID, sStatus]));
			this.clearKanbanDetailForm();
			this.sSelectedPO = this.byId("orderSmartTable").getTable().getSelectedItem().getBindingContext().getObject().OrderNo;
			this.byId("orderSmartTable").rebindTable(true);
			if (bScanNext) {
				this._scanBarcode();
			}
			this.getView().setBusy(false);
		},

		_scanError: function () {
			this.sSelectedPO = this.byId("orderSmartTable").getTable().getSelectedItem().getBindingContext().getObject().OrderNo;
			this.clearKanbanDetailForm();
			this.getView().setBusy(false);
			this.byId("orderSmartTable").rebindTable(true);
		},

		/**
		 * oKanbanInfo: {sKanbanID, sQuantity, sProcessOrder}
		 */
		_processScan: function (oKanbanInfo, bScanNext) {
			var that = this;
			var sPath,
				oBindingInfo,
				oPlant = this.byId("plantText").getText();
			that._setCBtn(true);
			if (!oKanbanInfo.sProcessOrder) {
				setTimeout(function () {
					that._setCBtn(false);
				}, 5000);
				utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_NO_ORDER"), this);
			} else if (!oKanbanInfo.sKanbanID) {
				setTimeout(function () {
					that._setCBtn(false);
				}, 5000);
				utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_NO_KANBAN_ID"), this);
			} else {
				var sScanSegementKey = this.byId("scanSegement").getSelectedKey();
				if (sScanSegementKey === "full" && oKanbanInfo.sControlCycleID !== this.sControlCycleId) {
					//check if the kanban id belongs to selected control cycle
					setTimeout(function () {
						that._setCBtn(false);
					}, 5000);
					utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_KANBAN_NOT_IN_CCID"), this);
					this.clearKanbanDetailForm();
				} else if (sScanSegementKey === "reverse") {
					this._reverse(oKanbanInfo, bScanNext);
				} else {
					//check quantity is a number
					if (/^\d+(\.\d+)?$/.test(oKanbanInfo.sQuantity) === false) {
						setTimeout(function () {
							that._setCBtn(false);
						}, 5000);
						utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_QUANTITY_INVALID"), this);
						return;
					}
					var fInputQuantity = parseInt(oKanbanInfo.sQuantity, 10);
					//for line return, the mininum quantity must larger than actual quantity
					var fMinQuantity = oKanbanInfo.sKanbanStatus === "2" ? 0 : parseInt(oKanbanInfo.sActualQuantity, 10);
					var fMaxQuantity = this.byId("quantitySlider").getMax();
					if (fInputQuantity > fMaxQuantity) {
						setTimeout(function () {
							that._setCBtn(false);
						}, 5000);
						utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_QUANTITY_UPPER", [fMaxQuantity]), this);
						return;
					}
					if (sScanSegementKey === "line_return" && fInputQuantity <= fMinQuantity) {
						setTimeout(function () {
							that._setCBtn(false);
						}, 5000);
						utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_QUANTITY_MINIMUM", [fMinQuantity]), this);
						return;
					}
					this.getView().setBusy(true);
					// Check of Order execution exceeded 24 hours
					if (sScanSegementKey === "full") {
						sPath = "/procOrdGIGRSet(OrderNo='" + oKanbanInfo.sProcessOrder + "',KanbanID='" + oKanbanInfo.sKanbanID + "',Plant='" + oPlant +
							"')";
						oBindingInfo = {
							success: function (oData) {
								if (oData.GIGRExist == true) {
									MessageBox.confirm(
										"Order execution exceed 24 hours, consider opening new order. Do you want to continue ?", {
											icon: MessageBox.Icon.WARNING,
											title: "! Caution",
											actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
											styleClass: "sapUiSizeCompact",
											initialFocus: MessageBox.Action.CANCEL,
											onClose: function (sAction) {
												if (sAction === 'OK') {
													that._cfchangestatus(oKanbanInfo, bScanNext);
												} else {
													that.getView().setBusy(false);
												}

											}
										}
									);
								} else {
									that._cfchangestatus(oKanbanInfo, bScanNext);
								}
							}.bind(this),
							error: function (oError) {
								alert('fail');
							}.bind(this)
						};
						this.getModel().read(sPath, oBindingInfo);
					} else {
						this._cfchangestatus(oKanbanInfo, bScanNext);
						/*this.getModel().callFunction("/ChangeStatus", {
                  urlParameters: {
                    ActualQuantity: oKanbanInfo.sQuantity,
                    KanbanID: oKanbanInfo.sKanbanID,
                    LineReturn: sScanSegementKey === "line_return" ? "X" : "",
                    NextStatus: sScanSegementKey === "full" || sScanSegementKey === "line_return" ? "5" : "2",
                    ProcessOrder: oKanbanInfo.sProcessOrder
                  },
                  success: function(oData, response) {
                    this._scanSuccess(oKanbanInfo, bScanNext, sScanSegementKey);
                  }.bind(this),
                  error: function(oError) {
                    // this.clearKanbanDetailForm();
                    // this.getView().setBusy(false);
                    // this.byId("orderSmartTable").rebindTable(true);
                    this._scanError();
                  }.bind(this)
                });*/
					}

				}
			}
			//      var that = this;
			//      that._setCBtn(false);
			setTimeout(function () {
				that._setCBtn(false);
			}, 5000);
		},

		_cfchangestatus: function (oKanbanInfo, bScanNext) {

			var sScanSegementKey = this.byId("scanSegement").getSelectedKey(),
				that = this;

			this.getModel().callFunction("/ChangeStatus", {
				urlParameters: {
					ActualQuantity: oKanbanInfo.sQuantity,
					KanbanID: oKanbanInfo.sKanbanID,
					LineReturn: sScanSegementKey === "line_return" ? "X" : "",
					NextStatus: sScanSegementKey === "full" || sScanSegementKey === "line_return" ? "5" : "2",
					ProcessOrder: oKanbanInfo.sProcessOrder
				},
				success: function (oData, response) {
					this._scanSuccess(oKanbanInfo, bScanNext, sScanSegementKey);
				}.bind(this),
				error: function (oError) {
					// this.clearKanbanDetailForm();
					// this.getView().setBusy(false);
					// this.byId("orderSmartTable").rebindTable(true);
					setTimeout(function () {
						that._setCBtn(false);
					}, 5000);
					this._scanError();
				}.bind(this)
			});
			setTimeout(function () {
				that._setCBtn(false);
			}, 5000);
		},

		_reverse: function (oKanbanInfo, bScanNext) {
			//check: status==5, locked=""
			var sPath = this.getView().getBindingContext().getPath();
			var sControlCycleID = this.getModel().getProperty(sPath).ControlCycleID;

			if (oKanbanInfo.sKanbanStatus !== "5") {
				utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_REVERSE_NOT_FULL_KANBAN"), this);
			} else if (oKanbanInfo.sBlocking === "X") {
				utilities.showErrorMessage(this.getResourceBundle().getText("MSG_ERROR_REVERSE_BLOCKING_KANBAN"), this);
			} else {
				this.getView().setBusy(true);
				this.getModel().callFunction("/Reverse", {
					urlParameters: {
						KanbanID: oKanbanInfo.sKanbanID,
						ControlCycleID: sControlCycleID
					},
					success: function (oData, response) {
						this._scanSuccess(oKanbanInfo, bScanNext, "reverse");
					}.bind(this),
					error: function (oError) {
						this._scanError();
					}.bind(this)
				});
			}
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function (oEvent) {
			this.sControlCycleId = oEvent.getParameter("arguments").objectId;
			this.getOwnerComponent().oWhenMetadataIsLoaded.then(function () {
				var sObjectPath = this.getModel().createKey("ControlCycleSet", {
					ControlCycleID: this.sControlCycleId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
			this.getModel().read("/BasicInfoSet", {
				success: function (oData, response) {
					if (oData.results.length > 0) {
						this.byId("userText").setText(oData.results[0].UserName);
						this.byId("plantText").setText(oData.results[0].Plant);
						this.byId("systemText").setText(oData.results[0].SystemID);
						this.byId("ProdLineVerText").setText('');
						this.fDefaultUpperLimit = parseFloat(oData.results[0].UpperLimit);
						this.byId("quantitySlider").rerender();
						this.formatConfirmButton(oData.results[0].SystemID);
					}
				}.bind(this),
				error: function (oError) {
				}.bind(this)
			});
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView: function (sObjectPath) {
			var oViewModel = this.getModel("objectView");
			this.getView().unbindElement();
			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: function () {
						this._onBindingChange(sObjectPath);
					}.bind(this), //this._onBindingChange.bind(this),
					dataRequested: function () {
						this.getOwnerComponent().oWhenMetadataIsLoaded.then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					}.bind(this),
					dataReceived: function (oEvent, oController) {
						if (!this.getModel().getProperty(sObjectPath)) {
							this._getProdLineVer(sObjectPath);
						}
						// var oData = oEvent.getParameter("data");
						// oViewModel.setProperty("/controlCycleID", this.getResourceBundle().getText("LABEL_CONTROL_CYCLE_ID", [oData.ControlCycleID]));
						oViewModel.setProperty("/busy", false);
					}.bind(this)
				}
			});
			if (this.getModel().getProperty(sObjectPath)) {
				//    	  this._getProdLineVer(sObjectPath);
			}
		},

		_onBindingChange: function (sObjectPath) {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}
			// Everything went fine.
			oViewModel.setProperty("/busy", false);

			this._getProdLineVer(sObjectPath);
		},

		onProCreateDialog: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length,
				that = this;
			MessageBox.confirm(
				that.geti18nText("MSG_CREATE_NEW_PRO"), {
					icon: "",
					title: that.geti18nText("MSG_CAUTION"),
					actions: ["Continue", sap.m.MessageBox.Action.CANCEL],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function (sAction) {
						if (sAction === 'Continue') {
							that.onCreatePro();
						}

					}
				}
			);
		},

		onProDeCoupleDialog: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length,
				that = this;
			MessageBox.confirm(
				that.geti18nText("MSG_FINISH_PRO"), {
					icon: "",
					title: that.geti18nText("MSG_CAUTION"),
					actions: ["Continue", sap.m.MessageBox.Action.CANCEL],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function (sAction) {
						if (sAction === 'Continue') {
							that.onDeCouplePro();
						}

					}
				}
			);
		},
		
		onPressProConfirm: function(){
			let oKanbanInfo = this.getModel().getProperty(this.getView().getBindingContext().getPath());
				
				if (oKanbanInfo.LiteSolution === 'X'){
					MessageBox.show(this.getResourceBundle().getText("MSG_ERROR_CONFIRM_KANBAN"), {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: this.getResourceBundle().getText("errorTitle")
					});
					return;
				} else {
					this.onConfirmPro();
				}
		},

		onCreatePro: function (oEvent) {
			var that = this;
			var oKanbanInfo = this.getModel().getProperty(this.getView().getBindingContext().getPath()),
				sProductionVersion = this.getView().getModel("oProdLineVerModel").getProperty("/ProdVersion");

			this.getView().setBusy(true);
			this.getModel().callFunction("/PrOCreate", {
				urlParameters: {
					ControlCycleID: oKanbanInfo.ControlCycleID,
					ProductionVersion: sProductionVersion
				},
				success: function (oData, response) {
					if (response.data.results[0].OrderNo) {
						MessageToast.show(that.geti18nText("MSG_CREATED_PRO", [response.data.results[0].OrderNo]));
						setTimeout(this.onObjRefresh,3000);
						this.getView().setBusy(false);
					}

				}.bind(this),
				error: function (oError) {
					this.getView().setBusy(false);
				}.bind(this)
			});

		},

		onDeCouplePro: function (oEvent) {
			var sProcessOrder,
				oKanbanInfo = this.getModel().getProperty(this.getView().getBindingContext().getPath());
			if (!this.getSelectedProcessOrder()) {
				MessageBox.show(this.getResourceBundle().getText("MSG_ERROR_NO_ORDER"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: this.getResourceBundle().getText("errorTitle")
				});
				return;
			}
			this.getView().setBusy(true);
			sProcessOrder = this.getSelectedProcessOrder();

			this.getModel().callFunction("/PrODeCouple", {
				urlParameters: {
					ControlCycleID: oKanbanInfo.ControlCycleID,
					OrderNo: sProcessOrder
				},
				success: function (oData, response) {
					if (response.data.results[0].OrderNo) {
						MessageToast.show('Kanban ' + response.data.results[0].KanbanID + ' Finalized');
						this.onObjRefresh();
						this.getView().setBusy(false);
					}

				}.bind(this),
				error: function (oError) {
					this.getView().setBusy(false);
				}.bind(this)
			});

		},
		
		onConfirmPro: function (oEvent){
			let sProcessOrder = this.getSelectedProcessOrder(), 
			oKanbanInfo = this.getModel().getProperty(this.getView().getBindingContext().getPath());
			
			if (!this.getSelectedProcessOrder()) {
				MessageBox.show(this.getResourceBundle().getText("MSG_ERROR_NO_ORDER"), {
					icon: sap.m.MessageBox.Icon.ERROR,
					title: this.getResourceBundle().getText("errorTitle")
				});
				return;
			}
			
			this.getView().setBusy(true);
			
			let urlParams = {
				ControlCycleID: oKanbanInfo.ControlCycleID,
				Plant: oKanbanInfo.Plant,
				ProcessOrder: sProcessOrder
			}
			
			this.getModel().callFunction("/PrOConfirm",{
				urlParameters: urlParams,
				success:function(oData, response){
					if(response.data.results[0].Type === 'S'){
						MessageToast.show(this.geti18nText("MSG_CONFIRM_PRO", [response.data.results[0].ProcessOrder]));
						this.onObjRefresh();
						this.getView().setBusy(false);
					}
				}.bind(this),
				error:function(oError){
					this.getView().setBusy(false);
				}.bind(this)
			});	
		},

		handleProdLineValueHelp: function () {
			var oProdLineVerFrag;
			if (!oProdLineVerFrag) {
				oProdLineVerFrag = sap.ui.xmlfragment("ProdLineVer", "pg.kanban.view.ProdLine", this);
				oProdLineVerFrag.setContentWidth = "5rem";
				oProdLineVerFrag.setContentHeight = "5rem";
				oProdLineVerFrag.addStyleClass("sapUiSizeCompact");
			}
			this.getView().addDependent(oProdLineVerFrag);
			oProdLineVerFrag.open();

		},

		_getProdLineVer: function (sObjectPath) {
			var sPath,
				oDataCycle,
				aFilterIds,
				aFilterValues,
				aFilters = [],
				aFiltersdummy,
				sControlCycleId,
				sMaterialNo,
				oBindingInfo,
				sPlant,
				StatusSequence = this.getModel().getProperty(sObjectPath + "/StatusSequence"),
				oProdModel = this.getView().getModel("oProdModel");

			if (StatusSequence === 'ZM04') {
				//      	if(oProdModel.oData.length === 0) {
				if (this.getModel().getProperty(sObjectPath)) {
					oDataCycle = this.getModel().getProperty(sObjectPath);

					sControlCycleId = oDataCycle.ControlCycleID;
					sMaterialNo = oDataCycle.MaterialNo;
					sPlant = oDataCycle.Plant;

					aFilters.push(new sap.ui.model.Filter("ControlCycleID", sap.ui.model.FilterOperator.EQ, sControlCycleId));
					aFilters.push(new sap.ui.model.Filter("MaterialNo", sap.ui.model.FilterOperator.EQ, sMaterialNo));
					aFilters.push(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, sPlant));

					sPath = "/ProduceSet";
					this.getModel().read(sPath, {
						filters: aFilters,
						success: function (oData1, response) {
							oProdModel.setData(oData1);
							if (oData1.results.length > 1) {
								this.handleProdLineValueHelp();
							} else {
								this.handleProLineConfirm();
							}

						}.bind(this),
						error: function (oError) {
							alert('failed');
						}.bind(this)
					});
				}
			} else {
				this.getView().getModel("oProdLineVerModel").setData({});
				this.byId("orderSmartTable").rebindTable(true);
			}

		},

		handleProLineConfirm: function (oEvent) {
			var sPath,
				sControlCycleId,
				sMaterialNo,
				sPlant,
				oProdModel = this.getView().getModel("oProdModel"),
				oSelectedData,
				aFilters = [],
				sData,
				oProdVerModel = this.getView().getModel("oProdVerModel");

			sPath = this.getView().getBindingContext().getPath();
			if (sPath) {
				sData = this.getModel().getProperty(sPath);
				if (sData) {
					aFilters.push(new sap.ui.model.Filter("MaterialNo", sap.ui.model.FilterOperator.EQ, sData.MaterialNo));
					aFilters.push(new sap.ui.model.Filter("ControlCycleID", sap.ui.model.FilterOperator.EQ, sData.ControlCycleID));
					aFilters.push(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, sData.Plant));
				}
			}
			if (oEvent) {
				sPath = oEvent.getParameters().selectedItem.getBindingContextPath();
				oSelectedData = oProdModel.getProperty(sPath);
				aFilters.push(new sap.ui.model.Filter("ProdLine", sap.ui.model.FilterOperator.EQ, oSelectedData.ProductionLine));
				this.getView().getModel("oProdLineVerModel").setProperty("/ProdLine", oSelectedData.ProductionLine);

			} else {
				aFilters.push(new sap.ui.model.Filter("ProdLine", sap.ui.model.FilterOperator.EQ, oProdModel.getProperty(
					"/results/0/ProductionLine")));
				this.getView().getModel("oProdLineVerModel").setProperty("/ProdLine", oProdModel.getProperty("/results/0/ProductionLine"));
			}

			sPath = "/ProductionVersionSet";

			this.getModel().read(sPath, {
				filters: aFilters,
				success: function (oData, response) {
					oProdVerModel.setData(oData);
					if (oData.results.length > 1) {
						this.handleProdVerPopup();
					} else {
						this.handleProVerconfirm();
					}

				}.bind(this),
				error: function (oError) {
					alert('failed');
				}.bind(this)
			});

		},

		handleProLineClose: function () {
			this.onNavBack();
		},

		handleProdVerPopup: function () {

			var oProdVersionFrag;
			if (!oProdVersionFrag) {
				oProdVersionFrag = sap.ui.xmlfragment("ProdVersion", "pg.kanban.view.ProdVersion", this);
				oProdVersionFrag.setContentWidth = "5rem";
				oProdVersionFrag.setContentHeight = "5rem";
				oProdVersionFrag.addStyleClass("sapUiSizeCompact");
			}
			this.getView().addDependent(oProdVersionFrag);
			oProdVersionFrag.open();

		},

		handleProVerconfirm: function (oEvent) {
			var sPath,
				oSelectedData,
				oProdLineVerModel,
				oProdVerModel = this.getView().getModel("oProdVerModel");
			if (oEvent) {
				sPath = oEvent.getParameters().selectedItem.getBindingContextPath(),
					oSelectedData = this.getView().getModel("oProdVerModel").getProperty(sPath),
					oProdLineVerModel = this.getView().getModel("oProdLineVerModel");
				this.getView().getModel("oProdLineVerModel").setProperty("/ProdVersion", oSelectedData.ProdVersion);
				oProdLineVerModel.setData(oSelectedData);
			} else {
				this.getView().getModel("oProdLineVerModel").setProperty("/ProdVersion", oProdVerModel.getProperty("/results/0/ProdVersion"));
			}

			this.byId("orderSmartTable").rebindTable(true);
		},

		_createSearchFilterObject: function (aFilterIds, aFilterValues) {
			var aFilters = [],
				iCount;

			for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
				aFilters.push(new Filter(aFilterIds[iCount], FilterOperator.EQ, aFilterValues[iCount], ""));
			}
			return aFilters;
		},

		onObjRefresh: function (oEvent) {
			this.byId("orderSmartTable").rebindTable(true);
		},

		_setCBtn: function (sValue) {
			var oViewModel = this.getModel("objectView");
			oViewModel.setProperty("/cpBtnEnabled", sValue);
		},


		onScanned: function (oEvent) {
			this._checkScanText(oEvent.getParameter('value')); 
		},
		getDecoders: function () {
			return [{
				key: 'PDF417-UII',
				text: 'PDF417-UII',
				decoder: this.parserPDF417UII,
			}, {
				key: 'text',
				text: 'TEXT',
				decoder: this.parserText,
			} ];
		},
		parserText: function (oResult) {
			var sText = '';
			var iLength = oResult.text.length;
			for (var i = 0; i !== iLength; i++) {
				if (oResult.text.charCodeAt(i) < 32) {
					sText += ' ';
				} else {
					sText += oResult.text[i];
				}
			}
			return sText;
		},
		parserPDF417UII: function (oResult) {
			// we expect that
			// first symbol of UII (S - ASCII = 83) or it just last group
			var sText = oResult.text || '';
			if (oResult.format && oResult.format === 10) {
				sText = '';
				var iLength = oResult.text.length;
				var aChars = [];
				for (var i = 0; i !== iLength; i++) {
					aChars.push(oResult.text.charCodeAt(i));
				}
				var iStart = -1;
				var iGRCounter = 0;
				var iGroupUII = -1;
				var sTemp = '';
				aChars.forEach(function (code, k) {
					switch (code) {
					case 30:
						if (iStart === -1) {
							iStart = k;
							sTemp = '';
						} else {
							sText = sTemp;
							iGRCounter = -1;
						}
						break;
					case 29:
						iGRCounter += 1;
						break;
					default:
						if (iGRCounter > 2 && code === 83 && iGRCounter > iGroupUII) {
							sTemp = '';
							iGroupUII = iGRCounter;
						}
						if (iGroupUII === iGRCounter) {
							sTemp += String.fromCharCode(code);
						}
					}
				});
				if (sText) {
					sText = sText.slice(1);
				}
			}
			return sText;
		}
	});

});