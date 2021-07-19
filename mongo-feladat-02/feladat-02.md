1. Készíts el egy „directors” listát, amelyben filmrendezőket fogunk tárolni!
2. Ments el benne 3 „rendező” dokumentumot az insertOne() parancs segítségével:

`db.directors.insertOne({_id: 1, name: "Steven Spielberg", birthYear: 1930, movies: []})`
`db.directors.insertOne({_id: 2, name: "James Cameron", birthYear: 1933, movies: []})`
`db.directors.insertOne({_id: 3, name: "Clint Eastwood", birthYear: 1936, movies: []})`

3. Nincs ilyen számű feladat

4. Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait

`db.directors.updateOne({name: "Steven Spielberg"}, {$push: {movies: {$each: [ObjectId("60f2cd591e0914df32355e15"),ObjectId("60f2cd591e0914df32355e16"), ObjectId("60f2cd591e0914df32355e17"), ObjectId("60f2cd591e0914df32355e18")]}}})`
`db.directors.updateOne({name: "Clint Eastwood"}, {$push: {movies: {$each: [ObjectId("60f2cd591e0914df32355e19"), ObjectId("60f2cd591e0914df32355e1a"), ObjectId("60f2cd591e0914df32355e1b")]}}})`
`db.directors.updateOne({name: "James Cameron"}, {$push: {movies: {$each: [ObjectId("60f2cd591e0914df32355e1c"), ObjectId("60f2cd591e0914df32355e1d"), ObjectId("60f2cd591e0914df32355e1e")]}}})`

5. Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)!

`db.directors.find().pretty()`

6. Ha elkészültél a rendezői listával, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.

`db.movies.updateMany({}, {$unset: {director: 0}})`

7. Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)

`db.movies.find({releaseYear: {$gte: 2000}})`
`db.movies.find({releaseYear: {$lt: 2000}})`

8. Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)

`db.movies.find({$and: [{releaseYear: {$gt: 1995}}, {releaseYear: {$lt: 2010}}]})`

9. Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!

`db.movies.find({$and: [{releaseYear: {$gt: 2000, $lt: 2020}}, {category: "FANTASY"}]})`

10. Kérdezd le a filmeket, amelyeknek a kategóriája NEM FANTASY ($ne)!

`db.movies.find({category: {$ne: "FANTASY"}})`