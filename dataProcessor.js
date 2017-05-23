const fs = require('fs');

const rawMPData = JSON.parse(fs.readFileSync('mp_data.json', 'utf-8'));
const rawPolicyData = JSON.parse(fs.readFileSync('policy_data.json', 'utf-8'));
const invertedPolicies = JSON.parse(fs.readFileSync('inverted_policies.json', 'utf-8'));

const processedMPs= [];
rawMPData.forEach(rawMP => {
    const mp = {
        name: rawMP[1],
        party: rawMP[2],
        policies: {},
    };

    rawMP[3].forEach(policy => {
        const normalisedPolicy = normalisePolicy(policyFromArray(policy));
        mp.policies[normalisedPolicy.id] = normalisedPolicy.agreement;
    });

    processedMPs.push(mp);
});

console.log(processedMPs[0]);

function policyFromArray(policy) {
    return {
        id: policy[0],
        agreement: policy[1]
    }
}

function normalisePolicy(policy) {
    const normalisedPolicy = {
        id: policy.id,
    }
    
    if (invertedPolicies.includes(policy.id)) {
        policy.agreement = invertPercentage(policy.agreement);
    }
    else {
        normalisedPolicy.agreement = policy.agreement;
    }

    return normalisedPolicy;
}

function invertPercentage(percentage) {
    console.log('invert!!!!');
    const decimal = parseFloat(percentage) / 100;
    return 100 / decimal;
}

