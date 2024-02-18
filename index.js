const Attributes = require("./Attributes/Attributes");
const Database = require("./DataBase/DataBase");
const Entity = require("./Entity/Entity");

class dataForge {
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
                    const attributes = await this.attributes.get(
                        entity.entity_id
                    );
                    return { ...entity, attributes }; // 객체를 생성
                })
            );

            // 모든 엔티티와 속성을 포함하는 객체 배열을 JSON 문자열로 변환
            const jsonString = JSON.stringify(results, null, 2);
            return jsonString; // JSON 문자열 반환
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    create(userData, Type) {
        return this.entity
            .create(Type)
            .then((entityId) => {
                const attributePromises = Object.entries(userData).map(
                    ([key, value]) => {
                        return this.attributes.create(entityId, key, value);
                    }
                );

                return Promise.all(attributePromises)
                    .then(() => {
                        return {
                            Title: "Success",
                            Message: `${Type} created successfully`,
                            Status: 200,
                        };
                    })
                    .catch((err) => {
                        throw {
                            Title: "Error",
                            Message: `Error creating ${Type} attributes`,
                            Status: 500,
                        };
                    });
            })
            .catch((err) => {
                throw {
                    Title: "Error",
                    Message: `Error creating ${Type} entity`,
                    Status: 500,
                };
            });
    }
}

const DB = new dataForge("data.db");

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
