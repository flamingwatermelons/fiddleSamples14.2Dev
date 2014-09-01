$(function () {

            var files = [
                {
                    "Name": "Documents", "DateModified": "9/12/2013", "Type": "File Folder", "Size": "4480", "Files": [
                        { "Name": "To do list.txt", "DateModified": "11/30/2013", "Type": "TXT File", "Size": "4448" },
                        { "Name": "Work.txt", "DateModified": "9/12/2013", "Type": "TXT File", "Size": "32" }
                    ]
                },
                {
                    "Name": "Music", "DateModified": "6/10/2014", "Type": "File Folder", "Size": "5594", "Files": [
                        {
                            "Name": "AC/DC", "DateModified": "6/10/2014", "Type": "File Folder", "Size": "2726", "Files": [
                                { "Name": "Stand Up.mp3", "DateModified": "6/10/2014", "Type": "MP3 File", "Size": "456" },
                                { "Name": "T.N.T.mp3", "DateModified": "6/10/2014", "Type": "MP3 File", "Size": "1155" },
                                { "Name": "The Jack.mp3", "DateModified": "6/10/2014", "Type": "MP3 File", "Size": "1115" }
                            ]
                        },
                        {
                            "Name": "WhiteSnake", "DateModified": "6/11/2014", "Type": "File Folder", "Size": "2868", "Files": [
                                { "Name": "Trouble.mp3", "DateModified": "6/11/2014", "Type": "MP3 File", "Size": "1234" },
                                { "Name": "Bad Boys.mp3", "DateModified": "6/11/2014", "Type": "MP3 File", "Size": "522" },
                                { "Name": "Is This Love.mp3", "DateModified": "6/11/2014", "Type": "MP3 File", "Size": "1112" },
                            ]
                        }
                    ]
                },
                {
                    "Name": "Pictures", "DateModified": "1/20/2014", "Type": "File Folder", "Size": "1825", "Files": [
                        {
                            "Name": "Jack's Birthday", "DateModified": "6/21/2014", "Type": "File Folder", "Size": "631", "Files": [
                                { "Name": "Picture1.png", "DateModified": "6/21/2014", "Type": "PNG image", "Size": "493" },
                                { "Name": "Picture2.png", "DateModified": "6/21/2014", "Type": "PNG image", "Size": "88" },
                                { "Name": "Picture3.gif", "DateModified": "6/21/2014", "Type": "GIF File", "Size": "50" },
                            ]
                        },
                        {
                            "Name": "Trip to London", "DateModified": "3/10/2014", "Type": "File Folder", "Size": "1194", "Files": [
                                { "Name": "Picture1.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "974" },
                                { "Name": "Picture2.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "142" },
                                { "Name": "Picture3.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "41" },
                                { "Name": "Picture4.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "25" },
                                { "Name": "Picture5.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "12" },
                            ]
                        }
                    ]
                }
            ];

            $("#treegrid").igTreeGrid({
                width: "800px",
                height:"400px",
                dataSource: files,
                autoGenerateColumns: false,
                primaryKey: "Name",
                columns: [
                    { headerText: "Name", key: "Name", width: "250px", dataType: "string" },
                    { headerText: "Date Modified", key: "DateModified", width: "130px", dataType: "date" },
                    { headerText: "Type", key: "Type", width: "130px", dataType: "string" },
                    { headerText: "Size", key: "Size", width: "130px", dataType: "number", template: "${Size} KB" },
                ],
                dataSourceLayoutKey: "Files",
                initialExpandDepth: 2,
                renderExpandColumn: true,
                features: [
                {
                    name: "Selection"
                },
                {
                    name: "Hiding"
                },
                {
                    name: "Sorting"
                },
                {
                    name: "Filtering"
                },
                {
                    name: "Paging"
                }]
            });
        });