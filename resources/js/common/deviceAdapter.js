/**
 *
 * @description set system base font size
 *
 * @return {[type]}
 * 
 */
exports.setFrontSize = function() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 500) deviceWidth = 500;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}

