import express from 'express';
import * as userController from '../controllers/user/user.controller';
const router = express.Router();
import * as applicationFormController from '../controllers/applicationForm/applicationForm.controller';


router.use((req, res, next) => {
  console.log(`${req.method}:${req.headers.host}${req.originalUrl}`);
  next();
});


router.post("/application", applicationFormController.createApplicationForms);

router.post(
  '/register',
  userController.register,
);

router.post(
  '/login',
  userController.login,
);

router.get(
  '/users',
  userController.showUsers,
);

module.exports = router;
