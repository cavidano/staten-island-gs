//////////////////////////////////////////////
// A. Get Spreadsheet Data
//////////////////////////////////////////////

function init() {
    gapi.client.init({
        'apiKey': 'AIzaSyAa12ysdSNieKzVAb_jsAy_pV6gH9phlOs',
    }).then(function () {
        return gapi.client.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/18q9JqQbP_d8_27c9yePyixkhFsUAiJ9yOlkhTmfu-v4/values/sigsMeetingListv2',
        })
    }).then(function (response) {

        // Set Response as Variable
        const dataList = response.result.values;

        console.log("My Raw Data...", dataList);

        // Create Columns Array
        let columnHeaderList = [];

        // Create Column Headers Array
        for (const columnHeader of dataList[0]) {
            columnHeaderList.push(columnHeader);
        }

        var itemsContainer = [""];

        var i = 0;

        // Print Data Rows
        dataList.forEach((dataRow) => {

            // Get All Rows Excluding Column Headers
            if (dataRow[0] !== columnHeaderList[0]) {

                let rowItem = Array.from(dataRow);

                for (const [index, dataCell] of rowItem.entries()) {

                    if (dataCell !== "") {
                        rowItem[index] = dataCell;
                    } else {
                        if (itemsContainer.length > 1) {
                            rowItem[index] = itemsContainer[i - 1][index]
                        }
                    }
                }

                itemsContainer.push(rowItem);

            } // end 

            i++;

        });

        // Remove Empty Placeholder in itemsContainer
        var itemsContainer = itemsContainer.filter(function (el) {
            return el != "";
        });

        console.log("itemsContainer ==> ", itemsContainer);

        const myJSON = JSON.stringify(itemsContainer);
        console.log("JSON ==> ", myJSON);

    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

gapi.load('client', init);