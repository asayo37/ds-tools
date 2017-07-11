console.log('Starting note setter...');

// TODO Check if on right site

// Unit identifiers
var units = ['spear', 'sword', 'axe', 'spy', 'light', 'heavy', 'ram', 'catapult', 'snob'];

// Note vars
var id;
var note = '';
var count = 0;

function saveNote(villageID, note){

    // Setup note we send to server
    var sending = {
        village_id: villageID,
        note: note
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

        count = 0;

        note += '[i]Im Dorf[/i]:\n';

        // Loop through village troops
        $(this).find('td').each(function() {
            var unitItem = $(this).hasClass('unit-item');
            var notHidden = !($(this).hasClass('hidden'));

            if(unitItem){
                if(notHidden){
                    // Add unit type and count to note
                    note += ' ' + $(this).text() + ' [unit]' + units[count] + '[/unit] ';
                }
                
                count++;
            }
        });

        note += '\n\n[i]Außerhalb[/i]:\n';
        
    } else if($(this).hasClass('') === false) {

        // Troops outside
        var villageName         = $(this).find('td > span > span > a').first().text();
        var villageNameSplit    = villageName.split(' ');
        var villageCoord        = villageNameSplit[villageNameSplit.length - 2].substr(1, 7);

        count = 0;

        // Loop through village troops
        $(this).find('td').each(function() {
            var unitItem = $(this).hasClass('unit-item');
            var notHidden = !($(this).hasClass('hidden'));

            if(unitItem){
                if(notHidden){
                    // Add unit type and count to note
                    note += ' ' + $(this).text() + ' [unit]' + units[count] + '[/unit] ';
                }
                
                count++;
            }
        });

        note += ' - [coord]' + villageCoord + '[/coord]\n';

    } else {

        // No more villages
        if(note){
            saveNote(id, note);
            note = '';
            console.log('Saved all village notes.');
        }
    }

});