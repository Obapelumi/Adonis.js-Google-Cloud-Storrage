'use strict'

const Config = use('Config')
const { Storage } = require('@google-cloud/storage')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

class Gcs {
  constructor () {
    this.storage = new Storage({
      projectId: Config.get('gcs.projectId'),
      keyFilename: Config.get('gcs.keyFile')
    })

    this.bucket = this.storage.bucket(Config.get('gcs.bucketName'))
  }

  uploadFileToGCS (fileName) {
    const filePath = Helpers.tmpPath(fileName)
    const destination = `${Config.get('gcs.pathPrefix')}/${fileName}`

    return this.bucket.upload(filePath, { destination })
  }

  downloadFileFromGCS (srcFilename, destination) {
    return this.bucket.file(srcFilename).download({ destination })
  }

  deleteFileFromGCS (filename) {
    return this.bucket.file(filename).delete()
  }
}

module.exports = Gcs