Listák közötti kapcsolatok, aggregáció gyakorlása, Embed vs. Referencing

Ha egy objektum (dokumentum) egy másik dokumentum egyik mezőjében van, akkor beszélhetünk „embed”, beágyazott dokumentumról.

Használjuk a videoStore adatbázist!

`use videoStore`

1. Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:

    - _id: kötelező megadni és csak egész számokból (integer) állhat
    - 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat
    - 'movies' mező: 'array' lehet és kötelező megadni
    - 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)

`db.createCollection("cinemas", {
  validator: {
    $jsonSchema: {      
      properties: {
        _id: { bsonType: "int"},
        name: { bsonType: "string", pattern: "[A-Za-z0-9 ]"},
        movies: { bsonType: "array"},
        address: {
            bsonType: "object",
            properties: {
                city: { bsonType: "string"}
            }
        }        
      },
      required: ["_id", "name", "movies", "address"]
    }
  }
})`

2. Ha még nem tettük meg, a cinema listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes movies listájához 3 db "_id" értéket a movies listából!

`db.cinemas.insertMany([
    {_id: NumberInt(1), name: "Apollo", movies: [
        ObjectId("60f2cd591e0914df32355e15"),
        ObjectId("60f2cd591e0914df32355e16"),
        ObjectId("60f2cd591e0914df32355e17")
    ],
    address: {city: "Budapest"}},
    {_id: NumberInt(2), name: "Urania", movies: [
        ObjectId("60f2cd591e0914df32355e18"),
        ObjectId("60f2cd591e0914df32355e19"),
        ObjectId("60f2cd591e0914df32355e1a")
    ],
    address: {city: "Szeged"}},
    {_id: NumberInt(3), name: "Pegasus", movies: [
        ObjectId("60f2cd591e0914df32355e1b"),
        ObjectId("60f2cd591e0914df32355e1c"),
        ObjectId("60f2cd591e0914df32355e1d"),
        ObjectId("60f2cd591e0914df32355e1e")
    ],
    address: {city: "Pécs"}},
])`

3. Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága!
    Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!

`db.cinemas.aggregate([
    {$match: {_id: 1}},
    {$lookup: {
        from: "movies",
        localField: "movies",
        foreignField: "_id",
        as: "movies"
    }}
]).pretty()`

4. Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.

| Már kész |

5. Kérdezzük le az egyik rendező által rendezett filmek adatait!

`db.directors.aggregate([
    {$match: {_id: 1}},
    {$lookup: {
        from: "movies",
        localField: "movies",
        foreignField: "_id",
        as: "movies"
    }},
    {$project: {
        _id:0,
        movies: 1
    }}
]).pretty()`

6. Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!

`db.directors.aggregate([
    {$match: {name: "James Cameron"}},
    {$lookup: {
        from: "movies",
        localField: "movies",
        foreignField: "_id",
        as: "movies"
    }},
    {$project: {
        _id:0,
        name: 1,
        "movies.title":1
    }}
]).pretty()`

7. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!

`db.movies.aggregate([
    {$set: {rateAvg: {$avg: "$ratings"}}},
    {$project: {
        _id: 0,
        title: 1,
        rateAvg: 1
    }},
    {$sort: {
        rateAvg: -1
    }},
    {$limit: 1}
]).pretty()`