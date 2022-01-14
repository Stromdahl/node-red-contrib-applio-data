module.exports = function(RED) {
    function ApplioDeviceNode(n) {
        RED.nodes.createNode(this,n);

        var node = this;
        var devID = n.devid
        node.on('input', function(msg, send, done) {
            var axios = require('axios');
            this.config = RED.nodes.getNode(n.config);
            token = this.config.token
            msg.payload = "";
            
            var data = JSON.stringify({
                "start": "-7d",
                "end": "0d"
              });

            var config = {
                method: 'get',
                url: `https://data.applio.tech/data/device/${devID}/measurement/list`,
                headers: { 
                    'accept': 'application/json', 
                    'Grpc-Metadata-Authorization': token
                }
            };

            axios(config)
            .then(function (response) {
                msg.payload = response.data;
                send(msg);
            })
            .catch(function (error) {
                done(error)
            });
        });

    }
    RED.nodes.registerType("applio-measurment-list", ApplioDeviceNode);
}