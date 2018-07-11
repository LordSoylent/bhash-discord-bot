// Import the rpc-client object
const Client = require("rpc-client");

// Create our RPC context object
var RpcContext = function(rpc_user, rpc_password, host, port = '17654', protocol = 'http') {
    // Set the proper host and port, and select protocol
    this.client = new Client({host:host,port:port, protocol:protocol});
    // Set the proper RPC values
    this.client.setBasicAuth(rpc_user, rpc_password);
};

RpcContext.prototype.getInfo = function(callback) {
    this.client.call("getinfo", [], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'listreceivedbyaddress'.
 * 
 * @param {*} minconf (numeric, optional, default=1) The minimum number of confirmations before payments are included
 * @param {*} includeempty (numeric, optional, default=false) Whether to include addresses that haven't received any payments
 * @param {*} includeWatchOnly (bool, optional, default=false) Whether to include watchonly addresses (see 'importaddress')
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.listReceivedbyAddress = function(minconf = 1, includeempty = false, includeWatchOnly = false, callback) {
    this.client.call("listreceivedbyaddress", [minconf, includeempty, includeWatchOnly], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'getnewaddress'.
 * 
 * @param {*} account (string, optional) The account name for the address to be linked to
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.getNewAddress = function(account, callback) {
    this.client.call("getnewaddress", [account], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'listtransactions'.
 * 
 * @param {*} account (string, optional) The account name. If not included, it will list all transactions for all accounts.
                                     If "" is set, it will list transactions for the default account.
 * @param {*} count (numeric, optional, default=10) The number of transactions to return
 * @param {*} from (numeric, optional, default=0) The number of transactions to skip
 * @param {*} includeWatchOnly (bool, optional, default=false) Include transactions to watchonly addresses (see 'importaddress')
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.listTransactions = function(account, count = 10, from = 0, includeWatchOnly = false, callback) {
    this.client.call("listtransactions", [account, count, from, includeWatchOnly], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'getconnectioncount'.
 * 
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.getConnectionCount = function(callback) {
    this.client.call("getconnectioncount", [], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'getblockcount'.
 * 
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.getBlockCount = function(callback) {
    this.client.call("getblockcount", [], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'masternodelist'.
 * 
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.getMasternodeList = function(callback) {
    this.client.call("masternodelist", [], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'getmininginfo'.
 * 
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.getMiningInfo = function(callback) {
    this.client.call("getmininginfo", [], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'validateaddress'.
 * 
 * @param {*} address (string, required) The b-hash address to validate
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.validateAddress = function(address, callback) {
    this.client.call("validateaddress", [address], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'sendtoaddress'.
 * 
 * @param {*} address (string, required) The b-hash address to validate
 * @param {*} amount (numeric, required) The amount in btc to send. eg 0.1
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.sendToAddress = function(address, amount, callback) {
    this.client.call("sendtoaddress", [address, amount], function(err, result){
        callback(err, result);
    });
};

/**
 * A wrapper for the cli method 'sendtoaddress'.
 * 
 * @param {*} amount (numeric, required) The transaction fee in HASH/kB rounded to the nearest 0.00000001
 * @param {*} callback the callback method to send results to
 */
RpcContext.prototype.setTxFee = function(amount, callback) {
    this.client.call("settxfee", [amount], function(err, result){
        callback(err, result);
    });
};

// Return our object reference
module.exports = RpcContext;