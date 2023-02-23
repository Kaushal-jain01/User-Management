const User = require('../models/userModel')
const Hostel = require('../models/hostelModel')
const bcrypt = require('bcrypt')

const loadLogin = async(req, res)=>{

    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}

const verifyLogin = async(req, res)=>{

    try {
        const email = req.body.email 
        const password = req.body.password

        const userData = await User.findOne({email: email})
        if(userData){

            const passwordMatch = await bcrypt.compare(password, userData.password)
            if(passwordMatch){

                if(userData.is_admin === 0){
                    res.render('login', {message: "Email and password is incorrect"})
                }
                else{
                    req.session.user_id = userData._id
                    res.redirect('/admin/home')
                }

            }else{
                res.render('login', {message: "Email and password is incorrect"})
            }

        }else{
            res.render('login', {message: "Email and password is incorrect"})
        }
    } 
    catch (error) {
        console.log(error.message)
    }
}


const loadDashboard = async(req, res) =>{

    try {
        const userData = await User.findById({_id: req.session.user_id})
        res.render('home', {admin:userData})
    } catch (error) {
        console.log(error.message)
    }
}

const logout = async(req, res) =>{

    try {
        req.session.destroy()
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message)
    }
}

const adminDashboard = async(req, res)=>{

    try {

        const usersData = await User.find({is_admin:0})
        const hostelsData = await Hostel.find({})
        res.render('dashboard', {users: usersData, hostels: hostelsData} )
    } catch (error) {
       console.log(error.message) 
    }
}

const loadAddRoom = async(req, res) => {

    try {
       
        res.render('addHostel')
    } catch (error) {
        console.log(error.message)
    }
}

const insertHostel = async(req, res)=>{

        
  try {

    console.log(req.body.name)

    const hostel = new Hostel({
        name : req.body.name,
        address : req.body.address,
        contact : req.body.contact,
        capacity : req.body.capacity
        
    });

        const hostelData = await hostel.save()

        if(hostelData){
          
            res.render('addHostel', {message: "Hostel has been added."})
        }
        else{
            res.render('addHostel', {message: "Process failed!"})      
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    insertHostel
}
