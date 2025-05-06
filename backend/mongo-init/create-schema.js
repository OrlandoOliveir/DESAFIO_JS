db = db.getSiblingDB('desafiojs');

db.createCollection("tarefas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome", "status", "data_agendado"], // Campos obrigatórios
            properties: {
                nome: {
                    bsonType: "string",
                    description: "Nome da tarefa deve ser uma string"
                },
                status: {
                    bsonType: "string",
                    enum: ["F", "A"],
                    description: "Status deve ser 'F' (Fechado) ou 'A' (Aberto)"
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

console.log("✅ Collection 'tarefas' criada com sucesso!");