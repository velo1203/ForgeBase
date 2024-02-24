class Relation {
    constructor(db) {
        this.db = db;
    }

    // 관계 생성
    create(parentEntityId, childEntityId, relationType) {
        const sql = `INSERT INTO EntityRelations (ParentEntityID, ChildEntityID, RelationType) VALUES (?, ?, ?)`;
        return this.db.run(sql, [parentEntityId, childEntityId, relationType]);
    }

    // 특정 부모 엔티티의 모든 자식 엔티티 조회
    findChildrenByParentId(parentEntityId) {
        const sql = `SELECT * FROM EntityRelations WHERE ParentEntityID = ?`;
        return this.db.all(sql, [parentEntityId]);
    }

    // 특정 자식 엔티티의 모든 부모 엔티티 조회
    findParentsByChildId(childEntityId) {
        const sql = `SELECT * FROM EntityRelations WHERE ChildEntityID = ?`;
        return this.db.all(sql, [childEntityId]);
    }

    // 관계 삭제
    delete(relationId) {
        const sql = `DELETE FROM EntityRelations WHERE RelationID = ?`;
        return this.db.run(sql, [relationId]);
    }

    // 특정 관계 유형에 따른 관계 조회
    findByType(relationType) {
        const sql = `SELECT * FROM EntityRelations WHERE RelationType = ?`;
        return this.db.all(sql, [relationType]);
    }
}

module.exports = Relation;
