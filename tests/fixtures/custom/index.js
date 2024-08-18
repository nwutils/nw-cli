// Issue #8205

async function OpenWindow() {
    nw.Window.open('https://hivetoon.com');
    
    await new Promise((resolve) => { setTimeout(resolve, 5000);});
    
    nw.App.closeAllWindows();
    nw.App.quit();
}
OpenWindow();
