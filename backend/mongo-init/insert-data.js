db = db.getSiblingDB('desafiojs'); // Seleciona o banco de dados

// Dados fictícios para a collection 'tarefas'
db.tarefas.insertMany([
    {
        nome: "Implementar login",
        status: "A", // 'A' para Aberto
        data_agendado: new Date("2024-06-01")

    },
    {
        nome: "Criar página de perfil",
        status: "A",
        data_agendado: new Date("2024-06-02")
    },
    {
        nome: "Corrigir bug no formulário",
        status: "F", 
        data_agendado: new Date("2024-05-28")
    },
    {
        nome: "Atualizar documentação",
        status: "A",
        data_agendado: new Date("2024-06-05")
    },
    {
        nome: "Testar integração com API",
        status: "F",
        data_agendado: new Date("2024-05-30")
    }
]);

print("✅ Dados fictícios inseridos na collection 'tarefas'");