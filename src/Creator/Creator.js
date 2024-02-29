const { v4: uuidv4 } = require("uuid");

class Creator {
    constructor(db) {
        this.db = db;
    }

    async create(entityType, jsonQuery) {
        const sql = `
          INSERT INTO Entities (EntityID,EntityType)
          VALUES (? , ?);
        `;
        const id = uuidv4();

        try {
            // 엔터티 생성 및 EntityID 추출
            await this.db.run(sql, [id, entityType]);

            const insertValuesSql = `
                INSERT INTO EntityValues (EntityID, Attribute, Value)
                VALUES ${Object.keys(jsonQuery)
                    .map(() => "(?, ?, ?)")
                    .join(", ")};
            `;
            // 모든 키와 값을 하나의 배열로 준비
            const values = [];
            Object.keys(jsonQuery).forEach((key) => {
                values.push(id, key, jsonQuery[key]);
            });

            // 한 번의 쿼리로 모든 속성 값 추가
            await this.db.run(insertValuesSql, values);
        } catch (error) {
            console.error("Error creating entity:", error);
            throw error;
        }
    }

    async bulk(entityType, arr) {
        const ids = arr.map(() => uuidv4());
        const sql = `
            INSERT INTO Entities (EntityID,EntityType)
            VALUES ${ids.map(() => "(?, ?)").join(", ")};
        `;
        const params = [].concat(...ids.map((id) => [id, entityType])); // 2차원 배열을 1차원 배열로 변환
        try {
            // 엔터티 생성 및 EntityID 추출
            await this.db.run(sql, params);

            const insertValuesSql = `
                INSERT INTO EntityValues (EntityID, Attribute, Value)
                VALUES ${arr
                    .map(() =>
                        Object.keys(arr[0])
                            .map(() => "(?, ?, ?)") // arr[0]의 키 수만큼 반복
                            .join(", ")
                    )
                    .join(", ")};
            `;

            // 모든 키와 값을 하나의 배열로 준비
            const values = [];
            arr.forEach((item, index) => {
                Object.keys(item).forEach((key) => {
                    values.push(ids[index], key, item[key]);
                });
            });
            // 한 번의 쿼리로 모든 속성 값 추가
            await this.db.run(insertValuesSql, values);
        } catch (error) {
            console.error("Error creating entity:", error);
            throw error;
        }
    }
}

module.exports = Creator;
