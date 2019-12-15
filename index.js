const Config = use('Config')
const FileStorage = require('fs')
const Gcs = require('./lib/Gcs')
const Helpers = use('Helpers')
const mkdirp = require('mkdirp')
const mime = require('mime')

class AdonisGCS extends Gcs {
  getGcsPublicUrl(fileName) {
    if (!fileName) return null
    const bucketName = Config.get('gcs.bucketName')
    const fullPath = `${Config.get('gcs.pathPrefix')}/${fileName}`
    return `https://storage.googleapis.com/${bucketName}/${fullPath}`
  }

  uploadFile({ directory, file, fileName, type = 'base64' }) {
    fileName = `${directory}/${Date.now()}-${fileName}`

    if (!FileStorage.existsSync(Helpers.tmpPath(directory))) mkdirp.sync(Helpers.tmpPath(directory))

    const filePath = Helpers.tmpPath(fileName)
    FileStorage.writeFile(filePath, file, type, (error) => error)

    const fileType = mime.getType(filePath)

    this.uploadFileToGCS(fileName)

    return { fileName, fileType }
  }
}

module.exports = AdonisGCS