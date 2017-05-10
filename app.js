var WebSocketServer = require("websocketserver");

class tabReloader {
    constructor(options) {
        this.options = options;
        this.server = false;
        this.pluginName = "Tab Reloader";
        this.isConnected = false;

        this.init();
    }

    init() {
        this.server = new WebSocketServer("all", 9000);
        this.initListeners();
    }

    refreshTab(uploadedFiles) {
        if (this.isConnected) {
            this.server.sendMessage("all", "Welcome to the server!");
        } else {
            console.log('Tab can not be reloaded since browser ' + this.pluginName + ' plugin is not connected to server yet.');
        }
    }

    initListeners() {
        this.server.on('connection', (id) => {
            console.log('connection open');
            this.isConnected = true;
            this.initSocketListeners();
            //this.server.sendMessage("one", "Welcome to the server!", id);
        });
    }

    initSocketListeners() {
        /*this.socket.onmessage =  (ev) => {
            console.log(ev.data);
        };*/

        this.server.on('closedconnection', (id) => {
            this.isConnected = false;
            console.log(this.pluginName + ' connection is closed');
        });

        /*this.server.on('message', (data, id) => {
            var mes = this.server.unmaskMessage(data);
            var str = this.server.convertToString(mes.message);
            console.log(str);
        });*/
    }
};

module.exports = tabReloader;