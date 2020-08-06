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


let myMeeting = new Meeting("945 Post Ave, Staten Island, NY 10302", "Jaywalker Club", "Staten Island Foggy Bottoms", "Monday", "7:00 AM", "8:00 AM", "Open");

let myMeeting2 = new Meeting("", "", "", "Monday", "7:00 AM", "8:00 AM", "Open");
 
console.log(myMeeting, myMeeting2);