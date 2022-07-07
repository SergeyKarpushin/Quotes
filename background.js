const pairs = ['EURUSD', 'EURRUB', 'USDRUB', 'BTCUSD'];

chrome.browserAction.onClicked.addListener(function(tab) {
    getQuotes();
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("Got an alarm!", alarm);
    getQuotes();
});

function getQuotes() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://fxmarketapi.com/apilive?api_key=l73i58r11Yvl4-PXFWir&currency=' + pairs.join(), false); //false for synchonous call
    xhr.onload = function(){
        if (xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.response);
            var json = JSON.parse(xhr.response);
           
            chrome.browserAction.setBadgeText({text: json.price[pairs[0]].toFixed(4).substring(2)});
            chrome.browserAction.setTitle({title: pairs[0] + ' updated at ' + formatTimestamp(json.timestamp)});

            chrome.storage.sync.set({json: json}, function() {
            });
        } else {
            console.log('Error while loading quotes: ' + xhr.status + ' - ' + xhr.response);
        }
    }
    xhr.onerror = function(){
        console.log('Error while loading quotes: ' + xhr.status + ' - ' + xhr.response);
    }
    xhr.send();
}

function formatTimestamp(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return formattedTime;
}

chrome.alarms.create('pingQuotes', {periodInMinutes: 60});
       