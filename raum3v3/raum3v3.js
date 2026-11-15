/* Raum 3 V1.0 · Das Galápagos-Labor · Stunden 3A, 3B und 3C (Stand 15.11.2026)
   Nach Rätselsteckbrief Raum 3 vom 30.09.2026, verdichtet auf drei Stunden (Entscheidung 15.11.2026).
   Lösungen stehen hier nur als Hash. Eigene IDs (r3v3-…, m3v3.…).
   Alle Zahlen sind Spieldaten nach Grant und Grant, vereinfacht. Hintergrundbild und Karte sind Platzhalter (SVG).
   Texte mit dem Vermerk ENTWURF brauchen die Freigabe der Lehrkraft. */
TRESOR.room({
 "base": "../",
 "id": "raum3v3",
 "version": "Raum 3 V1.0",
 "title": "Das Galápagos-Labor",
 "subtitle": "Raum 3 · Daten und Modelle",
 "image": "bilder/labor.svg",
 "imageAlt": "Ein nächtliches Labor mit Messtisch, Bildschirm, Inselkarte und Pinnwand",
 "size": [
  1200,
  896
 ],
 "flashlight": false,
 "unlockMode": "auto",
 "wall": true,
 "audioLabel": "KI-Stimme · Antippen zum Hören",
 "caseText": function (T) {
    var t = 'Dr. Johanna Wendt ist verschwunden. Der Händler Viktor Hallmann will den „Berolinavis“ versteigern.\n\nIn Dr. Wendts Labor prüft ihr mit Daten und einer Simulation, wie Populationen sich verändern.';
    if (T.isSolved('r3v3-1-herkunft')) t += '\n\nIhr wisst: Unterschiede sind schon da, bevor die Umwelt wirkt.';
    if (T.isSolved('r3v3-2-deutung')) t += '\n\nIhr habt Selektion in der Simulation geprüft.';
    if (T.isSolved('r3v3-2-schluss')) t += '\n\nOhne Austausch zwischen Gruppen bleiben Unterschiede bestehen.';
    if (T.isSolved('r3v3-3-schloss')) t += '\n\nEine neue Art entsteht in Populationen über viele Generationen, nicht bei einem Einzeltier.';
    return t;
  },
 "end": {
  "title": "Raum 3 geschafft",
  "text": "Sichert jetzt euren Spielstand. Drei Schlösser am Tresor sind offen. Der nächste Raum ist der Stammbaum-Saal."
 },
 "models": {
    /* Spieldaten-Modelle (Population in sieben Schnabelklassen, 200 Vögel). Keine Echtdaten. */
    duerre: function (st, rnd) {
      var M = [7.75, 8.25, 8.75, 9.25, 9.75, 10.25, 10.75], C = [8, 24, 48, 56, 40, 18, 6];
      var LAB = ['7,5 bis 8,0', '8,0 bis 8,5', '8,5 bis 9,0', '9,0 bis 9,5', '9,5 bis 10,0', '10,0 bis 10,5', '10,5 bis 11,0'];
      var P = st.samen === '80' ? [.03, .06, .12, .25, .50, .80, .95] : (st.samen === 'konk' ? [.70, .65, .58, .48, .36, .24, .14] : [.6, .6, .6, .6, .6, .6, .6]);
      function mean(O) { var s = 0; for (var i = 0; i < 7; i++) s += O[i] * M[i]; return s / 200; }
      function fmt(x) { return x.toFixed(1).replace('.', ','); }
      function rows(O) { return LAB.map(function (l, i) { return [l, Math.round(O[i])]; }); }
      var G = +st.gen, out = [], means = [], start = C.slice();
      for (var g = 1; g <= G; g++) {
        var S = C.map(function (c, i) { return c * P[i]; }), tot = S.reduce(function (a, b) { return a + b; }, 0);
        var O = S.map(function (_, i) { var l = i > 0 ? S[i - 1] : S[i], r = i < 6 ? S[i + 1] : S[i]; return .15 * l + .7 * S[i] + .15 * r; });
        var ot = O.reduce(function (a, b) { return a + b; }, 0); C = O.map(function (o) { return 200 * o / ot; });
        var m = mean(C) + (rnd() - .5) * .08; means.push(fmt(m));
        out.push([String(g), fmt(m), String(Math.round(tot))]);
      }
      return { table: { head: ['Generation', 'Mittelwert der Schnabeltiefe (mm)', 'Vögel nach der Auslese'], rows: out },
        hist: [{ title: 'Start: Verteilung der Schnabeltiefe (Zahl der Vögel je Klasse in mm)', rows: rows(start), note: 'Mittelwert ' + fmt(mean(start)) },
               { title: 'Nach Generation ' + G + ' (Zahl der Vögel je Klasse in mm)', rows: rows(C), note: 'Mittelwert ' + means[means.length - 1] }],
        summary: 'Mittelwerte je Generation: ' + means.join(' · ') };
    },
    insel: function (st, rnd) {
      var M = [7.75, 8.25, 8.75, 9.25, 9.75, 10.25, 10.75], C0 = [8, 24, 48, 56, 40, 18, 6];
      var LAB = ['7,5 bis 8,0', '8,0 bis 8,5', '8,5 bis 9,0', '9,0 bis 9,5', '9,5 bis 10,0', '10,0 bis 10,5', '10,5 bis 11,0'];
      var PN = [.03, .06, .12, .25, .50, .80, .95], PS = [.62, .61, .60, .59, .58, .56, .54], EX = st.austausch === 'an' ? .4 : 0;
      function mean(O) { var s = 0; for (var i = 0; i < 7; i++) s += O[i] * M[i]; return s / 200; }
      function fmt(x) { return x.toFixed(1).replace('.', ','); }
      function step(C, P) {
        var S = C.map(function (c, i) { return c * P[i]; });
        var O = S.map(function (_, i) { var l = i > 0 ? S[i - 1] : S[i], r = i < 6 ? S[i + 1] : S[i]; return .15 * l + .7 * S[i] + .15 * r; });
        var ot = O.reduce(function (a, b) { return a + b; }, 0); return O.map(function (o) { return 200 * o / ot; });
      }
      function rows(O) { return LAB.map(function (l, i) { return [l, Math.round(O[i])]; }); }
      var N = C0.slice(), Su = C0.slice(), out = [];
      for (var g = 1; g <= 10; g++) {
        if (EX) { var nn = N.map(function (c, i) { return (1 - EX) * c + EX * Su[i]; }), ss = Su.map(function (c, i) { return (1 - EX) * c + EX * N[i]; }); N = nn; Su = ss; }
        N = step(N, PN); Su = step(Su, PS);
        if (g % 2 === 0) { var mn = mean(N) + (rnd() - .5) * .06, ms = mean(Su) + (rnd() - .5) * .06; out.push([String(g), fmt(mn), fmt(ms), fmt(Math.abs(mn - ms))]); }
      }
      var last = out[out.length - 1];
      return { table: { head: ['Generation', 'Nord (mm)', 'Süd (mm)', 'Unterschied (mm)'], rows: out },
        hist: [{ title: 'Nord nach Generation 10 (Zahl der Vögel je Klasse in mm)', rows: rows(N) }, { title: 'Süd nach Generation 10 (Zahl der Vögel je Klasse in mm)', rows: rows(Su) }],
        summary: 'Nach Generation 10: Nord ' + last[1] + ' mm, Süd ' + last[2] + ' mm, Unterschied ' + last[3] + ' mm' };
    }
  }
,
 "missions": [
  {
   "id": "m3v3.1",
   "title": "Stunde 3A · Keiner gleicht dem anderen",
   "unlock": "299bbe12027ee09bf582c6b0e43f2bbdb43f103da883b261890105a321c15853",
   "intro": {
    "from": "wendt",
    "text": "Willkommen in meinem Labor. Hier habe ich getestet, was ich in Raum 1 nur prüfen konnte. Rechnet nach.\n\n– J. W.",
    "next": {
     "from": "kemal",
     "text": "Das ist Dr. Wendts Labor. Fangt am Messtisch links an, dort liegt ihre Tabelle."
    }
   },
   "requires": [
    "r3v3-1-darstellung",
    "r3v3-1-mittel",
    "r3v3-1-interpretation",
    "r3v3-1-herkunft",
    "s3v3-1"
   ],
   "doneTitle": "Stunde 3A abgeschlossen",
   "doneText": "Ihr wisst jetzt, dass sich Individuen einer Population unterscheiden und woher die Unterschiede kommen.\n\nZeichnet das Häufigkeitsdiagramm ins Logbuch und schreibt den Merksatz zur Herkunft der Unterschiede."
  },
  {
   "id": "m3v3.2",
   "title": "Stunde 3B · Dürre und geteilte Insel",
   "unlock": "c98e2e74a94f907147f34f2140938c9a4e4df712ce1ebf7f44a15d77cbbd497d",
   "intro": {
    "from": "kemal",
    "text": "Heute prüft ihr, was Selektion bewirkt und was Trennung bewirkt. Wendts Simulation läuft am Bildschirm. Danach schaut ihr auf die Karte rechts daneben."
   },
   "requires": [
    "r3v3-2-duerre",
    "r3v3-2-deutung",
    "e3v3",
    "r3v3-2-insel",
    "r3v3-2-schluss",
    "s3v3-2"
   ],
   "doneTitle": "Stunde 3B abgeschlossen",
   "doneText": "Ihr habt Selektion und Isolation in der Simulation geprüft.\n\nTragt Vorher-nachher-Diagramme, Vorhersage und beide Läufe ins Logbuch ein."
  },
  {
   "id": "m3v3.3",
   "title": "Stunde 3C · Neue Art in einer Generation? · Schloss 3",
   "unlock": "e64a8223f26b09c0a56d511a86ebcbdc628f1ab3491e7881dd1871b1bcbf2a30",
   "intro": {
    "from": "kemal",
    "text": "Hallmann hat eine Pressemitteilung geschickt. Ihr findet sie an der Pinnwand rechts. Prüft, was davon nach Raum 3 noch übrig bleibt."
   },
   "requires": [
    "s3v3-3",
    "r3v3-3-widersprueche",
    "r3v3-3-kette",
    "r3v3-3-schloss"
   ],
   "doneTitle": "Stunde 3C abgeschlossen · Schloss 3 geöffnet",
   "doneText": "Eine neue Art entsteht nicht bei einem Einzeltier, sondern in Populationen über viele Generationen. Über die Echtheit des Berolinavis sagt das noch nichts.\n\nTragt die Kette und die vier Widersprüche ins Logbuch ein."
  }
 ],
 "hotspots": [
  {
   "id": "tuer",
   "label": "Tür des Labors",
   "rect": [
    1,
    9,
    7.5,
    56
   ],
   "action": {
    "type": "doc",
    "doc": "a0"
   }
  },
  {
   "id": "fenster",
   "label": "Fenster",
   "rect": [
    13,
    9,
    18,
    33
   ],
   "action": {
    "type": "text",
    "text": "Draußen liegt der Museumshof im Mondlicht. Ein Auto steht mit ausgeschaltetem Licht an der Mauer."
   }
  },
  {
   "id": "messtisch",
   "label": "Messtisch mit Wendts Tabelle",
   "rect": [
    1,
    62,
    32,
    33
   ],
   "states": [
    {
     "if": {
      "unlocked": "m3v3.1",
      "notFound": "d1"
     },
     "action": {
      "type": "doc",
      "doc": "d1"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.1",
      "notSolved": "r3v3-1-darstellung"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-1-darstellung"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.1",
      "notSolved": "r3v3-1-mittel"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-1-mittel"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.1",
      "notSolved": "r3v3-1-interpretation"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-1-interpretation"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.1",
      "notSolved": "r3v3-1-herkunft"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-1-herkunft"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.1",
      "notSolved": "s3v3-1"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "s3v3-1"
     }
    },
    {
     "if": {
      "missionDone": "m3v3.1",
      "notSolved": "r3v3-1-ausreisser"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-1-ausreisser"
     }
    },
    {
     "action": {
      "type": "doc",
      "doc": "d1"
     }
    }
   ]
  },
  {
   "id": "bildschirm",
   "label": "Bildschirm mit dem Labor-Dashboard",
   "rect": [
    34,
    14,
    29,
    36
   ],
   "states": [
    {
     "if": {
      "notSolved": "r3v3-1-mittel"
     },
     "action": {
      "type": "text",
      "text": "Der Bildschirm ist dunkel. Er startet, sobald ihr Wendts Daten ausgewertet habt."
     }
    },
    {
     "if": {
      "unlocked": "m3v3.2",
      "notSolved": "r3v3-2-duerre"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-2-duerre"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.2",
      "notSolved": "r3v3-2-deutung"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-2-deutung"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.2",
      "notSolved": "e3v3"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "e3v3"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.2",
      "notSolved": "r3v3-2-insel"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-2-insel"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.2",
      "notSolved": "r3v3-2-schluss"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-2-schluss"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.2",
      "notSolved": "s3v3-2"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "s3v3-2"
     }
    },
    {
     "if": {
      "missionDone": "m3v3.2",
      "notSolved": "r3v3-2-konkurrenz"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-2-konkurrenz"
     }
    },
    {
     "if": {
      "missionDone": "m3v3.2",
      "solved": "r3v3-2-konkurrenz",
      "notSolved": "r3v3-2-konkurrenz-text"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-2-konkurrenz-text"
     }
    },
    {
     "if": {
      "missionDone": "m3v3.2",
      "notSolved": "r3v3-2-alternativ"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-2-alternativ"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.2"
     },
     "action": {
      "type": "text",
      "text": "Der Bildschirm zeigt eure gespeicherten Läufe. Sie hängen auch an der Sammelwand."
     }
    },
    {
     "action": {
      "type": "text",
      "text": "Der Bildschirm zeigt das Fenster „Verteilung“. Die Simulation wird in der nächsten Stunde freigegeben."
     }
    }
   ]
  },
  {
   "id": "karte",
   "label": "Karte der Inselgruppe Alta",
   "rect": [
    66,
    14,
    15,
    36
   ],
   "states": [
    {
     "if": {
      "unlocked": "m3v3.2"
     },
     "action": {
      "type": "docs",
      "title": "Karte und Faktenkarte",
      "docs": [
       "d3",
       "d2"
      ]
     }
    },
    {
     "action": {
      "type": "text",
      "text": "Eine Karte mit zwei Inseln und einem Kanal. Mehr erfahrt ihr in der nächsten Stunde."
     }
    }
   ]
  },
  {
   "id": "pinnwand",
   "label": "Pinnwand mit der Pressemitteilung",
   "rect": [
    83.5,
    14,
    15,
    36
   ],
   "states": [
    {
     "if": {
      "unlocked": "m3v3.3",
      "notFound": "d4"
     },
     "action": {
      "type": "doc",
      "doc": "d4"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.3",
      "notSolved": "s3v3-3"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "s3v3-3"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.3",
      "notSolved": "r3v3-3-widersprueche"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-3-widersprueche"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.3",
      "notSolved": "r3v3-3-kette"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-3-kette"
     }
    },
    {
     "if": {
      "unlocked": "m3v3.3",
      "notSolved": "r3v3-3-schloss"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-3-schloss"
     }
    },
    {
     "if": {
      "missionDone": "m3v3.3",
      "notSolved": "r3v3-3-artbegriff"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-3-artbegriff"
     }
    },
    {
     "if": {
      "missionDone": "m3v3.3",
      "notSolved": "r3v3-3-brecht"
     },
     "action": {
      "type": "puzzle",
      "puzzle": "r3v3-3-brecht"
     }
    },
    {
     "if": {
      "found": "d4"
     },
     "action": {
      "type": "doc",
      "doc": "d4"
     }
    },
    {
     "action": {
      "type": "text",
      "text": "Die Pinnwand ist leer bis auf eine Reißzwecke."
     }
    }
   ]
  },
  {
   "id": "schreibtisch",
   "label": "Dr. Wendts Schreibtisch",
   "rect": [
    35,
    66,
    30,
    29
   ],
   "action": {
    "type": "text",
    "text": "Notizzettel, ein Becher mit Stiften, ein zugeklapptes Notebook. Dr. Wendt hat nichts offen liegen lassen."
   }
  },
  {
   "id": "vitrine",
   "label": "Vitrine mit Vogelpräparaten",
   "rect": [
    67,
    62,
    31,
    33
   ],
   "action": {
    "type": "text",
    "text": "Hinter dem Glas stehen ausgestopfte Finken aus der Sammlung. Auf den Schildern stehen nur Fundorte."
   }
  }
 ],
 "docs": {
  "a0": {
   "title": "A0 · Dr. Wendt (Tür)",
   "tag": "Text",
   "style": "paper",
   "text": "Wendt: „Hier habe ich getestet, was ich in Raum 1 nur prüfen konnte. Rechnet nach.“\n\n– J. W."
  },
  "d1": {
   "title": "D1 · Wendts Messtabelle „Finken_Messung“",
   "tag": "Daten",
   "style": "paper",
   "text": "Schnabeltiefe in Millimetern, 24 Jungvögel einer Population. Gemessen kurz nach dem Flüggewerden, vor der ersten Trockenzeit.\n\nSpieldaten nach Grant und Grant, vereinfacht.\n\nDateiinfo: zuletzt geändert 02:14 · L. Brecht",
   "table": {
    "head": [
     "Vogel",
     "Tiefe (mm)",
     "Vogel",
     "Tiefe (mm)"
    ],
    "rows": [
     [
      "V1",
      "7,6",
      "V13",
      "9,2"
     ],
     [
      "V2",
      "7,9",
      "V14",
      "9,3"
     ],
     [
      "V3",
      "8,1",
      "V15",
      "9,4"
     ],
     [
      "V4",
      "8,3",
      "V16",
      "9,6"
     ],
     [
      "V5",
      "8,4",
      "V17",
      "9,7"
     ],
     [
      "V6",
      "8,5",
      "V18",
      "9,8"
     ],
     [
      "V7",
      "8,6",
      "V19",
      "10,0"
     ],
     [
      "V8",
      "8,7",
      "V20",
      "10,0"
     ],
     [
      "V9",
      "8,8",
      "V21",
      "10,1"
     ],
     [
      "V10",
      "8,9",
      "V22",
      "10,3"
     ],
     [
      "V11",
      "9,0",
      "V23",
      "10,6"
     ],
     [
      "V12",
      "9,1",
      "V24",
      "10,9"
     ]
    ]
   }
  },
  "d2": {
   "title": "D2 · Faktenkarte Daphne Major",
   "tag": "Text",
   "style": "paper",
   "text": "Die Insel Daphne Major gehört zu den Galápagosinseln. Dort erleben Grundfinken 1977 eine schwere Dürre. Weiche Samen werden knapp, harte bleiben übrig. Der Bestand der Mittleren Grundfinken sinkt stark.\n\nVor der Dürre betrug die mittlere Schnabeltiefe etwa 9,2 mm, bei den Überlebenden etwa 9,7 mm. Die Jungen der Überlebenden hatten im Mittel ebenfalls tiefere Schnäbel.\n\nSpieldaten nach Grant und Grant, vereinfacht."
  },
  "d3": {
   "title": "D3 · Karte der Inselgruppe Alta (fiktiv)",
   "tag": "Bild",
   "style": "plaque",
   "image": "bilder/karte-alta.svg",
   "text": "Alta war früher eine Insel. Steigendes Meer hat sie in Nord und Süd geteilt.\n\nNord: trocken, viele harte Samen.\nSüd: feucht, weiche Samen.\nDazwischen liegt ein Kanal. Vögel können ihn überqueren, wenn der Austausch an ist."
  },
  "d4": {
   "title": "D4 · Pressemitteilung von Viktor Hallmann",
   "tag": "Text",
   "style": "paper",
   "text": "Pressemitteilung. Der Berolinavis ist keine Fälschung. Er ist ein Sprung der Natur. Ein Dinosaurier legte ein Ei, und daraus schlüpfte ein Vogel, eine völlig neue Art in einer einzigen Generation. Alle Merkmale waren sofort da. Darum sieht er aus wie eine Mischung. Solche Sprünge sind der Schlüssel der Evolution. Und weil es nur ein Exemplar gibt, zählt dieses eine."
  }
 },
 "puzzles": {
  "r3v3-1-darstellung": {
   "id": "r3v3-1-darstellung",
   "type": "pick",
   "count": 1,
   "title": "Die Verteilung zeigen",
   "logbook": {
    "where": "Logbuch Seite 3.1, Feld „Lernprodukt“",
    "task": "Zeichnet das Häufigkeitsdiagramm der Schnabeltiefen: Klassen auf der Achse, Zahl der Vögel nach oben. Beschriftet beide Achsen."
   },
   "ref": {
    "title": "Zum Nachschlagen: Wendts Messtabelle",
    "docs": [
     "d1"
    ]
   },
   "prompt": "Wendts Tabelle enthält 24 Messwerte. Wählt die Darstellung, die zeigt, wie die Schnabeltiefen verteilt sind.\n\nDann wählt die Frage, die diese Darstellung beantwortet.",
   "cards": [
    {
     "id": "a",
     "tag": "a",
     "label": "Häufigkeitsdiagramm: Die Werte werden in Klassen eingeteilt, die Säulen zeigen die Zahl der Vögel je Klasse."
    },
    {
     "id": "b",
     "tag": "b",
     "label": "Kreisdiagramm: Jeder Wert ist ein Stück vom Kreis."
    },
    {
     "id": "c",
     "tag": "c",
     "label": "Liniendiagramm über die Vogelnummer: Vogel 1 bis Vogel 24 nacheinander."
    },
    {
     "id": "d",
     "tag": "d",
     "label": "Nur der größte und der kleinste Wert."
    }
   ],
   "evidence": {
    "prompt": "Wählt die Frage, die eure Darstellung beantwortet.",
    "cards": [
     {
      "id": "e1",
      "label": "Wie viele Vögel haben welche Schnabeltiefe?"
     },
     {
      "id": "e2",
      "label": "Wie ändert sich die Schnabeltiefe von Vogel 1 bis Vogel 24?"
     },
     {
      "id": "e3",
      "label": "Welcher Vogel hat den tiefsten Schnabel?"
     },
     {
      "id": "e4",
      "label": "Wie viel Prozent der Summe macht jeder Wert aus?"
     }
    ]
   },
   "pickHash": "995770e28ec5225389ce92d21a15cbd21162861b0d9f9eb079375f4ac090db4c",
   "hash": "a1fbfcc00c16da5af3a45b83cf5e5c4ef3760160436fe70a68b11673998337e9",
   "wrongText": "Nichts passiert. Was wollt ihr zeigen: Anteile, eine Reihenfolge oder wie oft welche Werte vorkommen?",
   "hints": [
    "Schaut auf die Frage: Wie sind die Werte verteilt?",
    "Welche Darstellung zeigt, wie oft jeder Bereich vorkommt?",
    "Es ist die Darstellung mit Klassen. Zu ihr passt die Frage nach der Zahl der Vögel je Bereich."
   ],
   "rescue": "UmljaHRpZyBpc3QgZGFzIEjDpHVmaWdrZWl0c2RpYWdyYW1tIChhKS4gRXMgYmVhbnR3b3J0ZXQgZGllIEZyYWdlOiBXaWUgdmllbGUgVsO2Z2VsIGhhYmVuIHdlbGNoZSBTY2huYWJlbHRpZWZlPw==",
   "rescueTask": "Erklärt in eigenen Worten, wie ein Häufigkeitsdiagramm entsteht.",
   "onSolve": {
    "then": "r3v3-1-mittel"
   }
  },
  "r3v3-1-mittel": {
   "id": "r3v3-1-mittel",
   "type": "zahl",
   "title": "Der Mittelwert",
   "ref": {
    "title": "Zum Nachschlagen: Wendts Messtabelle",
    "docs": [
     "d1"
    ]
   },
   "prompt": "Berechnet den Mittelwert der 24 Schnabeltiefen und tragt ihn ein.\n\nAlle 24 Werte addieren, durch 24 teilen. Rundet auf eine Nachkommastelle.",
   "fields": [
    {
     "id": "mw",
     "label": "Mittelwert der Schnabeltiefe",
     "unit": "mm",
     "placeholder": "z. B. 9,5",
     "hash": [
      "f69ce15eaf579e9abdcc4c4d8757eb1e9878f71cb4bdb377e0643826665b1c07",
      "750d604a3863d1ea340fac608a095b1d3b594d22041399b8d7186eb19acc0012",
      "d30fd9f184796ea751e1aee7979d96244e25dad0c4a00f74c510eb36af742ac7",
      "b6a5387979b36e9b92ed1627648564e7972c2bf54cbc56653d2477aa1c6c280e",
      "e4eb08c6114a65e888927ee84a0fe86cb6625fc9a2147f4c5e72504a88a09382",
      "da84fca7e5e9eaf8c0299e4c93fd8a32ce3d8a650d7ee160c2b3d1d07007c09c",
      "1e322f87c827d189ab9de19c3a6a734f5925d5632e71899c6f9998d380362b77",
      "7cf624a5f0858a569f1c1d30ee0e115728d4b97781fbaa2f7b6a2abd08df4039",
      "e6e401623dc3192327afdf8cb5486a76443f0c62625fec2b84004242df1a4f0f",
      "e2856436f113dd910ca1a4315d068e7f289da1efdecfbd7ebc55e69d41446f77",
      "e746539dc2d3d8445981e77d454fce27e0585a621244670d7ac8c6ea7885f89e"
     ]
    }
   ],
   "wrongText": "Nichts passiert. Prüft die Summe aller 24 Werte, dann teilt durch 24.",
   "hints": [
    "Alle 24 Werte stehen in der Tabelle. Zählt sie nach.",
    "Summe aller Werte durch die Zahl der Werte.",
    "Die Summe liegt bei etwa 220. Teilt sie durch 24."
   ],
   "rescue": "RGllIFN1bW1lIGFsbGVyIDI0IFdlcnRlIGlzdCAyMjAsOCBtbS4gMjIwLDggZ2V0ZWlsdCBkdXJjaCAyNCBlcmdpYnQgOSwyIG1tLg==",
   "rescueTask": "Schreibt die Rechnung für den Mittelwert ins Logbuch.",
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Mittelwert 9,2 Millimeter. Der Bildschirm fährt hoch.\n\nIn der Dateiinfo steht: „zuletzt geändert 02:14 · L. Brecht“. Dr. Brecht arbeitet oft nachts."
    },
    "then": "r3v3-1-interpretation"
   }
  },
  "r3v3-1-interpretation": {
   "id": "r3v3-1-interpretation",
   "type": "assign",
   "title": "Folgt das aus dem Diagramm?",
   "prompt": "Ordnet jede Aussage zu: Folgt sie aus dem Häufigkeitsdiagramm, oder folgt sie nicht daraus?\n\nPrüft bei jeder Aussage: Steht das im Diagramm, oder ist es schon eine Deutung?",
   "cards": [
    {
     "id": "a1",
     "label": "A1 · „Die Schnabeltiefen sind verschieden.“"
    },
    {
     "id": "a2",
     "label": "A2 · „Die meisten Vögel liegen nahe am Mittelwert.“"
    },
    {
     "id": "a3",
     "label": "A3 · „Alle Vögel haben dieselbe Schnabeltiefe.“"
    },
    {
     "id": "a4",
     "label": "A4 · „Vögel mit tiefen Schnäbeln sind besser angepasst.“"
    },
    {
     "id": "a5",
     "label": "A5 · „Die Vögel haben unterschiedlich tiefe Schnäbel, weil sie unterschiedlich viele Samen geknackt haben.“"
    }
   ],
   "targets": [
    {
     "id": "folgt",
     "label": "folgt aus dem Diagramm"
    },
    {
     "id": "nicht",
     "label": "folgt nicht daraus"
    }
   ],
   "hash": "d1cbe6eb39ecd15354a19db98a7f5aa460c9c8661c3a50084c3666049eabfe02",
   "wrongText": "Nichts passiert. Fragt bei jeder Aussage: Zeigt das Diagramm das wirklich?",
   "hints": [
    "Prüft: Zeigt das Diagramm das wirklich?",
    "Wovon hängt „besser angepasst“ ab? Kommt die Umwelt im Diagramm vor?",
    "Das Diagramm zeigt, dass die Schnäbel verschieden sind und wo die meisten liegen. Das sind zwei der fünf Aussagen."
   ],
   "rescue": "QXVzIGRlbSBEaWFncmFtbSBmb2xnZW4gQTEgdW5kIEEyLiBBMyB3aWRlcnNwcmljaHQgZGVuIERhdGVuLiBBNCBzYWd0IG5pY2h0cyBvaG5lIFVtd2VsdC4gQTUgZXJrbMOkcnQgZGllIFVyc2FjaGUsIGRpZSBpbSBEaWFncmFtbSBuaWNodCBzdGVodC4=",
   "rescueTask": "Schreibt auf, was das Diagramm zeigt und was nicht.",
   "onSolve": {
    "text": "Das Fenster „Verteilung“ am Bildschirm füllt sich mit dem Diagramm.",
    "then": "r3v3-1-herkunft"
   }
  },
  "r3v3-1-herkunft": {
   "id": "r3v3-1-herkunft",
   "type": "pick",
   "count": 1,
   "title": "Woher kommen die Unterschiede?",
   "logbook": {
    "where": "Logbuch Seite 3.1, Feld „Merksatz“",
    "task": "Schreibt den Merksatz zuerst selbst: Woher kommen die Unterschiede zwischen den Vögeln? Der Vergleich im Plenum folgt in der Präsenzstunde."
   },
   "prompt": "In Raum 1 blieb offen, woher die Unterschiede kommen. Wählt die Aussage, die dazu passt, und den Beleg dafür.",
   "cards": [
    {
     "id": "a",
     "tag": "a",
     "label": "Durch Mutationen und die Neukombination von Erbanlagen entstehen verschiedene Varianten. Sie sind da, bevor die Umwelt wirkt."
    },
    {
     "id": "b",
     "tag": "b",
     "label": "Mutationen entstehen gezielt, wenn ein Tier ein Merkmal braucht."
    },
    {
     "id": "c",
     "tag": "c",
     "label": "Nur wer viel trainiert, verändert seine Erbinformation."
    },
    {
     "id": "d",
     "tag": "d",
     "label": "Alle Vögel einer Art haben identische Erbinformation."
    }
   ],
   "evidence": {
    "prompt": "Wählt den Beleg, der die Aussage trägt.",
    "cards": [
     {
      "id": "e1",
      "label": "Wendts Tabelle: Gemessen wurden Jungvögel vor der ersten Trockenzeit. Sie unterscheiden sich schon."
     },
     {
      "id": "e2",
      "label": "Hallmanns Vortrag (A1)"
     },
     {
      "id": "e3",
      "label": "Die Wandtafel „Gebrauch macht stark“"
     },
     {
      "id": "e4",
      "label": "Ein einzelner Vogel, der besonders viele Samen geknackt hat"
     }
    ]
   },
   "pickHash": "0a72a411409564819e1d62178b289014f50070529c1dee96676ae7127a529526",
   "hash": "f8be04a1a42a8d121c2b37a06c5aa05f6f8a4be649e9dde7e8a4c07565b8d167",
   "wrongText": "Nichts passiert. Erinnert euch an Raum 1: Was zeigten die Mäuse aus dem Archiv? Und was steht in der Kopfzeile von Wendts Tabelle?",
   "hints": [
    "Was wisst ihr aus der Genetik über Mutationen?",
    "Wird eine Mutation ausgelöst, weil sie nützlich wäre? Und seit wann sind die Unterschiede da?",
    "Mutationen sind zufällig und nicht gezielt. Für den Beleg lest die Kopfzeile von Wendts Tabelle."
   ],
   "rescue": "UmljaHRpZyBpc3QgYSBtaXQgZGVtIEJlbGVnIGF1cyBXZW5kdHMgVGFiZWxsZTogU2Nob24gZGllIEp1bmd2w7ZnZWwgdW50ZXJzY2hlaWRlbiBzaWNoLCBiZXZvciBkaWUgVW13ZWx0IGdld2lya3QgaGF0LiBNdXRhdGlvbmVuIGVudHN0ZWhlbiB6dWbDpGxsaWcsIG5pY2h0IHdlaWwgZWluIFRpZXIgZWluIE1lcmttYWwgYnJhdWNodC4=",
   "rescueTask": "Erklärt, warum Mutationen nicht „gebraucht“ werden.",
   "onSolve": {
    "wall": [
     {
      "id": "w-herkunft",
      "title": "Herkunft der Variabilität",
      "tag": "Ergebnis",
      "kind": "ergebnis",
      "text": "Unterschiede entstehen durch Mutation und Neukombination der Erbanlagen. Sie sind schon vor der Umwelt da und nicht gezielt."
     }
    ],
    "message": {
     "from": "kemal",
     "text": "Die offene Frage aus Raum 1 ist beantwortet. Jetzt können wir Wendts Simulation nutzen."
    },
    "then": "s3v3-1"
   }
  },
  "s3v3-1": {
   "id": "s3v3-1",
   "type": "schnell",
   "seconds": 90,
   "title": "Schnellrunde: Die Probenkühlung",
   "prompt": "Stimmt die Aussage oder stimmt sie nicht?",
   "story": "Die Kühlung der Proben fällt aus. In 90 Sekunden sind die Messungen verdorben.\n\nWendts Ablaufkarten liegen noch auf dem Tisch. Sortiert sie schnell, dann starte ich den Notkreislauf.",
   "timeoutText": "Die Anzeige springt auf Rot, der Kompressor stottert, dann läuft er wieder.\n\nNoch einmal. Ich halte die Kühlung.",
   "options": [
    {
     "id": "ja",
     "label": "stimmt"
    },
    {
     "id": "nein",
     "label": "stimmt nicht"
    }
   ],
   "items": [
    {
     "id": "k1",
     "text": "„Individuen einer Population sind nicht identisch.“"
    },
    {
     "id": "k2",
     "text": "„Mutationen entstehen, weil ein Tier ein Merkmal braucht.“"
    },
    {
     "id": "k3",
     "text": "„Die Unterschiede sind schon da, bevor die Umwelt wirkt.“"
    },
    {
     "id": "k4",
     "text": "„Wer viel trainiert, ändert seine Erbinformation.“"
    },
    {
     "id": "k5",
     "text": "„Neukombination der Erbanlagen erzeugt neue Varianten.“"
    },
    {
     "id": "k6",
     "text": "„Alle Vögel einer Art haben dieselbe Erbinformation.“"
    }
   ],
   "itemHash": {
    "k1": "45cec9927863161705d2e2a677aee8c8b21252e07d4f408176c8e46b416b8ae7",
    "k2": "b327fd2f22c7172ab3da2cd0e70cf311db63dee8e6c4b20fcad317270accf38d",
    "k3": "f7bc558e315941a70dad6f7570f7e9bcb0fee5810c9ab0c5ca8348b8c41dfe21",
    "k4": "c5b91a8c0df7a1fbc63f540fad9a54caf4a90736564cbb15e670bd5e547c4add",
    "k5": "a1c38d866488eff192bc9435b413825e1e281a0237934d1feb8da6e4e0c67110",
    "k6": "c5f59c8ae62b88c37d7585d21862ab7d54227796ad8c0ec59783f1d16f149272"
   },
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Geschafft. Die Proben sind gerettet.\n\nIn der Präsenzstunde zeichnet ihr das Häufigkeitsdiagramm und schreibt den Merksatz."
    }
   }
  },
  "r3v3-1-ausreisser": {
   "id": "r3v3-1-ausreisser",
   "type": "pick",
   "count": 1,
   "title": "Der Ausreißer (Zusatzaufgabe)",
   "prompt": "Wendts Tabelle nennt bei Vogel 25 den Wert 13,2 mm. In ihrer Feldnotiz steht 10,2 mm. Wählt, was ihr tut.",
   "cards": [
    {
     "id": "a",
     "tag": "a",
     "label": "Mit der Feldnotiz vergleichen: wahrscheinlich ein Zahlendreher. Korrigieren und das Vorgehen dokumentieren."
    },
    {
     "id": "b",
     "tag": "b",
     "label": "Den Wert löschen, weil er stört."
    },
    {
     "id": "c",
     "tag": "c",
     "label": "Den Wert behalten, weil Messwerte nie falsch sind."
    }
   ],
   "hash": "b98161089a5cecc70e5dc952387c49c5e64d90df62ba27535ca039f86f8500ad",
   "wrongText": "Nichts passiert. Wie könntet ihr herausfinden, ob der Wert ein Fehler ist?",
   "hints": [
    "Was steht in der Feldnotiz?",
    "Darf man einen Wert ohne Begründung löschen?",
    "Vergleichen, korrigieren, dokumentieren: Alle drei Schritte gehören zusammen."
   ],
   "rescue": "UmljaHRpZyBpc3QgYTogTWl0IGRlciBGZWxkbm90aXogdmVyZ2xlaWNoZW4sIGtvcnJpZ2llcmVuIHVuZCBkb2t1bWVudGllcmVuLg==",
   "rescueTask": "Erklärt, warum man Messwerte nicht einfach löscht.",
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Der Median reagiert weniger auf Ausreißer als der Mittelwert."
    }
   }
  },
  "r3v3-2-duerre": {
   "id": "r3v3-2-duerre",
   "type": "sim",
   "model": "duerre",
   "title": "Die Dürre nachstellen",
   "logbook": {
    "where": "Logbuch Seite 3.2, Feld „Lernprodukt“",
    "task": "Zeichnet für die Kontrolle und die Dürre je ein Vorher-nachher-Diagramm. Schreibt darunter zwei Zeilen: Was ist anders, und woher kommt der Unterschied?"
   },
   "prompt": "Prüft die Hypothese in zwei Läufen: eine Kontrolle ohne Dürre (20 %) und eine Dürre (80 %). Nur ein Regler darf anders sein. Legt vorher eure Hypothese fest.\n\nWendts Simulation läuft auf dem Bildschirm.",
   "predict": {
    "prompt": "Eure Hypothese vor dem ersten Lauf: Wenn nur noch harte Samen übrig sind, was geschieht mit dem Mittelwert der Schnabeltiefe?",
    "options": [
     {
      "id": "steigt",
      "label": "Der Mittelwert steigt: Vögel mit tieferen Schnäbeln überleben häufiger und vererben sie."
     },
     {
      "id": "waechst",
      "label": "Die Schnäbel aller Vögel wachsen, weil sie sie brauchen."
     },
     {
      "id": "gleich",
      "label": "Der Mittelwert bleibt gleich."
     }
    ]
   },
   "badge": "Simulation nach Daten von Grant und Grant · Spieldaten, vereinfacht",
   "controls": [
    {
     "id": "samen",
     "label": "Anteil großer, harter Samen",
     "short": "Samen",
     "options": [
      {
       "id": "20",
       "label": "20 % (Kontrolle)"
      },
      {
       "id": "80",
       "label": "80 % (Dürre)"
      }
     ]
    },
    {
     "id": "gen",
     "label": "Generationen",
     "short": "Generationen",
     "def": "2",
     "options": [
      {
       "id": "1",
       "label": "1"
      },
      {
       "id": "2",
       "label": "2"
      },
      {
       "id": "3",
       "label": "3"
      }
     ]
    }
   ],
   "need": {
    "min": 2,
    "per": {
     "control": "samen",
     "min": 1
    }
   },
   "startText": "Stellt die Regler ein und startet. „Nächste Generation“ ist hier die Zahl der Generationen. Gemessen wird die mittlere Schnabeltiefe der Jungvögel.",
   "dataNote": "Spieldaten: Das Spiel hat die Werte erzeugt. Sie stehen für Beobachtungen auf einer echten Insel.",
   "cardTag": "Datenkarte (Spieldaten)",
   "needText": "Speichert zuerst zwei Läufe: eine Kontrolle (20 %) und eine Dürre (80 %).",
   "button": "Versuch abschließen",
   "hints": [
    "Stellt den Regler „Samen“ ein, startet und speichert den Lauf.",
    "Ihr braucht zwei Läufe, bei denen nur ein Regler anders steht.",
    "Einmal 20 % (Kontrolle), einmal 80 % (Dürre). Jeden Lauf speichern."
   ],
   "rescue": "SWNoIGhhYmUgYmVpZGUgTMOkdWZlIGbDvHIgZXVjaCBnZXNwZWljaGVydDogZWluZSBLb250cm9sbGUgbWl0IDIwICUgU2FtZW4gdW5kIGVpbmUgRMO8cnJlIG1pdCA4MCAlIFNhbWVuLiBEaWUgRGF0ZW5rYXJ0ZW4gaMOkbmdlbiBhbiBkZXIgU2FtbWVsd2FuZC4=",
   "rescueTask": "Erklärt, warum ihr eine Kontrolle braucht.",
   "onSolve": {
    "then": "r3v3-2-deutung"
   }
  },
  "r3v3-2-deutung": {
   "id": "r3v3-2-deutung",
   "type": "pick",
   "count": 1,
   "title": "Was zeigen Kontrolle und Dürre?",
   "prompt": "Wählt die Erklärung, die zu beiden Läufen passt, und den Beleg dafür.",
   "cards": [
    {
     "id": "a",
     "tag": "a",
     "label": "Vögel mit tieferen Schnäbeln knackten die harten Samen, überlebten häufiger und gaben ihre Schnabelform weiter. Dadurch stieg der Mittelwert."
    },
    {
     "id": "b",
     "tag": "b",
     "label": "Die Schnäbel der einzelnen Vögel sind während der Dürre gewachsen."
    },
    {
     "id": "c",
     "tag": "c",
     "label": "Die Vögel wollten größere Schnäbel und haben sie deshalb bekommen."
    },
    {
     "id": "d",
     "tag": "d",
     "label": "Reiner Zufall: Die größeren Vögel hatten einfach Glück."
    }
   ],
   "evidence": {
    "prompt": "Wählt den Beleg, der die Erklärung trägt.",
    "cards": [
     {
      "id": "e1",
      "label": "Der Vergleich beider Läufe: In der Kontrolle bleibt der Mittelwert, in der Dürre steigt er."
     },
     {
      "id": "e2",
      "label": "Nur der Lauf mit der Dürre"
     },
     {
      "id": "e3",
      "label": "Die Faktenkarte zu Daphne Major allein"
     },
     {
      "id": "e4",
      "label": "Die Hypothese, die ihr vor dem Lauf festgelegt habt"
     }
    ]
   },
   "traps": [
    {
     "id": "d",
     "text": "Vorsicht. Was zeigt die Kontrolle? Ohne Dürre bleibt der Mittelwert gleich."
    }
   ],
   "pickHash": "b1f11bf29a4d7af457706cd382d429b0ed0d9e6c162db042b7e00332b995dd0d",
   "hash": "9e87b845103c0a5b560fa33689023910e096249e2689fce4cc2e7295f4471d1d",
   "wrongText": "Nichts passiert. Vergleicht Kontrolle und Dürre: Was ist anders, und was kann daran liegen?",
   "hints": [
    "Vergleicht beide Läufe nebeneinander.",
    "Können sich einzelne Schnäbel im Leben so verändern, dass der Mittelwert einer Population steigt?",
    "Nicht das einzelne Tier ändert sich. Es geht um den Anteil in der Population. Als Beleg zählt der Vergleich, nicht ein einzelner Lauf."
   ],
   "rescue": "UmljaHRpZyBpc3QgYSBtaXQgZGVtIEJlbGVnIGUxOiBLb250cm9sbGUgdW5kIETDvHJyZSB6dXNhbW1lbi4gU2VsZWt0aW9uIHZlcnNjaGllYnQgZGVuIEFudGVpbCBpbiBkZXIgUG9wdWxhdGlvbiwgZWluemVsbmUgVsO2Z2VsIHZlcsOkbmRlcm4gc2ljaCBuaWNodC4=",
   "rescueTask": "Erklärt in einem Satz, was Selektion ist.",
   "onSolve": {
    "wall": [
     {
      "id": "w-selektion",
      "title": "Selektion in der Simulation",
      "tag": "Ergebnis",
      "kind": "ergebnis",
      "text": "Spieldaten: In der Kontrolle bleibt der Mittelwert, in der Dürre steigt er. Tiefere Schnäbel überleben häufiger und werden vererbt."
     }
    ],
    "message": {
     "from": "kemal",
     "text": "In Raum 1 fehlte noch ein Beleg für Selektion in der Natur. Hier habt ihr einen, in der Simulation.\n\nIm Archiv liegt eine neue Nachricht für euch."
    },
    "then": "e3v3"
   }
  },
  "e3v3": {
   "id": "e3v3",
   "type": "entscheidung",
   "title": "Dr. Brecht bittet um eure Notizen",
   "prompt": "Eine Nachricht von Dr. Leon Brecht, Doktorand in Wendts Arbeitsgruppe:\n\n„Ich brauche eure Notizen zur Simulation, um Wendts Datei zu ergänzen. Teilt ihr sie mit mir?“",
   "options": [
    {
     "id": "ja",
     "tag": "Ja",
     "label": "Wir teilen unsere Notizen mit Dr. Brecht.",
     "onSolve": {
      "vars": {
       "notizen_brecht": "ja"
      },
      "message": {
       "from": "kemal",
       "text": "Ich habe die Notizen in sein Fach gelegt. Er meldet sich später bei euch."
      }
     }
    },
    {
     "id": "nein",
     "tag": "Nein",
     "label": "Wir behalten unsere Notizen vorerst.",
     "onSolve": {
      "vars": {
       "notizen_brecht": "nein"
      },
      "message": {
       "from": "kemal",
       "text": "Verstanden. Ich sage ihm Bescheid."
      }
     }
    }
   ],
   "onSolve": {
    "then": "r3v3-2-insel"
   }
  },
  "r3v3-2-insel": {
   "id": "r3v3-2-insel",
   "type": "sim",
   "model": "insel",
   "title": "Die Insel teilt sich",
   "logbook": {
    "where": "Logbuch Seite 3.3, Feld „Lernprodukt“",
    "task": "Schreibt eure Vorhersage, das Ergebnis ohne Austausch und das Ergebnis mit Austausch. Ein Satz zum Vergleich."
   },
   "ref": {
    "title": "Zum Nachschlagen: Karte der Inselgruppe Alta",
    "docs": [
     "d3"
    ]
   },
   "prompt": "Auf der Karte teilt steigendes Meer die Insel Alta in Nord und Süd. Prüft zwei Läufe über zehn Generationen: ohne Austausch und mit Austausch. Legt vorher eure Vorhersage fest.",
   "predict": {
    "prompt": "Eure Vorhersage vor dem ersten Lauf: Was geschieht mit Nord und Süd, wenn sich die Vögel nicht mehr begegnen?",
    "options": [
     {
      "id": "verschieden",
      "label": "Weil Nord und Süd verschieden selektieren und sich nicht mischen, verschieben sich die Mittelwerte in verschiedene Richtungen."
     },
     {
      "id": "gleich",
      "label": "Die Vögel bleiben gleich, weil sie zur selben Art gehören."
     },
     {
      "id": "umwelt",
      "label": "Die Vögel im Norden bekommen größere Schnäbel, weil sie auf einer trockenen Insel leben."
     }
    ]
   },
   "badge": "Fiktive Inselgruppe Alta · Spieldaten, vereinfacht",
   "controls": [
    {
     "id": "austausch",
     "label": "Austausch zwischen den Inseln",
     "short": "Austausch",
     "options": [
      {
       "id": "aus",
       "label": "aus"
      },
      {
       "id": "an",
       "label": "an"
      }
     ]
    }
   ],
   "need": {
    "min": 2,
    "per": {
     "control": "austausch",
     "min": 1
    }
   },
   "startText": "Stellt den Regler ein und startet. Gemessen wird nach zehn Generationen die mittlere Schnabeltiefe in Nord und Süd.",
   "dataNote": "Spieldaten: Das Spiel hat die Werte erzeugt. Nord ist trocken (viele harte Samen), Süd feucht (weiche Samen).",
   "cardTag": "Datenkarte (Spieldaten)",
   "needText": "Speichert zuerst zwei Läufe: einen ohne und einen mit Austausch.",
   "button": "Versuch abschließen",
   "hints": [
    "Lest nach Generation 10 beide Mittelwerte ab, Nord und Süd.",
    "Was verändert der Regler „Austausch“?",
    "Einmal ohne, einmal mit Austausch, jeden Lauf speichern. Vergleicht dann den Unterschied zwischen Nord und Süd."
   ],
   "rescue": "SWNoIGhhYmUgYmVpZGUgTMOkdWZlIGdlc3BlaWNoZXJ0LCBvaG5lIHVuZCBtaXQgQXVzdGF1c2NoLiBPaG5lIEF1c3RhdXNjaCBsaWVnZW4gTm9yZCB1bmQgU8O8ZCB3ZWl0IGF1c2VpbmFuZGVyLCBtaXQgQXVzdGF1c2NoIGZhc3QgZ2xlaWNoLg==",
   "rescueTask": "Beschreibt den Unterschied zwischen den beiden Läufen.",
   "onSolve": {
    "then": "r3v3-2-schluss"
   }
  },
  "r3v3-2-schluss": {
   "id": "r3v3-2-schluss",
   "type": "pick",
   "count": 1,
   "title": "Was folgt aus beiden Läufen?",
   "prompt": "Wählt die Aussage, die aus euren Läufen folgt, und den Beleg dafür.",
   "cards": [
    {
     "id": "a",
     "tag": "a",
     "label": "Ohne Austausch bleiben die Unterschiede zwischen den Inseln bestehen und wachsen. Mit Austausch gleichen sie sich an."
    },
    {
     "id": "b",
     "tag": "b",
     "label": "Die Trennung selbst verändert die Tiere."
    },
    {
     "id": "c",
     "tag": "c",
     "label": "Nach zehn Generationen sind Nord und Süd zwei Arten."
    },
    {
     "id": "d",
     "tag": "d",
     "label": "Die Umwelt allein erklärt die Unterschiede, die Trennung ist egal."
    }
   ],
   "evidence": {
    "prompt": "Wählt den Beleg, der die Aussage trägt.",
    "cards": [
     {
      "id": "e1",
      "label": "Beide Läufe zusammen: Die Umwelt ist gleich, nur der Austausch ist anders."
     },
     {
      "id": "e2",
      "label": "Nur der Lauf ohne Austausch"
     },
     {
      "id": "e3",
      "label": "Die Karte der Inselgruppe allein"
     },
     {
      "id": "e4",
      "label": "Eure Vorhersage"
     }
    ]
   },
   "traps": [
    {
     "id": "c",
     "text": "Vorsicht. Zwei verschiedene Gruppen sind noch keine zwei Arten."
    }
   ],
   "pickHash": "84dfa1ef268805b279cdf1e8d3bda088baeb25be894013455dc0aa9c9f47a7ad",
   "hash": "8e3924d204b955dc065747674f469e7f939116f75c114048260c90f1136d219c",
   "wrongText": "Nichts passiert. Vergleicht die beiden Läufe: Was ist in beiden gleich, was ist anders?",
   "hints": [
    "In beiden Läufen sind die Umwelten gleich. Was ändert sich?",
    "Was verhindert das Mischen der Vögel?",
    "Ohne Austausch bleiben und wachsen die Unterschiede. Für den Beleg braucht ihr beide Läufe."
   ],
   "rescue": "UmljaHRpZyBpc3QgYSBtaXQgZGVtIEJlbGVnIGUxOiBCZWlkZSBMw6R1ZmUgaGFiZW4gZGllc2VsYmUgVW13ZWx0LiBOdXIgb2huZSBBdXN0YXVzY2ggYmxlaWJlbiBkaWUgVW50ZXJzY2hpZWRlIGJlc3RlaGVuLg==",
   "rescueTask": "Schreibt auf, warum die Trennung nötig ist.",
   "onSolve": {
    "wall": [
     {
      "id": "w-isolation",
      "title": "Isolation",
      "tag": "Ergebnis",
      "kind": "ergebnis",
      "text": "Spieldaten: Ohne Austausch verschieben sich die Mittelwerte in verschiedene Richtungen. Mit Austausch gleichen sie sich an."
     }
    ],
    "message": {
     "from": "kemal",
     "text": "Unterschiede sind noch keine Arten. Aber sie sind der Anfang."
    },
    "then": "s3v3-2"
   }
  },
  "s3v3-2": {
   "id": "s3v3-2",
   "type": "schnell",
   "seconds": 100,
   "title": "Schnellrunde: Die Sturmwarnung",
   "prompt": "Stimmt die Aussage oder stimmt sie nicht?",
   "story": "Sturmwarnung für die Inselstation. In 100 Sekunden fällt der Strom aus.\n\nAuf dem Labortisch liegen die Karten zur Simulation. Sortiert sie, bevor ich die Notstromanlage anwerfe.",
   "timeoutText": "Das Licht flackert, die Monitore gehen aus. Dann springt das Notstromaggregat an.\n\nNoch einmal. Ich halte durch.",
   "options": [
    {
     "id": "ja",
     "label": "stimmt"
    },
    {
     "id": "nein",
     "label": "stimmt nicht"
    }
   ],
   "items": [
    {
     "id": "k1",
     "text": "„Vögel mit tiefen Schnäbeln knacken harte Samen und überleben häufiger.“"
    },
    {
     "id": "k2",
     "text": "„Der Schnabel eines Vogels wird tiefer, weil er harte Samen knacken muss.“"
    },
    {
     "id": "k3",
     "text": "„Nach der Dürre sind tiefe Schnäbel in der Population häufiger.“"
    },
    {
     "id": "k4",
     "text": "„Die Kontrolle zeigt, was ohne Dürre passiert.“"
    },
    {
     "id": "k5",
     "text": "„Selektion erzeugt neue Varianten.“"
    },
    {
     "id": "k6",
     "text": "„Die Trennung selbst verändert die Tiere direkt.“"
    },
    {
     "id": "k7",
     "text": "„Ohne Austausch bleiben Unterschiede zwischen Inseln bestehen.“"
    }
   ],
   "itemHash": {
    "k1": "23ea48ac080efdeac2e0b7ff0ad20d8a307dc44fd8b4b98e9fc843b79a44bea2",
    "k2": "febe8aabd71a351b25d0f815744d15891ea69860a0b7e1f4a5a9023c2cbe655a",
    "k3": "90bf850db16b1dae5714eb4a253f907fba3d461ffc1fbdcc80c2874721935aaa",
    "k4": "9d2114dd86e37a4afe13a5781973555701611a0f33b263afa0325d552a55d1b3",
    "k5": "9ad115d05c6ba217189055e959f14dc7eac01f70481e6d6ed61c42867f1e77d6",
    "k6": "b862d3cc7b603974003d7d6cd9eabe1b718e8d0c727ea8f33c879adefdc0c69e",
    "k7": "890ca5d6085833c4ee3b6dbdba2d575542837a6cfcdd9bb133e4674ef942675d"
   },
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Der Strom hält. Gut gemacht.\n\nIn der nächsten Stunde geht es um Hallmanns neue Behauptung."
    }
   }
  },
  "r3v3-2-konkurrenz": {
   "id": "r3v3-2-konkurrenz",
   "type": "sim",
   "model": "duerre",
   "title": "Konkurrenz um die Samen (Zusatzaufgabe)",
   "prompt": "Schaltet „Konkurrenz durch eine größere Art“ an und lasst zwei Generationen laufen. Speichert den Lauf.\n\nDanach beschreibt ihr das Ergebnis.",
   "badge": "Simulation nach Daten von Grant und Grant · Spieldaten, vereinfacht",
   "controls": [
    {
     "id": "samen",
     "label": "Konkurrenz durch größere Art",
     "short": "Konkurrenz",
     "options": [
      {
       "id": "konk",
       "label": "an"
      }
     ]
    },
    {
     "id": "gen",
     "label": "Generationen",
     "short": "Generationen",
     "def": "2",
     "options": [
      {
       "id": "2",
       "label": "2"
      },
      {
       "id": "3",
       "label": "3"
      }
     ]
    }
   ],
   "need": {
    "min": 1
   },
   "startText": "Startet den Versuch. Die größere Art frisst die großen, harten Samen mit.",
   "dataNote": "Spieldaten: Das Spiel hat die Werte erzeugt.",
   "cardTag": "Datenkarte (Spieldaten)",
   "needText": "Speichert zuerst einen Lauf.",
   "button": "Weiter",
   "hints": [
    "Ein Lauf genügt, Regler stehen schon richtig.",
    "Vergleicht den Mittelwert mit dem Start (9,2).",
    "Der Mittelwert verändert sich nach unten, nicht nach oben."
   ],
   "rescue": "TWl0IEtvbmt1cnJlbnogc2lua3QgZGVyIE1pdHRlbHdlcnQuIEtsZWluZXJlIFNjaG7DpGJlbCBzaW5kIGltIFZvcnRlaWwu",
   "rescueTask": "Beschreibt das Ergebnis in einem Satz.",
   "onSolve": {
    "then": "r3v3-2-konkurrenz-text"
   }
  },
  "r3v3-2-konkurrenz-text": {
   "id": "r3v3-2-konkurrenz-text",
   "type": "freetext",
   "minLength": 100,
   "title": "Warum das nicht widerspricht (Zusatzaufgabe)",
   "prompt": "Beschreibt das Ergebnis und erklärt, warum es dem Ergebnis der Dürre nicht widerspricht.",
   "placeholder": "Mit Konkurrenz … Das widerspricht nicht, weil …",
   "checks": [
    "Das Feld ist ausgefüllt."
   ],
   "hints": [
    "Was ist bei Konkurrenz anders als bei der Dürre?",
    "Hängt die Richtung der Selektion von der Umwelt ab?",
    "Selektion hat keine feste Richtung. Sie hängt davon ab, welche Varianten in der Umwelt Vorteile haben."
   ],
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Selektion hat keine feste Richtung. Sie hängt davon ab, wer in der Umwelt Vorteile hat."
    }
   }
  },
  "r3v3-2-alternativ": {
   "id": "r3v3-2-alternativ",
   "type": "freetext",
   "minLength": 100,
   "title": "Die Umwelt allein? (Zusatzaufgabe)",
   "ref": {
    "title": "Zum Nachschlagen: Karte der Inselgruppe Alta",
    "docs": [
     "d3"
    ]
   },
   "prompt": "Ein Kollege sagt: „Die Unterschiede entstehen nur durch die verschiedene Umwelt. Die Trennung ist egal.“ Beurteilt diese Erklärung anhand eurer beiden Läufe.",
   "placeholder": "Die Erklärung stimmt nicht, weil …",
   "checks": [
    "Das Feld ist ausgefüllt."
   ],
   "hints": [
    "Schaut auf den Lauf mit Austausch.",
    "Ist die Umwelt in beiden Läufen gleich verschieden?",
    "Mit Austausch gleichen sich die Gruppen trotz verschiedener Umwelt an. Also ist die Trennung nötig."
   ],
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Gut beobachtet: Die Umwelt allein reicht nicht."
    }
   }
  },
  "s3v3-3": {
   "id": "s3v3-3",
   "type": "schnell",
   "seconds": 90,
   "title": "Schnellrunde: Die Pressemitteilung",
   "prompt": "Stuft jede Karte ein: Beobachtung, Deutung oder Behauptung ohne Beleg.",
   "story": "Das Faxgerät im Labor spuckt Seiten aus, Hallmanns Pressemitteilung. In 90 Sekunden kommt der Redakteur und will eine Stellungnahme.\n\nMarkiert, was ihr schon aus Raum 1 kennt.",
   "timeoutText": "Der Redakteur klopft, öffnet kurz die Tür und geht wieder.\n\nNoch einmal.",
   "options": [
    {
     "id": "beo",
     "label": "Beobachtung"
    },
    {
     "id": "deu",
     "label": "Deutung"
    },
    {
     "id": "beh",
     "label": "Behauptung ohne Beleg"
    }
   ],
   "items": [
    {
     "id": "k1",
     "text": "„Der Berolinavis ist keine Fälschung.“"
    },
    {
     "id": "k2",
     "text": "„Er sieht aus wie eine Mischung.“"
    },
    {
     "id": "k3",
     "text": "„Darum ist er ein Sprung der Natur.“"
    },
    {
     "id": "k4",
     "text": "„Solche Sprünge sind der Schlüssel der Evolution.“"
    },
    {
     "id": "k5",
     "text": "„Es gibt nur ein Exemplar.“"
    },
    {
     "id": "k6",
     "text": "„Ein Dinosaurier legte ein Ei, und daraus schlüpfte ein Vogel.“"
    }
   ],
   "itemHash": {
    "k1": "becef45b8e0af855a109968264f9b098807c626d811174095ea10a5b5856bf6e",
    "k2": "4ba805cefba30574bdad81cf24575a04f1204698b6280a467ca972d9464982dc",
    "k3": "d2e7d0419d289bc5112669a56111aebd1a5bea9a17ebdc8cb146865d9460cfcd",
    "k4": "73f9a4f45bb8718867d9cd1cf3ef87d3c93193d6a1ef58702ec1d5880eeacf0a",
    "k5": "baea2f2e3dbebf420ad1225ea05492b42de85763fe8fd8109d08041e73b0d3e2",
    "k6": "877198c6877d4df58caefb655010edee1bb6a8e2549522602f37513fbc1094bf"
   },
   "onSolve": {
    "then": "r3v3-3-widersprueche"
   }
  },
  "r3v3-3-widersprueche": {
   "id": "r3v3-3-widersprueche",
   "type": "assign",
   "title": "Hallmanns Behauptungen und eure Ergebnisse",
   "logbook": {
    "where": "Logbuch Seite 3.4, Feld „Lernprodukt“",
    "task": "Schreibt vier Zeilen: Zu jeder Behauptung Hallmanns der Widerspruch, den ihr in Raum 3 gefunden habt."
   },
   "ref": {
    "title": "Zum Nachschlagen: Hallmanns Pressemitteilung",
    "docs": [
     "d4"
    ]
   },
   "prompt": "Hallmann behauptet vier Dinge. Ordnet jede Behauptung dem Ergebnis aus euren Untersuchungen zu, das ihr widerspricht.",
   "cards": [
    {
     "id": "w1",
     "label": "W1 · „… in einer einzigen Generation.“"
    },
    {
     "id": "w2",
     "label": "W2 · „Alle Merkmale waren sofort da.“"
    },
    {
     "id": "w3",
     "label": "W3 · „Ein Dinosaurier legte ein Ei, und daraus schlüpfte ein Vogel.“"
    },
    {
     "id": "w4",
     "label": "W4 · „Weil es nur ein Exemplar gibt, zählt dieses eine.“"
    }
   ],
   "targets": [
    {
     "id": "r1",
     "label": "R1 · Populationen verändern sich über viele Generationen (Simulation, Läufe)."
    },
    {
     "id": "r2",
     "label": "R2 · Variabilität entsteht durch Mutation. Selektion wirkt auf Vorhandenes."
    },
    {
     "id": "r3",
     "label": "R3 · Neue Gruppen entstehen in Populationen, nicht bei einem Einzeltier (Insel)."
    },
    {
     "id": "r4",
     "label": "R4 · Ein einzelner Fund hat begrenzte Aussagekraft (Raum 2)."
    }
   ],
   "hash": "8f8bfa0d707a43bb838cbd5b25d333d79f77c401ec6e29d0747188217550cdc0",
   "wrongText": "Nichts passiert. Welche Aussage betrifft die Zeit, welche die Merkmale, welche das Einzeltier, welche den Beleg?",
   "hints": [
    "Lest jede Behauptung und fragt: Was habt ihr in Raum 3 dazu gesehen?",
    "Wie viele Generationen brauchte die Simulation? Woher kamen die Merkmale? Wie viele Tiere waren beteiligt?",
    "W1 betrifft die Zeit. Für W2 bis W4 fragt: Merkmale, Einzeltier oder Einzelfund?"
   ],
   "rescue": "VzEgd2lkZXJzcHJpY2h0IFIxIChaZWl0KS4gVzIgd2lkZXJzcHJpY2h0IFIyIChNZXJrbWFsZSBlbnRzdGVoZW4gZHVyY2ggTXV0YXRpb24gdW5kIFNlbGVrdGlvbikuIFczIHdpZGVyc3ByaWNodCBSMyAoRWluemVsdGllcikuIFc0IHdpZGVyc3ByaWNodCBSNCAoRWluemVsZnVuZCku",
   "rescueTask": "Erläutert zu jeder Behauptung in einem Satz den Widerspruch.",
   "onSolve": {
    "text": "Die vier Widersprüche leuchten an der Pressemitteilung auf.",
    "then": "r3v3-3-kette"
   }
  },
  "r3v3-3-kette": {
   "id": "r3v3-3-kette",
   "type": "order",
   "title": "Der Weg zur Artbildung",
   "prompt": "Legt den Weg zur Artbildung als Kette. Tippt die Schritte in der richtigen Reihenfolge an.",
   "items": [
    {
     "id": "k1",
     "label": "Eine Population wird in zwei Gruppen getrennt (Isolation).",
     "tag": "Schritt 1"
    },
    {
     "id": "k2",
     "label": "In beiden Gruppen entstehen durch Mutation neue Varianten (Variabilität).",
     "tag": "Schritt 2"
    },
    {
     "id": "k3",
     "label": "Verschiedene Umwelten selektieren verschiedene Varianten.",
     "tag": "Schritt 3"
    },
    {
     "id": "k4",
     "label": "Über viele Generationen werden beide Gruppen immer verschiedener.",
     "tag": "Schritt 4"
    },
    {
     "id": "k5",
     "label": "Die Gruppen pflanzen sich nicht mehr miteinander fort: Es sind zwei Arten.",
     "tag": "Schritt 5"
    }
   ],
   "hash": [
    "b8569f6add84360308c59616d54224852c428e66bb1a55fc9519e235f44e468f",
    "eb45222dba0fbd18017cf5ad1174bde7379aa35d469ca183547f0f448b6828d7"
   ],
   "wrongText": "Nichts passiert. Was muss vorher da sein, damit sich Gruppen verschieden entwickeln können?",
   "hints": [
    "Denkt an die Läufe auf dem Bildschirm: mit und ohne Austausch.",
    "Wann darf man von zwei Arten sprechen?",
    "Trennung und Variabilität stehen am Anfang, die zwei Arten am Ende."
   ],
   "rescue": "UmVpaGVuZm9sZ2U6IElzb2xhdGlvbiB1bmQgVmFyaWFiaWxpdMOkdCAoYmVpZGUgUmVpaGVuZm9sZ2VuIHNpbmQgbcO2Z2xpY2gpLCBkYW5uIHZlcnNjaGllZGVuZSBTZWxla3Rpb24sIHZpZWxlIEdlbmVyYXRpb25lbiwgYW0gRW5kZSB6d2VpIEFydGVuLg==",
   "rescueTask": "Zeichnet die fünf Schritte als Kette ins Logbuch.",
   "onSolve": {
    "text": "Die Kette erscheint als Wandtafel.",
    "wall": [
     {
      "id": "w-artbildung",
      "title": "Weg zur Artbildung",
      "tag": "Ergebnis",
      "kind": "ergebnis",
      "text": "Trennung und Variabilität, verschiedene Selektion, viele Generationen, zwei Arten."
     }
    ],
    "then": "r3v3-3-schloss"
   }
  },
  "r3v3-3-schloss": {
   "id": "r3v3-3-schloss",
   "type": "cloze",
   "triple": true,
   "title": "Schloss 3",
   "logbook": {
    "where": "Logbuch Seite 3.4, Feld „Merksatz“",
    "task": "Schreibt den Satz aus Schloss 3 zuerst in eigenen Worten: Aussage, Beleg und Reichweite."
   },
   "prompt": "Vervollständigt den Satz. Das Schloss verlangt einen gesicherten Satz aus Aussage, Beleg und Reichweite.",
   "parts": [
    {
     "strong": "Aussage: "
    },
    "Eine neue Art entsteht in ",
    {
     "gap": "g1",
     "label": "Lücke 1"
    },
    " über ",
    {
     "gap": "g2",
     "label": "Lücke 2"
    },
    ".",
    {
     "nl": true
    },
    {
     "strong": "Beleg: "
    },
    "In der Simulation verschob sich der Mittelwert ",
    {
     "gap": "g3",
     "label": "Lücke 3"
    },
    ", und die beiden Inseln blieben nur ",
    {
     "gap": "g4",
     "label": "Lücke 4"
    },
    " verschieden.",
    {
     "nl": true
    },
    {
     "strong": "Reichweite: "
    },
    "Über ",
    {
     "gap": "g5",
     "label": "Lücke 5"
    },
    " sagt das noch nichts."
   ],
   "bank": [
    {
     "id": "pop",
     "label": "Populationen"
    },
    {
     "id": "ein",
     "label": "einem Einzeltier"
    },
    {
     "id": "vg",
     "label": "viele Generationen"
    },
    {
     "id": "eg",
     "label": "eine einzige Generation"
    },
    {
     "id": "ue",
     "label": "über mehrere Generationen"
    },
    {
     "id": "so",
     "label": "sofort"
    },
    {
     "id": "oa",
     "label": "ohne Austausch"
    },
    {
     "id": "ma",
     "label": "mit Austausch"
    },
    {
     "id": "eb",
     "label": "die Echtheit des Berolinavis"
    },
    {
     "id": "fb",
     "label": "die Fälschung, die damit bewiesen ist"
    },
    {
     "id": "hp",
     "label": "Hallmanns Pressemitteilung"
    }
   ],
   "gapHash": {
    "g1": "f89ac6009fed0c755dedd171650c932ef452dc568db7b4500f5a7708f84956f7",
    "g2": "4a50f61fc8b2dfa56ed216fabf268450a5e4ce344984e81f864f68404cf98ddf",
    "g3": "433b55674c561b77a4dea77cc22723157766a8a7a7b0c9b7fe3cc84f22f021fb",
    "g4": "3fb06881765267274becb494a3df32aef66b4fe6b066eee65fff5065448ed51f",
    "g5": "95d39c9bf1b71d5902e55b2a24fd6cab0242690eb36de44653aae60ccfe50d33"
   },
   "tripleText": "Das Schloss bleibt zu. Mindestens eine Lücke stimmt nicht. Lest den Satz laut und prüft jede Lücke einzeln.",
   "traps": [
    {
     "g": "g5",
     "v": "fb",
     "from": "kemal",
     "text": "Vorsicht. Wir haben eine Behauptung geprüft, nicht den Fund und nicht die Person."
    },
    {
     "g": "g1",
     "v": "ein",
     "from": "kemal",
     "text": "Ein Tier allein bildet keine Art. Denkt an die Simulation."
    },
    {
     "g": "g2",
     "v": "eg",
     "from": "kemal",
     "text": "Wie viele Generationen brauchte die Simulation?"
    }
   ],
   "hash": "b343f933f0f11d4a8a1da36c2e7c557cb4e83fa556be8e085e5e374c0542b59c",
   "hints": [
    "Lest den Satz laut. Was ist die Aussage, was der Beleg, was die Grenze?",
    "Haben wir in Raum 3 den Berolinavis untersucht?",
    "Die Lücken nennen die Gruppe, die Zeit, das Ergebnis der Simulation und die Grenze. Streicht in der Wortbank zuerst, was nicht passt."
   ],
   "rescue": "QXVzc2FnZTogRWluZSBuZXVlIEFydCBlbnRzdGVodCBpbiBQb3B1bGF0aW9uZW4gw7xiZXIgdmllbGUgR2VuZXJhdGlvbmVuLiBCZWxlZzogSW4gZGVyIFNpbXVsYXRpb24gdmVyc2Nob2Igc2ljaCBkZXIgTWl0dGVsd2VydCDDvGJlciBtZWhyZXJlIEdlbmVyYXRpb25lbiwgdW5kIGRpZSBiZWlkZW4gSW5zZWxuIGJsaWViZW4gbnVyIG9obmUgQXVzdGF1c2NoIHZlcnNjaGllZGVuLiBSZWljaHdlaXRlOiDDnGJlciBkaWUgRWNodGhlaXQgZGVzIEJlcm9saW5hdmlzIHNhZ3QgZGFzIG5vY2ggbmljaHRzLg==",
   "rescueTask": "Schreibt Aussage, Beleg und Reichweite in euren Worten ins Logbuch.",
   "onSolve": {
    "fx": "lock",
    "fxTitle": "Schloss 3 geöffnet",
    "fxText": "Aussage, Beleg und Reichweite halten. Eure Prüfung hat standgehalten.",
    "evidence": {
     "id": "ev-3",
     "title": "Beweisakte Teil 3 · Evolution braucht Populationen und Generationen",
     "text": "Neue Arten entstehen nicht bei einem Einzeltier, sondern in Populationen über viele Generationen. Über die Echtheit des Berolinavis sagt das nichts."
    },
    "message": {
     "from": "wendt",
     "text": "Gut gearbeitet. Merkt euch: Ihr habt eine Behauptung geprüft, nicht den Fund.\n\n– J. W."
    },
    "message2": {
     "from": "kemal",
     "text": "Ich muss euch noch etwas zeigen. Auf Dr. Wendts Tisch lag eine Seite mit ihren Labornotizen:\n\n„L. Brecht hat nachts Dateien gelöscht, Verdacht.“\n\nDas kann ich mir nicht vorstellen. Aber Wendt hat es geschrieben."
    }
   }
  },
  "r3v3-3-artbegriff": {
   "id": "r3v3-3-artbegriff",
   "type": "freetext",
   "minLength": 100,
   "title": "Rassen oder Arten? (Zusatzaufgabe)",
   "prompt": "Ein Schüler sagt: „Die verschiedenen Taubenrassen aus Raum 1 sind eigene Arten.“ Beurteilt die Aussage mit dem Artbegriff.",
   "placeholder": "Eine Art ist … Taubenrassen …",
   "checks": [
    "Das Feld ist ausgefüllt."
   ],
   "hints": [
    "Wie ist der Begriff „Art“ festgelegt?",
    "Können sich Taubenrassen untereinander fortpflanzen?",
    "Eine Art ist eine Fortpflanzungsgemeinschaft mit fruchtbaren Nachkommen. Taubenrassen stammen von der Felsentaube ab."
   ],
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Rassen sind keine Arten. Der Artbegriff hat Grenzen, aber hier passt er."
    }
   }
  },
  "r3v3-3-brecht": {
   "id": "r3v3-3-brecht",
   "type": "pick",
   "count": 2,
   "title": "Beobachtung oder Deutung? (Zusatzaufgabe)",
   "prompt": "Wendt schreibt: „L. Brecht hat nachts Dateien gelöscht, Verdacht.“ Wählt die zwei Aussagen, die beobachtet wurden.",
   "cards": [
    {
     "id": "a",
     "label": "Der Zeitstempel zeigt 02:14, Änderungen von L. Brecht."
    },
    {
     "id": "b",
     "label": "Die Dateien liegen nicht mehr am alten Ort."
    },
    {
     "id": "c",
     "label": "Brecht hat die Dateien gelöscht."
    },
    {
     "id": "d",
     "label": "Es besteht Verdacht."
    }
   ],
   "hash": "77194913bd6b6d7997614f6099d25b4ba2f4b7e27f549fc487b8cc2ecf4b4a1e",
   "wrongText": "Nichts passiert. Was kann man sehen oder messen, und was ist schon eine Erklärung?",
   "hints": [
    "Was lässt sich am Bildschirm sehen?",
    "„Gelöscht“ und „Verdacht“: Sind das Beobachtungen oder Erklärungen?",
    "Zwei Aussagen beschreiben, was zu sehen ist. Die beiden anderen deuten es."
   ],
   "rescue": "QmVvYmFjaHRldDogWmVpdHN0ZW1wZWwgMDI6MTQgdW5kIGRpZSBEYXRlaWVuIGFtIG5ldWVuIE9ydC4gR2VkZXV0ZXQ6IGdlbMO2c2NodCB1bmQgVmVyZGFjaHQu",
   "rescueTask": "Trennt in zwei Spalten: Beobachtung und Deutung.",
   "onSolve": {
    "message": {
     "from": "kemal",
     "text": "Beobachtung und Deutung. Merkt euch das."
    }
   }
  }
 }
});
