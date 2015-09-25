function _radioTubeClick(event) {
  $.get("https://www.googleapis.com/youtube/v3/search", {
    part: "snippet",
    q: _getCurrentArtist() + " " + _getCurrentSong(),
    type: "video",
    key: YOUTUBE_SECRET_KEY
  }, _youtubeSearchSuccess);
}

function _youtubeSearchSuccess(results) {
  var topItem,
      ytUrl;

  if (results && results.items && results.items.length > 0) {
    topItem = results.items[0];

    if (topItem && topItem.id && topItem.id.kind === "youtube#video") {
        ytUrl = "https://www.youtube.com/watch?v=" + topItem.id.videoId;
        self.port.emit("openInNewTab", {url: ytUrl});
    }
  }
}