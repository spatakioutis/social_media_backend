const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucketName = 'spatakioutis_app_img'

const uploadFileToGoogleCS = async (filename, file) => {
    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(filename)
    const blobStream = blob.createWriteStream({
        resumable: false,
    })

    return new Promise((resolve, reject) => {
        blobStream.on('error', (err) => reject(err))
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            resolve(publicUrl);
        })

        blobStream.end(file.buffer);
    })
}

const deleteFileFromGoogleCS = async (fileName) => {
    try {
        await storage.bucket(bucketName).file(fileName).delete();
        console.log(`File ${fileName} deleted successfully.`);
    } catch (error) {
        console.error(`Failed to delete file: ${error.message}`);
        throw new Error('Failed to delete file from GCS');
    }
}


module.exports = {
    uploadFileToGoogleCS,
    deleteFileFromGoogleCS
}
