/* Raum 1 · Der Streitsaal · Missionen 1.1 bis 1.3 (Stand 30.09.2026, Testfassung)
   Diese Datei wird aus raum1.src.js erzeugt. Lösungen stehen in raum1.js nur als Hash. */
TRESOR.room({
  base: '../',
  id: 'raum1',
  title: 'Der Streitsaal',
  subtitle: 'Raum 1 · Argumente prüfen',
  image: 'bilder/streitsaal.jpg',
  imageAlt: 'Ein holzgetäfelter Saal bei Nacht: links ein Pult mit aufgeschlagenem Buch, in der Mitte das Prüfpult mit grüner Lampe, rechts ein Pult mit verschnalltem Buch. Dahinter ein Tonbandgerät, ein Giraffenskelett und ein Archivregal.',
  size: [1024, 681],
  flashlight: false,
  unlockMode: 'auto',   /* 'auto' = ohne Code (Haken für das Do Now), 'code' = Lehrkraft nennt den Code */

  caseText: function (T) {
    var t = 'Dr. Johanna Wendt ist verschwunden. Der Händler Viktor Hallmann will den „Berolinavis“ versteigern und erklärt öffentlich, wie das Tier entstanden sein soll.\n\nIm Streitsaal prüft ihr diese Erklärung. Ob der Fund selbst echt ist, wisst ihr noch nicht.';
    if (T.isSolved('r1-1-fragetext')) t += '\n\nIhr habt herausgefunden, was Hallmann behauptet, und eine prüfbare Frage formuliert.';
    if (T.isSolved('r1-2-vorhersage')) t += '\n\nIhr kennt jetzt das Modell hinter seiner Erklärung und habt daraus Vorhersagen abgeleitet.';
    if (T.isSolved('r1-3-schloss')) t += '\n\nIhr habt die Erklärung an Versuchen geprüft. Sie hält nicht stand. Über den Fund selbst sagt das noch nichts.';
    return t;
  },

  missions: [
    { id: 'm1.1', title: 'Mission 1.1 · Die Behauptung', unlock: 'c1ca4d4ef8363a8ece79e862b9aaac8fca28c1589aa2e7ad4da0ce6a10ab8859',
      intro: { from: 'kemal', audio: 'audio/kemal-intro.mp3', text: 'Ich habe euch in den Streitsaal gelassen. Gestern Abend hat Hallmann hier vor Sammlern gesprochen. Die Saalanlage hat alles aufgezeichnet.\n\nHört zu, aber glaubt nicht alles, was ihr hört.',
        next: { from: 'wendt', audio: 'audio/wendt-nachricht.mp3', text: '… wenn ihr das hört, … [Rauschen] … Hallmann versteigert den Berolinavis. Ich habe einen Verdacht. Aber ein Verdacht ist keine Erkenntnis.\n\nPrüft zuerst, was er wirklich behauptet. Und trennt sauber, was er sieht und was er daraus macht. [Rauschen] … Vertraut Kemal.\n\n– J. W.' } },
      requires: ['r1-1-typen', 'r1-1-frage', 'r1-1-these', 'r1-1-fragetext'],
      doneTitle: 'Mission 1.1 abgeschlossen',
      doneText: 'Ihr habt geklärt, was Hallmann behauptet, und daraus eine Frage gemacht, die man prüfen kann.\n\nSchreibt jetzt euren Merksatz ins Logbuch, bevor ihr weitermacht.' },
    { id: 'm1.2', title: 'Mission 1.2 · Das Modell', unlock: '008411f3dcf16efb0042039016e35162bc504240d5feff1877767b23d5e63bab',
      intro: { from: 'kemal', text: 'Hinter jeder Erklärung steckt ein Modell. Am Lamarck-Pult links liegen Auszüge aus einer alten Schrift. Vergleicht sie mit dem, was Hallmann sagt.\n\nDer Text dort ist eine vereinfachte Fassung, kein Originalzitat.' },
      requires: ['r1-2-modell', 'r1-2-kette', 'r1-2-vorhersage'],
      doneTitle: 'Mission 1.2 abgeschlossen',
      doneText: 'Ihr kennt jetzt das Modell hinter Hallmanns Erklärung und habt daraus zwei Vorhersagen abgeleitet. Im Archivregal liegt eine Belegmappe.\n\nSchreibt jetzt euren Merksatz ins Logbuch.' },
    { id: 'm1.3', title: 'Mission 1.3 · Die Prüfung', unlock: 'dfa7c91ec416476ffc2101bb8f3d77321b6adda2990ad1d8ade0df2a4e2fea61',
      intro: { from: 'kemal', text: 'Heute prüft ihr Hallmanns Erklärung. Am Prüfpult könnt ihr Einspruch einlegen: Ihr sucht euch eine Aussage, legt Belege aus der Mappe vor und begründet, was sie zeigen und warum das reicht.\n\nHallmann hat auf jeden Beleg eine Antwort. Rechnet damit.' },
      requires: ['r1-3-einspruch', 'r1-3-kette', 'r1-3-belege', 'r1-3-schloss'],
      doneTitle: 'Schloss 1 geöffnet',
      doneText: 'Hallmanns Erklärung hält der Prüfung an Beobachtungen nicht stand. Über den Fund selbst wisst ihr damit noch nichts.\n\nSchreibt jetzt Aussage, Beleg und Reichweite in euer Logbuch.' }
  ],

  hotspots: [
    { id: 'aufzeichnung', label: 'Saalanlage mit Aufzeichnung', rect: [17, 31, 17.5, 24], action: { type: 'doc', doc: 'transkript' } },
    { id: 'portrait-links', label: 'Gemälde links', rect: [4.7, 12.5, 7.8, 29], action: { type: 'text', text: 'Das Gemälde zeigt einen Naturforscher des 19. Jahrhunderts. Sein Gesicht liegt im Schatten, ein Name ist nicht zu erkennen.\n\nIm Streitsaal wurde viel gestritten. Wer recht hatte, entschieden am Ende die Beobachtungen.' } },
    { id: 'portrait-rechts', label: 'Gemälde rechts', rect: [87.8, 12, 8, 30], action: { type: 'text', text: 'Noch ein Gemälde, noch ein Gesicht im Schatten. Hier hing man Bilder auf, nicht Beweise.' } },
    { id: 'giraffe', label: 'Giraffenskelett', rect: [38.5, 6, 22, 51], action: { type: 'text', text: 'Ein Giraffenskelett. Lamarck benutzte den Giraffenhals als Beispiel.\n\nWarum die Giraffe ihren langen Hals bekommen hat, ist bis heute nicht abschließend geklärt.' } },
    { id: 'regal', label: 'Archivregal mit Belegmappen', rect: [65.5, 24, 17.8, 37], states: [
      { if: { solved: 'r1-2-vorhersage' }, action: { type: 'docs', title: 'Belegmappe', docs: ['b1', 'b2', 'b3', 'b4'] } },
      { action: { type: 'text', text: 'Ein Regal mit Archivmappen. Noch findet ihr nichts, was ihr für eure Untersuchung braucht.' } } ] },

    { id: 'lamarck', label: 'Lamarck-Pult', rect: [6, 56.5, 22.5, 34], states: [
      { if: { unlocked: 'm1.2', notSolved: 'r1-2-modell' }, action: { type: 'puzzle', puzzle: 'r1-2-modell' } },
      { if: { unlocked: 'm1.2', notSolved: 'r1-2-kette' }, action: { type: 'puzzle', puzzle: 'r1-2-kette' } },
      { if: { unlocked: 'm1.2', solved: ['r1-2-modell', 'r1-2-kette'], notSolved: 'r1-2-vorhersage' }, action: { type: 'puzzle', puzzle: 'r1-2-vorhersage' } },
      { if: { unlocked: 'm1.2' }, action: { type: 'doc', doc: 'lamarck' } },
      { action: { type: 'text', text: 'Dieses Pult ist noch verschlossen. Die nächste Mission startet ihr über das Menü oder mit dem Knopf am Ende der Mission.' } } ] },

    { id: 'pruefpult', label: 'Prüfpult in der Mitte', rect: [36, 57, 28.5, 34], states: [
      { if: { unlocked: 'm1.1', notSolved: 'r1-1-typen' }, action: { type: 'puzzle', puzzle: 'r1-1-typen' } },
      { if: { unlocked: 'm1.1', notSolved: 'r1-1-frage' }, action: { type: 'puzzle', puzzle: 'r1-1-frage' } },
      { if: { unlocked: 'm1.1', notSolved: 'r1-1-these' }, action: { type: 'puzzle', puzzle: 'r1-1-these' } },
      { if: { unlocked: 'm1.1', notSolved: 'r1-1-fragetext' }, action: { type: 'puzzle', puzzle: 'r1-1-fragetext' } },
      { if: { unlocked: 'm1.3', solved: 'r1-2-vorhersage', notSolved: 'r1-3-einspruch' }, action: { type: 'puzzle', puzzle: 'r1-3-einspruch' } },
      { if: { unlocked: 'm1.3', solved: ['r1-3-einspruch', 'r1-3-kette', 'r1-3-belege'], notSolved: 'r1-3-schloss' }, action: { type: 'puzzle', puzzle: 'r1-3-schloss' } },
      { if: { unlocked: 'm1.3', solved: 'r1-3-einspruch', notSolved: ['r1-3-kette'] }, action: { type: 'text', text: 'Die Aussage T5 ist auf dem Prüfpult durchgestrichen. Am Darwin-Pult rechts leuchtet jetzt ein Licht.' } },
      { if: { unlocked: 'm1.3', solved: ['r1-3-einspruch', 'r1-3-kette'], notSolved: ['r1-3-belege'] }, action: { type: 'text', text: 'Am Darwin-Pult wartet noch die Zuordnung der Belege.' } },
      { if: { missionDone: 'm1.1', notSolved: 'r1-1-quelle' }, action: { type: 'puzzle', puzzle: 'r1-1-quelle' } },
      { if: { missionDone: 'm1.2', notSolved: 'r1-2-versuch' }, action: { type: 'puzzle', puzzle: 'r1-2-versuch' } },
      { action: { type: 'doc', doc: 'transkript' } } ] },

    { id: 'darwin', label: 'Darwin-Pult', rect: [71.5, 56.5, 22.5, 34], states: [
      { if: { unlocked: 'm1.3', solved: 'r1-3-einspruch', notSolved: 'r1-3-kette' }, action: { type: 'puzzle', puzzle: 'r1-3-kette' } },
      { if: { unlocked: 'm1.3', solved: ['r1-3-einspruch', 'r1-3-kette'], notSolved: 'r1-3-belege' }, action: { type: 'puzzle', puzzle: 'r1-3-belege' } },
      { if: { missionDone: 'm1.3', notSolved: 'r1-3-modellkritik' }, action: { type: 'puzzle', puzzle: 'r1-3-modellkritik' } },
      { if: { missionDone: 'm1.3', notSolved: 'r1-3-population' }, action: { type: 'puzzle', puzzle: 'r1-3-population' } },
      { if: { solved: 'r1-3-einspruch' }, action: { type: 'doc', doc: 'darwin' } },
      { action: { type: 'text', text: 'Das Darwin-Pult ist verschlossen. Erst muss die erste Erklärung geprüft werden.' } } ] }
  ],

  docs: {
    'transkript': { title: 'Aufzeichnung der Saalanlage', style: 'paper', audio: 'audio/hallmann-vortrag.mp3',
      text: 'Gestern Abend, Vortrag vor Sammlern. Sprecher: Viktor Hallmann.\n\nT1: „Der Berolinavis ist das bedeutendste Fossil des Jahrhunderts. Ich garantiere es.“\nT2: „Er trägt Federn an den Armen und einen langen Knochenschwanz.“\nT3: „Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.“\nT4: „Durch dieses Training wuchsen ihnen Federn.“\nT5: „Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.“\nT6: „Die Krallen an seinen Armen sind stark abgenutzt.“\nT7: „Diese Tiere haben ihre Arme also ständig benutzt.“\nT8: „Das Museum hat den Fund geprüft und bestätigt.“' },
    'lamarck': { title: 'Auszüge nach Lamarck (vereinfacht)', style: 'paper',
      text: 'Vereinfachte Fassung, sinngemäß, kein Originalzitat.\n\nL1: Ändert sich die Umwelt, ändern sich die Bedürfnisse der Tiere. Aus neuen Bedürfnissen entstehen neue Gewohnheiten.\nL2: Organe, die oft gebraucht werden, werden stärker und größer. Organe, die nicht gebraucht werden, bilden sich zurück.\nL3: Was ein Lebewesen im Lauf seines Lebens erwirbt, gibt es an seine Nachkommen weiter.' },
    'darwin': { title: 'Auszüge nach Darwin (vereinfacht)', style: 'paper',
      text: 'Vereinfachte Fassung, sinngemäß, kein Originalzitat.\n\nD1: Individuen einer Art unterscheiden sich in vielen Merkmalen (Variabilität).\nD2: Es werden mehr Nachkommen geboren, als überleben können. Die Nachkommen konkurrieren um begrenzte Ressourcen (Überproduktion, Konkurrenz).\nD3: Individuen mit vorteilhaften Merkmalen überleben und pflanzen sich häufiger fort (Selektion).\nD4: Ein Teil der Unterschiede wird an die Nachkommen weitergegeben (Vererbung).\nD5: Über viele Generationen wird das vorteilhafte Merkmal in der Population häufiger.' },
    'b1': { title: 'B1 · Versuchsprotokoll nach August Weismann (vereinfacht)', style: 'paper',
      text: 'Ab 1887 schneidet der Biologe August Weismann weißen Mäusen den Schwanz ab. Die Mäuse bekommen Junge. Auch diesen Jungen und allen folgenden Generationen wird der Schwanz abgeschnitten. Das geschieht über 22 Generationen.\n\nErgebnis: Alle Jungen werden mit vollständigem Schwanz geboren.' },
    'b2': { title: 'B2 · Zuchtversuch aus dem Universitätsarchiv (Spieldaten)', style: 'paper',
      text: 'Zwei Mäusegruppen. Gruppe T: Die Eltern laufen täglich im Laufrad. Gruppe K: Die Eltern trainieren nicht. Gemessen wird die Beinmuskulatur der Jungtiere. Die Jungtiere selbst haben nicht trainiert.\n\nAngegeben ist ein Index (Gruppe K, Generation 1 = 100): Mittelwert und (kleinster bis größter Wert). Die Daten sind für das Spiel erfunden (Spieldaten).',
      table: { head: ['Generation', 'Gruppe K (Eltern ohne Training)', 'Gruppe T (Eltern mit Training)'],
        rows: [['1', '100 (88–112)', '100 (89–112)'], ['2', '99 (87–111)', '101 (88–113)'], ['3', '100 (89–112)', '100 (88–111)'], ['4', '101 (88–113)', '99 (87–111)'], ['5', '100 (88–112)', '100 (89–113)']] } },
    'b3': { title: 'B3 · Taubenzucht', style: 'paper',
      text: 'Alle Taubenrassen, zum Beispiel Pfautaube und Kropftaube, stammen von der wilden Felsentaube ab. Züchter wählen aus jeder Generation die Tiere mit dem gewünschten Merkmal aus und paaren nur diese. Nach vielen Generationen sind die Rassen deutlich verschieden.' },
    'b4': { title: 'B4 · Kabeljau', style: 'paper',
      text: 'Ein Kabeljau-Weibchen legt pro Jahr Hunderttausende bis mehrere Millionen Eier. Trotzdem wächst der Bestand nicht ins Unendliche. Die meisten Jungtiere sterben, bevor sie sich fortpflanzen.' }
  },

  puzzles: {
    /* ---------------- Mission 1.1 ---------------- */
    'r1-1-typen': { id: 'r1-1-typen', type: 'assign', title: 'Hallmanns Aussagen sortieren',
      prompt: 'Die Saalanlage hat Hallmanns Vortrag aufgezeichnet. Ordnet jede Aussage einem Typ zu.\n\nBehauptung: Hallmann nennt keinen Beleg. Beobachtung: Man kann es am Fossil nachsehen. Deutung: Hallmann erklärt, warum etwas so ist.',
      cards: [
        { id: 't1', label: 'T1 · „Der Berolinavis ist das bedeutendste Fossil des Jahrhunderts. Ich garantiere es.“' },
        { id: 't2', label: 'T2 · „Er trägt Federn an den Armen und einen langen Knochenschwanz.“' },
        { id: 't3', label: 'T3 · „Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.“' },
        { id: 't4', label: 'T4 · „Durch dieses Training wuchsen ihnen Federn.“' },
        { id: 't5', label: 'T5 · „Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.“' },
        { id: 't6', label: 'T6 · „Die Krallen an seinen Armen sind stark abgenutzt.“' },
        { id: 't7', label: 'T7 · „Diese Tiere haben ihre Arme also ständig benutzt.“' },
        { id: 't8', label: 'T8 · „Das Museum hat den Fund geprüft und bestätigt.“' }
      ],
      targets: [{ id: 'behauptung', label: 'Behauptung' }, { id: 'beobachtung', label: 'Beobachtung' }, { id: 'deutung', label: 'Deutung' }],
      hash: 'db866e0145ded7142fd25e969c7499ac0ac80f93dd539b8826e854141e2e096c',
      wrongText: 'Nichts passiert. Bei mindestens einer Aussage hat Hallmann mehr behauptet, als er zeigen kann.',
      hints: ['Lest jede Aussage einzeln. Bei welcher könntet ihr am Fossil selbst nachsehen, ob sie stimmt?',
              'Achtet auf Wörter wie „weil“, „durch“, „denn“, „also“. Was wird dort erklärt, und was wird nur gesehen?',
              'T2 und T6 beschreiben, was man sieht. T1 und T8 sind Behauptungen ohne Beleg. Die übrigen vier erklären etwas.'],
      rescue: 'VDIgdW5kIFQ2IHNpbmQgQmVvYmFjaHR1bmdlbi4gVDMsIFQ0LCBUNSB1bmQgVDcgc2luZCBEZXV0dW5nZW4uIFQxIHVuZCBUOCBzaW5kIEJlaGF1cHR1bmdlbiBvaG5lIEJlbGVnLg==',
      rescueTask: 'Erklärt in eigenen Worten den Unterschied zwischen einer Beobachtung und einer Deutung an einem Beispiel aus dem Transkript.',
      onSolve: { text: 'Die Aufzeichnung erscheint auf dem Prüfpult, geordnet nach Typ. Die Deutungen sind mit Messing umrandet. Das Prüfpult summt leise.', then: 'r1-1-frage' } },

    'r1-1-frage': { id: 'r1-1-frage', type: 'pick', count: 2, title: 'Die richtigen Fragen', ref: { title: 'Zum Nachschlagen: Aufzeichnung', docs: ['transkript'] },
      prompt: 'Hallmann erklärt in T3 bis T5, wie die Federn entstanden sein sollen. Wählt die zwei Fragen aus, mit denen ihr diese Erklärung überprüfen könnt.',
      cards: [
        { id: 'f1', tag: 'F1', label: 'Ist Hallmann ein ehrlicher Mensch?' },
        { id: 'f2', tag: 'F2', label: 'Werden Veränderungen, die ein Tier durch häufigen Gebrauch erwirbt, an seine Jungen weitergegeben?' },
        { id: 'f3', tag: 'F3', label: 'Wie viel Geld ist der Berolinavis wert?' },
        { id: 'f4', tag: 'F4', label: 'Wie alt ist der Berolinavis?' },
        { id: 'f5', tag: 'F5', label: 'Stimmen Beobachtungen und Versuche mit Hallmanns Erklärung überein?' }
      ],
      hash: '360e83777c1ffa4ea51cc3d84dfd8a9aed1ad6ae7e99ee8f31386d72a28fca7b',
      wrongText: 'Nichts passiert. Nicht jede Frage lässt sich mit Beobachtungen beantworten. Und nicht jede gehört zu dieser Erklärung.',
      hints: ['Eine prüfbare Frage lässt sich mit einer Beobachtung oder einem Versuch beantworten. Welche Fragen könnt ihr nicht messen?',
              'Worauf bezieht sich die Frage: auf Hallmann als Person, auf den Preis, auf das Alter – oder auf die Erklärung in T3 bis T5?',
              'Zwei Fragen fragen nach der Erklärung selbst: eine nach der Weitergabe an die Jungen, eine nach dem Vergleich mit Beobachtungen und Versuchen.'],
      rescue: 'RGllIEZyYWdlbiBGMiB1bmQgRjUgZ2Vow7ZyZW4genVyIEVya2zDpHJ1bmcgdW5kIGxhc3NlbiBzaWNoIHByw7xmZW4uIEYxIHVuZCBGMyBzaW5kIG5pY2h0IG1lc3NiYXIuIEY0IGlzdCBwcsO8ZmJhciwgYmV0cmlmZnQgYWJlciBkYXMgQWx0ZXIgdW5kIG5pY2h0IGRpZSBFcmtsw6RydW5nLg==',
      rescueTask: 'Schreibt in eigenen Worten, warum „Wie alt ist der Berolinavis?“ eine gute Frage ist, aber nicht zu Hallmanns Erklärung passt.',
      onSolve: { then: 'r1-1-these' } },

    'r1-1-these': { id: 'r1-1-these', type: 'freetext', minLength: 40, title: 'Die These', ref: { title: 'Zum Nachschlagen: Aufzeichnung', docs: ['transkript'] },
      prompt: 'Vervollständigt den Satz: „Hallmann behauptet, dass …“\n\nNennt seine zentrale Erklärung in einem Satz.',
      placeholder: 'Hallmann behauptet, dass …',
      onSolve: { then: 'r1-1-fragetext' } },

    'r1-1-fragetext': { id: 'r1-1-fragetext', type: 'freetext', minLength: 40, title: 'Eure Untersuchungsfrage',
      ref: { title: 'Zum Nachschlagen: Aufzeichnung, eure These und die geprüften Fragen', docs: ['transkript'], answers: ['r1-1-these'],
        text: 'Diese zwei Fragen passen zu Hallmanns Erklärung:\nF2 · Werden Veränderungen, die ein Tier durch häufigen Gebrauch erwirbt, an seine Jungen weitergegeben?\nF5 · Stimmen Beobachtungen und Versuche mit Hallmanns Erklärung überein?' },
      prompt: 'Formuliert jetzt eure eigene Untersuchungsfrage zu Hallmanns Erklärung. Sie muss sich mit Beobachtungen oder Versuchen prüfen lassen.',
      placeholder: 'Unsere Untersuchungsfrage: …',
      onSolve: { items: [{ id: 'untersuchungsfrage', label: 'Untersuchungsfrage', text: 'Eure eigene Frage steht unter „Meine Antworten“ im Archiv.' }],
        message: { from: 'wendt', text: 'Gut. Eine Frage ist der Anfang jeder Untersuchung.\n\nJetzt braucht ihr das Modell dahinter.\n\n– J. W.' } } },

    'r1-1-quelle': { id: 'r1-1-quelle', type: 'freetext', minLength: 60, title: 'Zwei Aussagen im Vergleich (Bonus)',
      ref: { title: 'Zum Nachschlagen: Aufzeichnung und Wendts Nachricht', docs: ['transkript'],
        text: 'Dr. Wendts Nachricht (Auszug): „Hallmann versteigert den Berolinavis. Ich habe einen Verdacht. Aber ein Verdacht ist keine Erkenntnis. Prüft zuerst, was er wirklich behauptet.“' },
      prompt: 'Vergleicht T8 („Das Museum hat den Fund geprüft und bestätigt“) mit Dr. Wendts Nachricht. Beide sind nur Aussagen.\n\nNennt zwei Möglichkeiten, wie ihr herausfinden könntet, wer von beiden die Wahrheit sagt.',
      placeholder: 'Wir könnten …',
      onSolve: { message: { from: 'kemal', text: 'Gute Frage. Ich schaue im Archiv nach dem Gutachten.' } } },

    /* ---------------- Mission 1.2 ---------------- */
    'r1-2-modell': { id: 'r1-2-modell', type: 'assign', title: 'Die Annahmen hinter Hallmanns Erklärung',
      prompt: 'Hallmanns Erklärung besteht aus mehreren Deutungen. Sie beruhen auf Annahmen (Auszüge am Lamarck-Pult, vereinfachte Fassung).\n\nOrdnet jede Deutung der Annahme zu, die dahintersteckt.',
      cards: [
        { id: 'h3', label: 'T3 · „Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.“' },
        { id: 'h4', label: 'T4 · „Durch dieses Training wuchsen ihnen Federn.“' },
        { id: 'h5', label: 'T5 · „Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.“' },
        { id: 'h7', label: 'T7 · „Diese Tiere haben ihre Arme also ständig benutzt.“' }
      ],
      targets: [
        { id: 'l1', label: 'L1 · Ändert sich die Umwelt, ändern sich die Bedürfnisse der Tiere. Aus neuen Bedürfnissen entstehen neue Gewohnheiten.' },
        { id: 'l2', label: 'L2 · Organe, die oft gebraucht werden, werden stärker und größer. Organe, die nicht gebraucht werden, bilden sich zurück.' },
        { id: 'l3', label: 'L3 · Was ein Lebewesen im Lauf seines Lebens erwirbt, gibt es an seine Nachkommen weiter.' }
      ],
      hash: '71fd18a14e166c7b13237c129f9c2949a49ade5801052e81c4eaea3ec7889cac',
      wrongText: 'Nichts passiert. Die drei Annahmen betreffen verschiedene Schritte: Was Tiere brauchen, was sie tun, was sie weitergeben.',
      hints: ['Lest L1 bis L3. Was ist bei jeder Annahme das Schlüsselwort?',
              'Bei welcher Deutung geht es um das, was das Tier will? Bei welcher um das, was es tut? Bei welcher um die Jungen?',
              'T3 handelt vom Wollen (L1), T4 und T7 vom Gebrauch (L2), T5 von den Jungen (L3).'],
      rescue: 'VDMgZ2Vow7ZydCB6dSBMMSAoQmVkw7xyZm5pcykuIFQ0IHVuZCBUNyBnZWjDtnJlbiB6dSBMMiAoR2VicmF1Y2gpLiBUNSBnZWjDtnJ0IHp1IEwzIChWZXJlcmJ1bmcpLg==',
      rescueTask: 'Beschreibt in eigenen Worten, welche drei Annahmen Hallmanns Erklärung enthält.',
      onSolve: { docs: ['lamarck'], text: 'Auf dem Lamarck-Pult leuchten die drei Auszüge nacheinander auf.' } },

    'r1-2-kette': { id: 'r1-2-kette', type: 'order', title: 'Das Modell als Wirkungskette',
      prompt: 'Legt das Modell als Wirkungskette. Tippt die fünf Schritte in der Reihenfolge an, in der sie nach Lamarck ablaufen.',
      items: [
        { id: 'k1', label: 'Die Umwelt ändert sich.' }, { id: 'k2', label: 'Das Tier hat ein neues Bedürfnis.' },
        { id: 'k3', label: 'Das Tier gebraucht ein Organ häufiger.' }, { id: 'k4', label: 'Das Organ verändert sich.' },
        { id: 'k5', label: 'Die Veränderung wird an die Nachkommen vererbt.' }
      ],
      hash: '43ad0f4eba9013cb84b49bd2155c9662d2eed95be5aad47b217cc6526e516c22',
      wrongText: 'Nichts passiert. Was kommt zuerst: Das Tier ändert etwas, oder die Umwelt?',
      hints: ['Beginnt mit dem, was von außen kommt.', 'Was muss ein Tier haben, bevor es ein Organ häufiger benutzt?', 'Umwelt, Bedürfnis, Gebrauch, Veränderung, Vererbung.'],
      rescue: 'VW13ZWx0IMOkbmRlcnQgc2ljaCwgbmV1ZXMgQmVkw7xyZm5pcywgaMOkdWZpZ2VyZXIgR2VicmF1Y2gsIE9yZ2FuIHZlcsOkbmRlcnQgc2ljaCwgVmVyZXJidW5nIGFuIGRpZSBOYWNoa29tbWVuLg==',
      rescueTask: 'Zeichnet die fünf Kästchen mit Pfeilen ins Logbuch.',
      onSolve: { text: 'Die Kette erscheint als Modellskizze an der Wand.' } },

    'r1-2-vorhersage': { id: 'r1-2-vorhersage', type: 'pick', count: 2, title: 'Vorhersagen aus dem Modell',
      prompt: 'Ein Modell macht Vorhersagen, die man prüfen kann. Leitet aus Lamarcks Modell zwei Vorhersagen ab.\n\nWählt die zwei Sätze, die zwingend aus L1 bis L3 folgen.',
      cards: [
        { id: 'v1', tag: 'V1', label: 'Wenn Tiere ein Organ stark trainieren, dann müssten ihre Jungen schon bei der Geburt ein kräftigeres Organ haben.' },
        { id: 'v2', tag: 'V2', label: 'Wenn Eltern eine Veränderung erwerben, dann müssten ihre Jungen diese Veränderung zeigen.' },
        { id: 'v3', tag: 'V3', label: 'Wenn sich die Umwelt ändert, dann bekommen alle Tiere sofort neue Merkmale.' },
        { id: 'v4', tag: 'V4', label: 'Wenn mehr Junge geboren werden, überleben mehr von ihnen.' },
        { id: 'v5', tag: 'V5', label: 'Wenn Tiere unterschiedlich stark sind, überleben die stärkeren.' },
        { id: 'v6', tag: 'V6', label: 'Wenn Hallmann recht hat, ist der Berolinavis echt.' }
      ],
      hash: '1d177fc4de88ec4f5a3309267f0edcd80fed83de669c780a393137c7623360ad',
      wrongText: 'Nichts passiert. Eine Vorhersage muss sich aus dem Modell ergeben, nicht aus dem, was ihr sonst zu wissen glaubt.',
      hints: ['Eine Vorhersage folgt zwingend aus dem Modell. Streicht alles, was in L1 bis L3 gar nicht vorkommt.',
              'Welche Annahme betrifft die Jungen? Und was müsste man dann bei den Jungen sehen?',
              'V1 und V2 folgen aus L2 und L3. Die anderen kommen in Lamarcks Modell gar nicht vor.'],
      rescue: 'VjEgdW5kIFYyIGZvbGdlbiBhdXMgZGVtIE1vZGVsbDogV2VubiBlcndvcmJlbmUgVmVyw6RuZGVydW5nZW4gdmVyZXJidCB3ZXJkZW4sIG3DvHNzdGVuIGRpZSBKdW5nZW4gc2llIHplaWdlbi4gVjQgdW5kIFY1IGtvbW1lbiBpbSBNb2RlbGwgbmljaHQgdm9yLCBWMyDDvGJlcmRlaG50IGVzLCBWNiB2ZXJtaXNjaHQgRXJrbMOkcnVuZyB1bmQgRWNodGhlaXQu',
      rescueTask: 'Schreibt V1 und V2 als Wenn-dann-Sätze mit euren eigenen Worten auf.',
      onSolve: { items: [{ id: 'belegmappe', label: 'Belegmappe', text: 'Im Archivregal liegen vier Belege. Ihr braucht sie in Mission 1.3.' }],
        message: { from: 'kemal', text: 'Im Archiv liegen zwei Versuche. Vielleicht kann man eure Vorhersagen damit prüfen.\n\nDie Mappe steht im Regal rechts oben.' } } },

    'r1-2-versuch': { id: 'r1-2-versuch', type: 'freetext', minLength: 80, title: 'Einen Versuch planen (Bonus)',
      ref: { title: 'Zum Nachschlagen: Lamarcks Modell und die Vorhersage V1', docs: ['lamarck'],
        text: 'V1: Wenn Tiere ein Organ stark trainieren, dann müssten ihre Jungen schon bei der Geburt ein kräftigeres Organ haben.' },
      prompt: 'Skizziert einen Versuch, mit dem ihr V1 prüfen könntet: Welche Gruppen vergleicht ihr, was messt ihr, wie viele Generationen braucht ihr?',
      placeholder: 'Wir würden zwei Gruppen vergleichen …' },

    /* ---------------- Mission 1.3 ---------------- */
    'r1-3-einspruch': { id: 'r1-3-einspruch', type: 'einspruch', title: 'Einspruch',
      prompt: 'Ihr habt zwei Vorhersagen aus Lamarcks Modell. Legt Einspruch gegen Hallmanns Aussage T5 ein: Wählt Belege aus der Mappe und begründet, was sie zeigen und warum das gegen T5 reicht.\n\nHallmann antwortet auf jeden Einspruch. Ihr könnt es mehrmals versuchen.',
      statements: [
        { id: 'T3', tag: 'T3', label: 'Weil seine Vorfahren fliegen wollten, streckten sie die Arme immer wieder aus.' },
        { id: 'T4', tag: 'T4', label: 'Durch dieses Training wuchsen ihnen Federn.' },
        { id: 'T5', tag: 'T5', label: 'Ihre Jungen erbten die Federn, denn was ein Tier sich erarbeitet, wird weitergegeben.' },
        { id: 'T7', tag: 'T7', label: 'Diese Tiere haben ihre Arme also ständig benutzt.' }
      ],
      evidence: [
        { id: 'B1', title: 'B1 · Weismann: Mäuseschwänze', text: 'Ab 1887 schneidet der Biologe August Weismann weißen Mäusen den Schwanz ab. Die Mäuse bekommen Junge. Auch diesen Jungen und allen folgenden Generationen wird der Schwanz abgeschnitten. Das geschieht über 22 Generationen.\n\nErgebnis: Alle Jungen werden mit vollständigem Schwanz geboren.' },
        { id: 'B2', title: 'B2 · Trainingsversuch (Spieldaten)', text: 'Zwei Mäusegruppen. Gruppe T: Die Eltern laufen täglich im Laufrad. Gruppe K: Die Eltern trainieren nicht. Gemessen wird die Beinmuskulatur der Jungtiere, die selbst nicht trainiert haben. Index (Gruppe K, Generation 1 = 100): Mittelwert (kleinster bis größter Wert).',
          table: { head: ['Generation', 'Gruppe K', 'Gruppe T'], rows: [['1', '100 (88–112)', '100 (89–112)'], ['2', '99 (87–111)', '101 (88–113)'], ['3', '100 (89–112)', '100 (88–111)'], ['4', '101 (88–113)', '99 (87–111)'], ['5', '100 (88–112)', '100 (89–113)']] } },
        { id: 'B3', title: 'B3 · Taubenzucht', text: 'Alle Taubenrassen stammen von der wilden Felsentaube ab. Züchter wählen aus jeder Generation die Tiere mit dem gewünschten Merkmal aus und paaren nur diese. Nach vielen Generationen sind die Rassen deutlich verschieden.' },
        { id: 'B4', title: 'B4 · Kabeljau', text: 'Ein Kabeljau-Weibchen legt pro Jahr Hunderttausende bis mehrere Millionen Eier. Trotzdem wächst der Bestand nicht ins Unendliche. Die meisten Jungtiere sterben, bevor sie sich fortpflanzen.' }
      ],
      slotA: { label: 'Was zeigen die Belege?', options: [
        { id: 'a1', label: 'In beiden Versuchen erben die Jungen keine Veränderung ihrer Eltern (weder Verletzung noch Trainingseffekt).' },
        { id: 'a2', label: 'Der Trainingsversuch zeigt: Das Training der Eltern verändert die Jungtiere nicht.' },
        { id: 'a3', label: 'Beide Versuche zeigen, dass Mäuse besonders wenig vererben.' },
        { id: 'a4', label: 'Die Versuche zeigen, dass sich Tiere nicht verändern können.' } ] },
      slotB: { label: 'Warum reicht das gegen die Aussage?', options: [
        { id: 'b1', label: 'Lamarcks Modell soll für alle Tiere gelten. Ein Fall, in dem es nicht zutrifft, genügt, um das zu widerlegen.' },
        { id: 'b2', label: 'Mäuse sind Tiere wie alle anderen, also gilt das Ergebnis auch für Vögel.' },
        { id: 'b3', label: 'Zwei Versuche sind mehr als einer.' },
        { id: 'b4', label: 'Hallmann hat keinen Beleg genannt.' } ] },
      hash: ['4d6c9899d103a27c00ab9083f33358462ee6bfb0437c307083bedf18a91675c7', '61ba650d3aa1bb7744b1ae12bc3229f94f38de8b8434970705db92b89ec48975', '982db75fc89285f33ce0e2021a6d5c5c779c898883d881aceb32266631697629'],
      konter: [
        { id: 'k-andere-aussage', notSt: 'T5', from: 'kemal', text: 'Gegen diese Aussage sprechen die Belege nicht direkt. Welche Aussage handelt davon, was an die Jungen weitergegeben wird?', status: 'Die Aussage steht noch.' },
        { id: 'k-falscher-beleg', evOnly: ['B3', 'B4'], from: 'kemal', text: 'Das erklärt etwas anderes. Legt Belege vor, die zeigen, was bei den Nachkommen ankommt.', status: 'Der Einspruch reicht noch nicht.' },
        { id: 'k4', a: ['a3', 'a4'], from: 'kemal', text: 'So steht das nicht in den Daten. Prüft, was die Versuche wirklich gemessen haben.', status: 'Der Einspruch reicht noch nicht.' },
        { id: 'k3', b: ['b3', 'b4'], from: 'hallmann', text: 'Zwei Versuche mit Mäusen. Ich kenne hundert Sammler, die anders denken.', status: 'Hallmann pariert. Seine Antwort ist selbst nur eine Behauptung.' },
        { id: 'k2', evHas: 'B2', b: 'b2', from: 'hallmann', text: 'Mäuse! Der Berolinavis ist ein Vogel. Was bei Mäusen gilt, muss bei meinem Tier nicht gelten.', status: 'Hallmann pariert. Die Aussage wackelt, ist aber nicht gekippt.' },
        { id: 'k1', ev: 'B1', from: 'hallmann', text: 'Ein abgeschnittener Schwanz ist keine Übung, meine Damen und Herren. Lamarck sprach vom Gebrauch, nicht vom Messer.', status: 'Hallmann pariert. Die Aussage wackelt, ist aber nicht gekippt.' },
        { id: 'k-ein-beleg', ev: 'B2', a: 'a1', from: 'kemal', text: 'Ihr sagt „in beiden Versuchen“, legt aber nur einen Beleg vor.', status: 'Der Einspruch reicht noch nicht.' }
      ],
      defaultWrong: 'Das steht so noch nicht in den Belegen. Prüft, ob eure Begründung zu den vorgelegten Belegen passt.',
      hints: ['Lest B1 und B2 genau. Wovon hängt das Ergebnis ab: von einer Verletzung oder vom Gebrauch?',
              'Was hat Weismann genau getan, und was sagt Lamarcks Modell über Gebrauch? Passt der Versuch zur Vorhersage?',
              'B1 prüft Verletzungen, B2 prüft Training. Hallmann hat auf B1 eine gute Ausrede, auf B2 nicht. Und wenn ein Modell für alle Tiere gelten soll, genügt ein Gegenbeispiel.'],
      rescue: 'RGVyIFRyYWluaW5nc3ZlcnN1Y2ggKEIyKSB6ZWlndCwgZGFzcyBkYXMgVHJhaW5pbmcgZGVyIEVsdGVybiBkaWUgSnVuZ3RpZXJlIG5pY2h0IHZlcsOkbmRlcnQuIFdlaWwgTGFtYXJja3MgTW9kZWxsIGbDvHIgYWxsZSBUaWVyZSBnZWx0ZW4gc29sbCwgZ2Vuw7xndCBkaWVzZXMgR2VnZW5iZWlzcGllbCBnZWdlbiBUNS4gV2Vpc21hbm5zIFZlcnN1Y2ggKEIxKSBwcsO8ZnQgbnVyIFZlcmxldHp1bmdlbiB1bmQgaXN0IGRlc2hhbGIgYWxsZWluIHdlbmlnZXIgYXVzc2FnZWtyw6RmdGlnLg==',
      rescueTask: 'Erklärt in eigenen Worten, was Weismanns Versuch zeigt und was er nicht zeigt.',
      onSolve: { message: { from: 'hallmann', text: 'Nun gut. Dann erklären Sie mir, wie die Federn entstanden sind.' },
        message2: { from: 'kemal', text: 'Die Aussage T5 ist durchgestrichen. Am Darwin-Pult rechts wurde gerade ein Schloss entriegelt. Seht euch an, was dort liegt.' } } },

    'r1-3-kette': { id: 'r1-3-kette', type: 'order', title: 'Darwins Erklärung als Kette',
      prompt: 'Hallmann fragt, wie die Federn stattdessen entstanden sind. Legt Darwins Erklärung als Kette. Tippt die Schritte D1 bis D5 in der richtigen Reihenfolge an.',
      items: [
        { id: 'd1', tag: 'D1', label: 'Individuen einer Population unterscheiden sich in einem Merkmal (Variabilität).' },
        { id: 'd2', tag: 'D2', label: 'Es werden mehr Nachkommen geboren, als überleben können. Sie konkurrieren um begrenzte Ressourcen.' },
        { id: 'd3', tag: 'D3', label: 'Individuen mit vorteilhaftem Merkmal überleben und pflanzen sich häufiger fort (Selektion).' },
        { id: 'd4', tag: 'D4', label: 'Das Merkmal wird an die Nachkommen weitergegeben (Vererbung).' },
        { id: 'd5', tag: 'D5', label: 'Über viele Generationen wird das Merkmal in der Population häufiger.' }
      ],
      hash: ['9c498bf2d9407e6f8b66640212627e08238cb64fee08c912d34e469dc07ca5df', 'cc4dd588d09aa19613bec64331c06bcbde915cf9d258bd53759d46482dd589df'],
      wrongText: 'Nichts passiert. Fragt euch bei jedem Schritt: Was muss vorher da sein?',
      hints: ['Was ist die Voraussetzung dafür, dass es überhaupt eine Auswahl gibt?',
              'Wählt die Natur aus, wenn alle Tiere gleich sind? Und wenn alle überleben?',
              'Unterschiede und zu viele Nachkommen kommen zuerst. Dann die Auslese, dann die Weitergabe, dann verändert sich die Population.'],
      rescue: 'RXJzdCBnaWJ0IGVzIFVudGVyc2NoaWVkZSAoVmFyaWFiaWxpdMOkdCkgdW5kIG1laHIgTmFjaGtvbW1lbiBhbHMgw7xiZXJsZWJlbiBrw7ZubmVuLiBEYW5uIMO8YmVybGViZW4gVGllcmUgbWl0IHZvcnRlaWxoYWZ0ZW4gTWVya21hbGVuIGjDpHVmaWdlciAoU2VsZWt0aW9uKSwgZ2ViZW4gc2llIHdlaXRlciwgdW5kIMO8YmVyIHZpZWxlIEdlbmVyYXRpb25lbiB3aXJkIGRhcyBNZXJrbWFsIGluIGRlciBQb3B1bGF0aW9uIGjDpHVmaWdlci4=',
      rescueTask: 'Zeichnet Darwins Kette mit fünf Kästchen ins Logbuch.',
      onSolve: { text: 'Die Kette erscheint als Wandtafel neben der von Lamarck.', then: 'r1-3-belege' } },

    'r1-3-belege': { id: 'r1-3-belege', type: 'assign', title: 'Belege für die Glieder der Kette',
      prompt: 'Ordnet die Belege aus der Mappe den Gliedern der Kette zu, die sie stützen.',
      cards: [
        { id: 'b2', label: 'B2 · Trainingsversuch: Die Werte streuen in beiden Gruppen um etwa 24 Punkte' },
        { id: 'b3', label: 'B3 · Taubenzucht: Züchter wählen Tiere mit dem Merkmal aus' },
        { id: 'b4', label: 'B4 · Kabeljau: Millionen Eier, die meisten Jungtiere sterben' }
      ],
      targets: [{ id: 'variabilitaet', label: 'Variabilität' }, { id: 'ueberproduktion', label: 'Überproduktion' }, { id: 'selektion', label: 'Selektion (Auslese)' }],
      hash: '99e3e52f3c44375f3d97d94cd40428bab1b03e6b941a3fc6ab1fbe62f28b9c43',
      wrongText: 'Nichts passiert. Fragt euch bei jedem Beleg: Welches Glied der Kette zeigt er?',
      hints: ['Schaut noch einmal auf die Tabelle: Wie verschieden sind die Jungtiere, obwohl keines trainiert hat?',
              'Bei B3 wählen Menschen aus. Welches Glied der Kette entspricht dieser Auswahl?',
              'B2 zeigt Unterschiede, B4 zeigt zu viele Nachkommen, B3 zeigt eine Auswahl.'],
      rescue: 'QjIgemVpZ3QgVmFyaWFiaWxpdMOkdCAoZGllIFdlcnRlIHN0cmV1ZW4gYXVjaCBvaG5lIFRyYWluaW5nKS4gQjQgemVpZ3Qgw5xiZXJwcm9kdWt0aW9uICh2aWVsIG1laHIgRWllciBhbHMgZXJ3YWNoc2VuZSBUaWVyZSkuIEIzIHplaWd0IEF1c2xlc2UgZHVyY2ggWsO8Y2h0ZXIgYWxzIFZlcmdsZWljaCB6dXIgU2VsZWt0aW9uLg==',
      rescueTask: 'Schreibt zu jedem Kästchen eurer Kette einen Beleg oder „Beleg fehlt noch“.',
      onSolve: { message: { from: 'kemal', text: 'Für Selektion in der Natur fehlt uns noch ein Beleg. B3 zeigt nur, wie Menschen auswählen.\n\nDen Beleg suchen wir später im Labor.' } } },

    'r1-3-schloss': { id: 'r1-3-schloss', type: 'cloze', title: 'Das Schloss verlangt einen gesicherten Satz',
      prompt: 'Das Schloss verlangt Aussage, Beleg und Reichweite. Vervollständigt den Satz mit den Bausteinen.',
      parts: [{ strong: 'Aussage: ' }, 'Die untersuchten Daten ', { gap: 'g1', label: 'Lücke 1' }, ' die Annahme, dass erworbene Veränderungen vererbt werden. ',
        { strong: 'Beleg: ' }, { gap: 'g2', label: 'Lücke 2' }, '. ', { strong: 'Reichweite: ' }, 'Über ', { gap: 'g3', label: 'Lücke 3' }, ' sagt das noch nichts.'],
      gaps: {
        g1: [{ id: 'a', label: 'stützen nicht' }, { id: 'b', label: 'beweisen' }, { id: 'c', label: 'stützen eindeutig' }],
        g2: [{ id: 'a', label: 'In beiden Versuchen zeigten die Nachkommen die Veränderung ihrer Eltern nicht' }, { id: 'b', label: 'Hallmanns Broschüre nennt viele Sammler als Zeugen' }, { id: 'c', label: 'Der Berolinavis ist sehr alt' }],
        g3: [{ id: 'a', label: 'die Echtheit des Berolinavis' }, { id: 'b', label: 'Lamarcks Lebenslauf' }, { id: 'c', label: 'die Fälschung, die damit bewiesen ist' }]
      },
      traps: [
        { g: 'g3', v: 'c', from: 'kemal', text: 'Vorsicht. Das haben wir nicht gezeigt. Wir haben eine Erklärung geprüft, nicht den Fund.' },
        { g: 'g1', v: 'b', from: 'kemal', text: 'Zwei Versuche zeigen etwas. „Beweisen“ ist ein großes Wort.' },
        { g: 'g2', v: 'b', from: 'kemal', text: 'Wie viele Leute etwas sagen, ist kein Befund.' },
        { g: 'g2', v: 'c', from: 'kemal', text: 'Das Alter des Fossils hat mit der Vererbung nichts zu tun.' }
      ],
      hash: '5173b98e7ba42a95cb075c815fa427acfbef6adeab4771733b268c3432cac219',
      hints: ['Lest den Satz laut. Was ist die Aussage, was der Beleg, was die Grenze der Aussage?',
              'Was haben die Versuche gemessen? Und haben wir den Berolinavis untersucht?',
              'Aussage: Die Daten stützen die Annahme nicht. Beleg: Die Nachkommen zeigten die Veränderung nicht. Über den Fund wissen wir noch nichts.'],
      rescue: 'RGllIERhdGVuIHN0w7x0emVuIGRpZSBBbm5haG1lIG5pY2h0LiBCZWxlZzogSW4gYmVpZGVuIFZlcnN1Y2hlbiB6ZWlndGVuIGRpZSBOYWNoa29tbWVuIGRpZSBWZXLDpG5kZXJ1bmcgaWhyZXIgRWx0ZXJuIG5pY2h0LiDDnGJlciBkaWUgRWNodGhlaXQgZGVzIEJlcm9saW5hdmlzIHNhZ3QgZGFzIG5vY2ggbmljaHRzLg==',
      rescueTask: 'Schreibt Aussage, Beleg und Reichweite in euren Worten ins Logbuch.',
      onSolve: {
        evidence: { id: 'ev-1', title: 'Beweisakte Teil 1 · Erklärung von Angepasstheit', text: 'Hallmanns Erklärung hält der Prüfung an Beobachtungen nicht stand. Über den Fund selbst sagt das noch nichts.' },
        message: { from: 'wendt', text: 'Gut geprüft. Merkt euch: Über den Fund selbst wissen wir noch nichts. Aber ihr habt eine Erklärung geprüft und nicht bloß geglaubt.\n\n– J. W.' },
        message2: { from: 'kemal', text: 'Hallmann verschickt gerade eine neue Broschüre: „Er wollte fliegen, also wuchsen ihm Federn.“\n\nIhr wisst jetzt, woran das scheitert.' } } },

    'r1-3-modellkritik': { id: 'r1-3-modellkritik', type: 'freetext', minLength: 80, title: 'Was Darwins Modell nicht erklärt (Bonus)',
      ref: { title: 'Zum Nachschlagen: Darwins Erklärung', docs: ['darwin'] },
      prompt: 'Darwins Erklärung setzt Variabilität voraus. Nennt eine Frage, die Darwins Modell nicht beantwortet, und begründet, warum sie wichtig ist.',
      placeholder: 'Eine offene Frage ist …',
      onSolve: { message: { from: 'kemal', text: 'Genau mit dieser Frage hat Dr. Wendt im Labor weitergearbeitet.' } } },

    'r1-3-population': { id: 'r1-3-population', type: 'freetext', minLength: 80, title: 'Die Population in zwei Modellen (Bonus)',
      ref: { title: 'Zum Nachschlagen: beide Modelle', docs: ['lamarck', 'darwin'] },
      prompt: 'Vergleicht, wie sich eine Population im Modell von Lamarck und im Modell von Darwin verändert. Beschreibt den Unterschied in einem Satz.',
      placeholder: 'Nach Lamarck …, nach Darwin …',
      onSolve: { message: { from: 'kemal', text: 'Merkt euch diesen Unterschied. Im Labor seht ihr ihn in Zahlen.' } } }
  }
});
