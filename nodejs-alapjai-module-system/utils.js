// A függvény paraméterként egy dátumot vár és egy napszámot.
// A napszám alapértelmezett értéke 3. A visszatérési értéke az adott dátum napszámmal megnövelt értéke,
// azaz az 1970 óta eltelt idő milliszekundumban.

const increaseDate = (date, day = 3) => {
    return date.getTime() + (day * 24 * 60 * 60 * 1000)
}

console.log(increaseDate(new Date('Jun 15 2000 11:10:53')))


// Paraméterként egy tömböt vár, ami dátum objektumokat tartalmaz.
// A függvény visszaad egy olyan új tömböt, ahol a dátumokhoz +3 nap hozzá van adva,
// és már magyar lokalizáció szerint vannak formázva. (pl.: 2021. július 3.)

const increaseAndFormatDate = (dates) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
    return dates.map(date =>
        new Intl.DateTimeFormat('hu-HU', dateOptions).format(increaseDate(date))
    )
}

module.exports = increaseAndFormatDate