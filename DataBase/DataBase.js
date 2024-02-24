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
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS Entities (
                EntityID INTEGER PRIMARY KEY AUTOINCREMENT,
                EntityType TEXT NOT NULL
            );`);

            this.db.run(`CREATE TABLE IF NOT EXISTS EntityValues (
                ValueID INTEGER PRIMARY KEY AUTOINCREMENT,
                EntityID INTEGER NOT NULL,
                Attribute TEXT NOT NULL,
                Value TEXT,
                FOREIGN KEY (EntityID) REFERENCES Entities (EntityID)
            );`);

            this.db.run(
                `CREATE TABLE IF NOT EXISTS EntityRelations (
                RelationID INTEGER PRIMARY KEY AUTOINCREMENT,
                ParentEntityID INTEGER NOT NULL,
                ChildEntityID INTEGER NOT NULL,
                RelationType TEXT NOT NULL,
                FOREIGN KEY (ParentEntityID) REFERENCES Entities (EntityID),
                FOREIGN KEY (ChildEntityID) REFERENCES Entities (EntityID)
            );`,
                () => {
                    console.log("All tables initialized successfully");
                }
            );
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
