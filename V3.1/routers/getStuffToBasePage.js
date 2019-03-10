/*==============================
=            Set Up            =
==============================*/

//express
const express = require('express');
const router = express.Router();

let controller = require(`../controllers/getStuffToBasePage.js`)

/*=====  End of Set Up  ======*/
/*=============================
=            Routs            =
=============================*/

router.post(`/firstLogIn`, controller.LogInFisrtTime);

/*=====  End of Routs  ======*/

/*----------  Export  ----------*/
module.exports = router;