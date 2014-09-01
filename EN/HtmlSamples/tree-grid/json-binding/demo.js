$(function () {
            var flatDS = [
                { "EmployeeID": 0, "PID": -1, "FirstName": "Andrew", "LastName": "Fuller", "ReportsTo": "-" },
                { "EmployeeID": 1, "PID": -1, "FirstName": "Jonathan", "LastName": "Smith", "ReportsTo": "-" },
                { "EmployeeID": 2, "PID": -1, "FirstName": "Nancy", "LastName": "Davolio", "ReportsTo": "-" },
                { "EmployeeID": 3, "PID": -1, "FirstName": "Steven", "LastName": "Buchanan", "ReportsTo": "-" },
                // sub of ID 1
                { "EmployeeID": 4, "PID": 0, "FirstName": "Janet", "LastName": "Leverling", "ReportsTo": "0" },
                { "EmployeeID": 5, "PID": 0, "FirstName": "Laura", "LastName": "Callahan", "ReportsTo": "0" },
                { "EmployeeID": 6, "PID": 0, "FirstName": "Margaret", "LastName": "Peacock", "ReportsTo": "0" },
                { "EmployeeID": 7, "PID": 0, "FirstName": "Michael", "LastName": "Suyama", "ReportsTo": "0" },
                // sub of ID 4
                { "EmployeeID": 8, "PID": 4, "FirstName": "Anne", "LastName": "Dodsworth", "ReportsTo": "4" },
                { "EmployeeID": 9, "PID": 4, "FirstName": "Danielle", "LastName": "Davis", "ReportsTo": "4" },
                { "EmployeeID": 10, "PID": 4, "FirstName": "Robert", "LastName": "King", "ReportsTo": "4" },
                // sub of ID 2
                { "EmployeeID": 11, "PID": 2, "FirstName": "Peter", "LastName": "Lewis", "ReportsTo": "2" },
                { "EmployeeID": 12, "PID": 2, "FirstName": "Ryder", "LastName": "Zenaida", "ReportsTo": "2" },
                { "EmployeeID": 13, "PID": 2, "FirstName": "Wang", "LastName": "Mercedes", "ReportsTo": "2" },
                // sub of ID 3
                { "EmployeeID": 14, "PID": 3, "FirstName": "Theodore", "LastName": "Zia", "ReportsTo": "3" },
                { "EmployeeID": 15, "PID": 3, "FirstName": "Lacota", "LastName": "Mufutau", "ReportsTo": "3" },
                // sub of ID 16
                { "EmployeeID": 16, "PID": 15, "FirstName": "Jin", "LastName": "Elliott", "ReportsTo": "16" },
                { "EmployeeID": 17, "PID": 15, "FirstName": "Armand", "LastName": "Ross", "ReportsTo": "16" },
                { "EmployeeID": 18, "PID": 15, "FirstName": "Dane", "LastName": "Rodriquez", "ReportsTo": "16" },
                // sub of ID 19
                { "EmployeeID": 19, "PID": 18, "FirstName": "Declan", "LastName": "Lester", "ReportsTo": "19" },
                { "EmployeeID": 20, "PID": 18, "FirstName": "Bernard", "LastName": "Jarvis", "ReportsTo": "19" },
                // sub of ID 20
                { "EmployeeID": 21, "PID": 20, "FirstName": "Jeremy", "LastName": "Donaldson", "ReportsTo": "20" }
            ];

            var hierarchicalDS = [
                {
                    "ID": 0, "Tasks": "Project Plan", "Start": "6/2/2014", "Finish": "8/22/2014", "Duration": "60d", "Progress": "32%", "Products": [
                        { "ID": 1, "Tasks": "Planning", "Start": "6/2/2014", "Finish": "6/4/2014", "Duration": "3d", "Progress": "100%" },
                        { "ID": 2, "Tasks": "Write a specification", "Start": "6/5/2014", "Finish": "6/6/2014", "Duration": "2d", "Progress": "100%" },
                        { "ID": 3, "Tasks": "Create a demo application", "Start": "6/9/2014", "Finish": "6/11/2014", "Duration": "3d", "Progress": "100%" },
                        { "ID": 4, "Tasks": "Collect a feedback", "Start": "6/12/2014", "Finish": "6/12/2014", "Duration": "1d", "Progress": "100%" },
                        {
                            "ID": 5, "Tasks": "Design", "Start": "6/13/2014", "Finish": "6/19/2014", "Duration": "5d", "Progress": "60%", "Products": [
                                { "ID": 8, "Tasks": "Conceptual Design", "Start": "6/13/2014", "Finish": "6/16/2014", "Duration": "2d", "Progress": "100%" },
                                { "ID": 9, "Tasks": "Preliminary Design", "Start": "6/17/2014", "Finish": "6/18/2014", "Duration": "2d", "Progress": "65%" },
                                { "ID": 10, "Tasks": "Final Design", "Start": "6/19/2014", "Finish": "6/19/2014", "Duration": "1d", "Progress": "15%" }
                            ]
                        },
                        {
                            "ID": 6, "Tasks": "Development", "Start": "6/20/2014", "Finish": "8/20/2014", "Duration": "44d", "Progress": "5%", "Products": [
                                { "ID": 11, "Tasks": "Implementation", "Start": "6/20/2014", "Finish": "7/17/2014", "Duration": "20d", "Progress": "5%" },
                                { "ID": 12, "Tasks": "Testing", "Start": "7/18/2014", "Finish": "7/31/2014", "Duration": "10d", "Progress": "0%" },
                                { "ID": 13, "Tasks": "Bug fixing", "Start": "8/1/2014", "Finish": "8/14/2014", "Duration": "10d", "Progress": "0%" },
                                { "ID": 14, "Tasks": "Documenting", "Start": "8/15/2014", "Finish": "8/20/2014", "Duration": "4d", "Progress": "0%" }
                            ]
                        },
                        { "ID": 7, "Tasks": "Project Complete", "Start": "8/21/2014", "Finish": "8/22/2014", "Duration": "2d", "Progress": "0%" }
                    ]
                }
            ];

            $("#treegrid1").igTreeGrid({
                width: "100%",
                dataSource: flatDS, //bound to flat data source,
                autoGenerateColumns: false,
                primaryKey: "EmployeeID",
                columns: [
                    { headerText: "Employee ID", key: "EmployeeID", width: "200px", dataType: "number" },
                    { headerText: "First Name", key: "FirstName", width: "220px", dataType: "string" },
                    { headerText: "Last Name", key: "LastName", width: "220px", dataType: "string" },
                    { headerText: "Reports To", key: "ReportsTo", width: "130px", dataType: "number" }
                ],
                // tree grid specific options
                key: "EmployeeID",
                foreignKey: "PID",
                dataSourceLayoutKey: "PID",
                hierarchicalDataSource: false,
                initialExpandDepth: 1,
                renderExpandColumn: true
            });


            $("#treegrid2").igTreeGrid({
                width: "100%",
                dataSource: hierarchicalDS, //Project Plan data,
                autoGenerateColumns: false,
                primaryKey: "ID",
                columns: [
                    { headerText: "ID", key: "ID", width: "120px", dataType: "number" },
                    { headerText: "Tasks", key: "Tasks", width: "250px", dataType: "string" },
                    { headerText: "Start", key: "Start", width: "130px", dataType: "string" },
                    { headerText: "Finish", key: "Finish", width: "130px", dataType: "string" },
                    { headerText: "Duration", key: "Duration", width: "100px", dataType: "string" },
                    { headerText: "Progress", key: "Progress", width: "130px", dataType: "string" }
                ],
                dataSourceLayoutKey: "Products",
                initialExpandDepth: 1,
                renderExpandColumn: false
            });
        });