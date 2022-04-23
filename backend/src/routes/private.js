import express from 'express';
import * as userController from '../controllers/user/user.controller';
import * as applicationFormController from '../controllers/applicationForm/applicationForm.controller';

const router = express.Router();

router.use((req, res, next) => {
    console.log(`${req.method}:${req.headers.host}${req.originalUrl}`);
    next();
});

router.get("/application", applicationFormController.listApplicationDetails);
router.put("/application", applicationFormController.updateApplicationDetails);
router.delete("/application", applicationFormController.deleteApplicationForms);

router.get("/user",
    userController.getUser);

router.delete("/user/:id",
    userController.deleteUser);


module.exports = router;
