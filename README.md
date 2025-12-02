# PokéImpostor

Hecho con **Java (Spring Boot)** y **Thymeleaf**.

## 🎮 Cómo jugar

Es para jugar en grupo en una misma habitación o compartiendo pantalla (si estáis en Discord).

1.  **Configura la partida:** Pon el número de jugadores y escribid vuestros nombres.
2.  **Elige Generaciones:** Puedes marcar las generaciones que quieras (1-9).
3.  **Pasad el móvil/PC:**
    * A la mayoría les saldrá el mismo Pokémon (ej. *Pikachu*).
    * A uno (el Impostor) le saldrá solo "IMPOSTOR".
4.  **A discutir:** Cada uno dice una palabra o frase sobre su Pokémon. El impostor tiene que disimular y adivinar cuál es antes de que lo pillen.

## 🛠️ Implementación

Es un proyecto con **Spring Boot MVC**.

* **Backend:** Java 17+. Lee los Pokémon desde archivos de texto planos (`gen1.txt`, `gen2.txt`...) según lo que elija el usuario.
* **Frontend:** HTML + CSS + JS (Vanilla). Sin frameworks pesados.
* **Imágenes:** No guardo las fotos en el servidor. El JS construye la URL de *PokemonDB* (y arregla los nombres raros como `Alolan Geodude` para que carguen bien).

MIT License

Copyright © 2025 Alex Casali

![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)
