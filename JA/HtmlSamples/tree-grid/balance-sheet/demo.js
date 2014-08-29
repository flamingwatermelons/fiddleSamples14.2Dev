$(function () {

            var dataSource = [
                {
                    "Number": "1000", "Name": "ASSETS", "Balance": "", "Assets": [
                        {
                            "Number": "1003", "Name": "Fixed Assets", "Balance": "", "Assets": [
                                {
                                    "Number": "1115", "Name": "Lands and Buildings", "Balance": "", "Assets": [
                                        { "Number": "1120", "Name": "Lands and Buildings", "Balance": "$147,948,060" },
                                        { "Number": "1130", "Name": "Increases during the year", "Balance": "$147.73" },
                                        { "Number": "1140", "Name": "Decreases during the year", "Balance": "" },
                                        { "Number": "1130", "Name": "Accum. Depreciation, Buildings", "Balance": "$526,620.38" },
                                        { "Number": "1140", "Name": "Lands and Buildings, Total", "Balance": "$953,007.95" }
                                    ]
                                },
                                {
                                    "Number": "1200", "Name": "Operating Equipment", "Balance": "", "Assets": [
                                        { "Number": "1290", "Name": "Operating Equipment, Total", "Balance": "$99,811.44" }
                                    ]
                                },
                                {
                                    "Number": "1300", "Name": "Vehicles", "Balance": "", "Assets": [
                                        { "Number": "1390", "Name": "Vehicles, Total", "Balance": "$75,870.13" }
                                    ]
                                },
                                { "Number": "1990", "Name": "Fixed Assets, Total", "Balance": "$1,128,659.13" }
                            ]
                        },
                        {
                            "Number": "2000", "Name": "Current Assets", "Balance": "", "Assets": [
                                {
                                    "Number": "1115", "Name": "Inventory", "Balance": "", "Assets": [
                                        { "Number": "1120", "Name": "Resale Items", "Balance": "$507,215.13" },
                                        { "Number": "1130", "Name": "Finished Goods", "Balance": "$135,842.95" },
                                        { "Number": "1140", "Name": "Raw Material", "Balance": "$497,898.10" },
                                        { "Number": "1130", "Name": "Inventory, Total", "Balance": "$897,898.10" }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];

            $("#treegrid1").igTreeGrid({
                width: "100%",
                autoComit: true,
                dataSource: dataSource,
                autoGenerateColumns: false,
                primaryKey: "Number",
                columns: [
                    { headerText: "Number", key: "Number", width: "250px", dataType: "number" },
                    { headerText: "Name", key: "Name", width: "250px", dataType: "string" },
                    { headerText: "Balance", key: "Balance", width: "100px", dataType: "string" }
                ],
                // tree grid specific options
                dataSourceLayoutKey: "Assets",
                renderExpandColumn: true,
                features: [
                    {
                        name: "Updating"
                    }
                ]
            });
        });