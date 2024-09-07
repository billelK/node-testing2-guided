const db = require("../../data/dbConfig")
const hobbit = require("./hobbits-model")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest() 
})

beforeEach(async () => {
    await db.seed.run() 
})

test("environment is testing ", ()=> {
    expect(process.env.NODE_ENV).toBe("testing")
})

describe("getAll ", ()=> {
    test("resolves all the hobbits in the DB", async() => {
        const result = await hobbit.getAll()
        expect(result).toEqual([
            { id: 1, name: 'sam' },
            { id: 2, name: 'frodo' },
            { id: 3, name: 'pippin' },
            { id: 4, name: 'merry' }
          ])
        expect(result).toHaveLength(4)
    })
})

describe("getById", () => {
    test("resolves to the use by a specific ID", async()=> {
        let result = await hobbit.getById(1)
        expect(result).toMatchObject({name: "sam"})
        result = await hobbit.getById(2)
        expect(result).toMatchObject({name: "frodo"})
        result = await hobbit.getById(3)
        expect(result).toMatchObject({name: "pippin"})
        result = await hobbit.getById(4)
        expect(result).toMatchObject({name: "merry"})
    })
})

describe("insert", ()=> {
    const bilbo = {name: "bilbo"}
    test("resolves to the newly created hobbit", async() => {
        const result = await hobbit.insert(bilbo)
        expect(result).toMatchObject(bilbo)
    })
    test("if the newly created hobbit exists in the Hobbits DB", async() => {
        await hobbit.insert(bilbo)
        const result = await db("hobbits") 
        expect(result).toHaveLength(5)
    })
})