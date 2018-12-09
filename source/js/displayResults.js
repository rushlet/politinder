import config from './config';

export default function displayResults(userProfile, partyTotals) {
    const sortedParties = Object.keys(userProfile).sort(function(a,b){return userProfile[b]-userProfile[a]});
    const ul = document.createElement('ul');
    ul.setAttribute("class", "results-list");
    sortedParties.forEach(function(party) {
        console.log(party, userProfile[party], partyTotals[party]);
        let partyScore = Math.round((userProfile[party] / partyTotals[party]) * 100);
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
    resultsContainer.getElementsByClassName('results-container--close')[0].addEventListener("click", function() {
        resultsContainer.style.display = "none";
    }, false);
}
