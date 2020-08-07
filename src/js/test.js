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
        for (const columnHeader of response.result.values[0]) {
            columnHeaderList.push(columnHeader);
        }

        // Print Column Headers Array
        console.log("columnHeaderList:", columnHeaderList);

        // Create Index Value Relationship
        const locationAddressIndex = columnHeaderList.indexOf('locationAddress');
        const locationNameIndex = columnHeaderList.indexOf('locationName');
        const meetingNameIndex = columnHeaderList.indexOf('meetingName');
        const meetingWeekdayIndex = columnHeaderList.indexOf('meetingWeekday');
        const meetingStartTimeIndex = columnHeaderList.indexOf('meetingStartTime');
        const meetingEndTimeIndex = columnHeaderList.indexOf('meetingEndTime');
        const meetingTypeIndex = columnHeaderList.indexOf('meetingType');

        let i = 0;

        let meeting = {};

        // Create Column Headers Array
        for (const dataRow of dataList) {

            // Get All Rows Excluding Column Headers
            if (dataRow[0] !== columnHeaderList[0]) {

                // Populate Object Prototype
                if (Object.keys(meeting).length === 0) {

                    meeting = {
                        locationAddress: dataRow[locationAddressIndex],
                        locationName: dataRow[locationNameIndex],
                        meetingName: dataRow[meetingNameIndex],
                        meetingWeekday: dataRow[meetingWeekdayIndex],
                        meetingStartTime: dataRow[meetingStartTimeIndex],
                        meetingEndTime: dataRow[meetingEndTimeIndex],
                        meetingType: dataRow[meetingTypeIndex],
                    }

                }

                console.log("meeting list...", Object.entries(meeting));

                // console.log('Data Row...');
                // console.log(i, dataRow);
                // console.log('Data Cell...');
                
                // let n = 0;

                // for (let dataCell of dataRow) {

                //     console.log(dataCell);
                //     n++;
                // } 

                // const meeting = new Meeting(
                //     dataRow[locationAddressIndex],
                //     dataRow[locationNameIndex],
                //     dataRow[meetingNameIndex],
                //     dataRow[meetingWeekdayIndex],
                //     dataRow[meetingStartTimeIndex],
                //     dataRow[meetingEndTimeIndex],
                //     dataRow[meetingTypeIndex],
                // );
                
                // console.log("My new Meeting...", meeting);
            }

            i++;
        }

    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

gapi.load('client', init);

//////////////////////////////////////////////
// B. Create Meeting Objects
//////////////////////////////////////////////

class Meeting {
    constructor(
        locationAddress,
        locationName,
        meetingName,
        meetingWeekday,
        meetingStartTime,
        meetingEndTime,
        meetingType
    ) {
        this.locationAddress = locationAddress;
        this.locationName = locationName;
        this.meetingName = meetingName;
        this.meetingWeekday = meetingWeekday;
        this.meetingStartTime = meetingStartTime;
        this.meetingEndTime = meetingEndTime;
        this.meetingType = meetingType;
    }
}