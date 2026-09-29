/* Raum 2 · Die Fossilienkammer · DEMO-INHALT (wird nach Phase 3/4 ersetzt)
   Diese Datei wird aus raum2.src.js erzeugt. Lösungen stehen hier nur verschlüsselt. */
TRESOR.room({
  base: '../',
  id: 'raum2',
  title: 'Die Fossilienkammer',
  subtitle: 'Raum 2 · Mission 2.3 · Der Urvogel (Demo)',
  image: 'bilder/kammer.jpg',
  imageAlt: 'Eine nächtliche Sammlungskammer mit Schubladenschrank, Gesteinsprofil, Vitrine und Schreibtisch',
  size: [1200, 896],
  flashlight: true,

  caseText: function (T) {
    var t = 'Dr. Johanna Wendt ist verschwunden. In wenigen Wochen soll der Händler Viktor Hallmann den „Berolinavis“ versteigern – angeblich ein Bindeglied zwischen Dinosauriern und Vögeln.\n\nKemal Aydın hat euch in Dr. Wendts Fossilienkammer gelassen. Dort liegt ein echter Urvogel.';
    if (T.isSolved('r2-code')) t += '\n\nIhr habt am echten Urvogel gezeigt, wie ein Brückentier aussieht: Merkmale von Reptilien und Vögeln, alles aus einem Stück Stein.';
    return t;
  },

  missions: [{
    id: 'm2.3', title: 'Mission 2.3 · Der Urvogel', unlock: '5680699de708283606cdc5495a2c0ab00aa0e39005aee64ece343523da8cbc78',
    intro: { from: 'kemal', text: 'Psst, ich bin es, Kemal. Ich habe euch die Fossilienkammer aufgeschlossen. Hier hat Dr. Wendt zuletzt gearbeitet.\n\nAuf ihrem Schreibtisch liegt noch ihr Notizbuch. Seht euch um, aber seid leise: Der Nachtdienst macht gleich seine Runde.' },
    requires: ['r2-schrank', 'r2-reihenfolge', 'r2-merkmale', 'r2-code', 'r2-logbuch'],
    doneTitle: 'Beweisstück gesichert',
    doneText: 'Ihr habt den echten Urvogel untersucht und wisst jetzt, woran man ein Brückentier erkennt. Diese Erkenntnis liegt ab sofort in eurer Beweisakte.\n\nWenn ihr noch Zeit habt: Auf Dr. Wendts Schreibtisch liegen neue Karteikarten (Bonus).'
  }],

  hotspots: [
    { id: 'schreibtisch', label: 'Schreibtisch mit Notizbuch', rect: [67, 72, 32, 23], states: [
      { if: { missionDone: 'm2.3', notSolved: 'r2-bonus' }, action: { type: 'puzzle', puzzle: 'r2-bonus' } },
      { action: { type: 'doc', doc: 'wendt-notiz' } } ] },
    { id: 'gestein', label: 'Gesteinsprofil an der Wand', rect: [36, 15, 28.5, 33], action: { type: 'doc', doc: 'tafel' } },
    { id: 'schrank', label: 'Sammlungsschrank mit Schubladen', rect: [1, 8, 27.5, 86], states: [
      { if: { notSolved: 'r2-schrank' }, action: { type: 'puzzle', puzzle: 'r2-schrank' } },
      { if: { notSolved: 'r2-reihenfolge' }, action: { type: 'puzzle', puzzle: 'r2-reihenfolge' } },
      { action: { type: 'text', text: 'Die mittlere Schublade ist leer. Nur noch ein heller Abdruck zeigt, wo der kleine Schlüssel lag.' } } ] },
    { id: 'vitrine', label: 'Vitrine mit Fossil', rect: [37.5, 49, 25.5, 41], states: [
      { if: { notSolved: 'r2-reihenfolge' }, action: { type: 'text', text: 'Die Glashaube ist verschlossen. Neben dem Schloss steht in feiner Schrift:\n„Nur wer die Zeit lesen kann, darf näher heran.“' } },
      { if: { notSolved: 'r2-merkmale' }, action: { type: 'puzzle', puzzle: 'r2-merkmale' } },
      { if: { notSolved: 'r2-code' }, action: { type: 'puzzle', puzzle: 'r2-code' } },
      { if: { notSolved: 'r2-logbuch' }, action: { type: 'puzzle', puzzle: 'r2-logbuch' } },
      { action: { type: 'image', title: 'Der Urvogel', image: 'bilder/urvogel.jpg', text: 'Ein Stein, eine Schicht, ein Tier. Merkt euch dieses Bild gut.' } } ] },
    { id: 'fenster', label: 'Fenster', rect: [77, 2, 23, 56], action: { type: 'text', text: 'Draußen liegt die Invalidenstraße im Mondlicht. Ein dunkles Auto fährt langsam vorbei … und hält kurz vor dem Museum. Dann fährt es weiter.' } }
  ],

  docs: {
    'wendt-notiz': { title: 'Dr. Wendts Notizbuch', style: 'notebook',
      text: 'Wenn ihr das lest, seid ihr mir gefolgt. Gut.\n\nDer Urvogel in meiner Vitrine ist echt. Um zu verstehen, was das bedeutet, müsst ihr zuerst lernen, die Zeit zu lesen.\n\nMein Schrank öffnet sich mit dem Alter der jüngsten Gesteinsschicht an der Wand, in Millionen Jahren. Darin liegen drei Fundstücke. Ordnet sie vom ältesten zum jüngsten.\n\n– J. W.' },
    'tafel': { title: 'Messingtafel unter dem Gesteinsprofil', style: 'plaque',
      text: 'Schicht A (oben): Oberjura, ca. 150 Millionen Jahre\nSchicht B (Mitte): Unterjura, ca. 180 Millionen Jahre\nSchicht C (unten): Kambrium, ca. 500 Millionen Jahre\n\n„Was unten liegt, lag zuerst. Was oben liegt, kam zuletzt.“' }
  },

  puzzles: {
    'r2-schrank': { id: 'r2-schrank', type: 'numlock', digits: 3, title: 'Das Zahlenschloss am Schrank',
      prompt: 'Stellt das Alter der jüngsten Gesteinsschicht ein, in Millionen Jahren.',
      hash: 'bb8da0e47ac30636566d117ea55e42bb84869849cd12b84239c9a6cf5b117332',
      hints: ['Habt ihr euch das Gesteinsprofil an der Wand angesehen? Darunter hängt eine Messingtafel.',
              'Welche Schicht wurde zuletzt abgelagert: die obere oder die untere?',
              'Die oberste Schicht ist die jüngste. Lest ihr Alter auf der Tafel ab.'],
      rescue: 'RGllIGrDvG5nc3RlIFNjaGljaHQgbGllZ3Qgb2JlbjogU2NoaWNodCBBIG1pdCBjYS4gMTUwIE1pbGxpb25lbiBKYWhyZW4uIERlciBDb2RlIGxhdXRldCAxNTAu',
      onSolve: { text: 'Mit einem Klicken springt das Schloss auf. In der mittleren Schublade liegen drei Fundstücke, jedes mit einem kleinen Etikett.', then: 'r2-reihenfolge' } },

    'r2-reihenfolge': { id: 'r2-reihenfolge', type: 'order', title: 'Drei Fundstücke',
      prompt: 'Ordnet die Fundstücke vom ältesten zum jüngsten. Tippt sie in der richtigen Reihenfolge an.',
      items: [
        { id: 'ammonit', label: 'Ammonit', tag: 'gefunden in Schicht B', svg: '<svg viewBox="0 0 100 80"><path d="M50 40 m-28 0 a28 28 0 1 0 56 0 a22 22 0 1 0 -44 0 a16 16 0 1 0 32 0 a10 10 0 1 0 -20 0" stroke="#D8C8A4" stroke-width="3" fill="none"/></svg>' },
        { id: 'urvogel', label: 'Urvogel-Feder', tag: 'gefunden in Schicht A', svg: '<svg viewBox="0 0 100 80"><path d="M20 70 Q50 40 82 10" stroke="#D8C8A4" stroke-width="3" fill="none"/><path d="M30 60 l-10 -14 M40 50 l-10 -16 M50 40 l-8 -18 M60 30 l-6 -18 M70 21 l-4 -16 M32 58 l14 4 M42 48 l16 4 M52 38 l16 3 M62 29 l14 2" stroke="#D8C8A4" stroke-width="2" fill="none"/></svg>' },
        { id: 'trilobit', label: 'Trilobit', tag: 'gefunden in Schicht C', svg: '<svg viewBox="0 0 100 80"><g stroke="#D8C8A4" stroke-width="2.6" fill="none"><path d="M50 8 Q72 12 72 40 Q70 68 50 74 Q30 68 28 40 Q28 12 50 8Z"/><path d="M42 12 V70 M58 12 V70"/><path d="M30 30 H70 M29 42 H71 M31 54 H69"/></g></svg>' }
      ],
      hash: '9253d5e19262ec2fa3d1df72fd26cc080f8678b3f03f5fc5a02aaee31ba652df',
      wrongText: 'Nichts passiert. Die Reihenfolge stimmt noch nicht.',
      hints: ['Schaut auf die Etiketten: In welcher Schicht wurde jedes Stück gefunden?',
              'Vergleicht die Schichten mit der Messingtafel. Welche ist die älteste?',
              'Schicht C ist die älteste, Schicht A die jüngste.'],
      rescue: 'VHJpbG9iaXQgKFNjaGljaHQgQywgY2EuIDUwMCBNaWxsaW9uZW4gSmFocmUpIOKGkiBBbW1vbml0IChTY2hpY2h0IEIsIGNhLiAxODAgTWlsbGlvbmVuIEphaHJlKSDihpIgVXJ2b2dlbC1GZWRlciAoU2NoaWNodCBBLCBjYS4gMTUwIE1pbGxpb25lbiBKYWhyZSku',
      onSolve: { items: [{ id: 'schluessel', label: 'Vitrinenschlüssel', text: 'Ein kleiner Messingschlüssel aus Dr. Wendts Schrank.' }],
        merksatz: 'Fossilien aus tieferen Gesteinsschichten sind in der Regel älter als Fossilien aus höheren Schichten.',
        text: 'Unter den Fundstücken klebt ein kleiner Messingschlüssel. Er passt zur Vitrine.' } },

    'r2-merkmale': { id: 'r2-merkmale', type: 'select', title: 'Unter der Glashaube',
      prompt: 'Vor euch liegt der Urvogel. Er hat Merkmale von Vögeln und von Reptilien.\n\nTippt alle Stellen an, die typisch für Reptilien sind.',
      image: 'bilder/urvogel.jpg', imageAlt: 'Fossil eines Urvogels mit Federn, Zähnen, Krallen und langem Schwanz',
      marks: [
        { id: 'zaehne', label: 'Zähne im Kiefer', x: 57, y: 29 },
        { id: 'krallen', label: 'Krallen am Flügel', x: 38, y: 22 },
        { id: 'federn', label: 'Federn', x: 80, y: 38 },
        { id: 'schwanz', label: 'langer Knochenschwanz', x: 32, y: 68 }
      ],
      hash: 'e53960d80f51e8cd52f935d9da62a4d83ef25ccf0c9f9c924be1cab0a6717218',
      wrongText: 'Kemal schüttelt leicht den Kopf. Prüft jede Stelle noch einmal: Haben heutige Vögel das auch?',
      hints: ['Schaut euch den Kopf genau an. Haben heutige Vögel so etwas?',
              'Heutige Vögel haben keine Zähne, keine Krallen am Flügel und keinen langen Knochenschwanz.',
              'Drei der vier Stellen sind Reptilienmerkmale, nur eine ist typisch für Vögel.'],
      rescue: 'UmVwdGlsaWVubWVya21hbGUgc2luZCBkaWUgWsOkaG5lIGltIEtpZWZlciwgZGllIEtyYWxsZW4gYW0gRmzDvGdlbCB1bmQgZGVyIGxhbmdlIEtub2NoZW5zY2h3YW56LiBEaWUgRmVkZXJuIHNpbmQgdHlwaXNjaCBmw7xyIFbDtmdlbC4=',
      onSolve: { items: [{ id: 'merkmalsliste', label: 'Merkmalsliste', text: 'Reptilienmerkmale: Zähne, Krallen am Flügel, Knochenschwanz. Vogelmerkmal: Federn.' }],
        message: { from: 'kemal', text: 'Genau hingeschaut. Zähne, Krallen und der lange Knochenschwanz – das kennt man von Reptilien. Die Federn dagegen von Vögeln.\n\nAm Sockel ist noch ein zweites Schloss. Es will ein Wort.' },
        then: 'r2-code' } },

    'r2-code': { id: 'r2-code', type: 'code', title: 'Das Wortschloss am Sockel',
      prompt: 'Das Schloss verlangt einen Fachbegriff: Wie nennen Forschende ein Tier, das Merkmale von zwei verschiedenen Tiergruppen besitzt?',
      hash: ['e23a28ca1ad3719e6c5ab79ca580a971a9b86e2636a902a21b4338dfcd3b3870', 'dc8916b5965e6bbe3250e9f95df00a487c0a35f8098874f77a9dbaa2aa0830b0'],
      hints: ['Denkt an eure Merkmalsliste: Der Urvogel verbindet zwei Tiergruppen.',
              'Er schlägt eine Brücke zwischen Reptilien und Vögeln.',
              'Das Wort beginnt mit B und hat 11 Buchstaben.'],
      rescue: 'RWluIFRpZXIgbWl0IE1lcmttYWxlbiB6d2VpZXIgVGllcmdydXBwZW4gaGVpw590IEJyw7xja2VudGllci4gRGVyIFVydm9nZWwgdmVyYmluZGV0IFJlcHRpbGllbiB1bmQgVsO2Z2VsLg==',
      onSolve: {
        evidence: { id: 'ev-brueckentier', title: 'Der echte Urvogel', text: 'Der Urvogel zeigt Merkmale von Reptilien (Zähne, Krallen am Flügel, Knochenschwanz) und von Vögeln (Federn). Er ist ein echtes Brückentier – erhalten in einem einzigen Stück Stein.' },
        merksatz: 'Brückentiere wie der Urvogel besitzen Merkmale von zwei Tiergruppen. Sie sind Belege dafür, dass sich Tiergruppen im Lauf der Evolution auseinander entwickelt haben.',
        text: 'Das Schloss gibt nach. Die Glashaube lässt sich anheben. Unter dem Fossil liegt ein gefalteter Zettel: „Tragt ein, was ihr gesehen habt. – J. W.“',
        then: 'r2-logbuch' } },

    'r2-logbuch': { id: 'r2-logbuch', type: 'freetext', title: 'Logbuch-Eintrag', minLength: 60,
      prompt: 'Erklärt in zwei bis drei Sätzen, warum der Urvogel ein Brückentier ist. Nennt dabei mindestens ein Reptilienmerkmal und ein Vogelmerkmal.',
      placeholder: 'Der Urvogel ist ein Brückentier, weil …',
      onSolve: { message: { from: 'wendt', text: 'Wenn ihr das hier lest, habt ihr den Urvogel verstanden.\n\nMerkt euch sein Bild gut: So sieht ein echter Fund aus. Ein Stein, eine Schicht, ein Tier.\n\nHallmanns Berolinavis sieht auf den ersten Blick ähnlich aus. Auf den zweiten nicht.\n\n– J. W.' } } },

    'r2-bonus': { id: 'r2-bonus', type: 'assign', title: 'Dr. Wendts Karteikarten (Bonus)',
      prompt: 'Auf Dr. Wendts Schreibtisch liegen Karteikarten. Ordnet jedes Merkmal der Tiergruppe zu, bei der es heute vorkommt.',
      cards: [
        { id: 'federn', label: 'Federn' }, { id: 'hornschnabel', label: 'Hornschnabel ohne Zähne' },
        { id: 'schuppen', label: 'Hornschuppen am ganzen Körper' }, { id: 'zaehne', label: 'Zähne im Kiefer' },
        { id: 'schwanz', label: 'langer Schwanz mit vielen Wirbeln' }
      ],
      targets: [{ id: 'voegel', label: 'heutige Vögel' }, { id: 'reptilien', label: 'heutige Reptilien' }],
      hash: '7632c0b08daaf212815bbaabf27c6b297e387d279209e92338a1d724d130e9ea',
      hints: ['Denkt an eine Taube und an eine Eidechse.', 'Nur zwei Merkmale gehören zu den heutigen Vögeln.', 'Federn und Hornschnabel gehören zu den Vögeln, der Rest zu den Reptilien.'],
      rescue: 'SGV1dGlnZSBWw7ZnZWw6IEZlZGVybiwgSG9ybnNjaG5hYmVsIG9obmUgWsOkaG5lLiBIZXV0aWdlIFJlcHRpbGllbjogSG9ybnNjaHVwcGVuLCBaw6RobmUgaW0gS2llZmVyLCBsYW5nZXIgU2Nod2FueiBtaXQgdmllbGVuIFdpcmJlbG4u',
      onSolve: { merksatz: 'Der Urvogel vereint Merkmale, die heute auf Vögel und Reptilien verteilt sind.',
        text: 'Ihr legt die letzte Karte ab. Zwischen den Karten steckt ein Foto: der Berolinavis. Auf der Rückseite steht in Dr. Wendts Schrift nur ein Wort: „Schichten?“' } }
  }
});
