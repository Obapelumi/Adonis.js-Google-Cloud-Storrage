# Adonis.js-Google-Cloud-Storrage

This library provides an easy way to use Google Cloud Storage in AdonisJS v4. It provides a wrapper around the @google-cloud/storage package.

## Install

```
npm install --save adonis-google-cloud-storage
```

## Configure
Set up your (Google Cloud Storage account)[https://cloud.google.com/storage/] and put your Google Cloud Key file in the root of your application.

Create a `config/gcs.js`: like so:

```javascript
'use strict'

const Helpers = use('Helpers')

module.exports = {

  projectId: Env.get('GOOGLE_CLOUD_PROJECT_ID'),
  // Get this from your Google Cloud Storage console.

  keyFile: Helpers.appRoot(Env.get('GOOGLE_CLOUD_KEY_FILE')),
  // name of your google cloud key file

  bucketName: Env.get('GOOGLE_CLOUD_STORAGE_BUCKET'),
  // Get this from your Google Cloud Storage console.

  pathPrefix: Env.get('GOOGLE_CLOUD_STORAGE_PATH_PREFIX')
  // This is useful if you have several projects using the same storage bucket. You can specify the prefix path for each one.
}
```

## Sample Usage

```javascript
'use strict'

const AdonisGCS = require('adonis-google-cloud-storage')
const { validateAll } = use('Validator')

class ImageUploadController {
  async uploadFile ({ auth, request, response }) {
    const validation = await validateAll(request.all(), {
      file: 'string',
      file_name: 'string',
    })

    if (validation.fails()) return response.status(422).json(validation.messages())

    const { file,file_name } = request.all()

    const adonisGCS = new AdonisGCS()
      
    const { fileName, fileType } = adonisGCS.uploadFile({ 
      directory: 'images', 
      file, 
      file_name
    })

    return response.json({
      status: true,
      fileUrl: adonisGCS.getGcsPublicUrl(fileName),
      fileType
    })
  }
}

module.exports = ImageUploadController

```           

## Thanks

Special thanks to the creator(s) of [AdonisJS](http://adonisjs.com/) for creating such a great framework.
