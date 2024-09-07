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
        console.log(result)
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
        const result = await hobbit.getById(1)
        expect(result).toMatchObject({name: "sam"})
    })
})