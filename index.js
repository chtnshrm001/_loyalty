import express from 'express';
import swaggerDoc from './documentation/swagger/swagger.js';
import process from 'process';
import path from 'path';

//import routes
import CustomerInsight from './routes/analytics/customerinsight.js';
import AnalyticsDashboard from './routes/analytics/dashboard.js';

import Login from './routes/authentication/login.js';
import Logout from './routes/authentication/logout.js';

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

import Available from './routes/rewards/available.js';
import BrandPromo from './routes/rewards/brandpromo.js';
import BrandPurchaseTrack from './routes/rewards/brandpurchasetrack.js';
import History from './routes/rewards/history.js';
import Personalized from './routes/rewards/personalised.js';

const app = express();

const PORT = process.env.PORT || 3000;

//routes
app.use(express.json());

app.use('/auth/login', Login);
app.use('/auth/logout', Logout);
app.use('/customer', Registration);
app.use('/profile', Profile);
app.use('/loyalty', loyaltyProfile);

app.listen(PORT, () => {
    console.log('Server Listening on Port', PORT);
    swaggerDoc(app, PORT);
});