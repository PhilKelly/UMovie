var youtubeAPILoaded = false;

function gAPIOnLoadCallback(callback, args) {
    gapi.client.setApiKey('AIzaSyCc31z5nGanStEs8UBJGIeCfDFI4syvRO4');
    gapi.client.load('youtube', 'v3', function () {
        youtubeAPILoaded = true;
        if (typeof callback != 'undefined') {
            callback(args.query, args.callback, args.callbackArgs);
        }
    });
}

function youtubeSearch(query, callback, callbackArgs) {
    if (youtubeAPILoaded) {
        gapi.client.youtube.search.list({
            part: 'id',
            maxResults: 1,
            q: query
        }).then(function (response) {
            callback(response.result.items[0].id.videoId, callbackArgs);
        })
    } else {
        gAPIOnLoadCallback(youtubeSearch, {
            query: query,
            callback: callback,
            callbackArgs: callbackArgs
        });
    }
}