$(function () {

            var files = [
                {
                    "name": "Documents", "dateModified": "9/12/2013", "type": "File Folder", "size": "4480", "files": [
                        { "name": "To do list.txt", "dateModified": "11/30/2013", "type": "TXT File", "size": "4448" },
                        { "name": "Work.txt", "dateModified": "9/12/2013", "type": "TXT File", "size": "32" }
                    ]
                },
                {
                    "name": "Music", "dateModified": "6/10/2014", "type": "File Folder", "size": "5594", "files": [
                        {
                            "name": "AC/DC", "dateModified": "6/10/2014", "type": "File Folder", "size": "2726", "files": [
                                { "name": "Stand Up.mp3", "dateModified": "6/10/2014", "type": "MP3 File", "size": "456" },
                                { "name": "T.N.T.mp3", "dateModified": "6/10/2014", "type": "MP3 File", "size": "1155" },
                                { "name": "The Jack.mp3", "dateModified": "6/10/2014", "type": "MP3 File", "size": "1115" }
                            ]
                        },
                        {
                            "name": "WhiteSnake", "dateModified": "6/11/2014", "type": "File Folder", "size": "2868", "files": [
                                { "name": "Trouble.mp3", "dateModified": "6/11/2014", "type": "MP3 File", "size": "1234" },
                                { "name": "Bad Boys.mp3", "dateModified": "6/11/2014", "type": "MP3 File", "size": "522" },
                                { "name": "Is This Love.mp3", "dateModified": "6/11/2014", "type": "MP3 File", "size": "1112" },
                            ]
                        }
                    ]
                },
                {
                    "name": "Pictures", "dateModified": "1/20/2014", "type": "File Folder", "size": "1825", "files": [
                        {
                            "name": "Jack's Birthday", "dateModified": "6/21/2014", "type": "File Folder", "size": "631", "files": [
                                { "name": "Picture1.png", "dateModified": "6/21/2014", "type": "PNG image", "size": "493" },
                                { "name": "Picture2.png", "dateModified": "6/21/2014", "type": "PNG image", "size": "88" },
                                { "name": "Picture3.gif", "dateModified": "6/21/2014", "type": "GIF File", "size": "50" },
                            ]
                        },
                        {
                            "name": "Trip to London", "dateModified": "3/10/2014", "type": "File Folder", "size": "1194", "files": [
                                { "name": "Picture1.png", "dateModified": "3/10/2014", "type": "PNG image", "size": "974" },
                                { "name": "Picture2.png", "dateModified": "3/10/2014", "type": "PNG image", "size": "142" },
                                { "name": "Picture3.png", "dateModified": "3/10/2014", "type": "PNG image", "size": "41" },
                                { "name": "Picture4.png", "dateModified": "3/10/2014", "type": "PNG image", "size": "25" },
                                { "name": "Picture5.png", "dateModified": "3/10/2014", "type": "PNG image", "size": "12" },
                            ]
                        }
                    ]
                },
                {
                    "name": "Videos", "dateModified": "1/4/2014", "type": "File Folder", "size": "0"
                        
                },
                {
                    "name": "Books", "dateModified": "1/4/2014", "type": "File Folder", "size": "99376", "files": [
                        {
                            "name": "James Rollins", "dateModified": "6/21/2014", "type": "File Folder", "size": "34228", "files": [
                                { "name": "Alter of Eden.pdf", "dateModified": "6/21/2014", "type": "Adobe Acrobat Document", "size": "8894" },
                                { "name": "Amazonia.pdf", "dateModified": "3/10/2014", "type": "Adobe Acrobat Document", "size": "6212" },
                                { "name": "Subterranean.pdf", "dateModified": "6/21/2014", "type": "Adobe Acrobat Document", "size": "4820" },
                                { "name": "Sandstorm.pdf", "dateModified": "3/10/2014", "type": "Adobe Acrobat Document", "size": "14302" }
                            ]
                        },
                        {
                            "name": "Stephen King", "dateModified": "3/10/2014", "type": "File Folder", "size": "65148", "files": [
                                { "name": "It.pdf", "dateModified": "3/10/2014", "type": "Adobe Acrobat Document", "size": "9987" },
                                { "name": "Misery.pdf", "dateModified": "3/10/2014", "type": "Adobe Acrobat Document", "size": "32313" },
                                { "name": "Pet Sematary.pdf", "dateModified": "3/10/2014", "type": "Adobe Acrobat Document", "size": "22848" }
                            ]
                        }
                    ]
                },
                { "name": "Games", "dateModified": "18/8/2014", "type": "File Folder", "size": "0" },
                {
                    "name": "Projects", "dateModified": "7/4/2014", "type": "File Folder", "size": "4", "files": [
                        {
                            "name": "Visual Studio 2012", "dateModified": "7/4/2014", "type": "File Folder", "size": "1", "files": [
                                { "name": "Project1.sln", "dateModified": "7/4/2014", "type": "Microsoft Visual Studio Solution", "size": "1" }
                            ]
                        },
                        {
                            "name": "Visual Studio 2013", "dateModified": "9/6/2014", "type": "File Folder", "size": "3", "files": [
                                { "name": "Project1.sln", "dateModified": "9/6/2014", "type": "Microsoft Visual Studio Solution", "size": "1" },
                                { "name": "Project2.sln", "dateModified": "9/6/2014", "type": "Microsoft Visual Studio Solution", "size": "1" },
                                { "name": "Project3.sln", "dateModified": "9/6/2014", "type": "Microsoft Visual Studio Solution", "size": "1" }
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
                primaryKey: "name",
                columns: [
                    { headerText: "Name", key: "name", width: "250px", datatype: "string" },
                    { headerText: "Date Modified", key: "dateModified", width: "130px", datatype: "date" },
                    { headerText: "Type", key: "type", width: "230px", datatype: "string" },
                    { headerText: "Size", key: "size", width: "130px", datatype: "number", template: "${size} KB" },
                ],
                dataSourceLayoutKey: "files",
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
                    name: "Paging",
                    pageSize: 4
                }]
            });
        });