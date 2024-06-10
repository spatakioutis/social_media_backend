const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucketName = 'spatakioutis_app_img'

const uploadFileToGCS = async (username, file) => {
    const bucket = storage.bucket(bucketName)
    const blob = bucket.file(username)
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (err) => reject(err))
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
}

const uploadProfilePic = async (username, file) => {
    
    console.log(file)
    if ( !file ) {
        return ''
    }

    try {
        const profilePicture = await uploadFileToGCS(username, file)
        return profilePicture
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    uploadProfilePic
}
