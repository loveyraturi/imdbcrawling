const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');
async function getData(url) {
    try {
        return axios.get(url);
    } catch (error) {
        console.log(error);
    }
}

function parseData(page, elementItem) {
    let result = [];
    const dom = cheerio.load(page);
    dom(elementItem).
    find('tr').
    each((i, elem) => {
        console.loc
        let resultArray = [];
        dom(elem).
        find('td').
        each((j, value) => {
            let text = dom(value).text().replace(/\s\s+/g, ' ');
            resultArray.push(text);
        });
        result.push({
            linha: i,
            elements: resultArray
        });
    });
    return result;
}

function cleanData(text, initial, length) {
    return text.substring(initial, length).trim();
}

function extractResult(item) {
    let result = {};

    let title = /( )*[0-9]+\./g
    let id = item.elements[1].match(title)[0];
    result['id'] = cleanData(id, 1, id.length - 1);

    let reTituloFilme = /\.\s(.*)\s\(/g
    let name = item.elements[1].match(reTituloFilme)[0];
    result['name'] = cleanData(name, 1, name.length - 1);

    let reAno = /\([0-9]{4}\)/g
    let year = item.elements[1].match(reAno)[0];
    result['year'] = cleanData(year, 1, year.length - 1);

    result['rating'] = item.elements[2].trim();
    return result;
}

async function main() {
    let resultData = [];
    let url = 'https://www.imdb.com/chart/top?ref_=nv_mv_250';

    let resultPage = await getData(url);

    if (resultPage.data != null) {
        let table = [];
        table = parseData(resultPage.data, '.chart');
        for (let index in table) {
            if (table[index].elements.length > 0) {
                resultData.push(extractResult(table[index]));
            }
        }
    }
    var json = JSON.stringify(resultData);
    fs.writeFile('./public/assets/myjsonfile.json', json, 'utf8', (resp) => {
        console.log(resp)
        process.exit(0);
    });


}

main();