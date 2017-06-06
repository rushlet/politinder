import * as d3Request from 'd3-request';

// function assignData(error, data) {
//     return data;
// }

export default function outputPolicies(error, data) {

    d3Request.json("../../../categories.json", function(categories) {

        const categoryIcons = {
                "economy": "../assets/img/economy.png",
                "health": "../assets/img/health.png",
                "immigration": "../assets/img/immigration.png",
                "education": "../assets/img/education.png",
                "tax-and-spending": "../assets/img/tax.png",
                "housing": "../assets/img/housing.png",
                "environment": "../assets/img/energy.png",
                "foreign-and-defense": "../assets/img/defence.png",
                "crime": "../assets/img/crime.png",
                "employment": "../assets/img/employment.png",
                "transport": "../assets/img/transport.png",
                "parliament": "../assets/img/parliament.png",
                "civil-rights": "../assets/img/civil_rights.png",
        };


        const ul = document.getElementsByClassName('policies-list')[0];
        Object.keys(data).forEach(key => {
            const policy = data[key];
            let li = document.createElement('li');
            li.innerHTML = `<span class="card-title">${data[key].name || key}</span>
                <div class="category-container">
                    <span class="category-title">${categories[data[key].category].name}</span>
                    <img src=${categoryIcons[data[key].category]} alt="${data[key].category} icon"/>
                </div>` ;
            ul.appendChild(li);
        });
    });
};
