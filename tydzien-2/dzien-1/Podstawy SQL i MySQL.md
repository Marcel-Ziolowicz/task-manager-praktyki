# **Dzień 1 (T2D1) — Podstawy SQL i MySQL**

### **Zadania 1.1-1.3**

1.1 Oczekiwany rezultat: MySQL zainstalowany. Baza task\_manager istnieje. Potrafisz połączyć się z klientem mysql. (ZROBIONE)

1.2 Oczekiwany rezultat: Tabela tasks istnieje z wszystkimi wymaganymi kolumnami. (ZROBIONE)

1.3 Oczekiwany rezultat: Potrafisz wykonać INSERT, SELECT (z WHERE, ORDER BY), UPDATE, DELETE.

Rozumiesz jak działa id SERIAL. (ZROBIONE)

*(Zadania zrobione potwierdzone screen-ami)*

### **Zadanie 1.4 — Ćwiczenia dodatkowe**



**1. Jak policzyć liczbę wszystkich zadań?**



SELECT COUNT(\*) AS liczba\_zadan

FROM tasks;



Liczy wszystkie rekordy w tabeli tasks.





**2. Jak znaleźć zadania zawierające słowo SQL?**



SELECT \* FROM tasks

WHERE title LIKE '%SQL%';



LIKE wyszukuje fragment tekstu.

% oznacza dowolny ciąg znaków.



**3. Jak ograniczyć wyniki do 5 najnowszych zadań?**



SELECT \* FROM tasks

ORDER BY created\_at DESC

LIMIT 5;



ORDER BY sortuje.

LIMIT ogranicza liczbę wyników



**4. Co się stanie przy braku title?**



INSERT INTO tasks (done)

VALUES (FALSE);



Otrzymamy błąd: "Field 'title' doesn't have a default value", ponieważ title ma NOT NULL oraz kolumna jest obowiązkowa.



**5. Jak policzyć osobno zrobione i niezrobione?**



SELECT done, COUNT(\*) AS liczba

FROM tasks

GROUP BY done;



Przykładowy wynik:
Done 0,1

liczba 2,1



### **Zadanie 1.5 — Commit**

Zrobiony commit rówież screen z konsoli w folderze screen-y

