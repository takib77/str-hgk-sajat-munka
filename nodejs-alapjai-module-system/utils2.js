// Paraméterként egy user objektumokat tartalmazó tömböt vár.
// A függvény visszatérési értéke egy olyan új tömb, ami olyan objektumokat tartalmaz,
// ami a következő tulajdonságokkal rendelkezik: - isAdult : a user kora alapján
// egy true/false érték attól függően, hogy elmúlt-e 18 éves

const generateUserList = users => {
    const userObject = []
    for (let i = 0; i < users.length; i++) {
        let fName = `${users[i].firstName} ${users[i].lastName}`
        let age;
        users[i].age >= 18 ? age = true : age = false
        userObject.push({ fullName: fName, isAdult: age })
    }
    return userObject
}


// Paraméterként egy user objektumokat tartalmazó tömböt vár.
// A függvény visszatérési értéke egy olyan string, ami az összes felhasználó teljes nevét
// tartalmazza vesszővel elválasztva.

const getUserNames = users => {
    let result = ''
    for (let i = 0; i < users.length; i++) {
        result += `${users[i].firstName} ${users[i].lastName}, `
    }
    return result.slice(0, result.length - 2)
}


// Exportáld a két függvényt ügyelve arra, hogy a későbbiekben ne lehessen felülírni őket!

module.exports = Object.freeze({ generateUserList, getUserNames })