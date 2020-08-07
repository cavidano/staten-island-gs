var userInfo = {
    name: "Mayank",
    age: 30,
    salary: 10000,
    designation: "Developer",
    getData: function () {
        return this.name;
    }
}

var newObject = Object.create(userInfo);

var newObject = Object.create(userInfo);

newObject.name = "Other Name";

console.log(newObject)
// console.log(newObject.getData());
