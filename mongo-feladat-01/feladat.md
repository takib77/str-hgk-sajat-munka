1. Készíts egy videoStore nevű MongoDB adatbázist!
2. Hozz létre benne egy movies listát!

`use videoStore`

3. Ments el benne 10 új filmet (save()) a következő mezőkkel:

`db.movies.insertMany([
    {title: "Avatar", category: "fantasy", director: "Steven Spielberg"},
    {title: "Titanic", category: "fantasy", director: "Steven Spielberg"},
    {title: "Terminator", category: "fantasy", director: "Steven Spielberg"},
    {title: "E.T.", category: "fantasy", director: "Steven Spielberg"},
    {title: "Shark", category: "action", director: "Clint Eastwood"},
    {title: "Ready player one", category: "action", director: "Clint Eastwood"},
    {title: "Green book", category: "action", director: "Clint Eastwood"},
    {title: "Millionare baby", category: "romantic", director: "James Cameron"},
    {title: "Gran Torino", category: "romantic", director: "James Cameron"},
    {title: "Terminator 2", category: "romantic", director: "James Cameron"},
])`

4. Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!

`db.movies.updateMany({}, {$set: {ratings: []}})`

5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!

`db.movies.updateOne( {title:"E.T."}, {$push: {ratings: { $each: [2,4,1]}}})
db.movies.updateOne( {title:"Shark"}, {$push: {ratings: { $each: [5,4,3]}}})
db.movies.updateOne( {title:"Avatar"}, {$push: {ratings: { $each: [4,5,3]}}})`

6. Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!

`db.movies.updateMany({}, {$set: {releaseYear: 2000}})`

7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!

`db.movies.updateMany({}, [{$set: {category: {$toUpper: "$category"}}}])`