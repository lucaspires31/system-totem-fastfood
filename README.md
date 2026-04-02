🍔 Totem Fast Food - Sistema de Autoatendimento

Sistema completo de autoatendimento para fast food (totem), desenvolvido com foco em performance, usabilidade e experiência do usuário.

Projeto desenvolvido como parte da disciplina de Engenharia de Software, com abordagem prática utilizando tecnologias modernas e boas práticas de desenvolvimento.

📌 Sobre o Projeto

O sistema simula um totem de autoatendimento semelhante aos utilizados em grandes redes de fast food.

O usuário pode:

Selecionar produtos (lanches, bebidas, combos, etc.)
Adicionar itens ao carrinho
Escolher tipo de pedido (comer no local ou levar)
Inserir CPF (opcional)
Finalizar pedido com diferentes formas de pagamento
Visualizar nota fiscal
💡 Diferencial do Projeto

O sistema possui um programa de fidelidade integrado via CPF, onde:

Clientes acumulam pontos a cada compra
Pontos podem ser utilizados futuramente para descontos
Participação automática em sorteios
Experiência personalizada com identificação do cliente

Além disso, o sistema conta com um mascote (macaco) para reforçar identidade visual e engajamento.

🧠 Tecnologias Utilizadas
Back-end
Java 21
Spring Boot
Spring Data JPA
MySQL
Front-end
React
Vite
CSS (estilo inspirado em grandes redes como McDonald's)
Ferramentas
Git & GitHub
Jira (gestão ágil com Scrum)
🏗️ Arquitetura do Sistema

O projeto segue uma arquitetura baseada em:

API REST (Spring Boot)
Separação de responsabilidades (Controller, Service, Repository)
Front-end desacoplado consumindo API
📊 Funcionalidades
🛒 Sistema de Pedidos
Criação de pedidos
Adição de múltiplos produtos
Cálculo automático do total
👤 Sistema de Clientes
Identificação por CPF
Cadastro automático
Acúmulo de pontos
🍟 Produtos
Lanches
Bebidas
Acompanhamentos
Sobremesas
Combos
💳 Pagamento
Simulação de pagamento
Integração com QR Code (Pix)
🧾 Nota Fiscal
Exibição de:
Produtos
Quantidades
Total
CPF do cliente
Tipo de pedido
🔄 Fluxo do Sistema
Início → CPF (opcional) → Tipo de pedido → Menu → Carrinho → Pagamento → Nota fiscal
⚙️ Como Executar o Projeto
🔹 Back-end
# Clonar repositório
git clone <repo>

# Acessar pasta backend
cd backend-totem

# Rodar aplicação
./mvnw spring-boot:run
🔹 Front-end
# Acessar pasta frontend
cd frontend-totem

# Instalar dependências
npm install

# Rodar projeto
npm run dev
🗄️ Banco de Dados
MySQL
Banco: totem_db

As tabelas são geradas automaticamente via JPA.

📈 Metodologia
Scrum
Uso de Jira para gestão de tarefas
Versionamento com Git
🎯 Objetivo do Projeto

Demonstrar na prática:

Desenvolvimento full stack
Integração front-end e back-end
Uso de metodologias ágeis
Construção de um sistema escalável e realista
📌 Status do Projeto
✅ Concluído
🚀 Pronto para apresentação
📸 Preview

🧠 Aprendizados

Durante o desenvolvimento foram aplicados conceitos como:

APIs REST
Persistência de dados
Integração entre sistemas
Organização de código
Boas práticas de versionamento
💬 Considerações Finais

Este projeto representa a construção de um sistema realista de mercado, com foco em experiência do usuário e organização de código, demonstrando a capacidade da equipe em desenvolver soluções completas e funcionais.
