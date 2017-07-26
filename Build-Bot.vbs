Option Explicit

Dim wsh 
Dim vID
Dim h
Dim count

Set wsh = WScript.CreateObject("WScript.Shell")

vID = InputBox("villageID eingeben")
h = InputBox("h-Wert eingeben")
count = InputBox("Anzahl wie oft ausgebaut und abgerissen werden soll. 1 Bedeutet 1x Ausbau und 1x Abriss")

WScript.Sleep 5000

Dim i
for i = 1 to count
wsh.Run "https://de143.die-staemme.de/game.php?village=" + vID + "&screen=main&action=upgrade_building&id=hide&type=main&h=" + h
WScript.Sleep 3000
wsh.SendKeys "^w"
WScript.Sleep 2500
wsh.Run "https://de143.die-staemme.de/game.php?village=" + vID + "&screen=main&action=downgrade_building&id=hide&&h=" + h
WScript.Sleep 3000
wsh.SendKeys "^w"
WScript.Sleep 2500
next

Msgbox("Finished " + count + " iterations on village " + vID)

