import * as Swing from 'swing';
import outputPolicies from './policies.js'
import * as d3Request from 'd3-request';

d3Request.json('../../../policies.json', ready);

function ready(error, data) {
    outputPolicies(error, data);
    const cards = Array.from(document.querySelectorAll('.policies-list li'));

    console.log('cards', cards);
    const stack = Swing.Stack();
    console.log(stack);
    cards.forEach((targetElement) => {
      stack.createCard(targetElement);
    });

    stack.on('throwout', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

        e.target.classList.add('out-of-deck');
    });

}
