const router = require ("express").Router();
let guide = require ("../models/guide");
   


router.route('/add').post((req, res) => {
    const fullName = req.body.fullName;
    const location = req.body.location;
    const languages = req.body.languages;
    const description = req.body.description;
    const contactNo = req.body.contactNo;
    const Email = req.body.Email;
  
    const newguideRegistration = new guide({
      
      fullName,
      location,
      languages,
      description,
      contactNo,
      Email

    });
    newguideRegistration.save()
    .then(() => res.json('Guide added !'))
    .catch (err => res.status(400).json('Error: ' + err))
});


//retrive data from the database(READ)
router.route("/").get((req,res)=>{
    guide.find().then((guides)=>{
        res.json(guides)
    }).catch((err)=>{
        console.log(err);
    })
})


//update data of the databas
router.route("/update/:id").put(async(req,res)=>{
    let guideId = req.params.id;
    const {fullName,location,languages,description,contactNo,Email} = req.body;

    const updateDetails = {
        fullName,
        location,
        languages,
        description,
        contactNo,
        Email
    }
    const update = await guide.findByIdAndUpdate(guideId,updateDetails)
    .then(()=>{
        res.status(200).send({ status : "guide updated "})
    }).catch((err)=>{
        console.log(err);
    })

})


//deleting data from the database
router.route("/delete/:id").delete(async(req,res)=>{
    let guideId = req.params.id;

  

    await guide.findByIdAndDelete(guideId)
    .then(()=>{
        res.status(200).send({status: "User deleted"});

    }).catch((err)=>{
        console.log(err);
    })

})


//Get by ID
router.route("/get/:id").get(async (req, res) => {
    let guideId = req.params.id;
    const guideData = await guide.findById(guideId)
        .then((guide) => {
            res.status(200).send({ status: "fetched",guide: guide})
        })
        .catch((err) => {
            console.log(err.mesage);
            res.status(500).send({ status: "Error " })
        })
})


//get all details
// Define a route for getting all customers
router.route('/getall').get(function(req, res) {
    // Find all documents in the 'Customer' collection
    guide.find(function(err, vehicle) {
        if (err) {
            // If there was an error finding customers, log the error to the console
            console.log(err);
            // If customers were found successfully, return them as a JSON response
        } else {
            res.json(vehicle);
        }
    });
});

router.route('/edit/:id').get(function (req,res){
    let id = req.params.id;
    guide.findById(id, function (err,register){
        res.json(register);
    });
});





module.exports = router;