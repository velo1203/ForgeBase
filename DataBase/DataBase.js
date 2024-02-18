const sqlite3 = require("sqlite3").verbose();

class Database {
    constructor(dbPath) {
        // 데이터베이스 연결
        this.db = new sqlite3.Database(
            dbPath,
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                if (err) {
                    console.error("Database connection error:", err.message);
                } else {
                    console.log("Database connection successful");
                }
            }
        );

        // 사용자 테이블 초기화
        this.initialize();
    }

    initialize() {
        const entitiesSql = `
        CREATE TABLE IF NOT EXISTS Entities (
            entity_id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL
        );
    `;
        const attributesSql = `
        CREATE TABLE IF NOT EXISTS Attributes (
            attribute_id INTEGER PRIMARY KEY AUTOINCREMENT,
            entity_id INTEGER NOT NULL,
            key TEXT NOT NULL,
            value TEXT NOT NULL,
            FOREIGN KEY (entity_id) REFERENCES Entities(entity_id)
        );
    `;
        const relationshipsSql = `
        CREATE TABLE IF NOT EXISTS Relationships (
            relationship_id INTEGER PRIMARY KEY AUTOINCREMENT,
            entity_id1 INTEGER NOT NULL,  
            entity_id2 INTEGER NOT NULL, 
            relation TEXT NOT NULL,
            FOREIGN KEY (entity_id1) REFERENCES Entities(entity_id),
            FOREIGN KEY (entity_id2) REFERENCES Entities(entity_id)
        );
    `;

        return Promise.all([
            this.CreateTable(entitiesSql),
            this.CreateTable(attributesSql),
            this.CreateTable(relationshipsSql),
        ])
            .then(() => {
                return "All tables initialized successfully";
            })
            .catch((err) => {
                return "Error initializing tables:", err;
            });
    }

    CreateTable(sql) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.error("Error running sql:", sql);
                    console.error(err);
                    reject(err);
                } else {
                    // this.lastID는 INSERT 작업에 대한 마지막 삽입 ID를 반환합니다.
                    resolve(this.lastID);
                }
            });
        });
    }

    // 단일 결과를 반환하는 SQL 쿼리를 실행하는 경우 (SELECT)
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.error("Error running sql:", sql);
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // 여러 결과를 반환하는 SQL 쿼리를 실행하는 경우 (SELECT)
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.error("Error running sql:", sql);
                    console.error(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = Database;
