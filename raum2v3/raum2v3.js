/* Raum 2 V3 · Die Fossilienkammer · Missionen 2.1 bis 2.4 (Stand 20.10.2026, nach Rätselsteckbrief Raum 2 V3 vom 15.10.2026)
   Diese Datei wird aus raum2v3.src.js erzeugt. Lösungen stehen in raum2v3.js nur als Hash.
   Eigene IDs (r2v3-…, m2v3.…, z2v3-…), damit Spielstände und Notfall-Codes von Raum 2 V1.1 nicht brechen.
   Bilder sind Platzhalter aus raum2/bilder. Berolinavis, Schliff, CT und Messen sind fiktive Illustrationen (Kulisse), alle Werte Spieldaten.
   Texte mit dem Vermerk ENTWURF stehen nicht im Steckbrief und brauchen die Freigabe der Lehrkraft. */
/* Stand 15.11.2026 (V3.1, nach Prüfbericht vom 14.11.2026): Zuschnitt auf Stunde 2A (Mission 2.1 und 2.2) und Stunde 2B (Mission 2.3 und 2.4).
   Die Änderungen vom 15.11. wurden direkt in dieser Datei gemacht, raum2v3.src.js muss nachgezogen werden. */
TRESOR.room({
  base: '../',
  id: 'raum2v3',
  version: 'Raum 2 V3.1',
  title: 'Die Fossilienkammer',
  subtitle: 'Raum 2 · Befunde als Evidenz',
  image: '../raum2/bilder/kammer.jpg',
  imageAlt: 'Eine nächtliche Sammlungskammer mit Schubladenschrank, Gesteinsprofil, Vitrine und Schreibtisch',
  size: [1200, 896],
  flashlight: true,
  unlockMode: 'auto',
  wall: true,
  audioLabel: 'KI-Stimme · Antippen zum Hören',

  caseText: function (T) {
    var t = 'Dr. Johanna Wendt ist verschwunden. Der Händler Viktor Hallmann will den „Berolinavis“ versteigern.\n\nIn Dr. Wendts Fossilienkammer prüft ihr, was ein Fossil belegen kann. Ob der Berolinavis echt ist, wisst ihr noch nicht.';
    if (T.isSolved('r2v3-1-folge')) t += '\n\nIhr wisst: Ein Fossil ist erst mit seinem Fundkontext ein Befund.';
    if (T.isSolved('r2v3-2-urvogel')) t += '\n\nIhr habt den Urvogel Stelle für Stelle untersucht.';
    if (T.isSolved('r2v3-3-frage')) t += '\n\nVor jedem Brückentier steht die Frage: Gehören alle Teile zum selben Tier?';
    if (T.isSolved('r2v3-4-schloss')) t += '\n\nVier unabhängige Befunde sprechen dafür, dass der Berolinavis zusammengesetzt ist. Das ist ein starker Verdacht, noch kein Urteil.';
    return t;
  },

  end: { title: 'Raum 2 geschafft', text: 'Sichert jetzt euren Spielstand. Zwei Schlösser am Tresor sind offen. Der nächste Raum ist Dr. Wendts Labor.' },

  missions: [
    { id: 'm2v3.1', title: 'Stunde 2A · Teil 1: Ein Fossil ist ein Befund', unlock: 'dc4452298f7f8a1ac52918984d1a62c8220cb55e7167764109e385c8d210c1cc',
      intro: { from: 'kemal', text: 'Das ist Dr. Wendts Fossilienkammer. Nehmt die Taschenlampe.\n\nHier lernt ihr, was ein Fossil überhaupt belegen kann. Fangt an der Profilwand an.',
        next: { from: 'wendt', audio: 'audio/a0-wendt.mp3', text: 'Bevor ihr den Berolinavis untersucht, müsst ihr wissen, was ein Fossil überhaupt belegen kann. Ein Fund ist nur so viel wert wie das, was wir über seine Herkunft wissen.' } },
      requires: ['r2v3-1-schichten', 's2v3-2a', 'r2v3-1-aussagekraft', 'r2v3-1-zettel', 'r2v3-1-folge'],
      doneTitle: 'Teil 1 abgeschlossen',
      doneText: 'Ihr wisst jetzt, was ein Fossil belegen kann und was nicht.\n\nSchreibt eure Fundkontext-Karte ins Logbuch: Fossil, Schicht, was daraus folgt, was nicht daraus folgt.' },
    { id: 'm2v3.2', title: 'Stunde 2A · Teil 2: Der Urvogel', unlock: 'bbec5cc76b085f6f49080346e2aa5f93f6fae3304121d30dce722284e9b9d9e6', sameLesson: true,
      intro: { from: 'kemal', text: 'In der Vitrine liegen drei Vergleichsstücke. Seht euch zuerst das Berliner Exemplar genau an.\n\nDen Vergleich aller drei Tiere protokolliert ihr in der Präsenzstunde.' },   /* ENTWURF 15.11. */
      requires: ['r2v3-2-urvogel'],
      doneTitle: 'Stunde 2A abgeschlossen',
      doneText: 'Ihr habt den Urvogel untersucht.\n\nIn der Präsenzstunde vergleicht ihr ihn mit einem Raubdinosaurier und einer Taube und schreibt das Vergleichsprotokoll ins Logbuch.' },   /* ENTWURF 15.11. */
    { id: 'm2v3.3', title: 'Stunde 2B · Teil 1: Merkmalsmosaik', unlock: 'f7a5bb352d5e61caeb0ffd350294a434973a7e4fe0b77505cadfbca3146a7b19',
      intro: { from: 'wendt', text: 'Man nennt ihn ein Brückentier. Prüft, was das wirklich bedeutet.\n\n– J. W.' },
      requires: ['s2v3-2b', 'r2v3-3-mosaik', 'r2v3-3-deutung'],
      doneTitle: 'Teil 1 abgeschlossen',
      doneText: 'Ihr wisst jetzt, was ein Brückentier ist und was nicht.\n\nSchreibt eure Merkmalstabelle ins Logbuch: Merkmal, ursprünglich, abgeleitet oder keine Aussage, Begründung.' },
    { id: 'm2v3.4', title: 'Stunde 2B · Teil 2: Der Berolinavis und Schloss 2', unlock: '2ebfb60f70c77f5c47ef298e27a98a41e7a663c44c264defd9525e312f4a74cc', sameLesson: true,
      /* ENTWURF: Einstieg 2.4 (V2-Text an die Vitrine hinten angepasst) */
      intro: { from: 'kemal', text: 'Der Berolinavis liegt in der Vitrine hinten. Ihr kennt jetzt alle Werkzeuge.\n\nVor jedem Mosaik steht eine Frage: Gehören alle Teile zum selben Tier? Nehmt eure Prüfkarte mit.' },
      requires: ['r2v3-4-untersuchen', 'r2v3-4-ausreden', 'r2v3-4-schloss'],
      doneTitle: 'Stunde 2B abgeschlossen · Schloss 2 geöffnet',
      doneText: 'Der Befund enthält Widersprüche in vier unabhängigen Linien. Das ist ein starker Verdacht, noch kein Urteil.\n\nTragt Beweisstück 2 ins Logbuch ein: vier Evidenzkarten mit Befund, Ausrede und warum sie nicht ausreicht.' }
  ],

  /* Bereiche in Prozent des Raumbilds. Neue Stellen (Tür, Vitrine hinten, Besucherbuch) sind PLATZHALTER,
     die Lehrkraft setzt sie nach dem fertigen Bild. */
  hotspots: [
    { id: 'tuer', label: 'Tür der Kammer', rect: [29, 12, 6.5, 36], action: { type: 'doc', doc: 'a0' } },
    { id: 'gestein', label: 'Profilwand der Grube Nordhang', rect: [36, 15, 28.5, 33], states: [
      { if: { unlocked: 'm2v3.1', notSolved: 'r2v3-1-schichten' }, action: { type: 'puzzle', puzzle: 'r2v3-1-schichten' } },
      { if: { unlocked: 'm2v3.1', notSolved: 's2v3-2a' }, action: { type: 'puzzle', puzzle: 's2v3-2a' } },
      { action: { type: 'doc', doc: 'p' } } ] },
    { id: 'schrank', label: 'Schubladenschrank', rect: [1, 8, 27.5, 86], states: [
      { if: { notSolved: 'r2v3-1-schichten' }, action: { type: 'text', text: 'Die Schubladen sind verschlossen. Auf den Schildchen stehen Schichtnummern.' } },
      { if: { notSolved: 'r2v3-1-folge', notFound: 's2' }, action: { type: 'docs', title: 'Schubladenschrank', docs: ['s1', 's2', 's3', 'x1', 'x3'] } },
      { if: { unlocked: 'm2v3.1', notSolved: 'r2v3-1-aussagekraft' }, action: { type: 'puzzle', puzzle: 'r2v3-1-aussagekraft' } },
      { if: { unlocked: 'm2v3.1', notSolved: 'r2v3-1-zettel' }, action: { type: 'puzzle', puzzle: 'r2v3-1-zettel' } },
      { if: { unlocked: 'm2v3.1', notSolved: 'r2v3-1-folge' }, action: { type: 'puzzle', puzzle: 'r2v3-1-folge' } },
      { if: { missionDone: 'm2v3.1', notSolved: 'z2v3-luecken' }, action: { type: 'puzzle', puzzle: 'z2v3-luecken' } },
      { action: { type: 'docs', title: 'Schubladenschrank', docs: ['s1', 's2', 's3', 'x1', 'x3'] } } ] },
    { id: 'vitrine', label: 'Vitrine', rect: [37.5, 49, 25.5, 41], states: [
      { if: { unlocked: 'm2v3.2', notSolved: 'r2v3-2-urvogel', notFound: 'v1' }, action: { type: 'docs', title: 'Vitrine', docs: ['v1', 'v2', 'v3'] } },
      { if: { unlocked: 'm2v3.2', notSolved: 'r2v3-2-urvogel' }, action: { type: 'puzzle', puzzle: 'r2v3-2-urvogel' } },
      { if: { unlocked: 'm2v3.3', notSolved: 's2v3-2b' }, action: { type: 'puzzle', puzzle: 's2v3-2b' } },
      { if: { unlocked: 'm2v3.3', notSolved: 'r2v3-3-mosaik' }, action: { type: 'puzzle', puzzle: 'r2v3-3-mosaik' } },
      { if: { unlocked: 'm2v3.3', notSolved: 'r2v3-3-deutung' }, action: { type: 'puzzle', puzzle: 'r2v3-3-deutung' } },
      /* ab V3.1 Zusatzaufgaben: Kriterium und Tabelle (Pflicht ist das Protokoll auf Papier in der Präsenzstunde) */
      { if: { unlocked: 'm2v3.2', notSolved: 'r2v3-2-kriterium' }, action: { type: 'puzzle', puzzle: 'r2v3-2-kriterium' } },
      { if: { unlocked: 'm2v3.2', notSolved: 'r2v3-2-tabelle' }, action: { type: 'puzzle', puzzle: 'r2v3-2-tabelle' } },
      { if: { missionDone: 'm2v3.2', notSolved: 'z2v3-passung' }, action: { type: 'puzzle', puzzle: 'z2v3-passung' } },
      { if: { missionDone: 'm2v3.3', notSolved: 'z2v3-kein-brueckentier' }, action: { type: 'puzzle', puzzle: 'z2v3-kein-brueckentier' } },
      { if: { found: 'v1' }, action: { type: 'docs', title: 'Vitrine', docs: ['v1', 'v2', 'v3'] } },
      { action: { type: 'text', text: 'Unter der Glashaube liegen drei Stücke. Die Haube ist noch verschlossen.' } } ] },
    { id: 'vitrine-hinten', label: 'Vitrine hinten', rect: [65, 20, 11, 40], states: [
      { if: { unlocked: 'm2v3.4', notFound: 'bv' }, action: { type: 'doc', doc: 'bv' } },
      { if: { unlocked: 'm2v3.4', notSolved: 'r2v3-4-untersuchen' }, action: { type: 'puzzle', puzzle: 'r2v3-4-untersuchen' } },
      { if: { found: 'h' }, action: { type: 'docs', title: 'Vitrine hinten', docs: ['bv', 'h'] } },
      { if: { found: 'bv' }, action: { type: 'doc', doc: 'bv' } },
      /* ENTWURF */
      { action: { type: 'text', text: 'Hinter der Scheibe liegt eine Steinplatte unter einem Tuch. Die Vitrine ist verschlossen.' } } ] },
    { id: 'schreibtisch', label: 'Dr. Wendts Arbeitstisch', rect: [67, 72, 32, 23], states: [
      { if: { unlocked: 'm2v3.4', solved: 'r2v3-4-untersuchen', notSolved: 'r2v3-4-ausreden' }, action: { type: 'puzzle', puzzle: 'r2v3-4-ausreden' } },
      { if: { unlocked: 'm2v3.4', solved: 'r2v3-4-ausreden', notSolved: 'r2v3-4-schloss' }, action: { type: 'puzzle', puzzle: 'r2v3-4-schloss' } },
      { if: { unlocked: 'm2v3.3', solved: 'r2v3-3-deutung', notSolved: 'r2v3-3-frage' }, action: { type: 'puzzle', puzzle: 'r2v3-3-frage' } },   /* ab V3.1 Zusatzaufgabe */
      { if: { missionDone: 'm2v3.4', notSolved: 'z2v3-verwerfung' }, action: { type: 'puzzle', puzzle: 'z2v3-verwerfung' } },
      { action: { type: 'docs', title: 'Arbeitstisch', docs: ['g', 'x2'] } } ] },
    { id: 'besucherbuch', label: 'Besucherbuch an der Wand', rect: [29.5, 55, 7.5, 25], action: { type: 'doc', doc: 'x4' } },
    { id: 'fenster', label: 'Fenster', rect: [77, 2, 23, 56], action: { type: 'text', text: 'Draußen liegt die Invalidenstraße im Mondlicht. Ein dunkles Auto fährt langsam vorbei … und hält kurz vor dem Museum. Dann fährt es weiter.' } }
  ],

  docs: {
    'a0': { title: 'A0 · Dr. Wendt (Tür)', tag: 'Ton', style: 'paper', audio: 'audio/a0-wendt.mp3',
      text: 'Wendt: „Bevor ihr den Berolinavis untersucht, müsst ihr wissen, was ein Fossil überhaupt belegen kann. Ein Fund ist nur so viel wert wie das, was wir über seine Herkunft wissen.“' },
    'p': { title: 'P · Profilwand der Grube Nordhang', tag: 'Bild', style: 'plaque', image: '../raum2/bilder/profilwand.svg',
      text: 'Schicht 1 (oben): heller, feinkörniger Plattenkalk\nSchicht 2: brauner Tonstein\nSchicht 3 (unten): dunkler, blättriger Tonschiefer\nDarunter: Grubensohle, nicht aufgeschlossen\n\nDie Schichten liegen ungestört. An der Abbauwand setzt Schicht 1 erst ab Meter 30 ein, davor ist sie abgetragen (Spieldaten).' },
    's1': { title: 'S1 · Fundkarten', tag: 'Text und Foto', style: 'paper',
      text: 'F1 · Fischsaurier · Grube Nordhang · Schicht 3\nF2 · Ammonit · Grube Nordhang · Schicht 2\nF3 · Urvogel · Grube Nordhang · Schicht 1\n\nFotos: Platzhalter.' },
    's2': { title: 'S2 · Zwei Ammoniten', tag: 'Text und Foto', style: 'paper', image: '../raum2/bilder/ammonit.svg',
      text: 'Ammonit A: ohne Zettel, eine Schenkung.\nAmmonit B: mit Zettel „Grube Nordhang · Schicht 2“.\n\nFoto: Platzhalter.' },
    's3': { title: 'S3 · Fundzettel Z1 bis Z3', tag: 'Text', style: 'paper',
      text: 'Z1 · Ammonit · Grube Nordhang · Schicht 2 · brauner Tonstein · 1974\nZ2 · Fischsaurier-Wirbel · Grube Nordhang · Schicht 3 · dunkler blättriger Ton · 1987\nZ3 · Feder-Abdruck · Grube Nordhang · Schicht 1 · dunkler blättriger Ton · 1999' },
    'pruefkarte': { title: 'Prüfkarte Fundkontext', tag: 'Ergebnis', style: 'paper',
      text: '1. Wo wurde es gefunden?\n2. In welcher Schicht, und gibt es sie im Profil?\n3. Passt das Gestein zur Schicht?' },
    /* ENTWURF: Inhalt G */
    'g': { title: 'G · Kopie des Museumsgutachtens', tag: 'Bild', style: 'paper',
      text: 'Eine Kopie: „Gutachten zum Fund Berolinavis“. Darunter steht: „Der Fund ist echt.“\n\nDas Feld für die Unterschrift ist leer. Ein Datum fehlt.' },
    'v1': { title: 'V1 · Archaeopteryx, Berliner Exemplar', tag: 'Bild', style: 'paper', image: '../raum2/bilder/fotokarte-archaeopteryx.svg',
      text: 'Foto mit Maßstab. Platzhalter, das echte Foto folgt.' },
    'v2': { title: 'V2 · Compsognathus', tag: 'Bild', style: 'paper', image: '../raum2/bilder/fotokarte-compsognathus.svg',
      text: 'Ein kleiner Raubdinosaurier. Foto mit Maßstab. Platzhalter, das echte Foto folgt.' },
    'v3': { title: 'V3 · Taubenskelett', tag: 'Bild', style: 'paper', image: '../raum2/bilder/fotokarte-taube.svg',
      text: 'Skelett einer heutigen Taube. Foto mit Maßstab. Platzhalter, das echte Foto folgt.' },
    'vp': { title: 'VP · Vergleichsprotokoll', tag: 'Ergebnis', style: 'paper',
      text: '„Nicht nachgewiesen“ heißt bei einem Fossil: im Fund nicht erhalten oder nicht erkennbar. Bei der heutigen Taube heißt „nein“: fehlt wirklich.',
      table: { head: ['Merkmal', 'Compsognathus', 'Archaeopteryx', 'Taube'],
        rows: [['Zähne', 'ja', 'ja', 'nein'], ['Krallen an den Fingern', 'ja', 'ja', 'nein'], ['Lange knöcherne Schwanzwirbelsäule', 'ja', 'ja', 'nein'],
          ['Schwungfedern', 'nicht nachgewiesen', 'ja', 'ja'], ['Brustbeinkamm', 'nicht nachgewiesen', 'nicht nachgewiesen', 'ja']] } },
    /* ENTWURF: Beschreibung BV */
    'bv': { title: 'BV · Der Berolinavis', tag: 'Bild', style: 'paper', image: '../raum2/bilder/berolinavis.svg',
      text: 'Der Berolinavis auf einer Steinplatte. Am Rand klebt ein Fundzettel.\n\nIllustration, keine echte Aufnahme (Kulisse). Alle Werte zum Berolinavis sind für das Spiel erfunden.' },
    'h': { title: 'H · Hallmann (Aufnahme)', tag: 'Ton', style: 'paper', audio: 'audio/h-hallmann.mp3',
      text: 'Hallmann: „Jeder Fund hat seine Eigenheiten.“' },
    'vergleichstiere': { title: 'Wirbelbreiten bei Vergleichstieren (Spieldaten)', tag: 'Daten', style: 'paper',
      text: 'Verhältnis = Breite des letzten Beckenwirbels geteilt durch Breite des ersten Schwanzwirbels. Die Werte sind für das Spiel erfunden.',
      table: { head: ['Tier', 'Beckenwirbel', 'erster Schwanzwirbel', 'Verhältnis'],
        rows: [['V1', '5,1 mm', '5,2 mm', '0,98'], ['V2', '4,6 mm', '5,0 mm', '0,92'], ['V3', '6,0 mm', '5,7 mm', '1,05'], ['V4', '5,5 mm', '5,5 mm', '1,00'], ['V5', '4,9 mm', '5,1 mm', '0,96'], ['V6', '5,8 mm', '5,6 mm', '1,04']] } },
    /* ENTWURF: Inhalte X1 bis X4 (Steckbrief nennt nur das Thema) */
    'x1': { title: 'Preisliste einer Sammlerbörse', tag: 'Text', style: 'paper',
      text: 'Ammonit, poliert: 45 Euro\nSeeigel: 30 Euro\nFischsaurier-Wirbel: 120 Euro\nFeder-Abdruck auf Kalkplatte: auf Anfrage' },
    'x2': { title: 'Zeitungsausschnitt', tag: 'Text', style: 'paper',
      text: '„Fossilien als Geldanlage: Seltene Stücke erzielen auf Auktionen Rekordpreise. Experten raten, nur bei bekannten Händlern zu kaufen.“' },
    'x3': { title: 'Seeigel', tag: 'Bild', style: 'paper',
      text: 'Foto eines Seeigels. Daneben ein Zettel: „Fundort unbekannt“.' },
    'x4': { title: 'Besucherbuch der Kammer', tag: 'Text', style: 'paper',
      text: 'Einträge von Schulklassen und Gästen: „Sehr spannend!“, „Der Ammonit ist toll.“, „Wann kommt der Urvogel zurück?“' }
  },

  puzzles: {
    /* ---------------- Mission 2.1 ---------------- */
    'r2v3-1-schichten': { id: 'r2v3-1-schichten', type: 'objekt', mode: 'zeigen', title: 'Die Profilwand',
      prompt: 'Belegt jede Aussage durch eine Stelle an der Wand.\n\nDie Profilwand zeigt drei Gesteinsschichten der Grube Nordhang. Die Schichten liegen ungestört.',
      image: '../raum2/bilder/profilwand.svg', imageAlt: 'Profilwand mit drei Schichten, darunter die Grubensohle, rechts eine Abraumhalde (Platzhalter)',
      startText: 'Tippt auf die Stelle an der Wand, die diese Aussage belegt.',
      spots: [
        { id: 's1', label: 'Schicht 1', x: 30, y: 13, w: 22, h: 16, text: 'Oben: heller, feinkörniger Plattenkalk. Hier lag Fund F3, der Urvogel.' },
        { id: 's2', label: 'Schicht 2', x: 30, y: 37, w: 22, h: 16, text: 'Brauner Tonstein. Hier lag Fund F2, der Ammonit.' },
        { id: 's3', label: 'Schicht 3', x: 30, y: 59, w: 22, h: 16, text: 'Unten: dunkler, blättriger Tonschiefer. Hier lag Fund F1, der Fischsaurier.' },
        { id: 'sohle', label: 'Grubensohle', x: 52, y: 80, w: 20, h: 12, text: 'Unter Schicht 3. Nicht aufgeschlossen: Hier wurde noch nicht gegraben.' },
        { id: 'halde', label: 'Abraumhalde', x: 80, y: 70, w: 17, h: 20, text: 'Lose Steine neben der Grube, ohne Schichtung.' }
      ],
      rows: [
        { id: 'a1', label: 'Hier liegt der älteste der drei Funde.' },
        { id: 'a2', label: 'Hier liegt der jüngste der drei Funde.' },
        { id: 'a3', label: 'Hier müsste ein Fossil liegen, das noch älter ist als alle drei.' }
      ],
      noneLabel: 'Nicht erkennbar',
      hash: 'f2d965632b0bd2476e60faef0043830d0da7a263a836d4d22351fe4b1660bc45',
      button: 'Belege prüfen',
      wrongText: 'Nichts passiert. Überlegt, wie die Schichten entstanden sind: Was wurde zuerst abgelagert?',
      hints: ['Schaut auf die Wand. Welche Schicht liegt unten, welche oben?',
              'Wenn sich Sediment ablagert, welches kommt zuerst, das untere oder das obere?',
              'Die Wand zeigt es: Unten lagert sich zuerst Sediment ab. Daraus folgt eine Regel für die Reihenfolge der Fossilien.'],
      rescue: 'RGVyIMOkbHRlc3RlIEZ1bmQgbGllZ3QgaW4gU2NoaWNodCAzLCBkZXIgasO8bmdzdGUgaW4gU2NoaWNodCAxLiBFaW4gbm9jaCDDpGx0ZXJlcyBGb3NzaWwgbcO8c3N0ZSBub2NoIHRpZWZlciBsaWVnZW4sIGluIGRlciBHcnViZW5zb2hsZS4gV2FzIHVudGVuIGxpZWd0LCBpc3Qgw6RsdGVyLg==',
      rescueTask: 'Erklärt in eigenen Worten, warum tiefer liegende Schichten älter sind, und nennt eine Bedingung, unter der das nicht gilt.',
      onSolve: { docs: ['p'], text: 'Die Profilwand leuchtet auf. Im Schrank klickt ein Schloss: Die Schubladen lassen sich öffnen.', then: 's2v3-2a' } },

    /* ENTWURF 15.11.: Schnellrunde mit Zeit (Abrufen, keine Denkaufgabe) */
    's2v3-2a': { id: 's2v3-2a', type: 'schnell', seconds: 90, title: 'Schnellrunde: 90 Sekunden Licht',
      prompt: 'Entscheidet bei jeder Karte: älter, jünger oder nicht entscheidbar?',
      story: 'Die Lampe über der Profilwand hängt an einer Zeitschaltuhr. Ihr habt 90 Sekunden Licht.\n\nDie Schichten liegen ungestört: 1 oben, 3 unten.',
      timeoutText: 'Das Licht geht aus.\n\nIch drehe die Zeitschaltuhr neu auf. Noch einmal.',
      options: [{ id: 'aelter', label: 'älter' }, { id: 'juenger', label: 'jünger' }, { id: 'offen', label: 'nicht entscheidbar' }],
      items: [
        { id: 'k1', text: 'Der Fischsaurier aus Schicht 3 ist … als der Urvogel aus Schicht 1.' },
        { id: 'k2', text: 'Der Ammonit aus Schicht 2 ist … als der Fischsaurier aus Schicht 3.' },
        { id: 'k3', text: 'Der Urvogel aus Schicht 1 ist … als der Ammonit aus Schicht 2.' },
        { id: 'k4', text: 'Ein loser Stein von der Abraumhalde ist … als der Ammonit aus Schicht 2.' },
        { id: 'k5', text: 'Ein Fossil aus der Grubensohle unter Schicht 3 wäre … als der Fischsaurier.' },
        { id: 'k6', text: 'Ein Ammonit ohne Fundzettel ist … als der Urvogel aus Schicht 1.' }
      ],
      itemHash: { k1: '13ab2337ba8e811da92676040536ef9d3f8009fa2ca8e15cd054961749b64b10', k2: '43c9505f13b58e5f729a5fb83be149bb3dd1f24722b6b91ceefc36626ea86df5', k3: '49569308e8f25195e116faf1f43ba30656807535241602bf87b44e5aed90e513', k4: 'c9101d377595a8c4756f7bab0951440e1d47286aaa6022c5ac8f13ad0b492f74', k5: 'ec86646dd80496e21a20426daa2da7f24ee2458f09c56edaf41903cd852de035', k6: '4882c7f471f4b0416164c0e2f31daeb20e280ae62377e26f7a80414dce5bc016' },
      onSolve: { message: { from: 'kemal', text: 'Geschafft, bevor es dunkel wurde.\\n\\nZwei Karten ließen sich nicht entscheiden. Überlegt, was ihnen fehlt.' } } },

    'r2v3-1-aussagekraft': { id: 'r2v3-1-aussagekraft', type: 'assign', title: 'Folgt das aus dem Fund?',
      ref: { title: 'Zum Nachschlagen: zwei Ammoniten, Profilwand', docs: ['s2', 'p'] },
      prompt: 'Ordnet jede Aussage zu: Folgt sie aus dem Fund, oder folgt sie nicht daraus?\n\nZwei Sammler zeigen euch je einen Ammoniten.',
      cards: [
        { id: 'a1', label: 'Ammonit A (ohne Zettel) · „Das Tier hat einmal gelebt.“' },
        { id: 'a2', label: 'Ammonit A (ohne Zettel) · „Es lebte im Meer.“' },
        { id: 'a3', label: 'Ammonit A (ohne Zettel) · „Es ist 200 Millionen Jahre alt.“' },
        { id: 'a4', label: 'Ammonit A (ohne Zettel) · „Es lebte zur selben Zeit wie ein Urvogel.“' },
        { id: 'b1', label: 'Ammonit B (Schicht 2) · „Er ist jünger als der Fischsaurier aus Schicht 3.“' },
        { id: 'b2', label: 'Ammonit B (Schicht 2) · „Er ist älter als der Urvogel aus Schicht 1.“' },
        { id: 'b3', label: 'Ammonit B (Schicht 2) · „Er ist genau 170 Millionen Jahre alt.“' },
        { id: 'b4', label: 'Ammonit B (Schicht 2) · „Er lebte zur selben Zeit wie der Fischsaurier.“' }
      ],
      targets: [{ id: 'folgt', label: 'folgt aus dem Fund' }, { id: 'nicht', label: 'folgt nicht daraus' }],
      hash: 'f78b343abaa45386a923c39c8b93f511c26b24bcccd99311e7e0f02b9a74171b',
      wrongText: 'Nichts passiert. Fragt bei jeder Aussage: Woher wissen wir das?',
      hints: ['Prüft jede Aussage: Steht das im Stein oder auf dem Zettel?',
              'Aus der Lage in den Schichten folgt, ob etwas älter oder jünger ist. Folgt daraus auch eine genaue Zahl?',
              'Ohne Zettel folgt nur, dass das Tier gelebt hat. Fragt bei den übrigen Aussagen: Steht das im Stein, auf dem Zettel oder in keinem von beiden?'],
      rescue: 'QXVzIGRlbSBGdW5kIGZvbGd0OiBBbW1vbml0IEEgaGF0IGdlbGVidCB1bmQgbGVidGUgaW0gTWVlci4gQW1tb25pdCBCIGlzdCBqw7xuZ2VyIGFscyBkZXIgRmlzY2hzYXVyaWVyIGF1cyBTY2hpY2h0IDMgdW5kIMOkbHRlciBhbHMgZGVyIFVydm9nZWwgYXVzIFNjaGljaHQgMS4gRWluZSBKYWhyZXN6YWhsIHVuZCDigJ56dXIgc2VsYmVuIFplaXTigJwgZm9sZ2VuIG5pY2h0IGRhcmF1cy4=',
      rescueTask: 'Schreibt auf, was ein Fossil ohne Fundzettel belegt und was nicht.',
      onSolve: { docs: ['pruefkarte'],
        message: { from: 'kemal', text: 'Die Prüfkarte Fundkontext hängt jetzt an der Sammelwand. Ihr braucht sie gleich bei den Fundzetteln.' }, then: 'r2v3-1-zettel' } },

    'r2v3-1-zettel': { id: 'r2v3-1-zettel', type: 'tabelle', title: 'Fundzettel prüfen',
      ref: { title: 'Zum Nachschlagen: Prüfkarte, Profilwand, Fundzettel', docs: ['pruefkarte', 'p', 's3'] },
      prompt: 'Prüft jeden Zettel mit der Prüfkarte gegen das Profil. Tippt eine Zelle an, bis die passende Angabe dort steht.\n\nKemal hat drei Fundzettel gefunden.',
      rows: [{ id: 'z1', label: 'Z1 · Ammonit · Grube Nordhang · Schicht 2 · brauner Tonstein · 1974' },
             { id: 'z2', label: 'Z2 · Fischsaurier-Wirbel · Grube Nordhang · Schicht 3 · dunkler blättriger Ton · 1987' },
             { id: 'z3', label: 'Z3 · Feder-Abdruck · Grube Nordhang · Schicht 1 · dunkler blättriger Ton · 1999' }],
      cols: [{ id: 'schicht', label: 'Die Schicht gibt es im Profil.' }, { id: 'gestein', label: 'Das Gestein passt zur Schicht.' }],
      states: [{ id: 'j', label: 'ja' }, { id: 'n', label: 'nein' }],
      colHash: { schicht: 'e5b0aa802d793cee5604a91ff15564958cf1ee7d8d1c288f514e9a491ca6f31a', gestein: '76145a3a3a466db81b76c7f1f4a1ccdd40e4543d0abb7e18aef479f7547a1699' },
      hash: '2938a87c5e897d1e4af131ed2c8e7a8d4a6cf2bfaaea4ef3bea71e1487fc85d6',
      wrongText: 'Nichts passiert. Vergleicht Schicht und Gestein auf jedem Zettel mit der Wand.',
      hints: ['Vergleicht bei jedem Zettel Schicht und Gestein mit der Wand.',
              'Welche Schicht ist hell und feinkörnig? Was steht auf dem Zettel?',
              'Bei zwei Zetteln passen Schicht und Gestein zusammen. Beim dritten nicht.'],
      rescue: 'QWxsZSBkcmVpIFNjaGljaHRlbiBnaWJ0IGVzIGltIFByb2ZpbC4gQmVpIFoxIHVuZCBaMiBwYXNzdCBkYXMgR2VzdGVpbiB6dXIgU2NoaWNodC4gWjMgbmVubnQgU2NoaWNodCAxLCBiZXNjaHJlaWJ0IGFiZXIgZHVua2xlbiwgYmzDpHR0cmlnZW4gVG9uLiBTY2hpY2h0IDEgaXN0IGhlbGxlciBQbGF0dGVua2FsaywgZHVua2xlciBUb24gcGFzc3QgbnVyIHp1IFNjaGljaHQgMy4=',
      rescueTask: 'Schreibt auf, woran ihr einen Fundzettel gegen das Profil prüft.',
      onSolve: { then: 'r2v3-1-folge' } },

    'r2v3-1-folge': { id: 'r2v3-1-folge', type: 'pick', count: 1, title: 'Was folgt daraus?', logbook: { where: 'Logbuch Seite 2.1, Feld „Lernprodukt“', task: 'Füllt die Fundkontext-Karte aus: Fossil und Fundzettel, passt der Zettel, was folgt daraus, was folgt nicht daraus.' },
      prompt: 'Wählt, was aus dem Ergebnis für Zettel Z3 folgt.',
      cards: [
        { id: 'a', label: 'Der Zettel ist falsch oder das Stück wurde vertauscht. Die Herkunft ist unklar.' },
        { id: 'b', label: 'Das Stück stammt sicher aus Schicht 3.' },
        { id: 'c', label: 'Das Stück ist eine Fälschung.' },
        { id: 'd', label: 'Das Stück stammt aus einer anderen Grube.' }
      ],
      traps: [{ id: 'c', text: 'Vorsicht. Ein falscher Zettel macht die Herkunft unklar. Er sagt nicht, warum.' }],
      /* ENTWURF 15.11.: Aussage mit Beleg (Rateschutz) */
      evidence: { prompt: 'Wählt den Beleg, der eure Aussage trägt.', cards: [
        { id: 'e1', label: 'Prüfkarte und Profilwand: Z3 nennt Schicht 1, das Gestein passt nur zu Schicht 3.' },
        { id: 'e2', label: 'Preisliste der Sammlerbörse: Feder-Abdrücke gibt es nur „auf Anfrage“.' },
        { id: 'e3', label: 'Fundzettel Z1 und Z2: Bei ihnen passen Schicht und Gestein zusammen.' },
        { id: 'e4', label: 'Seeigel mit dem Zettel „Fundort unbekannt“' } ] },
      pickHash: 'bded9b206dadb37e1c992134e11a732b92a31266ce3dba5797325580aa82a515',
      hash: 'b7253ce1099d53c66693cab851922e3e2c2c2220e013229057f43ac9a0fd349c',
      wrongText: 'Nichts passiert. Was wisst ihr sicher: dass etwas nicht passt, oder warum es nicht passt?',
      hints: ['Was wisst ihr sicher: dass etwas nicht passt, oder warum es nicht passt?',
              'Kann man aus einem falschen Zettel ablesen, woher das Stück wirklich kommt?',
              'Der Zettel stimmt nicht. Was lässt sich daraus ablesen, was nicht? Kennt ihr die richtige Herkunft?'],
      rescue: 'QXVzIGVpbmVtIFpldHRlbCwgZGVyIG5pY2h0IHp1bSBQcm9maWwgcGFzc3QsIGZvbGd0IG51cjogRGVyIFpldHRlbCBpc3QgZmFsc2NoIG9kZXIgZGFzIFN0w7xjayB3dXJkZSB2ZXJ0YXVzY2h0LCBkaWUgSGVya3VuZnQgaXN0IHVua2xhci4gT2IgamVtYW5kIGdldMOkdXNjaHQgaGF0LCB6ZWlndCBlciBuaWNodC4=',
      rescueTask: 'Schreibt auf, warum ein falscher Zettel noch keine Fälschung beweist.',
      onSolve: { wall: [{ id: 'w-z3', title: 'Z3: Herkunft unklar', tag: 'Ergebnis', kind: 'ergebnis', text: 'Fundzettel Z3 nennt Schicht 1, aber ein Gestein aus Schicht 3. Die Herkunft des Feder-Abdrucks ist unklar.' }],
        message: { from: 'kemal', text: 'Z3 hängt jetzt mit einer Nadel an der Wand: „Herkunft unklar“.\n\nMerkt euch diesen Weg. Ihr braucht ihn gleich wieder.' } } },

    'z2v3-luecken': { id: 'z2v3-luecken', type: 'freetext', minLength: 60, title: 'Warum es so wenige Fossilien gibt (Zusatzaufgabe)',
      prompt: 'Nennt zwei Gründe, warum von den meisten Lebewesen kein Fossil erhalten ist.',
      placeholder: 'Von den meisten Lebewesen bleibt kein Fossil, weil …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Was passiert mit einem toten Tier an der Oberfläche?',
              'Wer frisst Aas, was zersetzt Weichteile?',
              'Ein Grund betrifft das, was nach dem Tod passiert. Ein zweiter betrifft die Bedingungen der Einbettung.'],
      onSolve: { message: { from: 'kemal', text: 'Fehlende Fossilien sagen nichts gegen die Evolution. Sie zeigen, wie selten die Bedingungen sind.' } } },

    /* ---------------- Mission 2.2 ---------------- */
    'r2v3-2-kriterium': { id: 'r2v3-2-kriterium', type: 'freetext', minLength: 30, title: 'Wonach vergleicht ihr? (Zusatzaufgabe)',
      prompt: 'Formuliert ein Kriterium, nach dem ihr die drei Tiere vergleicht.\n\nIhr sollt prüfen, ob drei Tiere miteinander verwandt sein könnten.',
      placeholder: 'Wir vergleichen nach …',
      checks: ['Das Kriterium steht im Feld.', 'Es steht im Logbuch.'],
      hints: ['Woran erkennt ihr, dass zwei Tiere denselben Ursprung haben könnten?', 'Was vererbt sich: die Größe oder der Bau?', 'Es geht um Merkmale von Skelett und Federn.'],
      onSolve: { wall: [{ id: 'w-kriterium', title: 'Unser Kriterium', tag: 'Eigener Text', kind: 'ergebnis', answer: 'r2v3-2-kriterium' }],
        text: 'Die Vitrine öffnet sich. Drei Fotos mit Maßstab liegen darin.', message: { from: 'kemal', text: 'Wendet euer Kriterium an.' } } },

    'r2v3-2-urvogel': { id: 'r2v3-2-urvogel', type: 'objekt', mode: 'zeigen', title: 'Der Urvogel', logbook: { where: 'Logbuch Seite 2.2, Feld „Lernprodukt“', task: 'Notiert, welche der fünf Merkmale am Foto des Urvogels zu sehen sind und welche nicht. Das Protokoll mit Raubdinosaurier und Taube folgt in der Präsenzstunde.' },
      prompt: 'Belegt jede Aussage durch eine Stelle am Fossil, oder wählt „Nicht erkennbar“.\n\nDas Berliner Exemplar liegt in der Vitrine.',
      image: '../raum2/bilder/urvogel.jpg', imageAlt: 'Fossil eines Urvogels mit Federabdrücken, Zähnen, Krallen und langem Schwanz',
      startText: 'Tippt auf die Stelle am Urvogel, die diese Aussage belegt.',
      spots: [
        { id: 'kiefer', label: 'Kiefer', x: 53, y: 26, w: 8, h: 6, text: 'Spitze Zähne im Kiefer.' },
        { id: 'hand', label: 'Hand', x: 33, y: 16, w: 9, h: 10, text: 'Drei Finger mit Krallen.' },
        { id: 'schwanz', label: 'Schwanz', x: 25, y: 58, w: 14, h: 16, text: 'Eine lange Schwanzwirbelsäule aus vielen Wirbeln.' },
        { id: 'federn', label: 'Federabdrücke am Arm', x: 66, y: 34, w: 22, h: 14, text: 'Abdrücke von Schwungfedern am Arm.' },
        { id: 'aeste', label: 'Gesteinsoberfläche', x: 76, y: 70, w: 15, h: 15, text: 'Dunkle Verästelungen auf dem Stein. Sie gehören zum Gestein, nicht zum Tier.' }
      ],
      rows: [
        { id: 'm1', label: 'Der Urvogel hat Zähne.' },
        { id: 'm2', label: 'Er hat Krallen an den Fingern.' },
        { id: 'm3', label: 'Er hat eine lange knöcherne Schwanzwirbelsäule.' },
        { id: 'm4', label: 'Er hat Schwungfedern.' },
        { id: 'm5', label: 'Er hat einen Brustbeinkamm.' }
      ],
      noneLabel: 'Nicht erkennbar',
      hash: '8913d7253083f41dabab2c18209d29ccdc40b4837bbbefeed23a97cb1afd0ac7',
      button: 'Belege prüfen',
      wrongText: 'Nichts passiert. Mindestens eine Aussage ist nicht durch die gewählte Stelle belegt.',
      hints: ['Tippt Stelle für Stelle an und lest, was dort zu sehen ist.',
              'Eine Aussage lässt sich am Foto nicht belegen. Welche?',
              'Bei einer der fünf Aussagen zeigt das Foto nichts. Es ist ein Teil des Skeletts.'],
      rescue: 'WsOkaG5lOiBhbSBLaWVmZXIuIEtyYWxsZW46IGFuIGRlciBIYW5kLiBMYW5nZSBTY2h3YW56d2lyYmVsc8OkdWxlOiBhbSBTY2h3YW56LiBTY2h3dW5nZmVkZXJuOiBGZWRlcmFiZHLDvGNrZSBhbSBBcm0uIEJlaW0gQnJ1c3RiZWlua2FtbSBpc3QgYW0gRm9zc2lsIG5pY2h0cyB6dSBlcmtlbm5lbi4=',
      rescueTask: 'Erklärt in eigenen Worten, warum ‚nicht erkennbar‘ nicht heißt ‚nicht vorhanden‘.',
      onSolve: { wall: [
          { id: 'w-m1', title: 'Merkmal: Zähne', tag: 'Urvogel', kind: 'ergebnis', text: 'Am Kiefer erkennbar.' },
          { id: 'w-m2', title: 'Merkmal: Krallen an den Fingern', tag: 'Urvogel', kind: 'ergebnis', text: 'An der Hand erkennbar.' },
          { id: 'w-m3', title: 'Merkmal: lange Schwanzwirbelsäule', tag: 'Urvogel', kind: 'ergebnis', text: 'Am Schwanz erkennbar.' },
          { id: 'w-m4', title: 'Merkmal: Schwungfedern', tag: 'Urvogel', kind: 'ergebnis', text: 'Als Abdrücke am Arm erkennbar.' },
          { id: 'w-m5', title: 'Merkmal: Brustbeinkamm', tag: 'Urvogel', kind: 'ergebnis', text: 'Am Fossil nicht erkennbar.' } ],
        /* ENTWURF 15.11.: Schluss der Stunde 2A */
        message: { from: 'kemal', text: 'Die fünf Merkmale hängen als Karten an der Sammelwand.\n\nHinten in der Kammer steht noch eine Vitrine mit einem Tuch darüber. Den Schlüssel hat nur Dr. Wendt.\n\nIch suche bis zur nächsten Stunde nach dem Zweitschlüssel.' } } },

    'r2v3-2-tabelle': { id: 'r2v3-2-tabelle', type: 'tabelle', title: 'Vergleich protokollieren (Zusatzaufgabe)',
      ref: { title: 'Zum Nachschlagen: Fotos in der Vitrine', docs: ['v1', 'v2', 'v3'] },
      prompt: 'Protokolliert den Vergleich der drei Tiere in der Tabelle. Tippt jede Zelle an, bis euer Ergebnis dasteht.\n\nNutzt die Fotos in der Vitrine und eure Karten an der Sammelwand.',
      rows: [{ id: 'zaehne', label: 'Zähne' }, { id: 'krallen', label: 'Krallen an den Fingern' }, { id: 'schwanz', label: 'Lange knöcherne Schwanzwirbelsäule' },
             { id: 'federn', label: 'Schwungfedern' }, { id: 'brustbein', label: 'Brustbeinkamm' }],
      cols: [{ id: 'compsognathus', label: 'Compsognathus (Raubdinosaurier)' }, { id: 'archaeopteryx', label: 'Archaeopteryx' }, { id: 'taube', label: 'Taube (heute)' }],
      states: [{ id: 'j', label: 'ja' }, { id: 'n', label: 'nein' }, { id: 'x', label: 'nicht nachgewiesen' }],
      colHash: { compsognathus: 'edd44c9702b850d4c6b646b55cdf0977a794f20582f6f367c17fa5d8af28eb3c', archaeopteryx: '57ca837beea1c32b5141fdc22907f8c37f2cf751ca1bbb26eab2f2e803ba5b0c', taube: 'e1bd1c611fa9e8d8f9f3cc7cd77466b8d8e862636941b52a8b3e3eb00604bf4a' },
      hash: '3ae8edca573cc813d5ff3069681996b8c111568a38bbdc68497af7fdd6ab4c9d',
      wrongText: 'Nichts passiert. Ein Fossil kann ein Merkmal gehabt haben, das nicht erhalten ist.',
      hints: ['Prüft jede Zelle an den Fotos der Vitrine.',
              'Wenn etwas beim Fossil nicht zu sehen ist: Fehlt es wirklich oder ist es nicht erhalten?',
              'Bei Fossilien steht ‚nein‘ nur, wenn ihr sicher wisst, dass es fehlt. Sonst ‚nicht nachgewiesen‘.'],
      rescue: 'Q29tcHNvZ25hdGh1czogWsOkaG5lIGphLCBLcmFsbGVuIGphLCBTY2h3YW56IGphLCBTY2h3dW5nZmVkZXJuIG5pY2h0IG5hY2hnZXdpZXNlbiwgQnJ1c3RiZWlua2FtbSBuaWNodCBuYWNoZ2V3aWVzZW4uIEFyY2hhZW9wdGVyeXg6IFrDpGhuZSBqYSwgS3JhbGxlbiBqYSwgU2Nod2FueiBqYSwgU2Nod3VuZ2ZlZGVybiBqYSwgQnJ1c3RiZWlua2FtbSBuaWNodCBuYWNoZ2V3aWVzZW4uIFRhdWJlOiBaw6RobmUgbmVpbiwgS3JhbGxlbiBuZWluLCBTY2h3YW56IG5laW4sIFNjaHd1bmdmZWRlcm4gamEsIEJydXN0YmVpbmthbW0gamEuIEJlaSBGb3NzaWxpZW4gc3RlaHQg4oCebmVpbuKAnCBudXIsIHdlbm4gc2ljaGVyIGlzdCwgZGFzcyBlcyBmZWhsdC4=',
      rescueTask: 'Erklärt in eigenen Worten den Unterschied zwischen ‚nein‘ und ‚nicht nachgewiesen‘.',
      onSolve: { docs: ['vp'], merksatz: 'Ein Vergleich braucht ein Kriterium, das man vorher festlegt. „Nicht nachgewiesen“ heißt nicht „nicht vorhanden“.',
        text: 'Die Schublade mit dem Urvogel springt auf. Euer Vergleichsprotokoll hängt jetzt an der Sammelwand.' } },

    'z2v3-passung': { id: 'z2v3-passung', type: 'freetext', minLength: 60, title: 'Gehören die Teile zusammen? (Zusatzaufgabe)',
      prompt: 'Nennt eine Größe, die ihr messen könntet, um zu prüfen, ob Körperteile zum selben Tier gehören.',
      placeholder: 'Wir würden messen, …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Der Vergleich nach Merkmalen sagt nichts über die Zusammengehörigkeit.', 'Welche Maße müssten an einer Nahtstelle zusammenpassen?', 'Die Breite benachbarter Wirbel.'] },

    /* ---------------- Mission 2.3 ---------------- */
    /* ENTWURF 15.11.: Schnellrunde mit Zeit (Abrufen, keine Denkaufgabe) */
    's2v3-2b': { id: 's2v3-2b', type: 'schnell', seconds: 90, title: 'Schnellrunde: Die Glashaube',
      prompt: 'Ruft euer Vergleichsprotokoll ab: ja, nein oder nicht nachgewiesen?',
      story: 'Die Glashaube der Vitrine schließt nach 90 Sekunden wieder.\n\nIhr habt die drei Tiere in der Präsenzstunde verglichen. Ruft euer Protokoll ab, solange die Haube offen ist.',
      timeoutText: 'Die Haube senkt sich.\n\nIch stemme sie wieder hoch. Schaut vorher ins Logbuch, dann noch einmal.',
      options: [{ id: 'j', label: 'ja' }, { id: 'n', label: 'nein' }, { id: 'x', label: 'nicht nachgewiesen' }],
      items: [
        { id: 'k1', text: 'Archaeopteryx: Zähne' },
        { id: 'k2', text: 'Taube: Zähne' },
        { id: 'k3', text: 'Compsognathus: Schwungfedern' },
        { id: 'k4', text: 'Archaeopteryx: Brustbeinkamm' },
        { id: 'k5', text: 'Taube: Brustbeinkamm' },
        { id: 'k6', text: 'Compsognathus: lange knöcherne Schwanzwirbelsäule' },
        { id: 'k7', text: 'Taube: Krallen an den Fingern' }
      ],
      itemHash: { k1: '44d22aea7aed8a769520afbf08341151672dc2eebb3bdbb05be264206f6db481', k2: '8179ea62dd9730d89184a551294e59bf030e0cc1aaab0ea0a1bae9cbdca001f5', k3: 'a10e573700c944d4f88132f6f2ce5130c812c7b9fe946a2c509ffd8f580458fc', k4: 'f2671b28dab08d2579e4e435edbf72b5a218a7836e19e0fe9c906275a8860d6d', k5: '2ceea70f7a56be879cf05d0bde5d1cb95c4ca2c3d7852984452a443085c419f3', k6: '85611188dbb94c2fb32d7ca76d441722f7af8fde8867c1e5af8237200fd35456', k7: '23f0f629edbc6dda3bdbcd32c1581e2aeb8ab396c14618530ba2fcb2a16deb21' },
      onSolve: { docs: ['vp'], text: 'Die Haube bleibt offen. Das Vergleichsprotokoll hängt jetzt an der Sammelwand.', then: 'r2v3-3-mosaik' } },

    'r2v3-3-mosaik': { id: 'r2v3-3-mosaik', type: 'assign', title: 'Merkmale einordnen', logbook: { where: 'Logbuch Seite 2.3, Feld „Lernprodukt“', task: 'Tragt jedes Merkmal in die Tabelle ein: ursprünglich, abgeleitet oder keine Aussage, mit kurzer Begründung.' },
      ref: { title: 'Zum Nachschlagen: Vergleichsprotokoll', docs: ['vp'] },
      prompt: 'Ordnet die fünf Merkmale des Urvogels zu: ursprünglich (auch beim Raubdinosaurier), abgeleitet (typisch für heutige Vögel) oder keine Aussage möglich.\n\nNutzt euer Vergleichsprotokoll aus dem Logbuch. Zum Nachschlagen liegt es auch hier bereit.',
      cards: [
        { id: 'zaehne', label: 'Zähne' }, { id: 'krallen', label: 'Krallen an den Fingern' }, { id: 'schwanz', label: 'Lange knöcherne Schwanzwirbelsäule' },
        { id: 'federn', label: 'Schwungfedern' }, { id: 'brustbein', label: 'Brustbeinkamm' }
      ],
      targets: [{ id: 'urs', label: 'ursprünglich' }, { id: 'abg', label: 'abgeleitet' }, { id: 'keine', label: 'keine Aussage möglich' }],
      hash: '19b29eb330794f14fadc2edd655e2a3461cfb9dbd30bd9c00f47aa6933bb9bcd',
      wrongText: 'Nichts passiert. „Ursprünglich“ meint: Das Merkmal gab es schon bei den Verwandten.',
      hints: ['Schaut auf euer Protokoll: Welche Merkmale hat der Raubdinosaurier auch?',
              'Ein Merkmal steht beim Urvogel und beim Raubdinosaurier auf ‚nicht nachgewiesen‘. Was lässt sich dazu sagen?',
              'Zähne, Krallen und Schwanz hat auch der Raubdinosaurier. Bei Federn und Brustbeinkamm prüft ihr, was bei ihm nachgewiesen ist.'],
      rescue: 'VXJzcHLDvG5nbGljaCAoYXVjaCBiZWltIFJhdWJkaW5vc2F1cmllcik6IFrDpGhuZSwgS3JhbGxlbiBhbiBkZW4gRmluZ2VybiwgbGFuZ2UgU2Nod2FuendpcmJlbHPDpHVsZS4gQWJnZWxlaXRldCAodHlwaXNjaCBmw7xyIGhldXRpZ2UgVsO2Z2VsKTogU2Nod3VuZ2ZlZGVybi4gWnVtIEJydXN0YmVpbmthbW0gaXN0IGtlaW5lIEF1c3NhZ2UgbcO2Z2xpY2gu',
      rescueTask: 'Erklärt in eigenen Worten, was ‚ursprünglich‘ und ‚abgeleitet‘ bedeuten.',
      onSolve: { wall: [{ id: 'w-diagramm', title: 'Merkmalsdiagramm', tag: 'Ergebnis', kind: 'ergebnis',
          text: 'Links der Raubdinosaurier, rechts die Taube, in der Mitte der Urvogel.\nMit dem Raubdinosaurier verbunden: Zähne, Krallen an den Fingern, lange Schwanzwirbelsäule.\nMit der Taube verbunden: Schwungfedern.\nOhne Linie: Brustbeinkamm.' }],
        text: 'An der Wand erscheint ein Diagramm: links der Raubdinosaurier, rechts die Taube, in der Mitte der Urvogel. Linien verbinden gleiche Merkmale.', then: 'r2v3-3-deutung' } },

    'r2v3-3-deutung': { id: 'r2v3-3-deutung', type: 'pick', count: 1, title: 'Was folgt aus dem Mosaik?',
      prompt: 'Wählt die Aussage, die aus der Merkmalskombination folgt.',
      cards: [
        { id: 'a', label: 'Der Urvogel vereint Merkmale zweier Gruppen. Das spricht dafür, dass Raubdinosaurier und Vögel gemeinsame Vorfahren haben.' },
        { id: 'b', label: 'Der Urvogel ist der direkte Vorfahr aller heutigen Vögel.' },
        { id: 'c', label: 'Der Urvogel ist das fehlende Glied, das die Evolution beweist.' },
        { id: 'd', label: 'Der Urvogel hat sich im Lauf seines Lebens vom Dinosaurier zum Vogel verwandelt.' }
      ],
      /* ENTWURF: Rückmeldung zur Falle d */
      traps: [{ id: 'd', text: 'Vorsicht. Ein einzelnes Tier verwandelt sich nicht im Lauf seines Lebens. Erinnert euch an Lamarck im Streitsaal.' }],
      /* ENTWURF 15.11.: Aussage mit Beleg (Rateschutz) */
      evidence: { prompt: 'Wählt den Beleg, der eure Aussage trägt.', cards: [
        { id: 'e1', label: 'Vergleich der drei Tiere: Zähne, Fingerkrallen und Schwanz wie beim Raubdinosaurier, Schwungfedern wie bei der Taube.' },
        { id: 'e2', label: 'Fundkarten: Der Urvogel liegt in Schicht 1, der jüngsten Schicht.' },
        { id: 'e3', label: 'Zeitungsausschnitt: Seltene Fossilien erzielen Rekordpreise.' },
        { id: 'e4', label: 'Besucherbuch: „Wann kommt der Urvogel zurück?“' } ] },
      pickHash: '35746ad3b3bdd1e1ad2c5d1c617f9278710fb2f48d72b2e4d4a3fdbd58ca09dc',
      hash: '32caba5de59699b20a70525e822d04cb66a353abc65adb51ba9f4328f56f62a4',
      wrongText: 'Nichts passiert. Eine Kombination von Merkmalen zeigt Verwandtschaft, keine Abstammungslinie.',
      hints: ['Was zeigt das Diagramm an der Wand: eine Linie oder ein Netz von Ähnlichkeiten?',
              'Kann man aus Merkmalen allein sagen, wer wessen Kind war?',
              'Das Diagramm zeigt Ähnlichkeiten. Prüft, ob die Aussage mehr behauptet, als Ähnlichkeiten tragen.'],
      rescue: 'RGllIE1lcmttYWxza29tYmluYXRpb24gc3ByaWNodCBmw7xyIGdlbWVpbnNhbWUgVm9yZmFocmVuIHZvbiBSYXViZGlub3NhdXJpZXJuIHVuZCBWw7ZnZWxuLiBBdXMgTWVya21hbGVuIGZvbGd0IFZlcndhbmR0c2NoYWZ0LCBuaWNodCBlaW5lIGVpbnplbG5lIEFobmVucmVpaGU6IERhc3MgZGVyIFVydm9nZWwgZGVyIGRpcmVrdGUgVm9yZmFociBvZGVyIGRhcyDigJ5mZWhsZW5kZSBHbGllZOKAnCBpc3QsIGZvbGd0IGRhcmF1cyBuaWNodC4=',
      rescueTask: 'Beschreibt in einem Satz, warum ‚Bindeglied‘ ein schwieriger Begriff ist.',
      onSolve: { merksatz: 'Ein Brückentier zeigt eine Kombination ursprünglicher und abgeleiteter Merkmale. Es ist kein direkter Vorfahr und kein „fehlendes Glied“.',
        wall: [{ id: 'w-brueckentier', title: 'Fachbegriff: Brückentier', tag: 'Fachbegriff', kind: 'ergebnis',
          text: 'Ein Brückentier zeigt eine Kombination ursprünglicher und abgeleiteter Merkmale. Es ist kein direkter Vorfahr und kein „fehlendes Glied“.' }],
        message: { from: 'kemal', text: 'Auf Dr. Wendts Arbeitstisch wartet jemand. Ein Sammler will euch etwas zeigen.' } } },

    'r2v3-3-frage': { id: 'r2v3-3-frage', type: 'freetext', minLength: 30, title: 'Eure erste Frage (Zusatzaufgabe)',
      prompt: 'Formuliert die Frage, die ihr dem Sammler zuerst stellt.\n\nEin Sammler zeigt euch ein Fossil mit Zähnen, Krallen und Federn.',
      placeholder: 'Unsere Frage: …',
      checks: ['Die Frage steht im Feld.', 'Sie steht im Logbuch.'],
      sample: 'Ich hätte gefragt: Gehören alle Teile zum selben Tier? Vergleicht mit eurer Frage.', sampleFrom: 'kemal',
      hints: ['Was wäre, wenn zwei Tiere zusammengeklebt wären?', 'Was würde dann aus dem Mosaik folgen?', 'Die Frage nach der Zusammengehörigkeit kommt vor allem anderen.'],
      onSolve: { wall: [{ id: 'w-frage2', title: 'Unsere erste Frage', tag: 'Eigener Text', kind: 'ergebnis', answer: 'r2v3-3-frage' }],
        text: 'Die Vitrine hinten leuchtet auf.', message: { from: 'kemal', text: 'Jetzt prüfen wir den Berolinavis.' } } },

    'z2v3-kein-brueckentier': { id: 'z2v3-kein-brueckentier', type: 'freetext', minLength: 80, title: 'Wann ist ein Mosaik kein Brückentier? (Zusatzaufgabe)',
      prompt: 'Nennt zwei Möglichkeiten, wann ein Merkmalsmosaik in einem Stein kein Hinweis auf ein Brückentier ist.',
      placeholder: 'Ein Mosaik ist kein Hinweis, wenn …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Was wäre, wenn nicht alles zu einem Tier gehört?', 'Wer kann an einem Stück etwas ergänzen?', 'Zusammengefügt, ergänzt, falsch zugeordnet.'] },

    /* ---------------- Mission 2.4 ---------------- */
    'r2v3-4-untersuchen': { id: 'r2v3-4-untersuchen', type: 'objekt', mode: 'markieren', partBy: 'tool', title: 'Den Berolinavis untersuchen',
      ref: { title: 'Zum Nachschlagen: Prüfkarte, Profilwand, Vergleichstiere', docs: ['pruefkarte', 'p', 'vergleichstiere'] },
      prompt: 'Markiert jede Stelle, die nicht zu einem einzigen Tier passt. Wechselt die Ansicht, um mehr zu sehen.\n\nDer Berolinavis liegt in der Vitrine.',
      image: '../raum2/bilder/berolinavis.svg', imageAlt: 'Der Berolinavis auf einer Steinplatte (Illustration, Platzhalter)',
      startText: 'Wählt eine Ansicht und tippt auf eine umrandete Stelle.',
      baseLabel: 'Normal',
      tools: [{ id: 'schliff', label: 'Schliff' }, { id: 'mess', label: 'Messen' }, { id: 'ct', label: 'CT' }],
      views: { schliff: '../raum2/bilder/berolinavis-gestein.svg', mess: '../raum2/bilder/berolinavis-mess.svg', ct: '../raum2/bilder/berolinavis-ct.svg' },
      pens: [{ id: 'pn', label: 'Passt nicht zu einem einzigen Tier', tag: 'passt nicht' }],
      spots: [
        { id: 'zettel', label: 'Fundzettel', x: 74, y: 80, w: 20, h: 14, text: 'Ein Zettel: „Berolinavis · Grube Nordhang · Meter 14 · Schicht 1“.' },
        { id: 'federn', label: 'Federabdrücke', x: 34, y: 25, w: 12, h: 15, text: 'Federabdrücke am Arm, fein erhalten.' },
        { id: 'zaehne', label: 'Zähne', x: 12, y: 40, w: 8, h: 8, text: 'Kleine, spitze Zähne im Kiefer.' },
        { id: 'naht', label: 'Grenze Rumpf/Schwanz', tool: 'schliff', x: 61, y: 15, w: 9, h: 70, text: 'Körper in hellem, feinkörnigem Kalk. Schwanz in dunklem, blättrigem Ton mit kleinen Muscheln. Die Grenze läuft quer zur Schichtung.' },
        { id: 'koerper', label: 'Körpergestein', tool: 'schliff', x: 24, y: 45, w: 29, h: 14, text: 'Gleichmäßiger, heller Kalk. Die feinen Lagen laufen ungestört durch.' },
        { id: 'wirbel', label: 'Wirbel am Becken', tool: 'mess', x: 57, y: 57, w: 15, h: 17, text: 'Letzter Beckenwirbel 4 mm breit, erster Schwanzwirbel 9 mm. Verhältnis 0,44. Vergleicht mit den Vergleichstieren.' },
        { id: 'arm', label: 'Oberarmknochen', tool: 'mess', x: 25, y: 22, w: 9, h: 22, text: 'Länge der Oberarmknochen im üblichen Bereich der Vergleichstiere.' },
        { id: 'fuell', label: 'Naht im CT', tool: 'ct', x: 61, y: 15, w: 9, h: 70, text: 'An der Naht zwischen Körper und Schwanz liegt eine Schicht mit geringerer Dichte.' },
        { id: 'riefen', label: 'Krallen im CT', tool: 'ct', x: 23, y: 15, w: 9, h: 11, text: 'An den Krallen feine, parallele Riefen, alle in dieselbe Richtung.' },
        { id: 'schaedel', label: 'Schädel im CT', tool: 'ct', x: 8, y: 32, w: 13, h: 18, text: 'Gleichmäßige Dichte im ganzen Schädel.' }
      ],
      note: 'Was unmarkiert bleibt, passt zu einem einzigen Tier.',
      parts: [{ id: 'ohne', label: 'Normal', hash: 'b10384e44f3e839c230de103ae86ed48456ce5c7ad11b4f73eac388490134e76' }, { id: 'schliff', label: 'Schliff', hash: '5779dae5710fca34e655ee29b7a9599856e481f776c13474550b9d2c0119c3e0' },
              { id: 'mess', label: 'Messen', hash: '8808d7e0daaa9300d714e825169f52f3b64c7639c5cea11448492d614bd0c713' }, { id: 'ct', label: 'CT', hash: '87532eb3f621c642b4fb49cf57ad8610e51ea13ef8a56d359402b78453fb2139' }],
      hash: 'c360df9d9dba197a9ecbd2d76b51a83d68667d7a58706e31253bebbb904fb7bf',
      button: 'Markierungen prüfen',
      wrongText: 'Nichts passiert. Mindestens eine Markierung passt nicht.',
      hints: ['Nehmt die Prüfkarte und geht die Fragen durch: Wo, welche Schicht, passt das Gestein?',
              'Wechselt die Ansicht. Manche Auffälligkeiten sieht man nur im Schliff, beim Messen oder im CT.',
              'Normal: der Zettel. Schliff: die Naht. Für Messen und CT entscheidet ihr selbst, was dort auffällt.'],
      rescue: 'Tm9ybWFsOiBEZXIgWmV0dGVsIG5lbm50IE1ldGVyIDE0IHVuZCBTY2hpY2h0IDEsIGRvcnQgaXN0IFNjaGljaHQgMSBhYmdldHJhZ2VuLiBTY2hsaWZmOiBEaWUgTmFodCB6d2lzY2hlbiB6d2VpIEdlc3RlaW5lbiBsw6R1ZnQgcXVlciB6dXIgU2NoaWNodHVuZy4gTWVzc2VuOiBEaWUgV2lyYmVsIHBhc3NlbiBuaWNodCB6dXNhbW1lbiwgZGFzIFZlcmjDpGx0bmlzIDAsNDQgbGllZ3Qgd2VpdCBhdcOfZXJoYWxiIGRlciBWZXJnbGVpY2hzdGllcmUuIENUOiBGw7xsbG1hc3NlIGFuIGRlciBOYWh0IHVuZCBwYXJhbGxlbGUgUmllZmVuIGFuIGRlbiBLcmFsbGVuLiBGZWRlcm4sIFrDpGhuZSB1bmQgZGllIGdsZWljaG3DpMOfaWdlbiBTdGVsbGVuIHNpbmQgdW5hdWZmw6RsbGlnLg==',
      rescueTask: 'Schreibt zu jeder Ansicht einen Satz: Was zeigt der Befund? Was zeigt er nicht?',
      onSolve: { docs: ['h'],
        evidence: [
          { id: 'ev-2v3a', title: 'Evidenzkarte A · Fundkontext', text: 'Zettel und Profil passen nicht zusammen: Bei Meter 14 gibt es Schicht 1 nicht.' },
          { id: 'ev-2v3b', title: 'Evidenzkarte B · Gestein', text: 'Körper und Schwanz liegen in verschiedenen Gesteinen, die Naht läuft quer zur Schichtung.' },
          { id: 'ev-2v3c', title: 'Evidenzkarte C · Anatomie', text: 'Die Wirbelbreiten von Becken und Schwanz passen nicht zusammen, weit außerhalb der Vergleichstiere.' },
          { id: 'ev-2v3d', title: 'Evidenzkarte D · Bearbeitungsspuren', text: 'An der Naht liegt Füllmasse, die Krallen tragen parallele Riefen.' } ],
        wall: [
          { id: 'w-ev-a', title: 'Evidenzkarte A · Fundkontext', tag: 'Evidenz', kind: 'ergebnis', text: 'Zettel und Profil passen nicht zusammen: Bei Meter 14 gibt es Schicht 1 nicht.' },
          { id: 'w-ev-b', title: 'Evidenzkarte B · Gestein', tag: 'Evidenz', kind: 'ergebnis', text: 'Körper und Schwanz liegen in verschiedenen Gesteinen, die Naht läuft quer zur Schichtung.' },
          { id: 'w-ev-c', title: 'Evidenzkarte C · Anatomie', tag: 'Evidenz', kind: 'ergebnis', text: 'Wirbelverhältnis 0,44. Vergleichstiere: 0,92 bis 1,05.' },
          { id: 'w-ev-d', title: 'Evidenzkarte D · Bearbeitungsspuren', tag: 'Evidenz', kind: 'ergebnis', text: 'Füllmasse an der Naht, parallele Riefen an den Krallen.' } ],
        message: { from: 'hallmann', audio: 'audio/h-hallmann.mp3', text: 'Jeder Fund hat seine Eigenheiten.' }, then: 'r2v3-4-ausreden' } },

    /* ab V3.1 umgedreht (ENTWURF 15.11.): nicht „welcher Befund gehört zur Ausrede“, sondern „woran scheitert sie“ */
    'r2v3-4-ausreden': { id: 'r2v3-4-ausreden', type: 'assign', title: 'Hallmanns Ausreden', logbook: { where: 'Logbuch Seite B2, Beweisstück 2', task: 'Tragt für jede der vier Linien ein: Befund, Ausrede und warum sie nicht reicht.' },
      ref: { title: 'Zum Nachschlagen: Evidenzkarten und Vergleichstiere', text: 'A: Zettel und Profil passen nicht zusammen.\nB: zwei Gesteine, Naht quer zur Schichtung.\nC: Wirbelbreiten weit außerhalb der Vergleichstiere.\nD: Füllmasse an der Naht, Riefen an den Krallen.', docs: ['vergleichstiere'] },
      prompt: 'Ordnet jede Ausrede dem Feld zu, das auf sie zutrifft.\n\nHallmann hat zu jedem Befund eine Erklärung. Nehmt jede ernst: Wenn sie stimmt, erklärt sie dann alles, was ihr an diesem Befund gesehen habt?',
      cards: [
        { id: 'x1', label: '„Der Zettel wurde beim Umlagern vertauscht.“' },
        { id: 'x2', label: '„Die Platte lag genau auf der Schichtgrenze.“' },
        { id: 'x3', label: '„Tiere unterscheiden sich eben. Das ist Variabilität.“' },
        { id: 'x4', label: '„Fossilien müssen präpariert werden. Das ist normal.“' },
        { id: 'x5', label: '„Das Fossil ist eben besonders.“' }
      ],
      targets: [
        { id: 'quer', label: 'Scheitert daran: Die Naht läuft quer zur Schichtung.' },
        { id: 'weit', label: 'Scheitert daran: Verhältnis 0,44 statt 0,92 bis 1,05.' },
        { id: 'fuell', label: 'Scheitert daran: An der Naht liegt Füllmasse.' },
        { id: 'nur', label: 'Erklärt ihren Befund, aber keinen der anderen drei.' },
        { id: 'nicht', label: 'Lässt sich an keinem Befund prüfen.' }
      ],
      hash: 'ba50d8abf9f18315f8d911b4560811554fcd46e66ac026be02a1ab62d80acd48',
      wrongText: 'Nichts passiert. Nehmt jede Ausrede ernst: Was müsste man dann am Fossil sehen, und was seht ihr wirklich?',
      hints: ['Lest die Evidenzkarten A bis D. Zu welchem Befund gehört jede Ausrede?',
              'Wie verläuft eine natürliche Grenze zwischen zwei Schichten? Was macht ein Präparator mit dem Gestein? Wie groß sind die Unterschiede zwischen den Vergleichstieren?',
              'Fragt bei jedem Befund: Wird die Ausrede am Stein selbst geprüft oder nur behauptet?'],
      rescue: 'RGVyIHZlcnRhdXNjaHRlIFpldHRlbCBlcmtsw6RydCBkZW4gWmV0dGVsLCBhYmVyIG5pY2h0cyBhbSBTdGVpbi4gRGllIFNjaGljaHRncmVuemUgc2NoZWl0ZXJ0OiBFaW5lIG5hdMO8cmxpY2hlIEdyZW56ZSBsw6R1ZnQgZW50bGFuZyBkZXIgU2NoaWNodHVuZywgZGllIE5haHQgbMOkdWZ0IHF1ZXIuIERpZSBWYXJpYWJpbGl0w6R0IHNjaGVpdGVydDogRGllIFZlcmdsZWljaHN0aWVyZSBsaWVnZW4gendpc2NoZW4gMCw5MiB1bmQgMSwwNSwgZGVyIEJlcm9saW5hdmlzIGJlaSAwLDQ0LiBEaWUgUHLDpHBhcmF0aW9uIHNjaGVpdGVydDogQmVpbSBQcsOkcGFyaWVyZW4gd2lyZCBHZXN0ZWluIGVudGZlcm50LCBhbiBkZXIgTmFodCBsaWVndCBhYmVyIEbDvGxsbWFzc2UuIOKAnkRhcyBGb3NzaWwgaXN0IGViZW4gYmVzb25kZXJz4oCcIGzDpHNzdCBzaWNoIGFuIGtlaW5lbSBCZWZ1bmQgcHLDvGZlbi4gVmllciB1bmFiaMOkbmdpZ2UgQmVmdW5kZSBtw7xzc3RlbiBhbGxlIHp1ZsOkbGxpZyBoYXJtbG9zIHNlaW4uIERhcyBpc3QgdW53YWhyc2NoZWlubGljaC4=',
      rescueTask: 'Erklärt, warum vier unabhängige Befunde stärker sind als ein einzelner.',
      onSolve: { wall: [{ id: 'w-ausreden', title: 'Hallmanns Ausreden', tag: 'Ergebnis', kind: 'ergebnis',
          text: 'Zettel vertauscht: erklärt den Zettel, aber nichts am Stein.\nSchichtgrenze: scheitert, die Naht läuft quer zur Schichtung.\nVariabilität: scheitert, der Wert liegt weit außerhalb aller Vergleichstiere.\nPräparation: scheitert, an der Naht liegt Füllmasse.\n„Eben besonders“: lässt sich nicht prüfen.' }],
        message: { from: 'kemal', text: 'Drei Ausreden scheitern schon am eigenen Befund. Eine hält, erklärt aber nur den Zettel.\n\nVier Befunde, die nichts miteinander zu tun haben, müsste Hallmann alle einzeln wegerklären. Das Schloss am Arbeitstisch wartet.' } } },

    /* ab V3.1: Schloss mit gemeinsamer Wortbank (ENTWURF 15.11.) */
    'r2v3-4-schloss': { id: 'r2v3-4-schloss', type: 'cloze', triple: true, title: 'Schloss 2', logbook: { where: 'Logbuch Seite B2, Feld „Unser vorläufiger Satz“', task: 'Schreibt den Satz aus Schloss 2 in euren Worten: Aussage, Beleg und Reichweite.' },
      prompt: 'Vervollständigt den Satz. Das Schloss verlangt einen gesicherten Satz aus Aussage, Beleg, Reichweite und offener Frage.',
      parts: [{ strong: 'Aussage: ' }, 'Der Befund spricht dafür, dass der Berolinavis ', { gap: 'g1', label: 'Lücke 1' }, ' ist.', { nl: true },
        { strong: 'Beleg: ' }, { gap: 'g2', label: 'Lücke 2' }, ' Befunde zeigen dasselbe, und jede Ausrede erklärt ', { gap: 'g3', label: 'Lücke 3' }, '.', { nl: true },
        { strong: 'Reichweite: ' }, 'Zusammen ergibt das ', { gap: 'g4', label: 'Lücke 4' }, ', noch kein Urteil.', { nl: true },
        { strong: 'Offen: ' }, 'Ob Hallmann davon wusste, ist ', { gap: 'g5', label: 'Lücke 5' }, '.'],
      bank: [{ id: 'zs', label: 'aus verschiedenen Teilen zusammengesetzt' }, { id: 'sg', label: 'sicher gefälscht' }, { id: 'nb', label: 'ein neues Brückentier' },
        { id: 'vu', label: 'Vier voneinander unabhängige' }, { id: 'za', label: 'Zwei voneinander abhängige' },
        { id: 'nd', label: 'höchstens einen davon' }, { id: 'al', label: 'alle auf einmal' },
        { id: 'sv', label: 'einen starken Verdacht' }, { id: 'bb', label: 'einen bewiesenen Betrug' },
        { id: 'no', label: 'noch offen' }, { id: 'bw', label: 'bewiesen' }],
      gapHash: { g1: '56b8f96582121b265f9f1b2a24815bc33789184ff013aa0e70139c9252d61c8a', g2: 'e66ac38d47385d5d4b073edda5031f61399c68f586151eeb610eab250eb3781d', g3: '71e00bae166c2a7635903e54a064c9d6f03c7d74d1571240909d545bc8666e94', g4: '4b0b9403ffcc4dc358a37d40bdb6e8580503076d07857dab9207a45edacb6c44', g5: '9ab2d9d05952eba2eb7c7c607f993c40284e29190e65266bfc9fb615c5b76eed' },
      tripleText: 'Das Schloss bleibt zu. Mindestens eine Lücke stimmt nicht. Lest den Satz laut und prüft jede Lücke einzeln.',
      traps: [
        { g: 'g4', v: 'bb', from: 'kemal', text: 'Vorsicht. Wir haben zusammengesetzt gezeigt, nicht wer es getan hat.' },
        { g: 'g5', v: 'bw', from: 'kemal', text: 'Vorsicht. Wir haben zusammengesetzt gezeigt, nicht wer es getan hat.' },
        { g: 'g2', v: 'za', from: 'kemal', text: 'Zählt die Evidenzkarten an der Sammelwand. Und hängen sie voneinander ab?' },
        { g: 'g1', v: 'sg', from: 'kemal', text: '„Sicher“ ist zu stark.' }
      ],
      hash: '826193d9390ecc3a34d03caaea46ca947690271a0c91acbf842b456679ebe12b',
      hints: ['Lest den Satz Teil für Teil. Was haben wir gezeigt, was nicht?',
              'Haben wir gezeigt, wer den Berolinavis so gemacht hat?',
              'Die Lücken nennen den Befund, die Stärke der Aussage und das, was offen bleibt. Streicht in der Wortbank zuerst, was nicht passt.'],
      rescue: 'QXVzc2FnZTogRGVyIEJlZnVuZCBzcHJpY2h0IGRhZsO8ciwgZGFzcyBkZXIgQmVyb2xpbmF2aXMgYXVzIHZlcnNjaGllZGVuZW4gVGVpbGVuIHp1c2FtbWVuZ2VzZXR6dCBpc3QuIEJlbGVnOiBWaWVyIHZvbmVpbmFuZGVyIHVuYWJow6RuZ2lnZSBCZWZ1bmRlIHplaWdlbiBkYXNzZWxiZSwgdW5kIGplZGUgQXVzcmVkZSBlcmtsw6RydCBow7ZjaHN0ZW5zIGVpbmVuIGRhdm9uLiBSZWljaHdlaXRlOiBadXNhbW1lbiBlcmdpYnQgZGFzIGVpbmVuIHN0YXJrZW4gVmVyZGFjaHQsIG5vY2gga2VpbiBVcnRlaWwuIE9mZmVuOiBPYiBIYWxsbWFubiBkYXZvbiB3dXNzdGUsIGlzdCBub2NoIG9mZmVuLg==',
      rescueTask: 'Schreibt den Satz in euren Worten ins Logbuch.',
      onSolve: {
        fx: 'lock', fxTitle: 'Schloss 2 geöffnet', fxText: 'Aussage, Beleg, Reichweite und offene Frage halten. Der Befund ist zusammengesetzt.',
        evidence: { id: 'ev-2v3', title: 'Beweisakte Teil 2 · Der Befund ist zusammengesetzt', text: 'Vier voneinander unabhängige Befunde sprechen dafür, dass der Berolinavis zusammengesetzt ist. Das ist ein starker Verdacht, noch kein Urteil.' },
        merksatz: 'Ein einzelner Befund kann harmlos erklärt werden. Erst mehrere voneinander unabhängige Befunde, die dasselbe zeigen, tragen ein Urteil. Ein Verdacht ist kein Beweis.',
        message: { from: 'wendt', text: 'Damit haben wir einen starken Verdacht. Aber ein Verdacht ist kein Urteil.\n\n– J. W.' },
        message2: { from: 'hallmann', text: 'Eine Verwerfung hat die beiden Gesteine zusammengeschoben. So etwas kommt vor.' } } },

    'z2v3-verwerfung': { id: 'z2v3-verwerfung', type: 'freetext', minLength: 100, title: 'Hallmanns Verwerfung (Zusatzaufgabe)',
      ref: { title: 'Zum Nachschlagen: Evidenzkarten', text: 'B: zwei Gesteine, Naht quer zur Schichtung.\nD: Füllmasse an der Naht, Riefen an den Krallen.' },
      prompt: 'Beurteilt, welche Befunde die Erklärung „Eine Verwerfung hat die beiden Gesteine zusammengeschoben“ stützen würden und welche dagegen sprechen.',
      placeholder: 'Für eine Verwerfung spräche …, dagegen spricht …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Was würde eine Verwerfung im Gestein hinterlassen?', 'Was zeigt das CT an der Naht?', 'Füllmasse und Riefen passen nicht zu einem natürlichen Bruch.'] }
  }
});
