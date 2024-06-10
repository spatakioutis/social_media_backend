const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucketName = 'spatakioutis_app_img'
const profPicsFolder = 'profilePics/'
const postPicsFolder = 'postPics/'

const uploadFileToGoogleCS = async (filename, file, dest) => {
    const folder = ( dest === 'profPics' ? profPicsFolder : postPicsFolder ) 
    
    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(`${folder}${filename}`)
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

const deleteFileFromGoogleCS = async (filename, dest) => {
    try {
        const folder = ( dest === 'profPics' ? profPicsFolder : postPicsFolder )

        await storage.bucket(bucketName).file(`${folder}${filename}`).delete();
        console.log(`File ${filename} deleted successfully.`);
    } catch (error) {
        console.error(`Failed to delete file: ${error.message}`);
        throw new Error('Failed to delete file from GCS');
    }
}

module.exports = {
    uploadFileToGoogleCS,
    deleteFileFromGoogleCS
}
