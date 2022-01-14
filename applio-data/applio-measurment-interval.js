module.exports = function(RED) {
    function ApplioDeviceNode(n) {
        RED.nodes.createNode(this,n);

        var node = this;
        var devID = n.devid
        var measurment = n.measurment
        var start = n.start;
        var end = n.end;
        node.on('input', function(msg, send, done) {
            var axios = require('axios');
            this.config = RED.nodes.getNode(n.config);
            token = this.config.token
            msg.payload = "";
            
            var data = {
                start: start,
                end: end, 
            };

            var config = {
                method: 'post',
                url: `https://data.applio.tech/data/device/${devID}/${measurment}/list`,
                headers: { 
                    'accept': 'application/json', 
                    'Grpc-Metadata-Authorization': token
                },
                data: data
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
    RED.nodes.registerType("applio-measurment-interval", ApplioDeviceNode);
}