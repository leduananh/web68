const fileHelper = {}

const FileNotExistException = require("../exception/FileNotExistException")

const fs = require("fs")
const path = require('path');

fileHelper.writeFile = (data,filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data), {encoding:'utf8',flag:'w'})
}

// Kiểm tra file có tồn tại từ thư mục root hay không
fileHelper.checkFileExists = (relativePath) => {
    const absolutePath = path.resolve(relativePath);

    return fs.existsSync(absolutePath);
  }

// Tạo path từ root tới vị trí tập tin từ đường dẫn tương đối
// Nếu không tồn tại tập tin, ném ra một lỗi
fileHelper.resolveFilePath = (relativePath) => {
    const filePath = path.resolve(relativePath);
  
    if (!fileHelper.checkFileExists(filePath)) {
      throw new FileNotExistException(`File '${relativePath}' không tồn tại.`);
    }
  
    return filePath;
  }

module.exports = fileHelper