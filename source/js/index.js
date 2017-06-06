import * as Swing from 'swing';
import outputPolicies from './policies.js'
import * as d3Request from 'd3-request';

d3Request.json('../../../policies.json', ready);

function ready(error, data) {

    outputPolicies(error, data);
    const cards = Array.from(document.querySelectorAll('.policies-list li'));
    const stack = Swing.Stack();

    // setup first two cards
    createCard(stack, cards.shift());
    createCard(stack, cards.shift());

    stack.on('throwout', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

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

