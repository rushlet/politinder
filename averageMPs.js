var fs = require('fs');
var d = JSON.parse(fs.readFileSync('mps.json'));
var averageMPs = {};

d.forEach(mp => {
    averageMPs[mp.party] = averageMPs[mp.party] || {};
    var averageMP = averageMPs[mp.party];
    Object.keys(mp.policies).forEach(policyId => {
        var currentMPAgreement = mp.policies[policyId];
        if (averageMP[policyId]) {
            var policy = averageMPs[mp.party][policyId];
            policy.sampleSize++;
            policy.agreementSum = policy.agreementSum + currentMPAgreement;
        }
        else {
            averageMPs[mp.party][policyId] = {
                agreementSum: currentMPAgreement,
                sampleSize: 1,
            }
        }
    });
});

Object.keys(averageMPs).forEach(mpId => {
    var mp = averageMPs[mpId];
    Object.keys(mp).forEach(policyId => {
        var policy = mp[policyId];
        policy['agreementMean'] = policy.agreementSum / policy.sampleSize;
    });
});

fs.writeFileSync('average_mps.json', JSON.stringify(averageMPs));
