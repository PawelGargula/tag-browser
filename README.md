# Tag-browser

## [Demo](https://pawelgargula.github.io/tag-browser/)

## Założenia projektu:

- stronicowana tabela lub lista tagów wraz liczbą powiązanych postów (pole count)
- liczba elementów na stronie konfigurowalna przez pole liczbowe nad tabelą/listą
- wybór pola i kierunku sortowania przez element UI własnego wyboru/projektu
- przygotować odpowiednie stany dla etapu ładowania danych i błędów przy pobieraniu
- wykorzystać gotową bibliotekę komponentów UI, np. MUI
- wykorzystać gotowe biblioteki do zarządzania stanem i pobierania danych (wybór wedle uznania, stosownie do stopnia komplikacji projektu i z myślą o jak najszybszej realizacji zadania)
- przygotować Storybook do prezentacji wykorzystanych komponentów składowych aplikacji
- rozwiązanie opublikować w repozytorium GitHub
- całość powinna się uruchamiać wyłącznie po wykonaniu komend "npm ci", "npm start", "npm run storybook"

### [Stack Exchange API Docs](https://api.stackexchange.com/docs/tags#page=1&pagesize=10&order=desc&sort=popular&filter=default&site=stackoverflow&run=true)

- Tags data on current page - https://api.stackexchange.com/2.3/tags?page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow
- Get total count of tags - https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total

### Tools

- Vite
- React
- MUI X DataGrid with Server-side pagination

### Useful resources

- [MUI X DataGrid with Server-side pagination](https://mui.com/x/react-data-grid/pagination/#server-side-pagination)
