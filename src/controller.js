import path from 'path'
import fs from 'fs'

export function getFolders() {
    let directoryPath = path.join(__dirname, 'projects')
    let folders = fs.readdirSync(directoryPath)
    let data = []
    folders.forEach(function (folderName) {
        let convertedFolderName = folderName.replaceAll('-', ' ')
        data.push({
            folderName: convertedFolderName,
            thumbnail: `projects/${folderName}/default.png`,
        })
    })
    data.sort((a, b) => parseFloat(b.folderName) - parseFloat(a.folderName))
    return data
}

function externalFile(directoryPath, dir, fileName) {
    return fs.readFileSync(path.join(directoryPath, dir, fileName), 'utf8').trim()
           .replace(/\n/g, "<br/>")
}

export function getFiles(dir) {
    let directoryPath = path.join(__dirname, 'projects')
    let folders = fs.readdirSync(directoryPath)
    let description = externalFile(directoryPath, dir, 'description.txt')
    let involvement = externalFile(directoryPath, dir, 'involvement.txt')
    let stack = externalFile(directoryPath, dir, 'stack.txt')
    if (!(folders.indexOf(dir) > -1)) return {status: false}
    let files = fs.readdirSync(path.join(directoryPath, dir))
    let data = []
    files.forEach(function (fileName) {
        let extension = path.extname(fileName)
        data.push({
            fileName: `projects/${dir}/${fileName}`,
            extension
        })
    })
    return {
        description,
        involvement,
        stack,
        files: data.filter(function (el) {
            return el.extension === '.png' ||
            el.extension === '.PNG' ||
            el.extension === '.jpg' ||
            el.extension === '.JPG' ||
            el.extension === '.jpeg' ||
            el.extension === '.JPEG' ||
            el.extension === '.mp4';
        })
    }
}
