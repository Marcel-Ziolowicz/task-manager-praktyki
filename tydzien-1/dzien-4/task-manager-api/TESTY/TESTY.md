# Testy API

## GET /tasks
Zwraca listę wszystkich zadań.
Status: 200 OK

## GET /tasks/:id
Zwraca pojedyncze zadanie.
Status: 200 OK

Dla nieistniejącego ID:
Status: 404 Not Found

## POST /tasks
Dodaje nowe zadanie.
Status: 201 Created