var self = require('sdk/self'),
    pageMod = require("sdk/page-mod"),
    tabs = require("sdk/tabs");

function attachHandler(worker) {
    worker.port.on("openInNewTab", function(message) {
        tabs.open(message.url);
    });
}

// Create a page-mod
pageMod.PageMod(
    {
        include: "*.slacker.com",
        contentScriptFile: [self.data.url("jquery-2.1.4.min.js"), self.data.url("contentscript_credentials.js"), self.data.url("contentscript_common.js"), self.data.url('contentscript_slacker.js')],
        contentStyleFile: self.data.url("main.css"),
        contentStyle: ".radiotubebutton {background-image: url(\"" + self.data.url("YouTube-social-icon_dark_24px.png") + "\");}",
        contentScriptWhen: "ready",
        onAttach: attachHandler
    }
);

// Create a second page-mod
pageMod.PageMod(
    {
        include: ["http://www.pandora.com/*"],
        contentScriptFile: [self.data.url("jquery-2.1.4.min.js"), self.data.url("contentscript_credentials.js"), self.data.url("contentscript_common.js"), self.data.url('contentscript_pandora.js')],
        contentStyleFile: self.data.url("main.css"),
        contentStyle: ".radiotubebutton {background-image: url(\"" + self.data.url("YouTube_light_color_icon.png") + "\");}",
        contentScriptWhen: "ready",
        onAttach: attachHandler
    }
);

