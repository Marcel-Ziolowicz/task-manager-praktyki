# Testy CRUD API

## GET /tasks

Pobranie listy zadań.

Status: 200 OK

---

## POST /tasks

Dodanie zadania:

```json
{
  "title": "Learn Node.js"
}

# TESTY.md

W ramach drugiego tygodnia projektu wykonano integrację aplikacji Node.js z bazą danych MySQL oraz rozbudowano backend o relacje, pełny CRUD, walidację danych i obsługę błędów. Utworzono tabelę categories oraz dodano rekordy:

CREATE TABLE categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

INSERT INTO categories (name)
VALUES ("Praca"), ("Nauka"), ("Dom");

Dodano relację pomiędzy tabelami tasks i categories:

ALTER TABLE tasks
ADD category_id BIGINT UNSIGNED;

ALTER TABLE tasks
ADD CONSTRAINT fk_tasks_category
FOREIGN KEY (category_id)
REFERENCES categories(id);

Pojawił się problem niezgodności typów danych (INT vs BIGINT UNSIGNED), który został rozwiązany przez zmianę typu kolumny:

ALTER TABLE tasks
MODIFY category_id BIGINT UNSIGNED;

Po poprawce relacja działa poprawnie i MySQL pilnuje integralności referencyjnej, nie pozwalając przypisać zadania do nieistniejącej kategorii.

Test:

INSERT INTO tasks (title, category_id)
VALUES ("Test", 999);

Wynik: błąd FOREIGN KEY constraint.

Wykonano JOIN:

SELECT tasks.id, tasks.title, categories.name AS category
FROM tasks
LEFT JOIN categories ON tasks.category_id = categories.id;

SELECT tasks.title, categories.name AS category
FROM tasks
JOIN categories ON tasks.category_id = categories.id
WHERE categories.name = "Nauka";

SELECT categories.name, COUNT(tasks.id) AS tasks_count
FROM categories
LEFT JOIN tasks ON tasks.category_id = categories.id
GROUP BY categories.name;

Dodano updated_at i mechanizm aktualizacji przy UPDATE. Test:

UPDATE tasks
SET title = "Updated task"
WHERE id = 1;

Pole updated_at aktualizuje się automatycznie.

Zainstalowano mysql2 i dotenv:

npm install mysql2 dotenv

Dodano pliki .env i .env.example (env dodany do gitignore).

Utworzono db/index.js oraz db/test-connection.js. Test połączenia:

node db/test-connection.js

Wynik: OK z aktualnym czasem z bazy.

Początkowo wystąpił błąd Access denied dla użytkownika, spowodowany brakiem require("dotenv").config() na starcie aplikacji. Po poprawce połączenie działa.

Endpointy GET zostały przepisane na MySQL z LEFT JOIN categories.

CRUD został przeniesiony na bazę danych:

INSERT INTO tasks (title, category_id) VALUES (?, ?);
UPDATE tasks SET title = ?, done = ?, category_id = ? WHERE id = ?;
DELETE FROM tasks WHERE id = ?;

Wszystkie zapytania są parametryzowane i zabezpieczają przed SQL Injection.

Dodano endpointy categories (GET, POST). W przypadku duplikatu nazwy zwracany jest błąd ER_DUP_ENTRY i status 409 Conflict.

Wystąpił błąd brakującego modułu categoriesController, który został rozwiązany przez utworzenie pliku.

Dodano walidację danych: wymagany title, typ string, trim, max 255 znaków oraz sprawdzanie category_id.

Dodano middleware obsługi błędów (errorHandler), który loguje błędy i zwraca status 500.

Przetestowano edge case’y: puste body, pusty title, zbyt długi title, nieistniejące ID przy PUT i DELETE, błędny format ID oraz nieistniejące category_id — wszystkie zwracają poprawne statusy (400, 404, 409).

Pojawił się problem Missing script: dev, wynikający z uruchamiania npm w złym folderze.

Pracowano na branchach feature/database-schema, feature/database-connection, feature/crud-database, feature/validation. Wszystkie branche zostały zmergowane do main, a konflikty merge zostały przećwiczone i rozwiązane.

Efekt końcowy: działające API Task Manager z MySQL, relacjami, pełnym CRUD, walidacją, obsługą błędów i strukturą branchową.