$(function () {
//jsRender helper function which formats the string date
        $.views.helpers(
        {
            formatDate: function (val) {
                val = parseInt(val.match(/[0-9]+/)[0], 10);
                var date = new Date(val);
                if (!isNaN(date) && ($.type(date) === "date")) {
                    return $.ig.formatter(date, "date", "dateTime");
                }
                return val;
            }
        });

        $(function () {
            createAutoGrid();
            createButtonGrid();
        });


        function createAutoGrid() {
            $("#autoAppendRowsOnDemand").igGrid({
                width: "100%",
                autoGenerateColumns: false,
                dataSource: "/api/all-tweets",
                localSchemaTransform: false,
                responseDataKey: "Records",
                templatingEngine: "jsrender",
                height: "300px",
                columns: [
                    {
                        key: 'Tweets',
                        dataType: 'object',
                        headerText: 'Infragistics Tweets',
                        unbound: true,
                        width: "100%",
                        template: "<div style='float:left'><img src='http://dev.igniteui.local/14-2/images/ig_twitter_logo.png' ></img></div><div class='tweet'><p style='height:20px'><span class='tweet-user'>{{>User.Name}}</span><span class='tweet-screen-name'>@{{>User.ScreenName}}</span><span class='tweet-date'>{{>#view.hlp('formatDate')(CreatedAt)}}</span></p><p class='tweet-text'>{{>Text}}</p></div>"
                    }
                ],
                features: [
                    {
                        name: 'AppendRowsOnDemand',
                        chunkSize: 10,
                        loadTrigger: "auto",
                        recordCountKey: "TotalRecordsCount",
                        type: "remote"
                    }
                ]
            });
        }

        function createButtonGrid() {
            $("#buttonAppendRowsOnDemand").igGrid({
                width: "100%",
                autoGenerateColumns: false,
                responseDataKey: "Records",
                dataSource: "/api/all-tweets",
                localSchemaTransform: false,
                templatingEngine: "jsrender",
                height: "300px",
                columns: [
                    {
                        key: 'Tweets',
                        dataType: 'string',
                        headerText: 'Infragistics Tweets',
                        unbound: true,
                        width: "100%",
                        template: "<div style='float:left'><img src='http://dev.igniteui.local/14-2/images/ig_twitter_logo.png' ></img></div><div class='tweet'><p style='height:20px'><span class='tweet-user'>{{>User.Name}}</span><span class='tweet-screen-name'>@{{>User.ScreenName}}</span><span class='tweet-date'>{{>#view.hlp('formatDate')(CreatedAt)}}</span></p><p class='tweet-text'>{{>Text}}</p></div>"
                    }
                ],
                features: [
                    {
                        name: 'AppendRowsOnDemand',
                        chunkSize: 10,
                        loadTrigger: "button",
                        recordCountKey: "TotalRecordsCount",
                        type: "remote"
                    }
                ]
            });
        }
});