class Finder {
    constructor(db) {
        this.db = db;
    }

    async get(jsonQuery, entityType) {
        // JOIN을 위한 변수 초기화
        let joinClause = "";
        let whereClause = `Entities.EntityType = '${entityType}'`;
        let index = 1;

        // JSON 쿼리의 각 항목에 대해 JOIN과 WHERE 절을 동적으로 구성
        for (const [attribute, value] of Object.entries(jsonQuery)) {
            joinClause += `
                JOIN EntityValues AS EV${index}
                ON Entities.EntityID = EV${index}.EntityID
            `;
            whereClause += ` AND EV${index}.Attribute = '${attribute}' AND EV${index}.Value = '${value}'`;
            index++;
        }
        console.log("whereClause", whereClause);
        // SQL 쿼리 구성
        const sql = `
            SELECT DISTINCT Entities.EntityID
            FROM Entities
            ${joinClause}
            WHERE ${whereClause}
        `;

        try {
            // SQL 쿼리 실행
            const queryResults = await this.db.all(sql);
            const entityIds = queryResults.map(({ EntityID }) => EntityID);

            // 엔티티 ID에 해당하는 상세 정보를 가져옴
            const results = await this.getByIds(entityIds);
            return results;
        } catch (error) {
            console.error("Error executing get method in Finder:", error);
            throw error;
        }
    }

    async getAll(entityType) {
        const sql = `
        SELECT 
            Entities.EntityID, 
            EntityValues.Attribute, 
            EntityValues.Value
        FROM 
            Entities
        JOIN 
            EntityValues ON Entities.EntityID = EntityValues.EntityID
        WHERE Entities.EntityType = '${entityType}'
    `;

        try {
            const queryResults = await this.db.all(sql);
            const finalResults = {};

            queryResults.forEach(({ EntityID, Attribute, Value }) => {
                if (!finalResults[EntityID]) {
                    finalResults[EntityID] = { EntityID };
                }
                finalResults[EntityID][Attribute] = Value;
            });
            return Object.values(finalResults);
        } catch (error) {
            console.error("Error executing getAll method in Finder:", error);
            throw error;
        }
    }

    async getByIds(entityIds) {
        const sql = `
        SELECT 
            Entities.EntityID, 
            EntityValues.Attribute, 
            EntityValues.Value
        FROM 
            Entities
        JOIN 
            EntityValues ON Entities.EntityID = EntityValues.EntityID
        WHERE 
            Entities.EntityID IN (${entityIds.join(",")})
    `;

        try {
            const queryResults = await this.db.all(sql);
            const finalResults = {};

            queryResults.forEach(({ EntityID, Attribute, Value }) => {
                if (!finalResults[EntityID]) {
                    finalResults[EntityID] = { EntityID };
                }
                finalResults[EntityID][Attribute] = Value;
            });

            return Object.values(finalResults);
        } catch (error) {
            console.error(
                "Error executing getAllAttributesAndValuesForEntities method in Finder:",
                error
            );
            throw error;
        }
    }
}

module.exports = Finder;
