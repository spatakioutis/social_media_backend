const Post = require('../models/Post')
const User = require('../models/User')
const Hashtag = require('../models/Hashtag')

const addPostToHashtag = async (tag, postID) =>  {
    
    try {
        let hashtag = await Hashtag.findOne({tag})

        if ( !hashtag ) {
            hashtag = new Hashtag({tag})
        }

        hashtag.posts.push(postID)

        await hashtag.save() 
    }
    catch (error) {
        throw new Error(error)
    }
}

const getHashtagPosts = async (req, res) => {
    const {tag} = req.query

    try {
        const hashtag = await Hashtag.findOne({tag})
        
        if ( !hashtag ) {
            return res.status(404).json({
                error: 'Hashtag does not exist'
            })
        }

        let posts = await Promise.all( hashtag.posts.map(async (postID) => {
            try {
                const post = await Post.findById(postID)
                const user = await User.findById(post.user)

                return {
                    ...post.toObject(),
                    userInfo: {
                        username: user.username,
                        profilePic: user.profilePic
                    }
                }
            } 
            catch (error) {
                throw new Error(`Error fetching post or user: ${error.message}`)
            }
        }))
    
        posts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        
        res.status(200).json({
            message: 'Post fetching successful',
            posts
        })

    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    } 
}

const getHashtagsFromSearch = async (req,res) => {
    const {searchQuery} = req.query

    try {
        const results = await Hashtag.find({ 
            tag: { $regex: searchQuery, $options: 'i' } 
        })

        const hashtags = results.map(hashtag => {
            return {
                hashtagID: hashtag._id,
                tag: hashtag.tag
            }
        })

        res.status(200).json({
            hashtags
        })
    } catch (error) {
        res.status(500).json({ 
            error: error.message
        })
    } 
}

module.exports = {
    addPostToHashtag,
    getHashtagPosts,
    getHashtagsFromSearch
}