//DB Names
const dbSVOC = 'SVOC';
const dbLoyaltyEngine = 'LoyaltyEngine';

//DB URLs
//const dbStringSVOC = "mongodb+srv://usernamealreadytaken:%40pplE1235@cluster0.5jpx0.mongodb.net/SVOC?retryWrites=true&w=majority&appName=Cluster0";
//const dbStringLoyaltyEngine = "mongodb+srv://usernamealreadytaken:%40pplE1235@cluster0.5jpx0.mongodb.net/LoyaltyEngine?retryWrites=true&w=majority&appName=Cluster0";
const dbURI = "mongodb+srv://usernamealreadytaken:%40pplE1235@cluster0.5jpx0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//RegEx
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*([a-zA-Z0-9])\1{3}).{8,}$/;

//Collections
const svocCollectionProfile = 'profile';
const loyaltyCollectionProfile = 'loyaltyProfile';
const svocCollectionOTP = 'otp';


//Models
const svocModelProfile = 'profile';
const loyaltyModelProfile = 'loyaltyProfile';
const svocModelOTP = 'otp';

export default {
    dbSVOC : dbSVOC,
    dbLoyaltyEngine : dbLoyaltyEngine,
    dbURI : dbURI,
    passwordPattern : passwordPattern,
    svocCollectionProfile : svocCollectionProfile,
    svocCollectionOTP : svocCollectionOTP,
    loyaltyCollectionProfile : loyaltyCollectionProfile,
    svocModelProfile : svocModelProfile,
    loyaltyModelProfile : loyaltyModelProfile,
    svocModelOTP : svocModelOTP
};