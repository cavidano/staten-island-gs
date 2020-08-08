const input = [{
    "name": "John",
    "control": "1",
    "available": "true",
    "comment": "n1",
    "value": "v1"
}, {
    "name": "Peter",
    "control": "2",
    "available": "true",
    "type": "integer",
    "comment": "n2",
    "value": "v2",
    "userOptions": [{
        "text": "Utah",
        "value": "UT"
    }, {
        "text": "New York",
        "value": "NY"
    }]
}];

let res = input.reduce((acc, user) => {
    let {
        name,
        available,
        userOptions,
        ...others
    } = user;
    acc[name] = {
        ...others,
        features: {
            available: JSON.parse(available)
        }
    };

    if (userOptions !== undefined) {
        acc[name].features.userOptions = {};

        userOptions.forEach(({
            text,
            value
        }) => {
            acc[name].features.userOptions[text] = value;
        });
    }

    return acc;
}, {});

console.log(res);
