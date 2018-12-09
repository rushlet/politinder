import * as Swing from 'swing';
import outputPolicies from './policies.js';
import displayResults from './displayResults.js'
import config from './config.js'

window.fetch('../../policies.json')
  .then(response => response.json())
      .then(policies => {
          window.fetch('../../categories.json')
          .then(response => response.json())
              .then(categories => {
                window.fetch('../../average_mps.json')
                .then(response => response.json())
                    .then(policyAgreement => {
                        ready({
                            policies: policies,
                            categories: categories,
                            policyAgreement: policyAgreement
                        });
                    });
              });
      });

function ready(data) {
    outputPolicies(data.policies, data.categories);
    const cards = Array.from(document.querySelectorAll('.policies-list li'));
    const stack = Swing.Stack();
    let activated = false;
    let total = 0;

    // setup first two cards
    createCard(stack, cards.shift());
    createCard(stack, cards.shift());

    const userProfile = {
        'Con' : 0,
        'DUP' : 0,
        'Green' : 0,
        'LDem': 0,
        'Lab': 0,
        'PC': 0,
        'SDLP': 0,
        'SNP': 0,
        'UKIP': 0,
        'UUP': 0
    };

    const partyTotals = userProfile;

    stack.on('throwout', function (e) {
        let doesUserAgree = true;
        let currentPolicy = e.target.dataset['policyId'];
        if(e.throwDirection === 'LEFT') {
            doesUserAgree = false;
        }
        config.parties.forEach(function(party){
            if(data.policyAgreement[party]) {
                if(data.policyAgreement[party][currentPolicy]) {
                    partyTotals[party] ++;
                    if (data.policyAgreement[party][currentPolicy].agreementBin === doesUserAgree) {
                        userProfile[party] ++;
                    }
                }
            }
        });
        console.log(userProfile, partyTotals);
        // console.log(userProfile);
        if (activated === false) {
            const resultsButton = document.getElementsByClassName('results-button')[0]
            resultsButton.style.display = 'block';
            resultsButton.addEventListener("click", function() {
                displayResults(userProfile, partyTotals);
            }, false);
            activated = true;
        }
        e.target.classList.add('out-of-deck');
        createCard(stack, cards.shift());
    });
}

function createCard(stack, el) {
    if (el) {
        stack.createCard(el, true);
        el.classList.add('card--active');
    }
}
