---
class: mapa
dg-note-icon: 2
dg-pinned: true
dg-publish: true
cssclasses:
  - cards
topics:
dg-metatags:
  description: "Evangelhos, Atos, cartas e Apocalipse "
---

# Novo Testamento

```base
formulas:
  description: 'note["dg-metatags"].description'

properties:
  formula.description:
    displayName: "Descrição"

views:
  - type: table
    name: Tabela
    filters:
      and:
        - file.folder == this.file.folder
        - file.name != this.file.name
        - note["dg-publish"] == true
    order:
      - file.name
      - formula.description
    sort:
      - property: file.name
        direction: ASC
      - property: formula.description
        direction: ASC

```

