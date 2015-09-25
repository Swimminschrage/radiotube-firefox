function _canBeAttachedToSlacker() {
  return $('.dummy li').length > 0;
}

function _getCurrentSong() {
  return $("section#player .metadata span").last().text();
}

function _getCurrentArtist() {
  return $("section#player .metadata span").first().text();
}

/**
*  When attaching to slacker, they use knockoutjs for binding so we need to attach immediately before any ko binding can
*  begin.  That being said, there are at the moment, 3 different views that have the tuning buttons on them.  We
*  need to add our extra button to each of those views.
* @param button
* @returns {boolean}
* @private
*/
function _attachToSlacker(button) {
  $('.dummy').each(function(index, list) {
    $(list).append(button);
  });

  return true;
}

function _buildButton() {
  return $('<li data-bind="click: Delegate.create(player, player.playPause)" class="radiotubebutton"></li>');
}

function _startupOnSlacker() {
  /**
   * Perform the actual attachment to slacker radio
   */
  if (_canBeAttachedToSlacker()) {
    return _attachToSlacker(_buildButton());
  }
  return false;
}


$(function() {

    _startupOnSlacker();

    // Setup a mutation observer to inject the click handler where appropriate
    var observer = new MutationObserver(function(mutations) {
        var buttons;

        mutations.forEach(function(mutation) {
            if (!mutation.addedNodes) return;

            if (mutation.target) {
                buttons = $(mutation.target).find(".radiotubebutton");

                if (buttons.length > 0) {
                    buttons.off();
                    buttons.on("click", {}, _radioTubeClick);
                }
            }
        })
    });

    observer.observe(document.getElementById("player"), {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
});



