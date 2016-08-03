/**
 *
 * @description set system base font size
 *
 * @return {[type]}
 * 
 */
exports.setFrontSize = function() {
    var deviceWidth = document.documentElement.clientWidth,
    	deviceHeight = document.documentElement.clientHeight;
    if (deviceWidth > 500) deviceWidth = 500;
    if(deviceWidth/deviceHeight - 0.56 > 0.1){
    	document.documentElement.style.fontSize = deviceWidth / 10 + 'px';
    }else if(deviceWidth/deviceHeight - 0.56 > 0.05){
		document.documentElement.style.fontSize = deviceWidth / 9 + 'px';
    }else{
    	document.documentElement.style.fontSize = deviceWidth / 8 + 'px';
    }
    // console.log(deviceWidth/deviceHeight - 0.56);
}

