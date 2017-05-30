const fs = require('fs');

const rawMPData = JSON.parse(fs.readFileSync('mp_data.json', 'utf-8'));
const rawPolicyData = JSON.parse(fs.readFileSync('policy_data.json', 'utf-8'));
const invertedPolicies = JSON.parse(fs.readFileSync('policies_to_invert.json', 'utf-8'));
const policyDetails = JSON.parse(fs.readFileSync('policies_extras.json', 'utf-8'));

const processedMPs= [];
const processedPolicies = {};
for (const rawMP of rawMPData) {
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
}

fs.writeFileSync('mps.json', JSON.stringify(processedMPs));

Object.keys(policyDetails).forEach((policyID)=>{
    var policy = policyDetails[policyID];
    policy.description = getPolicyDescription(policyID);
    processedPolicies[policyID] = policy;
});

fs.writeFileSync('policies.json', JSON.stringify(processedPolicies));

function policyFromArray(policy) {
    return {
        id: policy[0],
        agreement: percentageToNumber(policy[1])
    }
}

function percentageToNumber(policyAgreement) {
    return parseFloat(policyAgreement);
}

function normalisePolicy(policy) {
    const normalisedPolicy = {
        id: policy.id,
    }

    if (invertedPolicies.includes(policy.id)) {
        normalisedPolicy.agreement = invertPercentage(policy.agreement);
    }
    else {
        normalisedPolicy.agreement = policy.agreement;
    }

    return normalisedPolicy;
}

function invertPercentage(percentage) {
    const invertedDecimal = 100 - percentage;
    return invertedDecimal;
}

function getPolicyDescription(policyID) {
    var description = '';
    for (var i = 0; i < rawPolicyData.length; i++) {
        if (rawPolicyData[i][0] === policyID) {
            description = rawPolicyData[i][1];
        }
    }
    return description;
}
