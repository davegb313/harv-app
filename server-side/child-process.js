const { execSync } = require('child_process');

let responseFromHarv

const gatherData = (domainToCheck) => {
    responseFromHarv = execSync(`cd ../../theHarvester && python3 theHarvester.py -d ${domainToCheck} -l 300 -b google,bing,yahoo`, { encoding: 'utf8' }).slice(950, -1);
    console.log(`stdout: ${responseFromHarv}`, typeof responseFromHarv);

    let dataToArrays = responseFromHarv.split('\n');

    let noJunkData = []
    for (let i = 0; i < dataToArrays.length; i++) {
        if (dataToArrays[i].includes('Hosts') || dataToArrays[i].includes('hosts')) {
            noJunkData = dataToArrays.slice(i + 2);
        }
    }

    let arraysOfData = [];
    for (let i = 0; i < noJunkData.length; i++) {
        arraysOfData.push(noJunkData[i].split(':'))
    };

    let result = [];
    for (let i = 0; i < arraysOfData.length; i++) {
        let dataObj = new Object;
        dataObj['domain'] = arraysOfData[i][0];
        dataObj['ips'] = arraysOfData[i][1];
        result.push(dataObj);
    }
    return result;
}

module.exports = gatherData;