#!/usr/bin/env python3
"""Prüft den Upload-Ordner vor dem Hochladen: Es dürfen keine Lösungen im Klartext öffentlich werden.
Aufruf im Hauptordner des Spiels:  python3 werkzeug/pruefe_upload.py
Ende mit Code 1, wenn etwas gefunden wird."""
import os, re, sys

VERBOTENE_NAMEN = [r'\.src\.js$', r'^Code_und_Quellen', r'^Loesungen', r'^LIESMICH', r'Steckbrief', r'Erwartungshorizont', r'Testplan']
VERBOTENE_TEXTE = [r'LÖSUNGEN FÜR DICH', r'NUR FÜR DIE LEHRKRAFT', r'\bLösung\s*:', r'solution\s*:']
TEXT_ENDUNGEN = ('.js', '.html', '.txt', '.md', '.json', '.css')

fehler = []
for ordner, unterordner, dateien in os.walk('.'):
    unterordner[:] = [u for u in unterordner if u not in ('.git', 'werkzeug', 'node_modules')]
    for name in dateien:
        pfad = os.path.join(ordner, name)
        if any(re.search(m, name, re.I) for m in VERBOTENE_NAMEN):
            fehler.append(pfad + ': Dateiname gehört nicht in den Upload')
            continue
        if not name.lower().endswith(TEXT_ENDUNGEN) or 'fonts' in pfad or name.upper().startswith('README'):
            continue
        text = open(pfad, encoding='utf-8', errors='replace').read()
        for m in VERBOTENE_TEXTE:
            for treffer in re.finditer(m, text):
                zeile = text.count('\n', 0, treffer.start()) + 1
                fehler.append('%s, Zeile %d: „%s“' % (pfad, zeile, treffer.group(0)))
if fehler:
    print('NICHT HOCHLADEN. Gefunden:')
    for f in fehler:
        print('  ' + f)
    sys.exit(1)
print('In Ordnung: keine Lösungen im Klartext gefunden.')
