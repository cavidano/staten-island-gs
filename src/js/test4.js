
let input = {"dogs", "cats", "birds", "horses"]

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
