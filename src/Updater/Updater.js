class Updater {
    constructor(db) {
        this.db = db;
    }

    async update(entityType, ids, updateQuery) {
        const batchSize = 500; // 예를 들어, 500으로 설정
        for (let i = 0; i < ids.length; i += batchSize) {
            const batchIds = ids.slice(i, i + batchSize);
            // batchIds를 사용하여 업데이트 쿼리 실행
            // updateQuery 객체에서 각 속성(Key) 및 해당 값을(Value) 추출
            const updates = Object.entries(updateQuery).map(
                ([attribute, value]) => {
                    const placeholders = batchIds.map(() => "?").join(", ");
                    const sql = `
                    UPDATE EntityValues
                    SET Value = ?
                    WHERE EntityID IN (${placeholders})
                    AND Attribute = ?
                    AND EntityID IN (
                        SELECT EntityID FROM Entities
                        WHERE EntityType = ?
                    )
                `;
                    return this.db.run(sql, [
                        value,
                        ...batchIds,
                        attribute,
                        entityType,
                    ]);
                }
            );

            try {
                // 모든 업데이트를 병렬로 실행
                await Promise.all(updates);
            } catch (error) {
                console.error("Error updating entity values:", error);
                throw error;
            }
        }
    }
}

module.exports = Updater;
