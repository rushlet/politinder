import config from './config';

export default function outputPolicies(policies, categories) {
    const ul = document.getElementsByClassName('policies-list')[0];
    Object.keys(policies).forEach(key => {
        const policy = policies[key];
        let li = document.createElement('li');
        li.setAttribute('class', 'policy-card')
        li.dataset['policyId'] = key;
        li.innerHTML = `<span class="card-title">${policies[key].name || key}</span>
            <div class="category-container">
                <span class="category-title">${categories[policies[key].category].name}</span>
                <img src=${config.categoryIcons[policies[key].category]} alt="${policies[key].category} icon"/>
            </div>`;
        ul.appendChild(li);
    });
};
