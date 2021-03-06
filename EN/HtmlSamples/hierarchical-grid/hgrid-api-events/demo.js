$(function () {
            // Used to show output in the API Viewer at runtime, 
            // defined in external script 'apiviewer.js'    
            var apiViewer = new $.ig.apiViewer();


            /*-----------------API calls -------------------------*/

            function SelectRow(grid, index) {
                grid.igGridSelection("selectRow", index);
            }
            function GetSelectedRows(grid) {
                var rows = grid.igGridSelection("selectedRows");
                apiViewer.log("The number of selected rows is: " + rows.length);
                $.each(rows, function (i, val) {
                    apiViewer.log("Row with id " + val.id + " is selected");
                });
            }

            function ChangePageIndex(grid, index) {
                grid.igGridPaging("pageIndex", index);
            }

            function ChangePageSize(grid, size) {
                grid.igGridPaging("pageSize", size);
            }

            function ApplyFilter(grid) {
                var expr = $("#exprTextEditor").igTextEditor("value") ||
                        $("#exprNumericEditor").igNumericEditor("value") ||
                        $("#exprDateEditor").igDateEditor("value");

                var condition = $("#conditionList").igCombo("option", "selectedItems")[0].value;
                var columnDataSource = $("#filterColumn").igCombo("option", "dataSource");
                var filterColumn = columnDataSource[$("#filterColumn").igCombo("option", "selectedItems")[0].index].column;

                if (expr !== null) {
                    grid.igGridFiltering("filter", ([{ fieldName: filterColumn, expr: expr, cond: condition }]));
                } else {
                    grid.igGridFiltering("filter", []);
                }
            }

            /*-----------------Grid  Instantiation -------------------------*/
            $("#grid").igHierarchicalGrid({
                width: "100%",
                height: "100%",
                autoGenerateColumns: false,
                dataSource: northwind,
                primaryKey: "EmployeeID",
                responseDataKey: "results",
                dataSourceType: "json",
                autofitLastColumn: false,
                columns: [
                   { key: "EmployeeID", headerText: "Employee ID", dataType: "number", width: "15%" },
                   { key: "LastName", headerText: "Last Name", dataType: "string", width: "15%" },
                   { key: "FirstName", headerText: "First Name", dataType: "string", width: "15%" },
                   { key: "Title", headerText: "Title", dataType: "string", width: "15%" },
                   { key: "Address", headerText: "Address", dataType: "string", width: "20%" },
                   { key: "City", headerText: "City", dataType: "string", width: "10%" },
                   { key: "Region", headerText: "Region", dataType: "string", width: "10%" }
                ],
                features: [
                      {
                          name: "Selection",
                          mode: "row",
                          multipleSelection: true
                      },
                      {
                          name: "Sorting",
                          type: "local"
                      }
                ],
                childrenDataProperty: "Orders",
                autoGenerateLayouts: false,
                columnLayouts: [
                    {
                        key: "Orders",
                        autoCommit: true,
                        responseDataKey: "results",
                        autoGenerateColumns: false,
                        autofitLastColumn: false,
                        primaryKey: "OrderID",
                        width: "100%",
                        columns: [
                            { key: "OrderID", headerText: "Order ID", dataType: "number", width: "10%" },
                            { key: "Freight", headerText: "Freight", dataType: "string", width: "15%" },
                            { key: "ShipName", headerText: "Ship Name", dataType: "string", width: "20%" },
                            { key: "ShipAddress", headerText: "Ship Address", dataType: "string", width: "25%" },
                            { key: "ShipCity", headerText: "Ship City", dataType: "string", width: "20%" },
                            { key: "ShipCountry", headerText: "Ship Country", dataType: "string", width: "20%" }
                        ],
                        features: [
                            {
                                name: "Paging",
                                pageSize: 10
                            },
                            {
                                name: "Selection",
                                mode: "row",
                                multipleSelection: true
                            },
                            {
                                name: "Sorting",
                                type: "local"
                            },
                            {
                                name: "Filtering",
                                type: "local"
                            }
                        ]
                    }
                ]
            });

            /*----------------- Method & Option Examples(Hierarchical Grid) -------------------*/

            //function for expanding/collapsing all rows on all levels in the igHierarhicalGrid
            function expandCollapseRowsPerGrid($gridElement, action, level, callback) {
                var _root = $("#grid").data("igHierarchicalGrid");
                //get all rows in the grid that are not child grid container
                var rows = $gridElement.children('tbody').find('>tr:not([data-container])');
                var rowsCount = rows.length;
                var gridChildElements = [];
                var index = 0;
                //Callback function used for the expand/collapse methods.
                //Recursively loops through the child grids and calls expandCollapseRowsPerGrid for each.
                var callbackFuncToggled = function (hGrid, $tr) {
                    var dataRowContainer, $trContainer = $tr.next('tr');
                    if ($trContainer.attr('data-container')) {
                        gridChildElements.push($trContainer.find('table[data-childgrid]'));
                    }
                    if (++index === rowsCount) {
                        $.each(gridChildElements, function (ind, elem) {
                            expandCollapseRowsPerGrid(elem, action, level + 1, callback);
                        });
                        callback(gridChildElements, $tr, level)
                    }
                };

                rows.each(function (ind, row) {
                    var $row = $(row);
                    if ((_root.expanded($row) && action === 'expand') ||
                            (_root.collapsed($row) && action === 'collapse')) {
                        callbackFuncToggled(_root, $row);
                    } else {
                        if (action === 'expand') {
                            _root.expand($row, callbackFuncToggled)
                        } else {
                            _root.collapse($row, callbackFuncToggled)
                        }
                    }
                });
            }

            $("#buttonExpandAll").igButton({
                labelText: $("#buttonExpandAll").val(),
                click: function (event) {
                    expandCollapseRowsPerGrid($('#grid'), 'expand', 0, function () { });
                }
            });

            $("#buttonCollapseAll").igButton({
                labelText: $("#buttonCollapseAll").val(),
                click: function (event) {
                    expandCollapseRowsPerGrid($('#grid'), 'collapse', 0, function () { });
                }
            });

            /*----------------- Method & Option Examples(Child Grid) -------------------------*/
            //function that returned the selected grid's selector
            function getChildGridIDSelector() {
                var rowID = $("#SelectParentRowID").igCombo("value");
                var row = $("#grid").igGrid("rowById", rowID, false);

                //if no value is selected trigger validation for the igCombo for selection a parent row
                if (rowID == null) {
                    $("#SelectParentRowID").igCombo("validate");
                    return;
                }
                //if the row is not expanded the child grid might not be available
                //Expand the row
                $("#grid").igHierarchicalGrid("expand", row);

                //get the child grid
                var childGrid = row.next("tr[data-container=true]").find("table[data-childgrid=true]");
                //return the child grid selector
                return "#" + $(childGrid[0]).attr("id");
            }

            $("#SelectParentRowID").igCombo({
                width: "200px",
                renderMatchItems: false,
                dropDownMaxHeight: 500,
                dropDownWidth: 400,
                responseDataKey: "results",
                dataSourceType: "json",
                valueKey: "EmployeeID",
                dataSource: northwind,
                validatorOptions: {
                    required: true,
                    validation: function (evt, ui) {
                        var value = $("#SelectParentRowID").igCombo("value");
                        if (value == null) {
                            ui.invalid = true;
                            ui.message = "No parent row selected. Please select a parent row by id.";
                        }
                    }
                },
                headerTemplate: "<table class='comboTable comboTableHeader' cellspacing='0' cellpadding='4'><tr><td>Employee ID</td> <td>Last Name</td> <td>First Name</td> </tr></table>",
                itemTemplate: "<table class='comboTable' cellspacing='0' cellpadding='4'><tbody><tr><td>${EmployeeID}</td> <td>${LastName}</td> <td>${FirstName}</td><tr></tbody></table>",
                selectionChanged: function (evt, ui) {
                    //update the paging editors based on the total number of pages in the selected child grid 
                    var childGridSelector = getChildGridIDSelector();
                    var pageSize = $(childGridSelector).igGridPaging("pageSize");
                    var totalRecords = $(childGridSelector).igGrid("option", "dataSource").results.length;
                    var totalNumberOfPages = totalRecords / pageSize + 1;
                    var sizeList = [];
                    for (var i = 1; i <= totalNumberOfPages; i++) {
                        sizeList.push({ pIndex: i });
                    }
                    $("#pageIndexList").igCombo("option", "dataSource", sizeList);
                    $("#pageIndexList").igCombo("option", "selectedItems", [{ index: 0 }]);
                }

            });

            $("#buttonDataBind").igButton({
                labelText: $("#buttonDataBind").val(),
                click: function (e) {
                    $(getChildGridIDSelector()).igGrid("dataBind");
                }
            });

            $("#buttonFilter").igButton({
                labelText: $("#buttonFilter").val(),
                click: function (event) {
                    var grid = $(getChildGridIDSelector());
                    ApplyFilter(grid);
                }
            });

            $("#filterColumn").igCombo({
                width: "120px",
                textKey: "text",
                valueKey: "type",
                renderMatchItems: false,
                dataSource: [
                    { text: "Order ID", column: "OrderID", type: "number" },
                    { text: "Freight", column: "Freight", type: "number" },
                    { text: "Ship Name", column: "ShipName", type: "string" },
                    { text: "Ship Address", column: "ShipAddress", type: "string" },
                    { text: "Ship City", column: "ShipCity", type: "string" },
                    { text: "Ship Country", column: "ShipCountry", type: "string" }
                ],
                mode: "dropdown",
                enableClearButton: false,
                selectedItems: [{ index: 0 }],
                selectionChanged: function (e, args) {
                    var selText,
                        nEditor = $("#exprNumericEditor"),
                        dEditor = $("#exprDateEditor"),
                        tEditor = $("#exprTextEditor");
                    switch (args.items[0].value) {
                        case "number":
                            nEditor.igNumericEditor("show");
                            tEditor.igTextEditor("hide");
                            dEditor.igDateEditor("hide");
                            break;
                        case "date":
                            nEditor.igNumericEditor("hide");
                            tEditor.igTextEditor("hide");
                            dEditor.igDateEditor("show");
                            break;
                        case "string":
                            nEditor.igNumericEditor("hide");
                            tEditor.igTextEditor("show");
                            dEditor.igDateEditor("hide");
                            break;
                    }
                    // reset the editors
                    nEditor.igNumericEditor("value", null);
                    tEditor.igTextEditor("value", null);
                    dEditor.igDateEditor("value", null);
                    // select default condition
                    $("#conditionList").igCombo("option", "selectedItems", [{ index: 0 }]);
                    selText = $("#conditionList").igCombo("option", "selectedItems")[0].text;
                    nEditor.igNumericEditor("option", "nullText", selText);
                    tEditor.igTextEditor("option", "nullText", selText);
                    dEditor.igDateEditor("option", "nullText", selText);
                }
            });

            $("#conditionList").igCombo({
                width: "140px",
                textKey: "text",
                valueKey: "cond",
                renderMatchItems: false,
                cascadingDataSources: {
                    "number": [
                        { cond: "equals", text: $.ig.GridFiltering.locale.equalsLabel },
                        { cond: "doesNotEqual", text: $.ig.GridFiltering.locale.doesNotEqualLabel },
                        { cond: "lessThan", text: $.ig.GridFiltering.locale.lessThanLabel },
                        { cond: "greaterThan", text: $.ig.GridFiltering.locale.greaterThanLabel }
                    ],
                    "string": [
                        { cond: "startsWith", text: $.ig.GridFiltering.locale.startsWithLabel },
                        { cond: "endsWith", text: $.ig.GridFiltering.locale.endsWithLabel },
                        { cond: "contains", text: $.ig.GridFiltering.locale.containsLabel },
                        { cond: "doesNotContain", text: $.ig.GridFiltering.locale.doesNotContainLabel },
                        { cond: "empty", text: $.ig.GridFiltering.locale.emptyNullText },
                        { cond: "notEmpty", text: $.ig.GridFiltering.locale.notEmptyNullText }
                    ],
                    "date": [
                        { cond: "on", text: $.ig.GridFiltering.locale.onLabel },
                        { cond: "notOn", text: $.ig.GridFiltering.locale.notOnLabel },
                        { cond: "before", text: $.ig.GridFiltering.locale.beforeLabel },
                        { cond: "after", text: $.ig.GridFiltering.locale.afterLabel },
                        { cond: "today", text: $.ig.GridFiltering.locale.todayLabel },
                        { cond: "yesterday", text: $.ig.GridFiltering.locale.yesterdayLabel },
                        { cond: "lastMonth", text: $.ig.GridFiltering.locale.lastMonthLabel },
                        { cond: "nextMonth", text: $.ig.GridFiltering.locale.nextMonthLabel },
                        { cond: "thisMonth", text: $.ig.GridFiltering.locale.thisMonthLabel },
                        { cond: "lastYear", text: $.ig.GridFiltering.locale.lastYearLabel },
                        { cond: "thisYear", text: $.ig.GridFiltering.locale.thisYearLabel },
                        { cond: "nextYear", text: $.ig.GridFiltering.locale.nextYearLabel }
                    ]
                },
                parentCombo: "#filterColumn",
                mode: "dropdown",
                enableClearButton: false,
                selectedItems: [{ index: 0 }],
                selectionChanged: function (e, args) {
                    $("#exprTextEditor").igTextEditor("option", "nullText", args.items[0].text);
                    $("#exprNumericEditor").igNumericEditor("option", "nullText", args.items[0].text);
                    $("#exprDateEditor").igDateEditor("option", "nullText", args.items[0].text);
                }
            });

            $("#exprTextEditor").igTextEditor()
            .css("height", "21px")
            .hide()
            .children()
            .first()
            .css("height", "19px");

            $("#exprNumericEditor").igNumericEditor({
                nullText: $.ig.GridFiltering.locale.equalsLabel
            })
           .css("height", "21px")
           .children()
           .first()
           .css("height", "19px");

            $("#exprDateEditor").igDateEditor()
            .css("height", "21px")
            .hide()
            .children()
            .first()
            .css("height", "19px");

            $("#pageIndexList").igCombo({
                width: "120px",
                valueKey: "pIndex",
                renderMatchItems: false,
                dataSource: [
                    { pIndex: 1 },
                    { pIndex: 2 }
                ],
                mode: "dropdown",
                enableClearButton: false,
                selectedItems: [{ index: 0 }],
                selectionChanged: function (e, args) {
                    var grid = $(getChildGridIDSelector());
                    var index = parseInt(args.items[0].value - 1);
                    ChangePageIndex(grid, index);
                }
            });

            $("#pageSizeList").igCombo({
                width: "120px",
                renderMatchItems: false,
                valueKey: "size",
                dataSource: [
                    { size: 2 },
                    { size: 5 },
                    { size: 10 }
                ],
                mode: "dropdown",
                enableClearButton: false,
                selectedItems: [{ index: 1 }],
                selectionChanged: function (e, args) {               
                    var grid = $(getChildGridIDSelector());

                    var pageSize = args.items[0].value;
                    var totalRecords = grid.igGrid("option", "dataSource").results.length;
                    var totalNumberOfPages = totalRecords / pageSize + 1;
                    var sizeList = [];
                   
                    ChangePageSize(grid, pageSize);

                    //update the page index list based on the selected size list          
                    for (var i = 1; i <= totalNumberOfPages; i++) {
                        sizeList.push({ pIndex: i });
                    }
                    $("#pageIndexList").igCombo("option", "dataSource", sizeList);
                    $("#pageIndexList").igCombo("option", "selectedItems", [{ index: 0 }]);
                }
            });

            $("#rowNumberEditor").igNumericEditor({
                value: 0,
                minValue: 0,
                width: 150,
                height: 23,
                validatorOptions: {
                    required: true
                }
            });

            $("#buttonSelectRow").igButton({
                labelText: $("#buttonSelectRow").val(),
                click: function (event) {
                    $("#rowNumberEditor").igNumericEditor("validate");

                    if ($("#rowNumberEditor").igNumericEditor("value") < $(getChildGridIDSelector()).igGrid("rows").length) {
                        var grid = $(getChildGridIDSelector());
                        var index = $("#rowNumberEditor").igNumericEditor("value");
                        SelectRow(grid, index);
                    }
                }
            });

            $("#buttonSelectedRows").igButton({
                labelText: $("#buttonSelectedRows").val(),
                click: function (event) {
                    var grid = $(getChildGridIDSelector());
                    GetSelectedRows(grid);
                }
            });

            /*----------------- Event Examples(Hierarchical Grid) -------------------------*/
            $("#grid").on("ighierarchicalgridrowexpanding", function (evt, ui) {
                var message = "ighierarchicalgridrowexpanding";
                apiViewer.log(message);
            });
            $("#grid").on("ighierarchicalgridrowexpanded", function (evt, ui) {
                var message = "ighierarchicalgridrowexpanded";
                apiViewer.log(message);
            });

            $("#grid").on("ighierarchicalgridrowcollapsing", function (evt, ui) {
                var message = "ighierarchicalgridrowcollapsing";
                apiViewer.log(message);
            });

            $("#grid").on("ighierarchicalgridrowcollapsed", function (evt, ui) {
                var message = "ighierarchicalgridrowcollapsed";
                apiViewer.log(message);
            });

            $("#grid").on("igchildgridcreating", function (evt, ui) {
                var message = "igchildgridcreating";
                apiViewer.log(message);
            });

            $("#grid").on("igchildgridcreated", function (evt, ui) {
                var message = "igchildgridcreated";
                apiViewer.log(message);

                //attach event handlers for the child grids when they're created
                attachChildGridEvents(ui.element);
            });

            $("#grid").on("ighierarchicalgridchildrenpopulating", function (evt, ui) {
                var message = "ighierarchicalgridchildrenpopulating";
                apiViewer.log(message);
            });

            $("#grid").on("ighierarchicalgridchildrenpopulated", function (evt, ui) {
                var message = "ighierarchicalgridchildrenpopulated";
                apiViewer.log(message);
            });

            /*----------------- Event Examples(Child Grid) -------------------------*/
            function attachChildGridEvents(gridElement) {

                $(gridElement).on("iggridselectionrowselectionchanging", function (evt, ui) {
                    var message = "iggridselectionrowselectionchanging raised for child grid with id: " + $(gridElement).attr("id");
                    apiViewer.log(message);
                });

                $(gridElement).on("iggridselectionactiverowchanged", function (evt, ui) {
                    var message = "iggridselectionactiverowchanged raised for child grid with id: " + $(gridElement).attr("id");
                    apiViewer.log(message);
                });

                $(gridElement).on("iggridfilteringdatafiltering", function (evt, ui) {
                    var message = "iggridfilteringdatafiltering raised for child grid with id: " + $(gridElement).attr("id");
                    apiViewer.log(message);
                });

                $(gridElement).on("iggridrendering", function (evt, ui) {
                    var message = "iggridrendering raised for child grid with id: " + $(gridElement).attr("id");
                    apiViewer.log(message);
                });

                $(gridElement).on("iggriddatabinding", function (evt, ui) {
                    var message = "iggriddatabinding raised for child grid with id: " + $(gridElement).attr("id");;
                    apiViewer.log(message);
                });
            }

        });