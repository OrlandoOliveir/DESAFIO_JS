db = db.getSiblingDB('desafiojs');

db.createCollection("tarefas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome", "status", "data_agendado"], 
            properties: {
                nome: {
                    bsonType: "string",
                    description: "Nome da tarefa deve ser uma string"
                },
                status: {
                    bsonType: "string",
                    enum: ["A", "P", "C"], 
                    description: "Status deve ser 'A', 'P' ou 'C'"
                },
                data_agendado: {
                    bsonType: "date",
                    description: "Data agendada deve ser um campo do tipo Date"
                }
            }
        }
    }
});

db.tarefas.createIndex({ status: 1 });
