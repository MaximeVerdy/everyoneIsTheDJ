var express = require('express');
var router = express.Router();
var mongoose = require('../bdd/connexion');
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var HoteModel = require('../bdd/SchemaHote');
var eventModel = require('../bdd/SchemaEvent')
var tourdevoteModel = require('../bdd/SchemaTourdevote')
var topModel = require('../bdd/SchemaTop');
var playlistModel = require('../bdd/SchemaPlaylistTitresProposes');
var server = require('../bin/www')




// -------------------- route initiale --------------------------------------------------------
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});


// -------------------- route du TOP --------------------------------------------------------
router.get('/findTOP', async function(req,res,next){

  var TOP = await topModel.find();

  var TitresAleatoires = []

  var randomNumber = Math.floor(Math.random() * 117);
  var title1 = TOP[randomNumber].chanson
  var title2 = TOP[randomNumber + 1].chanson
  var title3 = TOP[randomNumber + 2].chanson
  var title4 = TOP[randomNumber + 3].chanson
  var title5 = TOP[randomNumber + 4].chanson

  randomTitles = {title1, title2, title3, title4, title5}

  res.json({randomTitles})

  console.log(randomTitles)
  
})

// router.post('/findTOP', async function(req,res,next){
// var newTITRE = new topModel ({
//   chanson: 'test de chanson 3'
// })
//   var TOP = await newTITRE.save();
//   res.json({TOP})
// })


router.post('/sign-up', async function (req, res, next) {

  var hotes = await hoteModel.findOne({ email: req.body.email });

  if (hotes === null) {

    var newHote = new HoteModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    var hoteSaved = await newHote.save();
    console.log('welcome')
    res.json({ result: true, hote: hoteSaved })
  } else {
    console.log('not welcome')
    res.json({ result: false, hote: hotes })
  }


})


router.post('/sign-in', async function (req, res, next) {
  var hotes = await HoteModel.findOne({ email: req.body.email, password: req.body.password });

  if (hotes === null) {
    console.log('no')
    res.json({ result: false, user: hotes })
  } else {
    console.log('yes')
    res.json({ result: true, user: hotes })
  }

})


router.post('/enregistrement', async function (req, res, next) {

  var error = []
  var result = false
  var eventExist = null


  if (req.body.pseudoFromFront == ''
    || req.body.eventIdFromFront == ''
    || req.body.eventPasswordFromFront == '') {
    error.push('champs vides')
  }

  console.log("1", req.body)

  if (error.length == 0) {
    var eventExist = await eventModel.findOne({
      eventId: req.body.eventIdFromFront,
      isOpen: true
    })

    console.log("2", eventExist)

    if (eventExist) {

      if (req.body.eventPasswordFromFront == eventExist.password) {
        result = true

      } else {
        result = false
        error.push('ID / mot de passe incorrect')
      }

    }

  }

  res.json({ result, eventExist, error })
})

//---------------------Création d'évent--------------------------

router.post('/eventcreation', async function (req, res, next) {

  var error = []
  var result = false
  var saveEvent = null
  var date = new Date() // a verifier le format

  if (req.body.eventNameFromFront == ''
    || req.body.eventPasswordFromFront == '') {
    error.push('champs vides')
  }

  if (req.body.eventPasswordFromFront.length < 3) {
    error.push('mot de passe trop court')
  }

  if (error.length == 0) {


    var userId = await eventModel.findOne(
      { user: req.body.idUserFromFront, isOpen: true }
    );

    console.log("userID", userId);

    if (userId) {

      console.log("userId.user", userId.user);

      await eventModel.updateMany(
        { user: userId.user },
        { isOpen: false }
      );
    }

    var newEvent = new eventModel({

      user: req.body.idUserFromFront,
      nameEvent: req.body.eventNameFromFront,
      date: date,
      isOpen: true,
      eventId: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1),
      password: req.body.eventPasswordFromFront,
    })

    var saveEvent = await newEvent.save()

    var eventIsOpen = await eventModel.findOne({
      isOpen: true,
    })

    var eventIsClosed = await eventModel.findOne({
      isOpen: false,
    })

    if (saveEvent) {
      await playlistModel.updateMany({ $set: {votes: [] }});
      result = true
    }
  }
  res.json({ result, eventIsOpen, eventIsClosed, error })
})


//--------------------Route création tour de vote-------------------------------------


router.post('/tourdevotecreation', async function (req, res, next) {

  var isEventOpen = await eventModel.findOne(
    { isOpen: true, user: req.body.idUserFromFront }
  )

  await tourdevoteModel.updateMany(
    { event: isEventOpen._id },
    { isOpen: false }
  );

  var newTourdevote = new tourdevoteModel({
    event: isEventOpen._id,
    date: new Date(),
    isOpen: true,
    echeance: Date.now()+99999999999999, //ECHEANCE A L'INITIALISATION AVANT LE LANCEMENT DU VOTE
    participants: [],

  })

  var saveTourdevote = await newTourdevote.save();



  if (saveTourdevote) {

    console.log('result', saveTourdevote)
    await playlistModel.updateMany({ $set: {votes: [] }});

    res.json({ result: true, idTourdeVote: saveTourdevote._id })
  }

  else {
    res.json({ result: false })
  }

}
);

// ---------------- route pour afficher le compte à rebours ------------------------------------

router.post('/initTimer5', async function (req, res, next) {

  mongoose.set('useFindAndModify', false);

  var tourdevoteMAJ = await tourdevoteModel.findOneAndUpdate(
    {_id: req.body.tourdevoteIdFromFront},
    { echeance: Date.now()+300000 }
  )

  console.log(tourdevoteMAJ);

   
  if (tourdevoteMAJ) {
    res.json({result: true}) 
  }

  else {
    res.json({result: false})
  }

});

router.post('/initTimer10', async function (req, res, next) {

  mongoose.set('useFindAndModify', false);

  var tourdevoteMAJ = await tourdevoteModel.findOneAndUpdate(
    {_id: req.body.tourdevoteIdFromFront},
    { echeance: Date.now()+600000 }
  )

   
  if (tourdevoteMAJ) {
    res.json({result: true}) 
  }

  else {
    res.json({result: false})
  }

});

router.post('/initTimer20', async function (req, res, next) {

  mongoose.set('useFindAndModify', false);

  var tourdevoteMAJ = await tourdevoteModel.findOneAndUpdate(
    {_id: req.body.tourdevoteIdFromFront},
    { echeance: Date.now()+1200000 }
  )

   
  if (tourdevoteMAJ) {
    res.json({result: true}) 
  }

  else {
    res.json({result: false})
  }

});



router.post('/afficheTimer', async function (req, res, next) {

  var tourdevote = await tourdevoteModel.findOne(
    {_id: req.body.tourdevoteIdFromFront}
  )
  
    // IL RESTE A PARAMETRER LA RECUPERATION DE LA DATE D'ECHEANCE DU TIMER FORMAT UTC
 
  var echeanceMS = tourdevote.echeance

  var maintenantMS = Date.now()
  
  var rebours = echeanceMS - maintenantMS

  var reboursSEC = rebours/1000
  var reboursFinal = Math.trunc(reboursSEC)

  console.log(reboursFinal)

  
  if (tourdevote) {
    res.json({result: true, tourdevote, reboursFinal}) 
  }

  else {
    res.json({result: false})
  }

  // console.log ('Comptes à rebours BACK ici ->', rebours)
  }
  );



router.post('/ajoutertitre', async function (req, res, next) {

  var newPlaylist = new playlistModel({
    titre: req.body.titreFromFront,
    vote: [],
  })

  var playlistSaved = await newPlaylist.save();


  res.json({ playlist: playlistSaved })
});

router.post('/supprimertitre', async function (req, res, next) {

  var playlistSaved = await playlistModel.findByIdAndDelete(req.body.titreIdFromFront)

  res.json({ playlist: playlistSaved })

})



router.post('/voteguest', async function (req, res, next) {

  mongoose.set('useFindAndModify', false);


  var hasAlreadyVote = await playlistModel.findOne(
    { votes: req.body.tokenFromFront }
  )

  console.log('hasAlreadyVote', hasAlreadyVote);

  if (hasAlreadyVote == null) {

    var vote = await playlistModel.findOneAndUpdate(
      { titre: req.body.titreFromFront },
      { $push: { votes: req.body.tokenFromFront } }
    )

    console.log('vote', vote)
  }



  if (hasAlreadyVote) {
    console.log('result')
    res.json({ result: false, hasAlreadyVote })
  }

  else {
    res.json({ result: true })
  }

}
)

router.post('/votehost', async function (req, res, next) {

  mongoose.set('useFindAndModify', false);


  var hasAlreadyVote = await playlistModel.findOne(
    { votes: req.body.userIdFromFront }
  )

  console.log('hasAlreadyVote', hasAlreadyVote);

  if (hasAlreadyVote == null) {

    var vote = await playlistModel.findOneAndUpdate(
      { titre: req.body.titreFromFront },
      { $push: { votes: req.body.userIdFromFront } }
    )

    console.log('vote', vote)
  }



  if (hasAlreadyVote) {
    console.log('result')
    res.json({ result: false, hasAlreadyVote })
  }

  else {
    res.json({ result: true })
  }

}
)

module.exports = router;

