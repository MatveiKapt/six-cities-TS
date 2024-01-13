<div style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%;">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

# Привет! Это мой проект Six Cities.

Проект написан на TypeScript и React. Представляет из себя сервис по поиску объявлений по аренде жилья в различных городах. Предложения можно сортировать по городам, ценам, рейтингу. Так же их расположение можно посмотреть на карте. Если авторизоваться (сервер принимает любую почту и пароль, хоть "123"), то можно добавлять предложения в избранные. На странице отдельного предложения можно посмотреть подробную информацию и комментарии, а так же оставить свой комментарий(если вы авторизованы).<br/>
Ссылка на демо: https://six-cities-ts.vercel.app/


## Страницы приложения

- Главная
- Страница отдельного предложения
- Страница с избранными предложениями (доступна только для авторизованных пользователей)
- Страница авторизации
## Установка

```bash
  npm install
```

## Запуск

```bash
  npm run start
``` 

## Реализация

- Для хранения состояния - Redux Toolkit, Redux Thunk
- Для запросов - Axios
- Карта - Leaflet
- Маршрутизация - React Router
