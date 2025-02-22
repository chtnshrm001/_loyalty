import express from 'express';
import swaggerDoc from './documentation/swagger/swagger.js';
import path from 'path';

import dotenv from 'dotenv';
const ENV = process.env.NODE_ENV || 'development';

//import routes
import CustomerInsight from './routes/analytics/customerinsight.js';
import AnalyticsDashboard from './routes/analytics/dashboard.js';

import Login from './routes/authentication/login.js';
import Logout from './routes/authentication/logout.js';

import Brands from './routes/brands/participatingBrands.js';

import Config from './routes/config/mobileConfig.js'

import Referral from './routes/crosschannel/referral.js';
import Sync from './routes/crosschannel/sync.js';

import Preferences from './routes/customer/preferences.js';
import Profile from './routes/customer/profile.js';
import Registration from './routes/customer/registration.js';

import CustomerFeedback from './routes/feedback/customerfeedback.js';
import Support from './routes/feedback/support.js';

import loyaltyProfile from './routes/loyalty/loyaltyProfile.js'

import PushNotification from './routes/notification/pushnotification.js';

import Balance from './routes/points/balance.js';
import Earning from './routes/points/earning.js';
import Purchase from './routes/points/purchase.js';
import Reedem from './routes/points/redeem.js';
import Tier from './routes/points/tier.js';
import Transactions from './routes/points/transactions.js';
import TransactionDetails from './routes/points/transactionDetails.js';

import Available from './routes/rewards/available.js';
import BrandPromo from './routes/rewards/brandpromo.js';
import BrandPurchaseTrack from './routes/rewards/brandpurchasetrack.js';
import History from './routes/rewards/history.js';
import Personalized from './routes/rewards/personalised.js';
import { configDotenv } from 'dotenv';

const app = express();

dotenv.config( {path: `.env.${ENV}`});
console.log(process.env.PORT)

const PORT = process.env.PORT || 3001;

//routes
app.use(express.json());

app.use('/auth/login', Login);
app.use('/auth/logout', Logout);

app.use('/brands', Brands);

app.use('/config', Config);

app.use('/customer', Registration);
app.use('/profile', Profile);

app.use('/loyalty', loyaltyProfile);

app.use('/cashback/balance', Balance);
app.use('/cashback/earn-cashback', Earning);
app.use('/cashback/burn-cashback', Reedem);
app.use('/cashback/transaction-history', Transactions);
app.use('/cashback/transaction-details', TransactionDetails);

app.listen(PORT, () => {
    console.log('Server Listening on Port', PORT);
    swaggerDoc(app, PORT);
});