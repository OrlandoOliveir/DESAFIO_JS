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
                    enum: ["F", "A", "P"],
                    description: "Status deve ser 'F' (Fechado) ou 'A' (Aberto) ou 'P' (Pendente)"
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
