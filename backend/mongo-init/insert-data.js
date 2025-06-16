db = db.getSiblingDB('desafiojs'); 

db.tarefas.insertMany([
    {
        nome: "Implementar login",
        status: "A", 
        data_agendado: new Date("2024-06-01")

    },
    {
        nome: "Criar página de perfil",
        status: "A",
        data_agendado: new Date("2024-06-02")
    },
    {
        nome: "Corrigir bug no formulário",
        status: "C", 
        data_agendado: new Date("2024-05-28")
    },
    {
        nome: "Atualizar documentação",
        status: "A",
        data_agendado: new Date("2024-06-05")
    },
    {
        nome: "Testar integração com API",
        status: "C",
        data_agendado: new Date("2024-05-30")
    },
    {
        nome: "Testar status P",
        status: "P",
        data_agendado: new Date("2024-05-30")
    },
    {
        nome: "Tarefa concluída",
        status: "C",
        data_agendado: new Date()
    }
]);

print("✅ Dados fictícios inseridos na collection 'tarefas'");