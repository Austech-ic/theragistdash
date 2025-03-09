//production server
//export const API_BASE_URL = 'https://dev.vantapp.com/api/partner-business';

//live server
export const API_BASE_URL = "https://api.vantapp.com/api/partner-business";


export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const PayInvoiceUrl = "https://vantapp.com/pay-invoice/";

//dev url
export const DocUrl = "https://api.vantapp.com/uploads/partner/documents/";

//live url
// export const DocUrl = "https://api.vantapp.com/uploads/partner/documents/"

export const TRANSACTION = getApiUrl("/transactions");
export const WALLETS = getApiUrl("/user-wallets");
export const CUSTOMERS = getApiUrl("/customers");
export const UPDATECUSTOMERS = getApiUrl("/customers/");
export const INITIATETRANSFER = getApiUrl("/transfer/initiate");
export const INITIATEVANTTAGTRANSFER = getApiUrl("/transfer/initiate-vant");
export const BANKS = getApiUrl("/transfer/banks");
export const VERIFYACCOUNTNUMBER = getApiUrl("/transfer/verify-account");
export const SETPIN = getApiUrl("/business/set-pin");
export const RESETPIN = getApiUrl("/business/reset-pin");
export const SENDOTP = getApiUrl("/business/send-otp");
export const UPDATEKYC = getApiUrl("/kyc/personal-info");
export const BUSINFO = getApiUrl("/kyb/business-info");
export const BVN = getApiUrl("/kyb/bvn");
export const DOCUMENT = getApiUrl("/kyb/upload-documents");
export const GETBUSINESSPROFILE = getApiUrl("/business/profile");
export const TRANSACTIONSUMMARY = getApiUrl("/transaction/summary");
export const TRANSACTIONFULLLENGTH = getApiUrl("/transactions/all");
export const ADDTEAMMEMBER = getApiUrl("/business/add-member");
export const GETTEAMMEMBER = getApiUrl("/business/members");
export const DELETETEAMMEMBER = getApiUrl("/business/members/");
export const GETTRANSACTIONBARCHART = getApiUrl("/business/transaction-chart");
export const GETOVERVIEW = getApiUrl("/business/summary");
export const UPDATEROLE = getApiUrl("/business/members/");
export const GETPAYMENTLINKS = getApiUrl("/payment-links");
export const CREATEPAYMENTLINKS = getApiUrl("/payment-links");
export const UPDATEPAYMENTLINKS = getApiUrl("/payment-links/");
export const INVOICE = getApiUrl("/invoices");
export const UPDATEIMAGE = getApiUrl("/business/profile/logo");
export const GETPRODUCT = getApiUrl("/products");
export const UPDATEPRODUCT = getApiUrl("/products/");
export const CREATEPRODUCT = getApiUrl("/products");
export const FUNDUSD = getApiUrl("/fund-dollar");
export const WITHDRAWUSD = getApiUrl("/withdraw-dollar");
export const CREATECARDHOLDER = getApiUrl("/virtual-card/create-card-holder");
export const CREATECARD = getApiUrl("/virtual-card/create");
export const GETCARDHOLDERDETAILS = getApiUrl("/virtual-card/get-card-holder-details");
export const GETCARDDETAILS = getApiUrl("/virtual-card/get-full-card-details");
export const GETCARDS = getApiUrl("/virtual-card/get-cards");
export const FUNDCARDS = getApiUrl("/virtual-card/fund");
export const CREATEBENEFICIARY = getApiUrl("/beneficiaries");
export const GETBENEFICIARY = getApiUrl("/beneficiaries");
export const BULKTRANSFER = getApiUrl("/transfer/bulk-transfer");


// Book Keeping tAGS
export const BOOKKEEPINGTAG = getApiUrl("/bookkeeping/tags");
export const UPDATEBOOKKEEPINGTAG = getApiUrl("/bookkeeping/tags/");


//Book Keeping Category
export const BOOKKEEPINGCATEGORY = getApiUrl("/bookkeeping/categories");
export const UPDATEBOOKKEEPINGCATEGORY = getApiUrl("/bookkeeping/categories/");

//Book Keeping Expense
export const BOOKKEEPING = getApiUrl("/bookkeeping");
export const UPDATEBOOKKEEPING = getApiUrl("/bookkeeping/");
export const CREATEBOOKKEEPING = getApiUrl("/bookkeeping");
export const MIGRATETRANSACTIONTOBOOKKERRPING = getApiUrl("/bookkeeping/migrate-transactions");
export const BOOKKEEPPINGBULKUPLOAD = getApiUrl("/bookkeeping/bulk-upload");
export const BALANCESHEET = getApiUrl("/bookkeeping/balance-sheet");













//Vantapp API Dev
export const VANTAPP_API_BASE_URL = "https://api.vantapp.com/api";

//Vantapp API LIVE

// export const VANTAPP_API_BASE_URL = "https://api.vantapp.com/api";

export const getVntApiUrl = (endpoint) => VANTAPP_API_BASE_URL + endpoint;

export const CHECKUSERNAME = getVntApiUrl("/verify-username");
export const EXCHANGERATES = getVntApiUrl('/exchange-rates');

