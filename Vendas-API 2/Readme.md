Testando as Consultas Personalizadas no Postman
1. Buscar Produtos com Estoque Menor que um Determinado Valor
Método: GET

URL: http://localhost:8080/produtos/estoque-baixo/10

Descrição: Retorna produtos com estoque menor que 10.



2. Buscar Vendas de um Cliente Específico
Método: GET

URL: http://localhost:8080/vendas/cliente/1

Descrição: Retorna todas as vendas do cliente com ID 1.



3. Buscar Produtos pelo Nome (Contendo uma Palavra-Chave)
Método: GET

URL: http://localhost:8080/produtos/buscar?keyword=Notebook

Descrição: Retorna produtos cujo nome contém "Notebook".


Notas
Getters e Setters Manuais: Como o Lombok não está funcionando, todas as entidades usam getters e setters manuais.

Consultas Personalizadas: As três consultas sugeridas foram implementadas nos repositórios e expostas via endpoints nos controladores.

Testes: Use o Postman para testar os endpoints. Certifique-se de que os dados (clientes, produtos, vendas) já existem no banco antes de executar as consultas.


