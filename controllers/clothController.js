const jwt = require('jsonwebtoken');
const Cloth = require('../models/cloth');
const { getUserFromToken } = require('../helpers/auth');

const getClothes = async (req, res) => {
    try {
        console.log('getClothes enters...');
        const items = await Cloth.find({});
        res.json(items);
    } catch (error) {
        console.error('Error fetching clothes:', error);
    }
    console.log('getClothes exits...');
}

const addCloth = async (req, res) => {
    try {
        console.log("addCloth enters...")
        const { name, price, color, material, size, description, quantity, imageUrl, otherImagesUrl } = req.body;

        const exists = await Cloth.findOne({ imageUrl: imageUrl });
        if (exists) {
            return res.json({
                error: 'Cloth already exists'
            });
        }
        const cloth = Cloth.create({
            name: name,
            price: price,
            color: color,
            material: material,
            size: size,
            description: description,
            quantity: quantity,
            imageUrl: imageUrl,
            otherImagesUrl: otherImagesUrl
        });
        res.json(req.body);
    } catch (error) {
        console.error('Error adding cloth:', error);
    }
    console.log("addCloth exits...")
}

const getWishlist = async (req, res) => {
    try {
        console.log("getWishlist enters...");

        const user = await getUserFromToken(req, res);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        let clothes = [];
        for (let i = 0; i < user.cart_list.cloths.length; i++) {
            clothes.push(await Cloth.findOne({ _id: user.cart_list.cloths[i] }));
        }
        res.json(clothes);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }
    console.log("getWishlist exits...");
}

const addToWishlist = async (req, res) => {
    try {
        console.log("addToWishlist enters...");

        const { cloth_data } = req.body;

        const user = await getUserFromToken(req, res);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let cartList = user.cart_list;
        const cloth = await Cloth.findOne({ imageUrl: cloth_data.imageUrl });

        if (!cartList.cloths) {
            cartList.cloths = [];
        }
        cartList.cloths.push(cloth);
        await cartList.save();
        
        getWishlist(req, res);
    } catch (error) {
        console.error('Error adding cloth to wishlist:', error);
    }
    console.log("addToWishlist exits...");
}

const removeFromWishlist = async (req, res) => {
    try {
        console.log("removeFromWishlist enters...");

        const { cloth_data } = req.body;

        const user = await getUserFromToken(req, res);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let cartList = user.cart_list;
        const clothToFind = await Cloth.findOne({ imageUrl: cloth_data.imageUrl });
        console.log(clothToFind._id);
        console.log(cartList.cloths)
        for (let i = 0; i < cartList.cloths.length; i++) {
            const currentCloth = await Cloth.findById(cartList.cloths[i]);
            if (currentCloth.imageUrl === clothToFind.imageUrl) {
                cartList.cloths.splice(i, 1);
                i--;
            }
        }
        await cartList.save();

        getWishlist(req, res);
    } catch (error) {
        console.error('Error adding cloth to wishlist:', error);
    }
    console.log("removeFromWishlist exits...");
}

module.exports = {
    getClothes,
    addCloth,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
}