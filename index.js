const Database = require("./DataBase/DataBase");
const { Reference } = require("./Reference/Reference");

class ForgeBase {
    constructor(DataBasePath) {
        this.db = new Database(DataBasePath);
    }

    setReference(EntityType) {
        return new Reference(EntityType, this.db);
    }
}

const forgeBase = new ForgeBase("./ForgeBase.db");

const userRef = forgeBase.setReference("User");

// for (let i = 0; i < 1000; i++) {
//     userRef.create({
//         name: `User1`,
//         age: 1,
//     });
// }

userRef.get({ age: 1, user: "12948", age: "2" }).then(
    (results) => {
        console.log(results);
    },
    (err) => {
        console.error(err);
    }
);
