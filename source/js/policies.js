export default function outputPolicies(error, policies, categories) {
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
    Object.keys(policies).forEach(key => {
        const policy = policies[key];
        let li = document.createElement('li');
        li.setAttribute('class', 'policy-card')
        li.dataset['policyId'] = key;
        li.innerHTML = `<span class="card-title">${policies[key].name || key}</span>
            <div class="category-container">
                <span class="category-title">${categories[policies[key].category].name}</span>
                <img src=${categoryIcons[policies[key].category]} alt="${policies[key].category} icon"/>
            </div>`;
        ul.appendChild(li);
    });
};
