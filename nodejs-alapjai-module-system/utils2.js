// Paraméterként egy user objektumokat tartalmazó tömböt vár.
// A függvény visszatérési értéke egy olyan új tömb, ami olyan objektumokat tartalmaz,
// ami a következő tulajdonságokkal rendelkezik: - isAdult : a user kora alapján
// egy true/false érték attól függően, hogy elmúlt-e 18 éves

const generateUserList = (users) => {
    return users.map(user => (
        {
            fullName: `${user.firstName} ${user.lastName}`,
            isAdult: user.age >= 18
        }
    ))
}


// Paraméterként egy user objektumokat tartalmazó tömböt vár.
// A függvény visszatérési értéke egy olyan string, ami az összes felhasználó teljes nevét
// tartalmazza vesszővel elválasztva.

const getUserNames = (users) => {
    return users.map(user => `${user.firstName} ${user.lastName}`).join(', ')
}


// Exportáld a két függvényt ügyelve arra, hogy a későbbiekben ne lehessen felülírni őket!

module.exports = Object.freeze({ generateUserList, getUserNames })