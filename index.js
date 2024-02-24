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
const productRef = forgeBase.setReference("Product");

// userRef.create({
//     name: `user1`,
//     age: 5,
// });

for (let i = 0; i < 10000; i++) {
    productRef.create({
        name: "iphone",
        price: 1000,
        EntityID: 1,
    });
}

// userRef.get({ name: "user1", age: 5 }, true).then((res) => {
//     console.log(res);
// });

// userRef.getAll({ name: "iphone" }, true).then((res) => {
//     console.log(res);
// });
