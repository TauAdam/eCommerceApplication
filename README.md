# eCommerceApplication

## Docker

1. Установить докер с официального сайта.\
    1.1. Прописать следующие команды в консоли, открытой в папке проекта:\
        - `docker build .`\
        - `docker images`\
        - `docker run -d -p 3000:3000 --name ecom-app <id>`

2. docker build . - (не пропустите точку) создаёт образ согласно инструкциям, прописанным в Dockerfile
  после сборки образа в командной строке отобразится список контейнеров (первый билд займет > 2 минут).
3. docker images - откройте список образов, должен появиться новый образ с уникальным id и аттрибутом CREATED (ваше время создания образа), скопируйте его id.
4. docker run <id> - запустить образ по указанному id (для понимания, вводить не надо).\
    4.1. (ВАЖНО) docker run -d -p 3000:3000 --name ecom-app <id> - запускает образ, флаг -d (detached) не переводит нас в консоль проекта после запуска, флаг -p связывает порт контейнера и порт нашего браузера, также я принудительно указываю имя ecom-app, чтобы потом можно было работать с контейнером по имени, а не по id.\
    Если порт занят другим контейнером, появится ошибка "Bind for 0.0.0.0:3000 failed: port is already allocated." проверьте, не остался ли запущенным какой-либо контейнер с этим же привязанным портом, откройте Docker Desktop, удалите ненужный по необходимости, запустите команду заново.

Для дальнейшей работы:

5. docker ps  - покажет запущенный контейнер.
6. docker stop <id> - остановит (закроет) контейнер по указанному id
  Если по какой-то причине командная строка подвисла, откройте Docker Desktop и остановите руками запущенный контейнер (вкладка Containers)
7. docker start <id> - запустит контейнер по указанному id
8. Для проверки установки образа существует команда docker images
9. посмотреть запущенные контейнеры можно командой docker ps, а все существующие контейнеры командой\
docker ps -a
10. docker rm <id> - удаляет контейнер по указанному id
11. docker container prune удаляет все незапущенные контейнеры

## Jest

1. Для создания теста к фуйлу filename.ts нужно создать новый файл в той же директории filename.test.ts\
    1.1 Примеры Unit тестов для функций находятся в папке jestExamples\
    1.2 Чтобы тесты можно было писать на TypeScript добавлен файл jest.config.js
2. Для запуска теста выполнить команду `npm run test:jest ./PATH/filename.test.js`