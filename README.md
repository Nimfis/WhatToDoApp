# WhatToDo App – Projekt zaliczeniowy (Next.js + Tailwind + TypeScript)

Aplikacja typu ToDo zbudowana w Next.js z użyciem najnowszego podejścia App Router.  
Projekt przygotowany jako zaliczenie z przedmiotu **Interfejsy Webowe**.

---

## Technologie

- [Next.js](https://nextjs.org/) (App Router + TypeScript)
- React (Hooks: `useState`, `useEffect`)
- Tailwind CSS (w tym tryb ciemny)
- `react-hot-toast` (toasty / powiadomienia)
- `uuid` (generowanie ID)
- `localStorage` (przechowywanie danych)

---

## Funkcje aplikacji

- Dodawanie zadań z tytułem, opisem, kategorią i terminem
- Edycja zadań w okienku modalnym
- Usuwanie zadań
- Filtrowanie po kategorii i statusie (zrobione / niezrobione / wszystkie)
- Sortowanie zadań (tytuł A–Z, Z–A, data rosnąco / malejąco)
- Zarządzanie kategoriami (dodawanie / usuwanie)
- Eksport i import zadań jako plik `.json`
- Licznik ukończonych zadań
- Tryb jasny / ciemny z przełącznikiem
- Toasty / powiadomienia po akcjach

---

## Jak uruchomić projekt lokalnie

1. Sklonuj repozytorium lub rozpakuj ZIP:

   ```bash
   git clone https://github.com/Nimfis/WhatToDoApp
   ```

2. Przejdź do katalogu projektu:

   ```bash
   cd WhatToDoApp
   ```

3. Zainstaluj zależności:

   ```bash
   npm install
   ```

4. Uruchom aplikację:

   ```bash
   npm run dev
   ```

5. Otwórz w przeglądarce:

   ```
   http://localhost:3000
   ```

---

## Struktura projektu

```
app/
  └─ page.tsx             # Główna strona aplikacji

components/
  ├─ AppWrapper.tsx       # Layout główny
  ├─ TaskForm.tsx         # Formularz dodawania
  ├─ TaskItem.tsx         # Pojedyncze zadanie
  ├─ EditModal.tsx        # Edytowanie zadania (modal)
  ├─ CategoryManager.tsx  # Zarządzanie kategoriami
  ├─ CategorySelector.tsx # Filtrowanie po kategorii
  ├─ SortSelector.tsx     # Sortowanie
  ├─ StatusFilter.tsx     # Filtrowanie po statusie
  ├─ ThemeToggle.tsx      # Przełącznik trybu
  └─ BackupControls.tsx   # Eksport / Import JSON

public/
   ├─ Fonts/              # Czcionka HandTypeWriter (.ttf)
   ├─ Icons/              # Ikony używane w interfejsie (np. What.png)
```

---

## Licencja

Projekt powstał w celach edukacyjnych, jako zaliczenie przedmiotu.
