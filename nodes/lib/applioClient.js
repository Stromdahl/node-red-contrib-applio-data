var axios = require('axios');

function clientRequest(url, token, method){
    data = undefined;
    var config = {
        method: method,
        url: url,
        headers: { 
            'accept': 'application/json', 
            'Grpc-Metadata-Authorization': token
        }
    };

    axios(config)
    .then(function (response) {
        console.log(response.data);
        data = response.data
    })
    .catch(function (error) {
        throw error; 
    });
    console.log(data);
    return data;
}

module.exports = {
    clientRequest: clientRequest,
}