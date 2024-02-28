class Creator {
    constructor(db) {
        this.db = db;
    }

    async create(entityType, jsonQuery) {
        const sql = `
          INSERT INTO Entities (EntityType)
          VALUES (?);
        `;

        try {
            // 엔터티 생성 및 EntityID 추출
            const entityID = await this.db.run(sql, [entityType]);

            const insertValuesSql = `
                INSERT INTO EntityValues (EntityID, Attribute, Value)
                VALUES ${Object.keys(jsonQuery)
                    .map(() => "(?, ?, ?)")
                    .join(", ")};
            `;
            // 모든 키와 값을 하나의 배열로 준비
            const values = [];
            Object.keys(jsonQuery).forEach((key) => {
                values.push(entityID, key, jsonQuery[key]);
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
