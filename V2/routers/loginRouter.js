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

router.post(`/inishal`, controle.login);


/*=====  End of Routes  ======*/
/*----------  exporting ----------*/
module.exports = router;
