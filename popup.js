document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('updateButton');
    button.addEventListener('click', function() {
        getQuotes();
        loadQuotes();
        console.log('Quotes updated at ' + Date(Date.now()).toString());
    });
});

loadQuotes();

function loadQuotes() {
    chrome.storage.sync.get('json', function(data) {
        var content = '';
        if (data.json) {
            for (var i = 0; i < pairs.length; i++) {
                console.log('Loaded ' + pairs[i] + ' : ' + data.json.price[pairs[i]]);
                content += '<div class="quote-line"><a style="text-decoration:none" href="https://ru.tradingview.com/symbols/' + pairs[i] + '" target="_blank"><b>' +  pairs[i] + '</b>:</a> ' + data.json.price[pairs[i]] + '</div>';
            }
        }
        document.getElementById('quotes').innerHTML = content;
    });
}

document.querySelector('#options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
