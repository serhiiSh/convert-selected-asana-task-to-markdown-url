chrome.browserAction.onClicked.addListener(function (tab) {
    function convertSelectedTasksIntoMarkdownUrl() {
        let highlightedTasks = document.getElementsByClassName('TaskRow--highlighted');
        let focusedTasks = document.getElementsByClassName('TaskRow--focused');
        let tasks = [...highlightedTasks, ...focusedTasks];

        let links = "";
        for (let i = 0; i < tasks.length; i++) {
            let taskInfoElement = tasks[i].getElementsByTagName('textarea')[0];
            let id = taskInfoElement.id;
            let name = taskInfoElement.value;
            let taskUrlIds = id.replace('pot.', '').split('default_');
            links += `[${name}](https://app.asana.com/0/${taskUrlIds[0]}/${taskUrlIds[1]})\r`;
        }
        navigator.clipboard.writeText(links);
        console.log(links);
        return links;
    }

    chrome.tabs.executeScript({
            code: '(' + convertSelectedTasksIntoMarkdownUrl + ')();'
        }, (result) => {}
    )
});
