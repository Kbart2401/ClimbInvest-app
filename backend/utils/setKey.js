//for api key
const sandboxAPIKey = process.env.API_KEY_IEXCLOUD_SANDBOX
const APIKey = process.env.API_KEY_IEXCLOUD
//choose here to use sandbox key or actual key
const useKey = APIKey;

module.exports = {useKey, sandboxAPIKey, APIKey}