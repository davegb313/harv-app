const { execSync } = require('child_process');
const { stringify } = require('querystring');

let responseFromHarv

const gatherData = (domainToCheck) => {
    responseFromHarv = execSync(`cd ../../theHarvester && python3 theHarvester.py -d ${domainToCheck} -l 100 -b bing`, { encoding: 'utf8' }).slice(1070, -1);
    console.log(`stdout: ${responseFromHarv}`, typeof responseFromHarv);
    let dataToArrays = responseFromHarv.split('\n');
    let arraysOfData = [];
    for (let i=0; i<dataToArrays.length; i++) {
        arraysOfData.push(dataToArrays[i].split(':'))
    };
    let result = [];
    for(let i=0; i<arraysOfData.length; i++){
        let dataObj = new Object;
        dataObj['domain'] = arraysOfData[i][0];
        dataObj['ips'] = arraysOfData[i][1];
        result.push(dataObj);
    }
    return result;
}

module.exports = gatherData;