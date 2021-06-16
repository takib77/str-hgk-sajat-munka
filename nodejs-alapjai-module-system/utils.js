// A függvény paraméterként egy dátumot vár és egy napszámot.
// A napszám alapértelmezett értéke 3. A visszatérési értéke az adott dátum napszámmal megnövelt értéke,
// azaz az 1970 óta eltelt idő milliszekundumban.

const increaseDate = (date, day = 3) => {
    return new Date(`${date}+${day}`).getTime()
}

console.log(increaseDate('Jun 15 2000 11:10:53'))


// Paraméterként egy tömböt vár, ami dátum objektumokat tartalmaz.
// A függvény visszaad egy olyan új tömböt, ahol a dátumokhoz +3 nap hozzá van adva,
// és már magyar lokalizáció szerint vannak formázva. (pl.: 2021. július 3.)

const increaseAndFormatDate = dates => {
    const newDates = []
    for (let i = 0; i < dates.length; i++) {
        const temp = new Intl.DateTimeFormat('hu-HU').format(new Date(dates[i]).getTime())
        newDates.push(temp)
    }
    return newDates
}

module.exports = increaseAndFormatDate