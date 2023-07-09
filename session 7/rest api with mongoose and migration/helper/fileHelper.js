const fileHelper = {}

const fs = require("fs")

fileHelper.writeFile = (data,filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data), {encoding:'utf8',flag:'w'})
}

module.exports = fileHelper