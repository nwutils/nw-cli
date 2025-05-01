/**
 * Query the status of DevTools window.
 * 
 * @example
 * nw.Window.isDevToolsOpen(function(status) {
 *   console.log(status);
 * });
 * 
 * @function
 * @param {(status: boolean) => void} callback - Callback function
 * @returns {void}
 */
function isDevToolsOpen(callback) {
    chrome.windows.getAll({
        populate: true,
        windowTypes: ['devtools']
    },
        function (wins) {
            callback(wins.length > 0);
        })
}

/**
 * Polyfill function for missing NW.js functionality.
 * 
 * The environment is checked before adding the relevant function.
 * 
 * @returns {void}
*/
export default function polyfill() {
    if (process.versions['nw-flavor'] === 'sdk' && typeof nw.Window.isDevToolsOpen !== 'function' && process.versions['nw'] <= '0.92.0') {
        nw.Window.prototype.isDevToolsOpen = isDevToolsOpen;
        global.nw.Window.prototype.isDevToolsOpen = isDevToolsOpen;
        window.nw.Window.prototype.isDevToolsOpen = isDevToolsOpen;
    }
}
