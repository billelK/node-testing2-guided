const db = require("../data/dbConfig")
const request = require('supertest');
const server = require("./server")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest() 
})

beforeEach(async () => {
    await db.seed.run() 
})

describe("[GET] /hobbits", () => {
    test("responds with 200 ok ", async() => {
        const res = await request(server).get("/hobbits")
        expect(res.status).toBe(200)
    })
    test("responds with the four original hobbits ", async() => {
        const res = await request(server).get("/hobbits")
        expect(res.body).toHaveLength(4)
    })
})

describe("[POST] /honnits", () => {
    const bilbo = {name: "bilbo"}
    test("adds a hobbit to the data base", async() => {
        await request(server).post("/hobbits").send(bilbo)
        expect(await db("hobbits")).toHaveLength(5)
    })
    test("status code 201 created", async()=> {
        const res = await request(server).post("/hobbits").send(bilbo)
        expect(res.status).toBe(201)
    })
    test("responds with the newly created hobbit", async() => {
        const res = await request(server).post("/hobbits").send(bilbo)
        expect(res.body).toMatchObject(bilbo) 
    })
})