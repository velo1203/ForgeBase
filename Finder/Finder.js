class Finder {
    constructor(db) {
        this.db = db;
    }

    // 동적으로 WHERE 절을 생성하는 메서드
    buildWhereClause(jsonQuery, entityType) {
        // 입력된 JSON 쿼리에서 각 속성과 값을 추출하여 조건을 생성합니다.
        const whereClauses = Object.entries(jsonQuery).map(
            ([attribute, value]) => {
                return `EntityValues.Attribute = '${attribute}' AND EntityValues.Value = '${value}'`;
            }
        );

        // 모든 조건을 연산자로 연결하고, 엔터티 타입에 대한 조건을 추가합니다.
        const whereClause =
            whereClauses.length > 0
                ? `(${whereClauses.join(
                      ` OR `
                  )}) AND Entities.EntityType = '${entityType}'`
                : `Entities.EntityType = '${entityType}'`;

        return whereClause;
    }

    // get 메서드: 입력된 쿼리 객체를 바탕으로 검색을 수행하고 결과를 반환
    async get(jsonQuery, strict = true, entityType) {
        //쿼리 최적화 필요
        const whereClause = this.buildWhereClause(jsonQuery, entityType);

        const sql = `
            SELECT DISTINCT 
                Entities.EntityID
            FROM 
                Entities
            JOIN 
                EntityValues ON Entities.EntityID = EntityValues.EntityID
            WHERE 
                ${whereClause}
        `;

        try {
            // SQL 쿼리를 실행합니다.
            const queryResults = await this.db.all(sql);
            // 쿼리 결과로부터 EntityID만 추출합니다.
            const entityIds = queryResults.map(({ EntityID }) => EntityID);
            const results = await this.getByIds(entityIds);
            // 각 EntityID에 대한 세부 정보를 가져옵니다.
            if (strict !== true) {
                return results;
            }
            const filteredResults = results.filter((result) => {
                return Object.entries(jsonQuery).every(([attribute, value]) => {
                    return result[attribute] === value;
                });
            });
            return filteredResults;
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
