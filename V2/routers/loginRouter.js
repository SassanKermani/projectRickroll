/*=============================
=            SetUp            =
=============================*/

//express
const express = require('express');
const router = express.Router();

//controle gose hear
let controle = require(`../controllers/loginController.js`)

/*=====  End of SetUp  ======*/
/*==============================
=            Routes            =
==============================*/

router.post(`*`, controle.login);

// //test
// router.get(`*`, (req, res)=>{
// 	res.send("KO")
// });


/*=====  End of Routes  ======*/
/*----------  exporting ----------*/
module.exports = router;
