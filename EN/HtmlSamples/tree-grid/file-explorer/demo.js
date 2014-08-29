$(function () {

            var files = [
                {
                    "Name": "Documents", "DateModified": "9/12/2013", "Type": "File Folder", "Size": "4,480 KB", "Files": [
                        { "Name": "To do list.txt", "DateModified": "11/30/2013", "Type": "TXT File", "Size": "4,448 KB" },
                        { "Name": "Work.txt", "DateModified": "9/12/2013", "Type": "TXT File", "Size": "32 KB" }
                    ]
                },
                {
                    "Name": "Music", "DateModified": "6/10/2014", "Type": "File Folder", "Size": "5,594 KB", "Files": [
                        {
                            "Name": "AC/DC", "DateModified": "6/10/2014", "Type": "File Folder", "Size": "2,726 KB", "Files": [
                                { "Name": "Stand Up.mp3", "DateModified": "6/10/2014", "Type": "MP3 File", "Size": "456 KB" },
                                { "Name": "T.N.T.mp3", "DateModified": "6/10/2014", "Type": "MP3 File", "Size": "1,155 KB" },
                                { "Name": "The Jack.mp3", "DateModified": "6/10/2014", "Type": "MP3 File", "Size": "1,115 KB" }
                            ]
                        },
                        {
                            "Name": "WhiteSnake", "DateModified": "6/11/2014", "Type": "File Folder", "Size": "2,868 KB", "Files": [
                                { "Name": "Trouble.mp3", "DateModified": "6/11/2014", "Type": "MP3 File", "Size": "1,234 KB" },
                                { "Name": "Bad Boys.mp3", "DateModified": "6/11/2014", "Type": "MP3 File", "Size": "522 KB" },
                                { "Name": "Is This Love.mp3", "DateModified": "6/11/2014", "Type": "MP3 File", "Size": "1,112 KB" },
                            ]
                        }
                    ]
                },
                {
                    "Name": "Pictures", "DateModified": "1/20/2014", "Type": "File Folder", "Size": "1,825 KB", "Files": [
                        {
                            "Name": "Jack's Birthday", "DateModified": "6/21/2014", "Type": "File Folder", "Size": "631 KB", "Files": [
                                { "Name": "Picture1.png", "DateModified": "6/21/2014", "Type": "PNG image", "Size": "493 KB" },
                                { "Name": "Picture2.png", "DateModified": "6/21/2014", "Type": "PNG image", "Size": "88 KB" },
                                { "Name": "Picture3.gif", "DateModified": "6/21/2014", "Type": "GIF File", "Size": "50 KB" },
                            ]
                        },
                        {
                            "Name": "Trip to London", "DateModified": "3/10/2014", "Type": "File Folder", "Size": "1,194 KB", "Files": [
                                { "Name": "Picture1.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "974 KB" },
                                { "Name": "Picture2.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "142 KB" },
                                { "Name": "Picture3.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "41 KB" },
                                { "Name": "Picture4.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "25 KB" },
                                { "Name": "Picture5.png", "DateModified": "3/10/2014", "Type": "PNG image", "Size": "12 KB" },
                            ]
                        }
                    ]
                }
            ];

            $("#treegrid").igTreeGrid({
                width: "800px",
                dataSource: files,
                autoGenerateColumns: false,
                primaryKey: "Name",
                columns: [
                    { headerText: "Name", key: "Name", width: "250px", dataType: "string" },
                    { headerText: "Date Modified", key: "DateModified", width: "130px", dataType: "string" },
                    { headerText: "Type", key: "Type", width: "130px", dataType: "string" },
                    { headerText: "Size", key: "Size", width: "130px", dataType: "string" },
                ],
                dataSourceLayoutKey: "Files",
                initialExpandDepth: 1,
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