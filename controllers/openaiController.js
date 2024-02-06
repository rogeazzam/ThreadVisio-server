const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ClothIdea = require('../models/clothIdea');

const generateImage = async (req, res) => {
    try {
        const { chatTxt } = req.body;
        const prompt = "Show me 2 images of a single cloth item with the following Descriptions:\n" +
            chatTxt + ".\nFirst image is of the front of the cloth, and the second image is of the back of the same cloth.\n" +
            "Make the images as realistic as possible so that we can replicate the cloth exactly in real life."

        const response = await openai.images.generate({
            prompt,
            n: 2,
            size: '512x512'
        });

        let frontImageUrl = response.data.data[0].url;
        let backImageUrl = response.data.data[1].url;

        res.json({
            success: true,
            data: {
                frontImage: frontImageUrl,
                backImage: backImageUrl
            }
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        })
    }
}

const submitImage = async (req, res) => {
    try {
        const { frontImageUrl, backImageUrl } = req.body;
        const user = await getUserFromToken(req, res);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const clothIdea = ClothIdea.create({
            frontImageUrl: frontImageUrl,
            backImageUrl: backImageUrl,
            user: user._id
        });

        res.json({
            data: "Image submitted"
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be submitted'
        })
    }
}

module.exports = {
    generateImage,
    submitImage,
};