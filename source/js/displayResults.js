import config from './config';

export default function displayResults(userProfile, partyTotals) {
    const sortedParties = Object.keys(userProfile).sort(function (a, b) {
        return userProfile[b] - userProfile[a]
    });
    console.log('sorted parties: ', sortedParties)
    const ul = document.createElement('ul');
    ul.setAttribute("class", "results-list");
    sortedParties.forEach(function (party) {
        console.log('party: ', party, 'user match: ', userProfile[party], 'party total: ', partyTotals[party]);
        const userMatch = (userProfile[party] / partyTotals[party]) ? (userProfile[party] / partyTotals[party]) : 0;
        let partyScore = Math.round(userMatch * 100);
        console.log('party score: ', partyScore)
        let li = document.createElement('li');
        li.setAttribute('class', 'party-result')
        li.dataset['partyid'] = party;
        li.innerHTML = `<span class="party-name">${config.partyDetails[party].name} : ${partyScore}%</span>`;
        ul.appendChild(li);
    });
    const resultsContainer = document.getElementsByClassName('results-container')[0];
    if (resultsContainer.querySelector('.results-list')) {
        const resultsList = resultsContainer.querySelector('.results-list');
        console.log(resultsList);
        resultsContainer.removeChild(resultsList);
    }
    resultsContainer.appendChild(ul);
    resultsContainer.style.display = 'block';
    resultsContainer.getElementsByClassName('results-container--close')[0].addEventListener("click", function () {
        resultsContainer.style.display = "none";
    }, false);
}