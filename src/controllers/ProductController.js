const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {

    async index(req, res){
        try{
            const { page = 1 } = req.query;
            const products = await Product.paginate({}, { page , limit: 10 });
            return res.json(products)
        }catch(err){
            console.warn(err);            
        }      
    },

    async show(req, res){
        try {
            const product = await Product.findById(req.params.id);
            return res.json(product);
        } catch (err) {
            console.warn(err);            
        }       
    },

    async store(req, res) {
        try {
            const product = await Product.create(req.body);
            return res.json(product);
        } catch (err) {
            console.warn(err);
        }        
    },
    
    async update(req, res){
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
            return res.json(product);
        } catch (err) {
            console.warn(err);            
        }       
    },

    async destroy(req, res){
        try {
            await Product.findByIdAndRemove(req.params.id);

            return res.send();
        } catch (err) {
            console.warn(err);            
        }
    } 
};