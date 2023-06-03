const Cart = require('../models/cart')


exports.addCart = async (req, res) => {
    try {
        // Check if cart exists for the user
        const cart = await Cart.findOne({ user: req.user._id }).exec();
        if (cart) {
            // If cart exists, check if item already exists in the cart
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(crt => crt.product == product);

            if (item) {
                // If item exists, update the quantity
                const updatedCart = await Cart.findOneAndUpdate(
                    //this is condition to update
                    { "user": req.user._id, "cartItems.product": product },
                    /**in this $ sign is used because to update only same product
                     * AND
                    this is an action which is to be happen when its call**/
                    { "$set": { "cartItems.$.quantity": item.quantity + req.body.cartItems.quantity } },
                    { new: true } // Return the updated cart after update
                ).exec();
                return res.status(201).json({ cart: updatedCart });
            } else {
                // If item doesn't exist, push it to the cartItems array
                cart.cartItems.push(req.body.cartItems);
                const updatedCart = await cart.save();
                return res.status(201).json({ cart: updatedCart });
            }
        } else {
            // If cart doesn't exist, create a new cart
            const newCart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });
            const savedCart = await newCart.save();
            return res.status(201).json({ cart: savedCart });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



// exports.addItemToCart = (req, res) => {
//     Cart.findOne({ user: req.user._id })
//         .exec((error, cart) => {
//             if (error) return res.status(400).json({ error });
//             if (cart) {
//                 //if cart already exists then update cart by quantity
//                 const product = req.body.cartItems.product
//                 const Item = cart.cartItems.find(crt => crt.product == product);
//                 if (Item) {
//                     Cart.findOneAndUpdate({ "user": req.user.id ,"cartItems.product": product}, {
//                         "$set": {
//                             "cartItems": {
//                                 ...req.body.cartItems,
//                                 quantity:item.quantity+req.body.cartItems.quantity
//                             }
//                         }
//                     })
//                         .exec((error, _cart) => {
//                             if (error) return res.status(400).json({ error });
//                             if (_cart) return res.status(201).json({ cart: _cart });
//                         })

//                 } else {
//                     Cart.findOneAndUpdate({ user: req.user.id }, {
//                         "$push": {
//                             "cartItems": req.body.cartItems
//                         }
//                     })
//                         .exec((error, _cart) => {
//                             if (error) return res.status(400).json({ error });
//                             if (_cart) return res.status(201).json({ cart: _cart });
//                         })
//                 }
                
//             } else {
//                 const cart = new Cart({
//                     user: req.user._id,
//                     cartItems: req.body.cartItems
//                 });
//                 cart.save((error, cart) => {
//                     if (error) return res.status(400).json({ error });
//                     if (cart) return res.status(201).json({ cart });
//                 })
//             }
//     })
// }
