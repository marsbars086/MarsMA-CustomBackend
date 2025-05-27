const express = require('express')
const router = express.Router()
const PersonSchema = require('../models/Person.js')
const FamilySchema = require('../models/Family.js')

// router.get('/People', (req, res) => {
//     PersonSchema.find({
//     })
//     //'then' happens if find is succesful
//     .then(people => {
//       console.log("succesfully got people!")
//       console.log(people)
//       res.json(people)
//     })
//     //if theres an error, 'catch' happens instead
//     .catch(err => {
//       console.error(err)
//     })
// })
//typicalling lower case
router.get('/People', (req, res) => {
  PersonSchema.find({})
    .populate('family') // <-- This is the important part
    .then(people => {
      console.log("Successfully got people!");
      res.json(people);
    })
    .catch(err => {
      console.error(err);
    });
});

router.get('/Families' , (req, res) => {
  FamilySchema.find({})
  // .populate('members','first_name')
  .populate('members')
  .then(families => {
    console.log("got families")
    console.log(families)
    res.json(families)
  }).catch(err => {
    console.error(err)
  })
})


//Read/get by id
router.get('/person/:id', (req, res) => {
    PersonSchema.findById(req.params.id)
    .then(people => {
      console.log("succesfully got one!")
      console.log(people)
      res.json(people)
    })
    .catch(err => {
      console.error(err)
    })
})

router.get('/family/:id', (req, res) => {
  FamilySchema.findById(req.params.id)
  .then(family => {
    console.log("succesfully got one!")
    console.log(family)
    res.json(family)
  })
  .catch(err => {
    console.error(err)
  })
})



//we will be using the '/add' to do a POST request
// router.post("/CreatePerson/:firstname/:lastname/:family/:age", (req, res) => {
//   PersonSchema.create({
//     first_name:req.params.firstname,
//     last_name: req.params.lastname,
//     family:req.params.family,
//     age:req.params.age,
//   }). then (person =>{
//     console.log(person)
//     res.send(person)
//   }). catch (err => {
//     console.error(err)
//     res.json(err)
//   })
// })

// // POST /CreatePersonByFamilyName/:firstname/:lastname/:familyname/:age
// router.post("/CreatePerson/:firstname/:lastname/:familyname/:age", (req, res) => {
//   // First, find the family by last_name
//   FamilySchema.findOne({ last_name: req.params.familyname })
//     .then(family => {
//       if (!family) {
//         res.status(404).json({ error: "Family not found" });
//         //or create the family here
//       } else {
//         // Create a new person with the found family's ID
//           PersonSchema.create({
//           first_name: req.params.firstname,
//           last_name: req.params.lastname,
//           age: req.params.age,
//           family: family._id
//         }).then(newPerson => {
//           // Push the new person into the family's members array
//           // console.log(newPerson.first_name)
//           // family.members.push({
//           //   first_name: newPerson.first_name,
//           // });
//           family.members.push(newPerson)
//           family.save();

//           console.log("Created person and added to family:");
//           console.log(newPerson);
//           res.send(newPerson);
//         }).catch(err => {
//           console.error("Error creating person", err);
//           res.json(err);
//         });
//       }
//     })
//     .catch(err => {
//       console.error("Error finding family", err);
//       res.json(err);
//     });
// });

router.post("/createpersonbody/:familyname",(req, res) => {
  FamilySchema.findOne({ last_name: req.params.familyname })
  .then(family => {
    if (!family) {
      res.status(404).json({ error: "Family not found" });
      //or create the family here
    } else {
      const personData = {
        ...req.body,
        family: family._id
      };
      PersonSchema.create(personData)
      .then(newPerson => {
        family.members.push(newPerson)
        family.save();

        console.log("Created person and added to family:");
        console.log(newPerson);
        res.send(newPerson);
      }).catch(err => {
        console.error("Error creating person", err);
        res.json(err);
      });
    }
  })
  .catch(err => {
    console.error("Error finding family", err);
    res.json(err);
  });
});

router.post("/CreateFamily/:lastname/:culture", (req, res) => {
  FamilySchema.create({
    last_name: req.params.lastname,
    culture:req.params.culture,
  }). then (family =>{
    console.log(family)
    res.send(family)
  }). catch (err => {
    console.error(err)
    res.json(err)
  })
})
//have this be body also
// router.put('/updateFamily/:last_name/:field/:newValue', (req, res) => {
//   const { field, last_name, newValue } = req.params;
//   console.log(field)
//   console.log(last_name)
//   console.log(newValue)

//   const filter = { last_name: last_name };
//   const update = { [field]: newValue };

//   FamilySchema.updateOne(filter,update)
//   .then(family => {
//     console.log(family)
//     res.send(family)
//   })
//   .catch(err => {
//     console.error(err)
//     res.json(err)
//     //doesnt work for updating family
//   })
// })

router.put('/updatefamilybody/:id' , (req, res) => {
  const { culture, last_name } = req.body;

  const update = {};
  if (culture) update.culture = culture;
  if (last_name) update.last_name = last_name;

  FamilySchema.findByIdAndUpdate(
    req.params.id, { $set: update }
  )
  .then(family => {
    console.log(family)
    res.send(family)
  })
  .catch(err => {
    console.error(err)
    res.json(err)
    //doesnt work for updating family
  })
})

router.put('/updatePerson/:id/:field/:newValue', (req, res) => {
  const { field, newValue, id } = req.params;
  const update = { [field]: newValue };

  PersonSchema.findByIdAndUpdate(id, update)
  .then(person => {
    console.log(person)
    res.send(person)
  })
  .catch(err => {
    console.error(err)
    res.json(err)
  })
})

router.delete('/deletePerson/:id', (req, res) => {
  PersonSchema.findByIdAndDelete(req.params.id)
  .then(person => {
    console.log(person)
    res.send(person)
}).catch( err => {
  console.error(err)
  res.json(err)
})
})

router.delete('/deleteFamily/:lastname', (req, res) => {
  FamilySchema.deleteOne({last_name : req.params.lastname})
  .then(family => {
    console.log(family)
    res.send(family)
}).catch( err => {
  console.error(err)
  res.json(err)
})
})

module.exports = router
