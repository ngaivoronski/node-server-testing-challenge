const Users = require("./usersModel");
const db = require("../data/dbConfig.js");

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

    // describe("insert()", function() {
    //     it.skip("should add the user to the database", async function() {
    //     // call insert, passing a hobbit object
    //     await Users.insert({ name: "user1", password: "pass" });
    //     await Users.insert({ name: "user2", password: "pass" });

    //     // check the database directly
    //     const users = await db("users");
    //     expect(users).toHaveLength(2);
    //     });
    // });
});

// function getFakeHobbit() {
//     return {
//         name: "sam",
//     };
// }
