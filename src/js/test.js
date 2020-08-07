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

        // Create Columns Array
        let columnHeaderList = [];

        // Create Column Headers Array
        for (const columnHeader of dataList[0]) {
            columnHeaderList.push(columnHeader);
        }

        // Print Column Headers Array
        console.log("columnHeaderList:", columnHeaderList);

        let i = 0;

        let meeting = {};

        // Create Column Headers Array
        for (const dataRow of dataList) {

            // Get All Rows Excluding Column Headers
            if (dataRow[0] !== columnHeaderList[0]) {

                // Populate Object Prototype
                if (Object.keys(meeting).length === 0) {

                    columnHeaderList.forEach((key, index) => {
                        meeting[key] = dataRow[index];
                    });

                }
            
                meeting = Object.create(meeting);

                let n = 0;
      
                for (const dataCell of dataRow) {

                    if(dataCell !== ""){
                        meeting[n] = dataRow[n];
                    }
                    n++;
                }
            }
            
            console.log("Meeting...", meeting);

            i++;
        }

    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

gapi.load('client', init);