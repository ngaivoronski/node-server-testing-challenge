const request = require("supertest");
const server = require("./server.js");
const Users = require("../users/usersModel");
const db = require("../data/dbConfig");

describe("server.js", function() {
    describe("environment", function() {
        it("should set environment to testing", function() {
        expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe("GET /", function() {
        it("should return a 200 OK", function() {
        // spin up the server
        return request(server)
            .get("/")
            .then(res => {
            expect(res.status).toBe(200);
            });
        // make GET request to /
        // look at the http status code for the response
        });

        it("should return a JSON", function() {
        return request(server)
            .get("/")
            .then(res => {
            expect(res.type).toMatch(/json/i);
            });
        });

        it("should return {api: 'up'}", function() {
        return request(server)
            .get("/")
            .then(res => {
            expect(res.body.api).toBe("up");
            });
        });
    });
});

describe("users model", function() {
    beforeEach(async () => {
        await db("users").truncate();
    });

    describe('insert function', () => {
        it('inserts users into the db', async () => {
            let userNumber;

            userNumber = await db('users');

            expect(userNumber).toHaveLength(0);
            await Users.insert({ username: "user1", password: "pass" });
            await Users.insert({ username: "user2", password: "pass" });

            userNumber = await db('users');
            expect(userNumber).toHaveLength(2);
        });
    });

    describe('delete function', () => {
        it('deletes users from the db', async () => {
            let userNumber;

            await Users.insert({ username: "user1", password: "pass" });

            userNumber = await db('users');
            expect(userNumber).toHaveLength(1);

            await Users.remove(1);

            userNumber = await db('users');
            expect(userNumber).toHaveLength(0);
        });
    });

    
});
