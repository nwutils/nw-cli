nw.Window.isDevToolsOpen = isDevToolsOpen;

function isDevToolsOpen(callback) {
    chrome.windows.getAll({
        populate: true,
        windowTypes: ['devtools']
    },
    function (wins) {
        callback(wins.length > 0);
    })
}
