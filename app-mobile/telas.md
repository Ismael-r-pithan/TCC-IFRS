## AUTH

- Login                     - POST /login


## USERS

- Cadastro de usuários      - POST /users
- Perfil do usuário         - GET /users/{email}


## ROOMS

- Criar um turma            - POST /rooms
- Criar quiz                - POST /rooms/{id}/quizzes
- Listar turmas             - GET /rooms


## QUIZZES

- Adicionar questão no quiz - POST /quizzes/{codigo}/questions
- Entrar em um quiz         - GET /quizzes/{codigo}/questions
- Responder quiz            - POST /quizzes/{codigo}