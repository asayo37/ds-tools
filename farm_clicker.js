var url = $(location).attr('href');
var urlSplit = url.split('&');
var paramScreen = false;

// Check valid URL parameters
for(var i = 1; i < urlSplit.length; i++){

    var parameter = urlSplit[i].split('=');
    switch(parameter[0]) {
        case "screen":
            paramScreen = (parameter[1] === 'am_farm');
            break;
        default:
            paramScreen = paramScreen;
    }

}

function farm_both(){

	$('#plunder_list > tbody > tr[id!=""] > td').filter(':nth-child(9n), :nth-child(10n)').find('a:not(.farm_icon_disabled)').first().trigger('click');
	
}

function farm(off){

	$('#plunder_list > tbody > tr[id!=""] > td:nth-child('+off+') > a:not(.farm_icon_disabled):first').trigger('click');

}

// Check if right site
if(!paramScreen){

    UI.ErrorMessage('Du befindest dich auf der falschen Seite.');

} else {

	if (typeof button === 'undefined') {
    	farm_both();
	} else {
		var offset = (button === 'b' ? '10' : '9');
		farm(offset);
	}

}



