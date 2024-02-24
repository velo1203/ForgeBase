class Finder {
    constructor(db) {
        this.db = db;
    }

    // 동적으로 WHERE 절을 생성하는 메서드
    buildWhereClause(jsonQuery) {
        const whereClauses = Object.entries(jsonQuery).map(
            ([attribute, value]) => {
                return `Attributes.AttributeName = '${attribute}' AND EntityValues.Value = '${value}'`;
            }
        );
        return whereClauses.join(" OR ");
    }

    // get 메서드: 입력된 쿼리 객체를 바탕으로 검색을 수행하고 결과를 반환
    async get(jsonQuery) {
        const whereClause = this.buildWhereClause(jsonQuery);
        const sql = `
            SELECT 
                Entities.EntityID, 
                Attributes.AttributeName, 
                EntityValues.Value
            FROM 
                Entities
            JOIN 
                EntityValues ON Entities.EntityID = EntityValues.EntityID
            JOIN 
                Attributes ON EntityValues.AttributeID = Attributes.AttributeID
            WHERE 
                ${whereClause}
        `;

        try {
            const queryResults = await this.db.all(sql);
            const entityIds = [];

            queryResults.forEach(({ EntityID }) => {
                entityIds.push(EntityID);
            });

            return this.getByIds(entityIds);
        } catch (error) {
            console.error("Error executing get method in Finder:", error);
            throw error;
        }
    }

    async getAll() {
        const sql = `
          SELECT 
            Entities.EntityID, 
            Attributes.AttributeName, 
            EntityValues.Value
          FROM 
            Entities
          JOIN 
            EntityValues ON Entities.EntityID = EntityValues.EntityID
          JOIN 
            Attributes ON EntityValues.AttributeID = Attributes.AttributeID
        `;

        try {
            const queryResults = await this.db.all(sql);
            const finalResults = {};

            queryResults.forEach(({ EntityID, AttributeName, Value }) => {
                if (!finalResults[EntityID]) {
                    finalResults[EntityID] = { EntityID };
                }
                finalResults[EntityID][AttributeName] = Value;
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
            Attributes.AttributeName, 
            EntityValues.Value
          FROM 
            Entities
          JOIN 
            EntityValues ON Entities.EntityID = EntityValues.EntityID
          JOIN 
            Attributes ON EntityValues.AttributeID = Attributes.AttributeID
          WHERE 
            Entities.EntityID IN (${entityIds.join(",")})
        `;

        try {
            const queryResults = await this.db.all(sql);
            const finalResults = {};

            queryResults.forEach(({ EntityID, AttributeName, Value }) => {
                if (!finalResults[EntityID]) {
                    finalResults[EntityID] = { EntityID };
                }
                finalResults[EntityID][AttributeName] = Value;
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
