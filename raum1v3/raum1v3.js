/* Raum 1 V3 · Der Streitsaal · Missionen 1.1 bis 1.3 (Stand 20.10.2026, nach Rätselsteckbrief Raum 1 V3 vom 15.10.2026)
   Diese Datei wird aus raum1v3.src.js erzeugt. Lösungen stehen in raum1v3.js nur als Hash.
   Eigene IDs (r1v3-…, m1v3.…), damit Spielstände und Notfall-Codes von Raum 1 V2 nicht brechen.
   Texte mit dem Vermerk ENTWURF stehen nicht im Steckbrief und brauchen die Freigabe der Lehrkraft. */
TRESOR.room({
  base: '../',
  id: 'raum1v3',
  version: 'Raum 1 V3',
  title: 'Der Streitsaal',
  subtitle: 'Raum 1 · Argumente prüfen',
  image: '../raum1/bilder/streitsaal.jpg',
  imageAlt: 'Ein holzgetäfelter Saal bei Nacht: links ein Pult mit aufgeschlagenem Buch, in der Mitte das Prüfpult mit grüner Lampe, rechts ein Pult mit verschnalltem Buch. Dahinter ein Tonbandgerät, ein Giraffenskelett und ein Archivregal.',
  size: [1024, 681],
  flashlight: false,
  unlockMode: 'auto',
  wall: true,
  audioLabel: 'KI-Stimme · Antippen zum Hören',

  caseText: function (T) {
    var t = 'Dr. Johanna Wendt ist verschwunden. Der Händler Viktor Hallmann will den „Berolinavis“ versteigern und erklärt öffentlich, wie das Tier entstanden sein soll.\n\nIm Streitsaal prüft ihr diese Erklärung. Ob der Fund selbst echt ist, wisst ihr noch nicht.';
    if (T.isSolved('r1v3-1-pruefen')) t += '\n\nIhr habt herausgefunden, was Hallmann behauptet, und eine prüfbare Frage formuliert.';
    if (T.isSolved('r1v3-2-vorhersage')) t += '\n\nIhr kennt jetzt das Modell hinter seiner Erklärung und habt daraus Vorhersagen abgeleitet.';
    if (T.isSolved('r1v3-3-schloss')) t += '\n\nIhr habt die Erklärung an Versuchen geprüft. Sie hält nicht stand. Über den Fund selbst sagt das noch nichts.';
    return t;
  },

  end: { title: 'Raum 1 geschafft', text: 'Sichert jetzt euren Spielstand. Wie es weitergeht, erfahrt ihr in der nächsten Stunde.' },

  /* Zufallsmodell der Simulation „Laufrad“ (Spieldaten). */
  models: {
    laufrad: function (st, rnd) {
      function gauss() { var u = 0; while (!u) u = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rnd()); }
      function fmt(x) { return x.toFixed(1).replace('.', ','); }
      var n = +st.maeuse, G = +st.gen, rows = [], means = [];
      for (var g = 1; g <= G; g++) {
        var vals = [];
        for (var i = 0; i < n; i++) vals.push(Math.max(88, Math.min(112, Math.round(100 + 4 * gauss()))));
        var m = vals.reduce(function (a, b) { return a + b; }, 0) / n; means.push(fmt(m));
        rows.push([String(g), fmt(m), Math.min.apply(null, vals) + ' bis ' + Math.max.apply(null, vals)]);
      }
      return { table: { head: ['Generation', 'Mittelwert', 'kleinster bis größter Wert'], rows: rows }, summary: 'Mittelwerte je Generation: ' + means.join(' · ') };
    }
  },

  missions: [
    { id: 'm1v3.1', title: 'Mission 1.1 · Die Behauptung', unlock: 'cf9e92a1a95b3b94b145029a171bdc732776ebdd8b612cd1889de323847d719d',
      intro: { from: 'kemal', audio: 'audio/a0-kemal.mp3', text: 'Ich habe euch in den Streitsaal gelassen. Gestern Abend hat Hallmann hier vor Sammlern gesprochen. Die Saalanlage hat alles aufgezeichnet. Hört zu, aber glaubt nicht alles, was ihr hört.' },
      requires: ['r1v3-1-hoeren', 'r1v3-1-frage', 'r1v3-1-pruefen'],
      doneTitle: 'Mission 1.1 abgeschlossen',
      doneText: 'Ihr habt geklärt, was Hallmann behauptet, und daraus eine Frage gemacht, die man prüfen kann.\n\nSchreibt „Hallmann behauptet, dass …“ und eure Untersuchungsfrage ins Logbuch.' },
    { id: 'm1v3.2', title: 'Mission 1.2 · Das Modell', unlock: '6e1a4d45bacc392e447404bc19f848bb5b56176f525ce981b06f72cd98346e58', sameLesson: true,
      intro: { from: 'kemal', text: 'Hinter jeder Erklärung steckt ein Modell. Am Lamarck-Pult links liegen Auszüge aus einer alten Schrift. Vergleicht sie mit dem, was Hallmann sagt.\n\nDer Text dort ist eine vereinfachte Fassung, kein Originalzitat.' },
      requires: ['r1v3-2-modell', 'r1v3-2-kette', 'r1v3-2-vorhersage'],
      doneTitle: 'Mission 1.2 abgeschlossen',
      doneText: 'Ihr kennt jetzt das Modell hinter Hallmanns Erklärung und habt daraus zwei Vorhersagen abgeleitet.\n\nSchreibt V1 und V2 als Wenn-dann-Sätze ins Logbuch.' },
    { id: 'm1v3.3', title: 'Mission 1.3 · Die Prüfung', unlock: 'a28f8ac7bfef61dbc9eca668dfd436d657e8fc23e8d43c23f1af73a999a2c808',
      /* ENTWURF: Einstieg 1.3 (V2-Text an das Laufrad angepasst) */
      intro: { from: 'kemal', text: 'Heute prüft ihr Hallmanns Erklärung. Auf dem Tisch steht ein Laufrad-Experiment. Führt den Versuch selbst durch. Danach könnt ihr am Prüfpult Einspruch einlegen.\n\nHallmann hat auf jeden Beleg eine Antwort. Rechnet damit.' },
      requires: ['r1v3-3-laufrad', 'r1v3-3-laufrad-aussage', 'r1v3-3-einspruch', 'r1v3-3-kette', 'r1v3-3-belege', 'r1v3-3-schloss'],
      doneTitle: 'Mission 1.3 abgeschlossen · Schloss 1 geöffnet',
      doneText: 'Hallmanns Erklärung hält der Prüfung an Beobachtungen nicht stand. Über den Fund selbst wisst ihr damit noch nichts.\n\nSchreibt die Mittelwerte eurer Läufe und Aussage, Beleg und Reichweite in euer Logbuch.' }
  ],

  /* Bereiche in Prozent des Raumbilds. Neue Stellen (Lautsprecher, Laufrad-Tisch, Katalog, Einladung, Wandtafel) sind PLATZHALTER,
     die Lehrkraft setzt sie nach dem fertigen Bild. */
  hotspots: [
    { id: 'lautsprecher', label: 'Lautsprecher an der Tür', rect: [0.5, 30, 4, 20], action: { type: 'doc', doc: 'a0' } },
    { id: 'saalanlage', label: 'Saalanlage mit Aufzeichnung', rect: [17, 31, 17.5, 24], action: { type: 'docs', title: 'Saalanlage', docs: ['a1', 'a2'] } },
    { id: 'wandtafel', label: 'Wandtafel', rect: [4.7, 12.5, 7.8, 29], action: { type: 'doc', doc: 'x5' } },
    { id: 'einladung', label: 'Einladung an der Wand', rect: [87.8, 12, 8, 30], action: { type: 'doc', doc: 'x3' } },
    { id: 'katalog', label: 'Auktionskatalog', rect: [25.5, 46, 9, 9], action: { type: 'doc', doc: 'x2' } },
    { id: 'giraffe', label: 'Giraffenskelett', rect: [38.5, 6, 22, 51], states: [
      { if: { missionDone: 'm1v3.2', found: 'x1', notSolved: 'z1v3-giraffe' }, action: { type: 'puzzle', puzzle: 'z1v3-giraffe' } },
      { action: { type: 'doc', doc: 'x1' } } ] },
    { id: 'regal', label: 'Archivregal', rect: [65.5, 24, 17.8, 37], states: [
      { if: { solved: 'r1v3-2-vorhersage' }, action: { type: 'docs', title: 'Archivregal', docs: ['b1', 'b3', 'b4', 'x4'] } },
      { action: { type: 'text', text: 'Ein Regal mit Archivmappen. Noch findet ihr nichts, was ihr für eure Untersuchung braucht.' } } ] },
    { id: 'laufrad', label: 'Tisch mit Laufrad', rect: [64.6, 60, 6.8, 16], states: [
      { if: { unlocked: 'm1v3.3', notSolved: 'r1v3-3-laufrad' }, action: { type: 'puzzle', puzzle: 'r1v3-3-laufrad' } },
      { if: { unlocked: 'm1v3.3', notSolved: 'r1v3-3-laufrad-aussage' }, action: { type: 'puzzle', puzzle: 'r1v3-3-laufrad-aussage' } },
      { action: { type: 'text', text: 'Ein Laufrad und zwei Käfige. Das Experiment ist noch nicht aufgebaut.' } } ] },   /* ENTWURF */
    { id: 'lamarck', label: 'Pult links', rect: [6, 56.5, 22.5, 34], states: [
      { if: { unlocked: 'm1v3.2', notFound: 'm1' }, action: { type: 'doc', doc: 'm1' } },
      { if: { unlocked: 'm1v3.2', notSolved: 'r1v3-2-modell' }, action: { type: 'puzzle', puzzle: 'r1v3-2-modell' } },
      { if: { unlocked: 'm1v3.2', notSolved: 'r1v3-2-kette' }, action: { type: 'puzzle', puzzle: 'r1v3-2-kette' } },
      { if: { unlocked: 'm1v3.2', notSolved: 'r1v3-2-vorhersage' }, action: { type: 'puzzle', puzzle: 'r1v3-2-vorhersage' } },
      { if: { found: 'm1' }, action: { type: 'doc', doc: 'm1' } },
      { action: { type: 'text', text: 'Dieses Pult ist noch verschlossen.' } } ] },
    { id: 'pruefpult', label: 'Prüfpult in der Mitte', rect: [36, 57, 28.5, 34], states: [
      { if: { unlocked: 'm1v3.1', notSolved: 'r1v3-1-hoeren' }, action: { type: 'puzzle', puzzle: 'r1v3-1-hoeren' } },
      { if: { unlocked: 'm1v3.1', notSolved: 'r1v3-1-frage' }, action: { type: 'puzzle', puzzle: 'r1v3-1-frage' } },
      { if: { unlocked: 'm1v3.1', notSolved: 'r1v3-1-pruefen' }, action: { type: 'puzzle', puzzle: 'r1v3-1-pruefen' } },
      { if: { unlocked: 'm1v3.3', solved: 'r1v3-3-laufrad-aussage', notSolved: 'r1v3-3-einspruch' }, action: { type: 'puzzle', puzzle: 'r1v3-3-einspruch' } },
      { if: { unlocked: 'm1v3.3', solved: 'r1v3-3-belege', notSolved: 'r1v3-3-schloss' }, action: { type: 'puzzle', puzzle: 'r1v3-3-schloss' } },
      { if: { missionDone: 'm1v3.1', notSolved: 'z1v3-quelle' }, action: { type: 'puzzle', puzzle: 'z1v3-quelle' } },
      { action: { type: 'doc', doc: 'a1' } } ] },
    { id: 'darwin', label: 'Pult rechts', rect: [71.5, 56.5, 22.5, 34], states: [
      { if: { solved: 'r1v3-3-einspruch', notFound: 'm2' }, action: { type: 'doc', doc: 'm2' } },
      { if: { solved: 'r1v3-3-einspruch', notSolved: 'r1v3-3-kette' }, action: { type: 'puzzle', puzzle: 'r1v3-3-kette' } },
      { if: { solved: 'r1v3-3-kette', notSolved: 'r1v3-3-belege' }, action: { type: 'puzzle', puzzle: 'r1v3-3-belege' } },
      { if: { missionDone: 'm1v3.3', notSolved: 'z1v3-modellkritik' }, action: { type: 'puzzle', puzzle: 'z1v3-modellkritik' } },
      { if: { missionDone: 'm1v3.3', notSolved: 'z1v3-population' }, action: { type: 'puzzle', puzzle: 'z1v3-population' } },
      { if: { found: 'm2' }, action: { type: 'doc', doc: 'm2' } },
      { action: { type: 'text', text: 'Das Pult rechts ist verschlossen. Erst muss die erste Erklärung geprüft werden.' } } ] }
  ],

  docs: {
    'a0': { title: 'A0 · Kemal (Lautsprecher)', tag: 'Ton', style: 'paper', audio: 'audio/a0-kemal.mp3',
      text: 'Kemal: „Ich habe euch in den Streitsaal gelassen. Gestern Abend hat Hallmann hier vor Sammlern gesprochen. Die Saalanlage hat alles aufgezeichnet. Hört zu, aber glaubt nicht alles, was ihr hört.“' },
    'a1': { title: 'A1 · Hallmanns Vortrag (Saalanlage)', tag: 'Ton', style: 'paper', audio: 'audio/a1-hallmann.mp3',
      text: 'Gestern Abend, Vortrag vor Sammlern. Sprecher: Viktor Hallmann.\n\nT1: „Der Berolinavis ist das bedeutendste Fossil des Jahrhunderts. Ich garantiere es.“\nT2: „Er trägt Federn an den Armen und einen langen Knochenschwanz.“\nT3: „Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.“\nT4: „Durch dieses Training wuchsen ihnen Federn.“\nT5: „Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.“\nT6: „Die Krallen an seinen Armen sind stark abgenutzt.“\nT7: „Diese Tiere haben ihre Arme also ständig benutzt.“\nT8: „Das Museum hat den Fund geprüft und bestätigt.“' },
    'a2': { title: 'A2 · Wendts Sprachnachricht (Saalanlage)', tag: 'Ton', style: 'paper', audio: 'audio/a2-wendt.mp3',
      text: 'Wendt: „Wenn ihr das hört … Hallmann versteigert den Berolinavis. Ich habe einen Verdacht. Aber ein Verdacht ist keine Erkenntnis. Prüft zuerst, was er wirklich behauptet. Und trennt sauber, was er sieht und was er daraus macht. Vertraut Kemal.“' },
    'm1': { title: 'M1 · Auszüge nach Lamarck (vereinfacht)', tag: 'Text', style: 'paper',
      text: 'Vereinfachte Fassung, sinngemäß, kein Originalzitat.\n\nL1: Ändert sich die Umwelt, ändern sich die Bedürfnisse der Tiere. Aus neuen Bedürfnissen entstehen neue Gewohnheiten.\nL2: Organe, die oft gebraucht werden, werden stärker und größer. Organe, die nicht gebraucht werden, bilden sich zurück.\nL3: Was ein Lebewesen im Lauf seines Lebens erwirbt, gibt es an seine Nachkommen weiter.' },
    'm2': { title: 'M2 · Auszüge nach Darwin (vereinfacht)', tag: 'Text', style: 'paper',
      text: 'Vereinfachte Fassung, sinngemäß, kein Originalzitat.\n\nD1: Individuen einer Art unterscheiden sich in vielen Merkmalen.\nD2: Es werden mehr Nachkommen geboren, als überleben können, sie konkurrieren um begrenzte Ressourcen.\nD3: Individuen mit vorteilhaften Merkmalen überleben und pflanzen sich häufiger fort.\nD4: Ein Teil der Unterschiede wird an die Nachkommen weitergegeben.\nD5: Über viele Generationen wird das vorteilhafte Merkmal in der Population häufiger.' },
    'b1': { title: 'B1 · Weismann: Mäuseschwänze', tag: 'Text', style: 'paper',
      text: 'Ab 1887 schneidet der Biologe August Weismann weißen Mäusen den Schwanz ab. Die Mäuse bekommen Junge. Auch diesen Jungen und allen folgenden Generationen wird der Schwanz abgeschnitten. Das geschieht über 22 Generationen. Ergebnis: Alle Jungen werden mit vollständigem Schwanz geboren.' },
    'b3': { title: 'B3 · Taubenzucht', tag: 'Text und Bild', style: 'paper',
      text: 'Alle Taubenrassen, zum Beispiel Pfautaube und Kropftaube, stammen von der wilden Felsentaube ab. Züchter wählen aus jeder Generation die Tiere mit dem gewünschten Merkmal aus und paaren nur diese. Nach vielen Generationen sind die Rassen deutlich verschieden.' },
    'b4': { title: 'B4 · Kabeljau', tag: 'Faktenkarte', style: 'paper',
      text: 'Ein Kabeljau-Weibchen legt pro Jahr Hunderttausende bis mehrere Millionen Eier. Trotzdem wächst der Bestand nicht ins Unendliche. Die meisten Jungtiere sterben, bevor sie sich fortpflanzen.' },
    'x1': { title: 'Giraffenskelett', tag: 'Text', style: 'paper',
      text: 'Ein Giraffenskelett. Lamarck benutzte den Giraffenhals als Beispiel.\n\nWarum die Giraffe ihren langen Hals bekommen hat, ist bis heute nicht abschließend geklärt.' },
    /* ENTWURF: Inhalte X2 bis X5 (Steckbrief nennt nur das Thema) */
    'x2': { title: 'Auktionskatalog', tag: 'Text', style: 'paper',
      text: 'Los 1: „Berolinavis“. Fundort laut Katalog: Grube Nordhang. Alter laut Katalog: etwa 150 Millionen Jahre. Schätzpreis: 2,4 Millionen Euro.' },
    'x3': { title: 'Einladung zur Versteigerung', tag: 'Text', style: 'paper',
      text: 'Einladung. Versteigerung des Berolinavis am kommenden Samstag, 20 Uhr, im Großen Saal. Einlass nur mit dieser Karte.' },
    'x4': { title: 'Deckblatt des Museumsgutachtens', tag: 'Bild', style: 'paper',
      text: 'Ein Deckblatt: „Gutachten zum Fund Berolinavis“. Die Seiten dahinter fehlen. Der Inhalt ist nicht lesbar.' },
    'x5': { title: 'Wandtafel', tag: 'Text', style: 'paper',
      text: 'An der Tafel steht in Kreideschrift: „Gebrauch macht stark“. Wer es geschrieben hat und woher es stammt, steht nicht dabei.' }
  },

  puzzles: {
    /* ---------------- Mission 1.1 ---------------- */
    'r1v3-1-hoeren': { id: 'r1v3-1-hoeren', type: 'markup', title: 'Hallmanns Vortrag prüfen',
      ref: { title: 'Zum Nachschlagen und Hören: A1 · Hallmanns Vortrag', docs: ['a1'] },
      prompt: 'Markiert jede Aussage als Beobachtung, Deutung oder Behauptung.\n\nHört Hallmanns Vortrag oder lest das Transkript (A1).',
      passes: [{ id: 'beo', label: 'Beobachtung', tag: 'Beobachtung', hint: 'Das lässt sich am Fossil nachsehen.' },
               { id: 'deu', label: 'Deutung', tag: 'Deutung', hint: 'Hallmann erklärt, warum etwas so ist.' },
               { id: 'beh', label: 'Behauptung', tag: 'Behauptung', hint: 'Eine Wertung, eine Garantie oder ein Verweis auf andere.' }],
      segments: [
        { id: 't1', nr: 'T1', text: '„Der Berolinavis ist das bedeutendste Fossil des Jahrhunderts. Ich garantiere es.“' },
        { id: 't2', nr: 'T2', text: '„Er trägt Federn an den Armen und einen langen Knochenschwanz.“' },
        { id: 't3', nr: 'T3', text: '„Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.“' },
        { id: 't4', nr: 'T4', text: '„Durch dieses Training wuchsen ihnen Federn.“' },
        { id: 't5', nr: 'T5', text: '„Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.“' },
        { id: 't6', nr: 'T6', text: '„Die Krallen an seinen Armen sind stark abgenutzt.“' },
        { id: 't7', nr: 'T7', text: '„Diese Tiere haben ihre Arme also ständig benutzt.“' },
        { id: 't8', nr: 'T8', text: '„Das Museum hat den Fund geprüft und bestätigt.“' }
      ],
      hash: 'a1fa651b1176d384243471596cea2602ee2f487a94e77df3ed25bc4dc116894d',
      passHash: { beo: 'c627d4a16b86fde2eeb7dd6cb61b8cdc612946f3e2ec41cc736b652572038e58', deu: 'ee15b1a8bd00033e35d1b60b11eb01e7cc8e1f806d00069e67703cc3ee447a7a', beh: '13b09046e07d27cf3ef2e91a3e4f91a7b1ca3e35fe652b2980098804e9bb5a03' },
      wrongText: 'Nichts passiert. Mindestens eine Markierung passt nicht.',
      hints: ['Lest jede Aussage einzeln. Bei welcher könntet ihr am Fossil selbst nachsehen, ob sie stimmt?',
              'Achtet auf ‚weil‘, ‚durch‘, ‚denn‘, ‚also‘. Was wird dort erklärt, was nur gesehen?',
              'T2 und T6 beschreiben, was man sieht. T1 und T8 sind Behauptungen ohne Beleg. Die übrigen vier erklären etwas.'],
      rescue: 'VDIgdW5kIFQ2IHNpbmQgQmVvYmFjaHR1bmdlbi4gVDMsIFQ0LCBUNSB1bmQgVDcgc2luZCBEZXV0dW5nZW4uIFQxIHVuZCBUOCBzaW5kIEJlaGF1cHR1bmdlbjogZWluZSBXZXJ0dW5nIHVuZCBlaW4gVmVyd2VpcyBhdWYgYW5kZXJlLCBhbSBGdW5kIG5pY2h0IHByw7xmYmFyLg==',
      rescueTask: 'Erklärt in eigenen Worten den Unterschied zwischen einer Beobachtung und einer Deutung an einem Beispiel aus dem Transkript.',
      onSolve: { text: 'Das Prüfpult geht an. Die Aussagen erscheinen getypt an der Sammelwand.',
        wall: [{ id: 'w-typen', title: 'Hallmanns Aussagen, getypt', tag: 'Ergebnis', kind: 'ergebnis',
          text: 'Beobachtung: T2, T6\nDeutung: T3, T4, T5, T7\nBehauptung: T1, T8' }], then: 'r1v3-1-frage' } },

    'r1v3-1-frage': { id: 'r1v3-1-frage', type: 'freetext', minLength: 40, title: 'Eure Frage',
      ref: { title: 'Zum Nachschlagen: A1 · Hallmanns Vortrag', docs: ['a1'] },
      prompt: 'Formuliert eine Frage, mit der ihr Hallmanns Erklärung überprüfen könnt.\n\nHallmann erklärt in T3 bis T5, wie die Federn entstanden sein sollen.',
      placeholder: 'Unsere Frage: …',
      checks: ['Die Frage steht im Feld.', 'Die Frage steht im Logbuch.'],
      hints: ['Eine prüfbare Frage lässt sich mit einer Beobachtung oder einem Versuch beantworten.',
              'Worauf bezieht sich eure Frage: auf Hallmann als Person, auf den Preis, auf das Alter oder auf die Erklärung in T3 bis T5?',
              'Zwei Dinge lassen sich prüfen: ob die Jungen weitergeben, was die Eltern erwerben, und ob die Erklärung zu Beobachtungen passt.'],
      onSolve: { wall: [{ id: 'w-frage', title: 'Unsere Frage', tag: 'Eigener Text', kind: 'ergebnis', answer: 'r1v3-1-frage' }], then: 'r1v3-1-pruefen' } },

    'r1v3-1-pruefen': { id: 'r1v3-1-pruefen', type: 'pick', count: 2, title: 'Fragen wählen',
      prompt: 'Wählt die zwei Fragen, die sich mit Beobachtungen oder Versuchen prüfen lassen und zu T3 bis T5 gehören.\n\nAuf dem Prüfpult liegen fünf Fragen.',
      cards: [
        { id: 'f1', tag: 'F1', label: 'Ist Hallmann ein ehrlicher Mensch?' },
        { id: 'f2', tag: 'F2', label: 'Werden Veränderungen, die ein Tier durch häufigen Gebrauch erwirbt, an seine Jungen weitergegeben?' },
        { id: 'f3', tag: 'F3', label: 'Wie viel Geld ist der Berolinavis wert?' },
        { id: 'f4', tag: 'F4', label: 'Wie alt ist der Berolinavis?' },
        { id: 'f5', tag: 'F5', label: 'Stimmen Beobachtungen und Versuche mit Hallmanns Erklärung überein?' }
      ],
      hash: '019be6babc7242078a26592fd43fa5c9e5dff6b4e6ddc2d6e2470fecbb8b8a57',
      wrongText: 'Nichts passiert. Nicht jede Frage lässt sich mit Beobachtungen beantworten. Und nicht jede gehört zu dieser Erklärung.',
      hints: ['Welche Fragen könnt ihr nicht messen?',
              'Worauf bezieht sich die Frage: Person, Preis, Alter oder die Erklärung?',
              'Zwei Fragen fragen nach der Erklärung selbst: nach der Weitergabe und nach dem Vergleich mit Beobachtungen.'],
      rescue: 'RGllIEZyYWdlbiBGMiB1bmQgRjUgZ2Vow7ZyZW4genVyIEVya2zDpHJ1bmcgdW5kIGxhc3NlbiBzaWNoIHByw7xmZW4uIEYxIHVuZCBGMyBzaW5kIG5pY2h0IG1lc3NiYXIuIEY0IGlzdCBwcsO8ZmJhciwgYmV0cmlmZnQgYWJlciBkYXMgQWx0ZXIgdW5kIG5pY2h0IGRpZSBFcmtsw6RydW5nLg==',
      rescueTask: 'Schreibt in eigenen Worten, warum ‚Wie alt ist der Berolinavis?‘ eine gute Frage ist, aber nicht zu Hallmanns Erklärung passt.',
      onSolve: { message: { from: 'wendt', text: 'Gut. Eine Frage ist der Anfang jeder Untersuchung. Jetzt braucht ihr das Modell dahinter.\n\n– J. W.' },
        message2: { from: 'kemal', text: 'Vergleicht eure Frage mit diesen beiden. Welche passt am besten?' } } },

    'z1v3-quelle': { id: 'z1v3-quelle', type: 'freetext', minLength: 60, title: 'Stimmt T8? (Zusatzaufgabe)',
      ref: { title: 'Zum Nachschlagen: T8, Wendts Nachricht, Deckblatt des Gutachtens', docs: ['a1', 'a2', 'x4'] },
      prompt: 'Nennt zwei Möglichkeiten, wie ihr herausfinden könntet, ob T8 („Das Museum hat den Fund geprüft und bestätigt“) stimmt.',
      placeholder: 'Wir könnten …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Beide, T8 und Wendt, sind nur Aussagen.', 'Was würde ein Gutachten tragen, das echt ist?', 'Verfasser, Datum und Unterschrift prüfen oder nachfragen.'],
      onSolve: { vars: { gutachten_offen: true }, message: { from: 'kemal', text: 'Gute Frage. Ich schaue im Archiv nach dem Gutachten.' } } },

    /* ---------------- Mission 1.2 ---------------- */
    'r1v3-2-modell': { id: 'r1v3-2-modell', type: 'assign', title: 'Die Annahmen hinter Hallmanns Erklärung',
      ref: { title: 'Zum Nachschlagen: M1 · Lamarck', docs: ['m1'] },
      prompt: 'Ordnet jede Karte der Annahme zu, die dahintersteckt, oder dem Feld ‚keine Annahme‘.\n\nHallmanns Erklärung besteht aus mehreren Aussagen.',
      cards: [
        { id: 't3', label: 'T3 · „Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.“' },
        { id: 't4', label: 'T4 · „Durch dieses Training wuchsen ihnen Federn.“' },
        { id: 't5', label: 'T5 · „Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.“' },
        { id: 't6', label: 'T6 · „Die Krallen an seinen Armen sind stark abgenutzt.“' },
        { id: 't7', label: 'T7 · „Diese Tiere haben ihre Arme also ständig benutzt.“' }
      ],
      targets: [{ id: 'l1', label: 'L1 · Bedürfnisse' }, { id: 'l2', label: 'L2 · Gebrauch' }, { id: 'l3', label: 'L3 · Vererbung' }, { id: 'keine', label: 'keine Annahme: nur eine Beobachtung' }],
      hash: '4e9b2706b82afcedda2d5f356f54a2f6dff387c7cd6df2fa16bc4b182eeaf4dd',
      wrongText: 'Nichts passiert. Die drei Annahmen betreffen verschiedene Schritte: Was Tiere brauchen, was sie tun, was sie weitergeben.',
      hints: ['Lest L1 bis L3. Was ist bei jeder Annahme das Schlüsselwort?',
              'Bei welcher Karte geht es um das, was das Tier will, bei welcher um das, was es tut, bei welcher um die Jungen? Und welche beschreibt nur, was man sieht?',
              'T3 handelt vom Wollen, T4 und T7 vom Gebrauch, T5 von den Jungen. T6 ist eine Beobachtung.'],
      rescue: 'VDMgZ2Vow7ZydCB6dSBMMSAoQmVkw7xyZm5pcykuIFQ0IHVuZCBUNyBnZWjDtnJlbiB6dSBMMiAoR2VicmF1Y2gpLiBUNSBnZWjDtnJ0IHp1IEwzIChWZXJlcmJ1bmcpLiBUNiBpc3QgZWluZSBCZW9iYWNodHVuZyB1bmQgc3RlaHQgZsO8ciBrZWluZSBBbm5haG1lLg==',
      rescueTask: 'Beschreibt in eigenen Worten, welche drei Annahmen Hallmanns Erklärung enthält.',
      onSolve: { text: 'Die drei Auszüge leuchten nacheinander auf dem Pult auf.', then: 'r1v3-2-kette' } },

    'r1v3-2-kette': { id: 'r1v3-2-kette', type: 'net', title: 'Lamarcks Wirkungskette',
      prompt: 'Verbindet die Schritte nach Lamarck zu einer Wirkungskette. Ein Pfeil zeigt, was woraus folgt.',
      items: [
        { id: 'k1', tag: 'K1', label: 'Die Umwelt ändert sich.' },
        { id: 'k2', tag: 'K2', label: 'Das Tier hat ein neues Bedürfnis.' },
        { id: 'k3', tag: 'K3', label: 'Das Tier gebraucht ein Organ häufiger.' },
        { id: 'k4', tag: 'K4', label: 'Das Organ verändert sich.' },
        { id: 'k5', tag: 'K5', label: 'Die Veränderung wird an die Nachkommen vererbt.' },
        { id: 'k6', tag: 'K6', label: 'Das Tier entscheidet bewusst, sich zu verändern.' }
      ],
      slots: [[20, 16], [50, 16], [80, 16], [20, 80], [50, 80], [80, 80]], height: 400,
      minEdges: 4, edgeCount: 4,
      edgeHash: ['9da31f17cb94ec370b9836a2459a00edd1b1cf997c8b760707e94f4a928eae0b', '1a295ee1da9e8f6e4844af5bded4b80b227faf4b9d44daf15aec1f43ec6e0b05', '2b0e8f38f873d35083e1159394e9af9dd460982ac8dcf7b5066c0c0c9eceb287', '50aa692091e21bd257d28b0f05bec7024f55702e32d802cab8adebd02e2828c6'],
      hash: '4b359d7ce7f964df2f8b3049b4acf84d9225441115b5caf7c72ee6b0bd797da8',
      wrongText: 'Nichts passiert. Fragt euch bei jedem Pfeil: Muss der erste Schritt da sein, damit der zweite überhaupt passieren kann?',
      hints: ['Beginnt mit dem, was von außen kommt.',
              'Was muss ein Tier haben, bevor es ein Organ häufiger benutzt?',
              'Umwelt, Bedürfnis, Gebrauch, Veränderung, Vererbung. Eine Karte gehört nicht dazu.'],
      rescue: 'RGllIEtldHRlIG5hY2ggTGFtYXJjazogRGllIFVtd2VsdCDDpG5kZXJ0IHNpY2guIERhZHVyY2ggaGF0IGRhcyBUaWVyIGVpbiBuZXVlcyBCZWTDvHJmbmlzLiBFcyBnZWJyYXVjaHQgZWluIE9yZ2FuIGjDpHVmaWdlci4gRGFzIE9yZ2FuIHZlcsOkbmRlcnQgc2ljaC4gRGllIFZlcsOkbmRlcnVuZyB3aXJkIGFuIGRpZSBOYWNoa29tbWVuIHZlcmVyYnQuIERpZSBLYXJ0ZSDigJ5EYXMgVGllciBlbnRzY2hlaWRldCBiZXd1c3N04oCcIGdlaMO2cnQgbmljaHQgZGF6dS4=',
      rescueTask: 'Zeichnet die fünf Kästchen mit Pfeilen ins Logbuch.',
      onSolve: { text: 'Die Kette hängt als Modellskizze an der Wand.',
        wall: [{ id: 'w-lamarck-kette', title: 'Lamarcks Wirkungskette', tag: 'Ergebnis', kind: 'ergebnis',
          text: 'Die Umwelt ändert sich → Das Tier hat ein neues Bedürfnis → Das Tier gebraucht ein Organ häufiger → Das Organ verändert sich → Die Veränderung wird an die Nachkommen vererbt.' }], then: 'r1v3-2-vorhersage' } },

    'r1v3-2-vorhersage': { id: 'r1v3-2-vorhersage', type: 'pick', count: 2, title: 'Vorhersagen aus dem Modell',
      ref: { title: 'Zum Nachschlagen: M1 · Lamarck', docs: ['m1'] },
      prompt: 'Wählt die zwei Sätze, die zwingend aus L1 bis L3 folgen.\n\nEin Modell macht Vorhersagen, die man prüfen kann.',
      cards: [
        { id: 'v1', tag: 'V1', label: 'Wenn Tiere ein Organ stark trainieren, dann müssten ihre Jungen schon bei der Geburt ein kräftigeres Organ haben.' },
        { id: 'v2', tag: 'V2', label: 'Wenn Eltern eine Veränderung erwerben, dann müssten ihre Jungen diese Veränderung zeigen.' },
        { id: 'v3', tag: 'V3', label: 'Wenn sich die Umwelt ändert, dann bekommen alle Tiere sofort neue Merkmale.' },
        { id: 'v4', tag: 'V4', label: 'Wenn mehr Junge geboren werden, überleben mehr von ihnen.' },
        { id: 'v5', tag: 'V5', label: 'Wenn Tiere unterschiedlich stark sind, überleben die stärkeren.' },
        { id: 'v6', tag: 'V6', label: 'Wenn Hallmann recht hat, ist der Berolinavis echt.' }
      ],
      hash: '3b29443b81592b2debdb6fae5e0867162a5748c543bb2dec44a44890cb1b1fef',
      wrongText: 'Nichts passiert. Eine Vorhersage muss sich aus dem Modell ergeben, nicht aus dem, was ihr sonst zu wissen glaubt.',
      hints: ['Streicht alles, was in L1 bis L3 gar nicht vorkommt.',
              'Welche Annahme betrifft die Jungen? Was müsste man dann bei den Jungen sehen?',
              'V1 und V2 folgen aus L2 und L3. Die anderen kommen in Lamarcks Modell gar nicht vor.'],
      rescue: 'VjEgdW5kIFYyIGZvbGdlbiBhdXMgZGVtIE1vZGVsbDogV2VubiBlcndvcmJlbmUgVmVyw6RuZGVydW5nZW4gdmVyZXJidCB3ZXJkZW4sIG3DvHNzdGVuIGRpZSBKdW5nZW4gc2llIHplaWdlbi4gVjQgdW5kIFY1IGtvbW1lbiBpbSBNb2RlbGwgbmljaHQgdm9yLCBWMyDDvGJlcmRlaG50IGVzLCBWNiB2ZXJtaXNjaHQgRXJrbMOkcnVuZyB1bmQgRWNodGhlaXQu',
      rescueTask: 'Schreibt V1 und V2 als Wenn-dann-Sätze mit euren eigenen Worten auf.',
      onSolve: { wall: [
          { id: 'w-v1', title: 'Vorhersage V1', tag: 'Ergebnis', kind: 'ergebnis', text: 'Wenn Tiere ein Organ stark trainieren, dann müssten ihre Jungen schon bei der Geburt ein kräftigeres Organ haben.' },
          { id: 'w-v2', title: 'Vorhersage V2', tag: 'Ergebnis', kind: 'ergebnis', text: 'Wenn Eltern eine Veränderung erwerben, dann müssten ihre Jungen diese Veränderung zeigen.' } ],
        message: { from: 'kemal', text: 'Im Archiv liegen zwei Versuche. Vielleicht kann man eure Vorhersagen damit prüfen.' } } },

    'z1v3-giraffe': { id: 'z1v3-giraffe', type: 'freetext', minLength: 60, title: 'Beweist die Giraffe Lamarck? (Zusatzaufgabe)',
      ref: { title: 'Zum Nachschlagen: Giraffenskelett', docs: ['x1'] },
      prompt: 'Beurteilt die Aussage „Der lange Hals der Giraffe beweist Lamarck“ mit dem Text am Giraffenskelett.',
      placeholder: 'Die Aussage …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Lest den Text am Skelett.', 'Was braucht ein Beleg, was ein Beispiel nicht hat?', 'Eine ungeklärte Frage kann kein Beweis sein.'] },

    /* ---------------- Mission 1.3 ---------------- */
    'r1v3-3-laufrad': { id: 'r1v3-3-laufrad', type: 'sim', model: 'laufrad', title: 'Das Laufrad-Experiment',
      prompt: 'Führt den Versuch mit und ohne Training der Eltern durch, je Bedingung mindestens zwei Läufe.\n\nDas Laufrad-Experiment steht auf dem Tisch.',
      controls: [
        { id: 'training', label: 'Training der Eltern', short: 'Training', options: [{ id: 'aus', label: 'aus' }, { id: 'taeglich', label: 'täglich im Laufrad' }] },
        { id: 'maeuse', label: 'Mäuse je Gruppe', short: 'Mäuse', def: '20', options: [{ id: '10', label: '10' }, { id: '20', label: '20' }, { id: '40', label: '40' }] },
        { id: 'gen', label: 'Generationen', short: 'Generationen', def: '5', options: [{ id: '1', label: '1' }, { id: '2', label: '2' }, { id: '3', label: '3' }, { id: '4', label: '4' }, { id: '5', label: '5' }] }
      ],
      need: { min: 4, per: { control: 'training', min: 2 } },
      /* ENTWURF: Hinweise rund um die Simulation */
      startText: 'Stellt die Regler ein und startet den Versuch. Gemessen wird die Beinmuskulatur der Jungtiere, bevor sie selbst trainieren (Index, Gruppe ohne Training im Mittel 100).',
      dataNote: 'Spieldaten: für das Spiel erzeugt.',
      cardTag: 'Datenkarte (Spieldaten)',
      needText: 'Speichert zuerst vier Läufe, je zwei mit und ohne Training der Eltern.',
      button: 'Versuch abschließen',
      hints: ['Stellt den Regler „Training der Eltern“ ein, startet den Versuch und speichert den Lauf. Dann das Gleiche mit der anderen Einstellung.',
              'Ihr braucht vier gespeicherte Läufe: zwei ohne und zwei mit Training der Eltern.',
              'Training aus: starten, speichern, noch einmal. Dann Training täglich: starten, speichern, noch einmal.'],
      rescue: 'SWNoIGhhYmUgZGVuIFZlcnN1Y2ggdmllcm1hbCBmw7xyIGV1Y2ggbGF1ZmVuIGxhc3NlbiwgendlaW1hbCBvaG5lIHVuZCB6d2VpbWFsIG1pdCBUcmFpbmluZyBkZXIgRWx0ZXJuLiBEaWUgRGF0ZW5rYXJ0ZW4gaMOkbmdlbiBhbiBkZXIgU2FtbWVsd2FuZC4=',
      rescueTask: 'Schreibt die Mittelwerte eurer Läufe als kleine Tabelle ins Logbuch.',
      onSolve: { then: 'r1v3-3-laufrad-aussage' } },

    'r1v3-3-laufrad-aussage': { id: 'r1v3-3-laufrad-aussage', type: 'pick', count: 1, title: 'Was zeigen eure Läufe?',
      prompt: 'Wählt die Aussage, die für alle eure Läufe zutrifft.',
      cards: [
        { id: 'a', label: 'Die Jungtiere trainierter Eltern haben immer die stärkeren Beine.' },
        { id: 'b', label: 'Die Mittelwerte beider Gruppen liegen nah beieinander, auch wenn eine Gruppe mal knapp vorn liegt.' },
        { id: 'c', label: 'Mäuse vererben überhaupt nichts.' },
        { id: 'd', label: 'Der Versuch zeigt, dass Training nutzlos ist.' }
      ],
      hash: '04ef4bf505890460430aa878d4f8e134396d182c5697998e784afb9933eeae70',
      wrongText: 'Nichts passiert. Vergleicht eure gespeicherten Läufe an der Sammelwand noch einmal.',   /* ENTWURF */
      hints: ['Vergleicht alle gespeicherten Läufe, nicht nur einen.', 'Welche Gruppe liegt vorn: immer dieselbe?', 'Der Unterschied ist kleiner als die Streuung innerhalb der Gruppen.'],
      rescue: 'RGllIE1pdHRlbHdlcnRlIGJlaWRlciBHcnVwcGVuIGxpZWdlbiBuYWggYmVpZWluYW5kZXIuIE1hbCBsaWVndCBkaWUgZWluZSwgbWFsIGRpZSBhbmRlcmUgR3J1cHBlIGtuYXBwIHZvcm4uIERlciBVbnRlcnNjaGllZCBpc3Qga2xlaW5lciBhbHMgZGllIFN0cmV1dW5nIGlubmVyaGFsYiBkZXIgR3J1cHBlbi4=',
      rescueTask: 'Schreibt in einem Satz auf, was eure Läufe zeigen.',   /* ENTWURF */
      onSolve: { then: 'r1v3-3-einspruch' } },

    'r1v3-3-einspruch': { id: 'r1v3-3-einspruch', type: 'einspruch', title: 'Einspruch',
      prompt: 'Legt gegen Hallmanns Aussage T5 Einspruch ein: Wählt Belege von der Sammelwand und begründet, was sie zeigen und warum das gegen T5 reicht.\n\nIhr habt zwei Vorhersagen aus Lamarcks Modell.',
      statements: [
        { id: 'T3', tag: 'T3', label: 'Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.' },
        { id: 'T4', tag: 'T4', label: 'Durch dieses Training wuchsen ihnen Federn.' },
        { id: 'T5', tag: 'T5', label: 'Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.' },
        { id: 'T7', tag: 'T7', label: 'Diese Tiere haben ihre Arme also ständig benutzt.' }
      ],
      evidenceTitle: '2 · Belege von der Sammelwand lesen und höchstens zwei vorlegen',
      evidencePool: [
        { id: 'B1', needs: 'b1', title: 'B1 · Weismann: Mäuseschwänze', text: 'Ab 1887 schneidet der Biologe August Weismann weißen Mäusen den Schwanz ab. Die Mäuse bekommen Junge. Auch diesen Jungen und allen folgenden Generationen wird der Schwanz abgeschnitten. Das geschieht über 22 Generationen. Ergebnis: Alle Jungen werden mit vollständigem Schwanz geboren.' },
        { id: 'B2', needs: 'solved:r1v3-3-laufrad', sim: 'r1v3-3-laufrad', title: 'B2 · Eure Läufe am Laufrad (Spieldaten)', text: 'Gemessen wurde die Beinmuskulatur der Jungtiere, bevor sie selbst trainieren.' },
        { id: 'B3', needs: 'b3', title: 'B3 · Taubenzucht', text: 'Alle Taubenrassen, zum Beispiel Pfautaube und Kropftaube, stammen von der wilden Felsentaube ab. Züchter wählen aus jeder Generation die Tiere mit dem gewünschten Merkmal aus und paaren nur diese. Nach vielen Generationen sind die Rassen deutlich verschieden.' },
        { id: 'B4', needs: 'b4', title: 'B4 · Kabeljau', text: 'Ein Kabeljau-Weibchen legt pro Jahr Hunderttausende bis mehrere Millionen Eier. Trotzdem wächst der Bestand nicht ins Unendliche. Die meisten Jungtiere sterben, bevor sie sich fortpflanzen.' },
        { id: 'X1', needs: 'x1', title: 'Giraffenskelett', text: 'Ein Giraffenskelett. Lamarck benutzte den Giraffenhals als Beispiel. Warum die Giraffe ihren langen Hals bekommen hat, ist bis heute nicht abschließend geklärt.' },
        { id: 'X2', needs: 'x2', title: 'Auktionskatalog', text: 'Los 1: „Berolinavis“. Fundort laut Katalog: Grube Nordhang. Alter laut Katalog: etwa 150 Millionen Jahre. Schätzpreis: 2,4 Millionen Euro.' },
        { id: 'X3', needs: 'x3', title: 'Einladung zur Versteigerung', text: 'Versteigerung des Berolinavis am kommenden Samstag, 20 Uhr, im Großen Saal.' },
        { id: 'X4', needs: 'x4', title: 'Deckblatt des Museumsgutachtens', text: 'Ein Deckblatt: „Gutachten zum Fund Berolinavis“. Der Inhalt ist nicht lesbar.' },
        { id: 'X5', needs: 'x5', title: 'Wandtafel', text: '„Gebrauch macht stark“, ohne Quelle.' }
      ],
      slotA: { label: 'Was zeigen die Belege?', options: [
        { id: 'a1', label: 'In beiden Versuchen erben die Jungen keine Veränderung ihrer Eltern, weder Verletzung noch Trainingseffekt.' },
        { id: 'a2', label: 'Der Laufradversuch zeigt: Das Training der Eltern verändert die Jungtiere nicht.' },
        { id: 'a3', label: 'Beide Versuche zeigen, dass Mäuse besonders wenig vererben.' },
        { id: 'a4', label: 'Die Versuche zeigen, dass sich Tiere nicht verändern können.' } ] },
      slotB: { label: 'Warum reicht das gegen T5?', options: [
        { id: 'b1', label: 'Lamarcks Modell soll für alle Tiere gelten. Ein Fall, in dem es nicht zutrifft, genügt, um das zu widerlegen.' },
        { id: 'b2', label: 'Mäuse sind Tiere wie alle anderen, also gilt das Ergebnis auch für Vögel.' },
        { id: 'b3', label: 'Zwei Versuche sind mehr als einer.' },
        { id: 'b4', label: 'Hallmann hat keinen Beleg genannt.' } ] },
      hash: ['3228034f9eb44ec0dd7aec91d47aeee45f4a381a01ab687e280a1548cb624f58', '9f82c0d8818e4323e07689e0340a05afbb0134898e56c5b41e5414f221056d4f', '4b8e05d120acd3a9180e3bd8932563d9102a25b1c03e94321d668823226a19b4'],
      konter: [
        { id: 'k-andere-aussage', notSt: 'T5', from: 'kemal', text: 'Gegen diese Aussage sprechen die Belege nicht direkt. Welche Aussage handelt davon, was an die Jungen weitergegeben wird?', status: 'Die Aussage steht noch.' },
        { id: 'k-ablenker', evOnly: ['B3', 'B4', 'X1', 'X2', 'X3', 'X4', 'X5'], from: 'kemal', text: 'Das erklärt etwas anderes.', status: 'Der Einspruch reicht noch nicht.' },
        { id: 'K4', a: ['a3', 'a4'], from: 'kemal', text: 'So steht das nicht in den Daten.', status: 'Der Einspruch reicht noch nicht.' },
        { id: 'K3', b: ['b3', 'b4'], from: 'hallmann', text: 'Zwei Versuche mit Mäusen. Ich kenne hundert Sammler, die anders denken.', status: 'Hallmann pariert. Seine Antwort ist selbst nur eine Behauptung.' },
        { id: 'K2', b: 'b2', from: 'hallmann', text: 'Mäuse! Der Berolinavis ist ein Vogel. Was bei Mäusen gilt, muss bei meinem Tier nicht gelten.', status: 'Hallmann pariert. Die Aussage wackelt, ist aber nicht gekippt.' },
        { id: 'K1', ev: 'B1', from: 'hallmann', text: 'Ein abgeschnittener Schwanz ist keine Übung, meine Damen und Herren. Lamarck sprach vom Gebrauch, nicht vom Messer.', status: 'T5 wird angezweifelt, fällt aber nicht.' },
        { id: 'k-ein-beleg', ev: 'B2', a: 'a1', from: 'kemal', text: 'Ihr sagt „in beiden Versuchen“, legt aber nur einen Beleg vor.', status: 'Der Einspruch reicht noch nicht.' }
      ],
      defaultWrong: 'Das steht so noch nicht in den Belegen. Prüft, ob eure Begründung zu den vorgelegten Belegen passt.',
      hints: ['Lest B1 und seht euch eure Läufe an. Wovon hängt das Ergebnis ab: von einer Verletzung oder vom Gebrauch?',
              'Was hat Weismann genau getan, und was sagt Lamarcks Modell über Gebrauch? Passt der Versuch zur Vorhersage?',
              'B1 prüft Verletzungen, euer Laufrad prüft Training. Hallmann hat auf B1 eine gute Ausrede, auf das Laufrad nicht. Wenn ein Modell für alle Tiere gelten soll, genügt ein Gegenbeispiel.'],
      rescue: 'V2Vpc21hbm5zIFZlcnN1Y2ggKEIxKSBwcsO8ZnQgbnVyIFZlcmxldHp1bmdlbiwgZGFyYXVmIGhhdCBIYWxsbWFubiBlaW5lIEF1c3JlZGUuIEV1ZXIgTGF1ZnJhZHZlcnN1Y2ggKEIyKSBwcsO8ZnQgVHJhaW5pbmc6IERhcyBUcmFpbmluZyBkZXIgRWx0ZXJuIHZlcsOkbmRlcnQgZGllIEp1bmd0aWVyZSBuaWNodC4gV2VpbCBMYW1hcmNrcyBNb2RlbGwgZsO8ciBhbGxlIFRpZXJlIGdlbHRlbiBzb2xsLCBnZW7DvGd0IGVpbiBHZWdlbmJlaXNwaWVsLg==',
      rescueTask: 'Erklärt in eigenen Worten, was Weismanns Versuch zeigt und was er nicht zeigt.',
      onSolve: { message: { from: 'hallmann', text: 'Nun gut. Dann erklären Sie mir, wie die Federn entstanden sind.' },
        message2: { from: 'kemal', text: 'Die Aussage T5 ist durchgestrichen. Am Pult rechts wurde gerade ein Schloss entriegelt. Seht euch an, was dort liegt.' } } },

    'r1v3-3-kette': { id: 'r1v3-3-kette', type: 'net', title: 'Darwins Erklärung als Netz',
      ref: { title: 'Zum Nachschlagen: M2 · Darwin', docs: ['m2'] },
      prompt: 'Verbindet die Schritte von Darwins Erklärung. Ein Pfeil zeigt, was woraus folgt.\n\nHallmann fragt, wie die Federn stattdessen entstanden sind.',
      items: [
        { id: 'd1', tag: 'D1', label: 'Individuen einer Art unterscheiden sich in vielen Merkmalen.' },
        { id: 'd2', tag: 'D2', label: 'Es werden mehr Nachkommen geboren, als überleben können, sie konkurrieren um begrenzte Ressourcen.' },
        { id: 'd3', tag: 'D3', label: 'Individuen mit vorteilhaften Merkmalen überleben und pflanzen sich häufiger fort.' },
        { id: 'd4', tag: 'D4', label: 'Ein Teil der Unterschiede wird an die Nachkommen weitergegeben.' },
        { id: 'd5', tag: 'D5', label: 'Über viele Generationen wird das vorteilhafte Merkmal in der Population häufiger.' },
        { id: 'd6', tag: 'D6', label: 'Das Tier erwirbt ein Merkmal durch Gebrauch.' }
      ],
      slots: [[20, 15], [50, 15], [80, 15], [20, 82], [50, 82], [80, 82]], height: 440,
      minEdges: 4, edgeCount: 4,
      edgeHash: ['8b3ead883dfb66f92fd4255726f6f9016447113bec656015cf4cbbf55f767959', 'da58a606523936d1226e2cd958b431600fc1ded029d59797c404f165e41d8d72', 'e46f12c4a54db8eb3f02088e1aef295b93cbb59a05256a508777760d1aaf42dc', 'eade2cf6d236c6dc5e5b4b3cd22b5ab8dd4a7f5d8525723019a4105a6aca5d17'],
      hash: 'f3c21cfcaa3901dfda87fc419c1e5405f550e9ef46bd1b65143c4c68850c224a',
      wrongText: 'Nichts passiert. Fragt euch bei jedem Pfeil: Muss der erste Schritt da sein, damit der zweite überhaupt passieren kann?',
      hints: ['Was ist die Voraussetzung dafür, dass es überhaupt eine Auswahl gibt?',
              'Wählt die Natur aus, wenn alle Tiere gleich sind? Und wenn alle überleben?',
              'Unterschiede und zu viele Nachkommen führen beide zur Auslese. Dann folgen Weitergabe und Veränderung der Population.'],
      rescue: 'VW50ZXJzY2hpZWRlIChEMSkgdW5kIHp1IHZpZWxlIE5hY2hrb21tZW4gKEQyKSBmw7xocmVuIGJlaWRlIHp1ciBBdXNsZXNlIChEMykuIERhcmF1cyBmb2xndCBkaWUgV2VpdGVyZ2FiZSAoRDQpIHVuZCBkYXJhdXMgZGllIFZlcsOkbmRlcnVuZyBkZXIgUG9wdWxhdGlvbiAoRDUpLiBENiBnZWjDtnJ0IG5pY2h0IHp1IERhcndpbnMgRXJrbMOkcnVuZy4=',
      rescueTask: 'Zeichnet Darwins Netz mit fünf Kästchen und schreibt zu jedem einen Beleg oder ‚Beleg fehlt noch‘.',
      onSolve: { text: 'Das Netz hängt neben der Lamarck-Kette.',
        wall: [{ id: 'w-darwin-netz', title: 'Darwins Netz', tag: 'Ergebnis', kind: 'ergebnis', text: 'D1 → D3, D2 → D3, D3 → D4, D4 → D5' }],
        message: { from: 'kemal', text: 'Für Selektion in der Natur fehlt noch ein Beleg. Den suchen wir im Labor.' }, then: 'r1v3-3-belege' } },

    'r1v3-3-belege': { id: 'r1v3-3-belege', type: 'assign', title: 'Belege für Darwins Schritte',
      prompt: 'Ordnet jeden Beleg dem Schritt von Darwins Erklärung zu, den er stützt.',
      cards: [
        { id: 'b1', label: 'B1 · Weismann: Mäuseschwänze' },
        { id: 'b2', label: 'B2 · Eure Läufe am Laufrad' },
        { id: 'b3', label: 'B3 · Taubenzucht' },
        { id: 'b4', label: 'B4 · Kabeljau' }
      ],
      targets: [{ id: 'unterschiede', label: 'Unterschiede (D1)' }, { id: 'ueberproduktion', label: 'Überproduktion (D2)' }, { id: 'auslese', label: 'Auslese (D3)' }, { id: 'keiner', label: 'stützt keinen Schritt' }],
      hash: '6bb918a1a2235baea7e6f3d1b8b028a3210ed5f6b26a227dd5322f9d0b17fdf8',
      wrongText: 'Nichts passiert. Fragt euch bei jedem Beleg: Welchen Schritt zeigt er?',
      hints: ['Welcher Beleg zeigt, dass sich Tiere unterscheiden?', 'Wer wählt bei den Tauben aus: der Züchter oder die Natur?', 'B2 für die Unterschiede, B4 für die vielen Nachkommen, B3 für die Auslese. B1 prüfte Lamarck.'],
      rescue: 'QjIgemVpZ3QgVW50ZXJzY2hpZWRlIChkaWUgTMOkdWZlIHN0cmV1ZW4pLiBCNCB6ZWlndCDDnGJlcnByb2R1a3Rpb24uIEIzIHplaWd0IEF1c2xlc2UgZHVyY2ggWsO8Y2h0ZXIgYWxzIFZlcmdsZWljaCwgZGllIEF1c2xlc2UgaW4gZGVyIE5hdHVyIGtvbW10IGluIFJhdW0gMy4gQjEgc3TDvHR6dCBrZWluZW4gU2Nocml0dCwgV2Vpc21hbm4gcHLDvGZ0ZSBMYW1hcmNrLg==',
      rescueTask: 'Schreibt zu jedem Schritt von Darwins Erklärung einen Beleg oder „Beleg fehlt noch“ ins Logbuch.',   /* aus V2 */
      onSolve: { message: { from: 'kemal', text: 'Das Schloss am Prüfpult wartet auf euren Satz.' } } },   /* ENTWURF */

    'r1v3-3-schloss': { id: 'r1v3-3-schloss', type: 'cloze', triple: true, title: 'Schloss 1',
      prompt: 'Vervollständigt den Satz. Das Schloss verlangt einen gesicherten Satz aus Aussage, Beleg und Reichweite.',
      parts: [{ strong: 'Aussage: ' }, 'Die untersuchten Daten ', { gap: 'g1', label: 'Lücke 1' }, ' die Annahme, dass erworbene Veränderungen vererbt werden.', { nl: true },
        { strong: 'Beleg: ' }, { gap: 'g2', label: 'Lücke 2', block: true }, { nl: true },
        { strong: 'Reichweite: ' }, 'Über ', { gap: 'g3', label: 'Lücke 3' }, ' sagt das noch nichts.'],
      gaps: {
        g1: [{ id: 'a', label: 'stützen nicht' }, { id: 'b', label: 'beweisen' }, { id: 'c', label: 'stützen eindeutig' }, { id: 'd', label: 'stützen zum Teil' }],
        g2: [{ id: 'a', label: 'In den Versuchen zeigten die Nachkommen die Veränderung ihrer Eltern nicht.' }, { id: 'b', label: 'Hallmanns Broschüre nennt viele Sammler als Zeugen.' }, { id: 'c', label: 'Der Berolinavis ist sehr alt.' }, { id: 'd', label: 'Einige Versuche ließen sich nicht wiederholen.' }],
        g3: [{ id: 'a', label: 'die Echtheit des Berolinavis' }, { id: 'b', label: 'Lamarcks Lebenslauf' }, { id: 'c', label: 'die Fälschung, die damit bewiesen ist' }, { id: 'd', label: 'die Weitergabe von Trainingseffekten bei Mäusen' }]
      },
      tripleText: 'Das Schloss bleibt zu. Mindestens eine Lücke stimmt nicht. Lest den Satz laut und prüft jede Lücke einzeln.',
      traps: [
        { g: 'g3', v: 'c', from: 'kemal', text: 'Vorsicht. Das haben wir nicht gezeigt. Wir haben eine Erklärung geprüft, nicht den Fund.' },
        { g: 'g1', v: 'b', from: 'kemal', text: 'Zwei Versuche zeigen etwas. Beweisen ist ein großes Wort.' },
        { g: 'g2', v: 'b', from: 'kemal', text: 'Wie viele Leute etwas sagen, ist kein Befund.' }
      ],
      hash: '4d9ba8691d928df7811853d94d8f1dc9d07896fd5bfccc121477cfd626ae4254',
      hints: ['Lest den Satz laut. Was ist die Aussage, was der Beleg, was die Grenze?',
              'Was haben die Versuche gemessen? Und haben wir den Berolinavis untersucht?',
              'Die Daten stützen die Annahme nicht. Die Nachkommen zeigten die Veränderung nicht. Über den Fund wissen wir noch nichts.'],
      rescue: 'QXVzc2FnZTogRGllIHVudGVyc3VjaHRlbiBEYXRlbiBzdMO8dHplbiBkaWUgQW5uYWhtZSBuaWNodC4gQmVsZWc6IEluIGRlbiBWZXJzdWNoZW4gemVpZ3RlbiBkaWUgTmFjaGtvbW1lbiBkaWUgVmVyw6RuZGVydW5nIGlocmVyIEVsdGVybiBuaWNodC4gUmVpY2h3ZWl0ZTogw5xiZXIgZGllIEVjaHRoZWl0IGRlcyBCZXJvbGluYXZpcyBzYWd0IGRhcyBub2NoIG5pY2h0cy4=',
      rescueTask: 'Schreibt Aussage, Beleg und Reichweite in euren Worten ins Logbuch.',
      onSolve: {
        fx: 'lock', fxTitle: 'Schloss 1 geöffnet', fxText: 'Aussage, Beleg und Reichweite halten. Eure Prüfung hat standgehalten.',
        evidence: { id: 'ev-1', title: 'Beweisakte Teil 1 · Erklärung von Angepasstheit', text: 'Hallmanns Erklärung hält der Prüfung an Beobachtungen nicht stand. Über die Echtheit des Berolinavis sagt das nichts.' },
        message: { from: 'wendt', text: 'Gut geprüft. Merkt euch: Über den Fund selbst wissen wir noch nichts. Aber ihr habt eine Erklärung geprüft und nicht bloß geglaubt.\n\n– J. W.' },
        message2: { from: 'kemal', text: 'Hallmann verschickt eine neue Broschüre: ‚Er wollte fliegen, also wuchsen ihm Federn.‘ Ihr wisst jetzt, woran das scheitert.' } } },

    'z1v3-modellkritik': { id: 'z1v3-modellkritik', type: 'freetext', minLength: 60, title: 'Was Darwins Erklärung offenlässt (Zusatzaufgabe)',
      ref: { title: 'Zum Nachschlagen: M2 · Darwin', docs: ['m2'] },
      prompt: 'Formuliert eine Frage, die Darwins Erklärung nicht beantwortet.',
      placeholder: 'Unsere Frage: …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Welcher Schritt setzt etwas voraus, das nicht erklärt wird?', 'Schaut auf D1 und D4.', 'Wie entstehen Unterschiede, und wie werden sie weitergegeben?'],
      onSolve: { message: { from: 'kemal', text: 'Genau mit dieser Frage hat Dr. Wendt im Labor weitergearbeitet.' } } },

    'z1v3-population': { id: 'z1v3-population', type: 'freetext', minLength: 80, title: 'Die Population in zwei Modellen (Zusatzaufgabe)',
      ref: { title: 'Zum Nachschlagen: M1 und M2', docs: ['m1', 'm2'] },
      prompt: 'Vergleicht, wie sich eine Population nach Lamarck und nach Darwin verändert, in einem Satz.',
      placeholder: 'Nach Lamarck …, nach Darwin …',
      checks: ['Das Feld ist ausgefüllt.', 'Der Logbuch-Eintrag ist erstellt.'],
      hints: ['Vergleicht beide Ketten nebeneinander.', 'Wer verändert sich bei Lamarck, was verändert sich bei Darwin?', 'Lamarck: jedes Tier. Darwin: der Anteil in der Population.'],
      onSolve: { message: { from: 'kemal', text: 'Merkt euch diesen Unterschied. Im Labor seht ihr ihn in Zahlen.' } } }
  }
});
