module.exports = function(RED) {
    function ApplioConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.token = this.credentials.token
    }
    RED.nodes.registerType("applio-config",ApplioConfigNode,{
        credentials: {
            token: {type:"text"}
        }
    });
}