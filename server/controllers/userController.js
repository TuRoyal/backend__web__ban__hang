const user = require("../modal/userModal")
const bcrypt = require("bcrypt")
const userController = {
    getAlluser: async (req, res) => {
        try {
            const userdata = await user.find()
            res.status(200).json(userdata)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userdata = await user.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'delete thanh cong', userdata })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    ediUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const data = await user.updateOne({ _id: req.params.id }, {
                username: req.body.username,
                password: password
            })
            const datalist = await user.find()
            res.status(200).json(datalist)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getuserlogin: async (req, res) => {
        try {
            let data = await user.find({ _id: req.body.userID })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updatelike: async (req, res) => {
        try {
            let datauser = await user.find({_id: req.body.userId})
            let newlike   = [...datauser.listlike, req.body.productId]
            let update = await user.updateOne({_id: req.body.userId}, { listlike: newlike})
            let data = await user.find().populate("listlike.productId")
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getbuyID : async(req, res) =>{
        try {
            let data = await user.find({_id: req.body.userId})
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getbuyname: async(req, res) =>{
        try {
            console.log(123)
            let data = await user.find()
            var title = req.query.searchbyname;
            var dataa = data.filter(function(item){
                return item.username.toLowerCase().indexOf(title.toLowerCase()) !== -1
            });
         
            res.status(200).json(dataa)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    paginiuser: async(req, res) =>{
        try {
            const pageOptions = {
                page: parseInt(req.query.page, 10) || 1,
                limit: parseInt(req.query.limit, 5) || 5
            }
         const data = await user.find()
                .skip((pageOptions.page -1) * pageOptions.limit)
                .limit(pageOptions.limit)
                res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }   
    },
    
}

module.exports = userController