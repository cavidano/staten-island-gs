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

        // Create Columns Array
        let columnHeaderList = [];

        // Create Column Headers Array
        for (const columnHeader of response.result.values[0]) {
            columnHeaderList.push(columnHeader);
        }

        // Print Column Headers Array
        // console.log("columnHeaderList:", columnHeaderList);

        let i = 0;

        // Create Column Headers Array
        for (const dataRow of dataList) {

            // Get All Rows Excluding Column Headers
            if (dataRow[0] !== columnHeaderList[0]) {

                console.log('Data Row...');
                console.log(i, dataRow);

                console.log('Data Cell...');
                
                let n = 0;

                for (let dataCell of dataRow) {
                    console.log(dataCell);
                    n++;
                } 
            }

            i++;
        }

    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

gapi.load('client', init);