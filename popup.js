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
    //loadQuota();
}

function loadQuota() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://forex.1forge.com/1.0.3/quota?api_key=vR4j6NNNKdigtTLUJm9pQc8sKE1bzM7N', true);
    xhr.onload = function(){
        if (xhr.status >= 200 && xhr.status < 300){
            console.log(xhr.response);
            var json = JSON.parse(xhr.response);
            document.getElementById('quota').innerHTML = 'API quota = ' + json.quota_remaining + '/' + json.quota_limit;
        } else {
            console.log('Error while loading quota: ' + xhr.status + ' - ' + xhr.response);
        }
    }
    xhr.onerror = function(){
        console.log('Error while loading quota: ' + xhr.status + ' - ' + xhr.response);
    }
    xhr.send();
}

loadQuotes();