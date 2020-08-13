const person = {
    name: 'Carl Avidano',
    job: 'Web Developer',
    city: 'Hamilton',
    bio: 'Wes is a really cool guy that loves to teach web development!'
}

const dogs = [{
        name: 'Snickers',
        age: 2
    },
    {
        name: 'Hugo',
        age: 8
    },
    {
        name: 'Sunny',
        age: 1
    }
];

var petsData = [{
    name: "Purrsloud",
    species: "Cat",
    favFoods: ["wet food", "dry food", "<strong>any</strong> food"],
    birthYear: 2016,
    photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg"
},
{
    name: "Barksalot",
    species: "Dog",
    birthYear: 2008,
    photo: "https://learnwebcode.github.io/json-example/images/dog-1.jpg"
},
{
    name: "Meowsalot",
    species: "Cat",
    favFoods: ["tuna", "catnip", "celery"],
    birthYear: 2012,
    photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg"
}
];


function foods() {
    return `
<h4>Favorite Foods</h4>
<ul class="foods-list">
${foods.map(food => `<li>${food}</li>`).join('')}
</ul>
`;
}

// And then create our markup:
const beer = {
    name: 'Belgian Wit',
    brewery: `Steam Whistle Brewery`,
    keywords: ['pale', 'cloudy', 'spiced', 'crisp']
};

const markup = `
<div class="beer">
    <h2>${beer.name}</h2>
    <p class="brewery">${beer.brewery}
    ${renderKeywords(beer.keywords)}
    foods()
</div>
`;

function renderKeywords(keywords) {
    return `${keywords.map(keyword => `* ${keyword}`)}`;
}


const targetHTML = document.getElementById('cool');

cool.innerHTML = markup;