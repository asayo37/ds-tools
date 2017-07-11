$(document).ready(function () {

	var lzn = [1080, 1320, 540, 600, 660, 1800, 2100];
	var ids = ['spax', 'sw', 'spy', 'lkav', 'skav', 'raka', 'ag'];

	$('#lz-calc').click(function() {

		var start = cordParse($('#start').val());
		var dest = cordParse($('#ziel').val());

		displayTime(
			lznCalc(
				distCalc(start.x, start.y, dest.x, dest.y)
			)
		);
	});

	$('#retime-calc').click(function() {

		var arrival = timeParse($('#arrival').val());
		var attacker = cordParse($('#attacker').val());
		var defender = cordParse($('#defender').val());
		var retimer = cordParse($('#retimer').val());

		var distAttDeff = distCalc(attacker.x, attacker.y, defender.x, defender.y);
		var distRetAtt = distCalc(retimer.x, retimer.y, attacker.x, attacker.y);

		var unitAtt = $('#slct-attacker').val();
		var unitRet = $('#slct-retimer').val();
		var AttTime = lzn[ids.indexOf(unitAtt)];
		var RetTime = lzn[ids.indexOf(unitRet)];

		var lzAttDeff = timeStruct(lzCalc(distAttDeff, AttTime));
		var lzRetAtt = timeStruct(lzCalc(distRetAtt, RetTime));

		var AttBack = timeAddition(arrival, lzAttDeff);
		var RetSend = timeSubtraction(AttBack, lzRetAtt);

		var AttBackStr = timeToString(AttBack);
		var RetSendStr = timeToString(RetSend);

		$('#retime-txt').html('<a target="_blank" href="https://de143.die-staemme.de/game.php?screen=map#'+attacker.x+';'+attacker.y+'">Angriffszeit:</a> '+RetSendStr+' (-1 Sekunde)');
	});

	$('#add-attacker').click(function() {

		$('#attacker-list').append('<tr><th>Angreifer:</th><th><input class="coord attack" type="text"></input></th><th><select id="slct-retimer" class="slct"><option value="spax">Speer/Axt</option><option value="sw">Schwert</option><option value="spy">Spys</option><option value="lkav">Leichte Kav.</option><option value="skav">Schwere Kav.</option><option value="raka">Rammen/Katas</option><option value="ag">AG</option></select></th></tr>');

	});

	function cordParse(cord){
		return {	x: parseInt(cord.substring(0,3)),
					y: parseInt(cord.substring(4,7))
				}
	}

	function timeParse(time){
		return {h: time.substring(0,2),
				m: time.substring(3,5),
				s: time.substring(6,8)}
	}

	function timeAddition(t1, t2){

		var s = parseInt(t1.s) + parseInt(t2.s);
		var m = parseInt(t1.m) + parseInt(t2.m);
		var h = parseInt(t1.h) + parseInt(t2.h);

		if(s > 59){
			s -= 60;
			m += 1;
		}
		if(m > 59){
			m -= 60;
			h += 1;
		}

		return {h: h,
				m: m,
				s: s};
	}

	function timeSubtraction(t1, t2){

		var s = parseInt(t1.s) - parseInt(t2.s);
		var m = parseInt(t1.m) - parseInt(t2.m);
		var h = parseInt(t1.h) - parseInt(t2.h);

		if(s < 0){
			s += 60;
			m -= 1;
		}
		if(m < 0){
			m += 60;
			h -= 1;
		}
		if(h > 23){
			h -= 24;
		}

		return {h: h,
				m: m,
				s: s};
	}

	function distCalc(sx, sy, dx, dy){

		var x = Math.abs(dx - sx);
		var y = Math.abs(dy - sy);

		return Math.sqrt((x*x)+(y*y));
	}

	function lzCalc(dist, time){

		return Math.round(dist*time);
	}

	function lznCalc(dist){

		return lz = lzn.map(function(time){

			return Math.round(dist*time);

		});
	}

	function timeStruct(time){
		var h = Math.floor(time/3600);
		time %= 3600;
		var m = Math.floor(time/60);
		time %= 60;
		var s = Math.floor(time);
		return {h: h,
				m: m,
				s: s};
	}

	function timeToString(time){
		return 	time.h+':'+
				((time.m < 10) ? '0'+time.m : time.m)+':'+
				((time.s < 10) ? '0'+time.s : time.s);
	}

	function displayTime(times){

		for (var i = 0; i < times.length; i++) {
		    
			var t = timeStruct(times[i]);
			var dsply = timeToString(t);
			
			$('#'+ids[i]).text(dsply);
		}
	}

});