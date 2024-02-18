const Attributes = require("./Attributes/Attributes");
const Database = require("./DataBase/DataBase");
const Entity = require("./Entity/Entity");

class ForgeBase {
    constructor(DataBasePath) {
        const db = new Database(DataBasePath);
        this.entity = new Entity(db);
        this.attributes = new Attributes(db);
    }

    async getByType(Type) {
        try {
            const entities = await this.entity.get(Type);
            const results = await Promise.all(
                entities.map(async (entity) => {
                    const attributesArray = await this.attributes.get(
                        entity.entity_id
                    );
                    // attributes 배열을 객체로 변환
                    const attributesObject = attributesArray.reduce(
                        (acc, attr) => {
                            acc[attr.key] = attr.value;
                            return acc;
                        },
                        {}
                    );

                    return { ...entity, attributes: attributesObject }; // 속성 객체를 사용하여 결과 구성
                })
            );

            return results; // JSON.parse(jsonString) 대신 직접 객체 배열 반환
        } catch (err) {
            throw {
                Title: "Error",
                Message: "Error getting entities by type",
                Status: 500,
            };
        }
    }

    async getById(entityId) {
        try {
            const entity = await this.entity.read(entityId);
            const attributes = await this.attributes.get(entityId);
            return { ...entity, attributes };
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async create(userData, Type) {
        try {
            const entityId = await this.entity.create(Type);
            const attributePromises = Object.entries(userData).map(
                ([key, value]) => this.attributes.create(entityId, key, value)
            );

            await Promise.all(attributePromises);

            return {
                Title: "Success",
                Message: `${Type} created successfully`,
                Status: 200,
            };
        } catch (err) {
            throw {
                Title: "Error",
                Message: `Error creating ${Type} attributes`,
                Status: 500,
            };
        }
    }
}

const DB = new ForgeBase("data.db");

async function createAndLog() {
    try {
        const result = await DB.create({ name: "John Doe", age: 25 }, "Person");
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

// createAndLog();

DB.getByType("Person").then((result) => {
    console.log(result);
});
