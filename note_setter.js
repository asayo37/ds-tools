console.log('Starting note setter...');

// Get URL
var url = $(location).attr('href');
var urlSplit = url.split('&');
var rightSite = true;
var paramType = false,
    paramMode = false,
    paramScreen = false;

// Check valid URL parameters
for(var i = 1; i < urlSplit.length; i++){

    var parameter = urlSplit[i].split('=');
    switch(parameter[0]) {
        case "type":
            paramType = (parameter[1] === 'away_detail');
            break;
        case "mode":
            paramMode = (parameter[1] === 'units');
            break;
        case "screen":
            paramScreen = (parameter[1] === 'overview_villages');
            break;
        default:
            rightSite = rightSite;
    }

}

// Check if right site
rightSite = paramType && paramMode && paramScreen;

if(!rightSite){

    console.log('Aborted note setter.');
    UI.ErrorMessage('Du befindest dich auf der falschen Seite.');

} else {

    // Unit identifiers
    var units = ['spear', 'sword', 'axe', 'spy', 'light', 'heavy', 'ram', 'catapult', 'snob'];

    // Note vars
    var id;
    var note = '';
    var troopCount = 0;
    var villageCount = 0;

    function saveNote(villageID, note){

        villageCount++;

        // Add reference to note
        var noteRef = note + '\n\n[i][size=7]made with [url=https://rawgit.com/asayo37/ds-tools/master/note_setter.js]NoteSetter[/url][/size][/i]'

        // Setup note we send to server
        var sending = {
            village_id: villageID,
            note: noteRef
        };

        // Send note to TW server
        TribalWars.post("api", {
            ajaxaction: "village_note_edit"
        }, sending, function(e) {
            var o = e.note;
        });

        console.log('Village: ' + villageID + ' - note saved.');
    }

    // Loop through unit table rows
    $('#units_table > tbody > tr').each(function() {

        // New village
        if($(this).hasClass('units_away')){

            // Save note if there is any
            if(note){
                saveNote(id, note);
                note = '';
            }

            id = $(this).find('td > span').attr('data-id');

            troopCount = 0;

            note += '[i]Im Dorf[/i]:\n';

            // Loop through village troops
            $(this).find('td').each(function() {
                var unitItem = $(this).hasClass('unit-item');
                var notHidden = !($(this).hasClass('hidden'));

                if(unitItem){
                    if(notHidden){
                        // Add unit type and count to note
                        note += ' ' + $(this).text() + ' [unit]' + units[troopCount] + '[/unit] ';
                    }
                    
                    troopCount++;
                }
            });

            note += '\n\n[i]Außerhalb[/i]:\n';
            
        } else if($(this).hasClass('') === false) {

            // Troops outside
            var villageName         = $(this).find('td > span > span > a').first().text();
            var villageNameSplit    = villageName.split(' ');
            var villageCoord        = villageNameSplit[villageNameSplit.length - 2].substr(1, 7);

            troopCount = 0;

            // Loop through village troops
            $(this).find('td').each(function() {
                var unitItem = $(this).hasClass('unit-item');
                var notHidden = !($(this).hasClass('hidden'));

                if(unitItem){
                    if(notHidden){
                        // Add unit type and count to note
                        note += ' ' + $(this).text() + ' [unit]' + units[troopCount] + '[/unit] ';
                    }
                    
                    troopCount++;
                }
            });

            note += ' - [coord]' + villageCoord + '[/coord]\n';

        } else {

            // No more villages
            if(note){
                saveNote(id, note);
                note = '';
                UI.SuccessMessage('Notizen für ' + villageCount + ' ' + ((villageCount === 1) ? 'Dorf' : 'Dörfer') + ' gespeichert.');
                console.log('Saved all village notes.');
            }
        }

    });
}