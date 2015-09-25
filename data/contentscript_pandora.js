function _canBeAttached() {
    return $('#playbackControl .buttons div').length > 0;
}

function _getCurrentSong() {
    return $(".playerBarSong").last().text();
}

function _getCurrentArtist() {
    return $(".playerBarArtist").first().text();
}

/**
 *  When attaching to slacker, they use knockoutjs for binding so we need to attach immediately before any ko binding can
 *  begin.  That being said, there are at the moment, 3 different views that have the tuning buttons on them.  We
 *  need to add our extra button to each of those views.
 * @param button
 * @returns {boolean}
 * @private
 */
function _attachToPage(button) {
    $('#playbackControl .buttons').each(function(index, list) {
        $(list).prepend(button);
    });

    button.off();
    button.on("click", {}, _radioTubeClick);

    return true;
}

function _buildButton() {
    return $('<div class="radiotubebutton"></div>');
}

function _initialize() {
    /**
     * Perform the actual attachment to slacker radio
     */
    console.log("Can be attached? " + _canBeAttached());
    if (_canBeAttached()) {
        console.log("Attaching to page...");
        return _attachToPage(_buildButton());
    }
    return false;
}


$(function() {
    _initialize();
});



