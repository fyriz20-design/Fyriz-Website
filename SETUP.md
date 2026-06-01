# Setup — Sawazki Electronics Website

## Schritt 1 — Next.js Projekt erstellen

Öffne ein Terminal (PowerShell oder CMD) und führe aus:

```bash
# Stelle sicher, dass du im richtigen Ordner bist
cd C:\Fyriz-Website

# Installiere alle Abhängigkeiten
npm install
```

> Die `package.json` ist bereits vorhanden — `npm install` reicht.

---

## Schritt 2 — shadcn/ui initialisieren

```bash
npx shadcn@latest init
```

Bei den Fragen so antworten:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

Danach werden häufig genutzte Komponenten installiert (optional, bei Bedarf):

```bash
npx shadcn@latest add button input label badge dialog
```

---

## Schritt 3 — Supabase einrichten

1. Gehe auf [supabase.com](https://supabase.com) und erstelle ein neues Projekt.
2. Unter **Settings → API** findest du:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` Key → `SUPABASE_SERVICE_ROLE_KEY`
3. Führe im Supabase **SQL Editor** folgende Tabellen-Definitionen aus:

```sql
-- Anfragen-Tabelle
create type anfrage_typ as enum ('webseite', 'pc', 'bildschirm', 'sonstiges');
create type anfrage_status as enum ('offen', 'bearbeitung', 'erledigt');

create table anfragen (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  typ         anfrage_typ not null,
  nachricht   text,
  status      anfrage_status not null default 'offen',
  created_at  timestamptz default now()
);

-- Row Level Security: Nur Service-Role kann lesen/schreiben
alter table anfragen enable row level security;

-- Medien-Tabelle
create table medien (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  alt         text not null default '',
  created_at  timestamptz default now()
);

alter table medien enable row level security;

-- Öffentlich lesbar (für die Galerie auf der Hauptseite)
create policy "Medien öffentlich lesbar"
  on medien for select
  using (true);
```

4. Unter **Authentication → Settings**: E-Mail-Bestätigung kann für den Admin deaktiviert werden.
5. Erstelle deinen Admin-User: **Authentication → Users → Add user**.

---

## Schritt 4 — Vercel Blob einrichten

1. Deploye das Projekt einmal auf [vercel.com](https://vercel.com) (GitHub verbinden).
2. Im Vercel Dashboard: **Storage → Create Database → Blob**.
3. Der Token `BLOB_READ_WRITE_TOKEN` wird automatisch als Env-Variable gesetzt.

---

## Schritt 5 — Resend einrichten

1. Account auf [resend.com](https://resend.com) erstellen.
2. API Key erstellen → in `.env.local` eintragen.
3. Domain verifizieren (oder für Tests die Resend-eigene Domain nutzen).

---

## Schritt 6 — Umgebungsvariablen befüllen

Kopiere `.env.local.example` zu `.env.local` und trage alle Werte ein:

```bash
copy .env.local.example .env.local
```

Dann die Werte in `.env.local` eintragen.

---

## Schritt 7 — Entwicklungsserver starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

Der Admin-Bereich ist unter [http://localhost:3000/admin/login](http://localhost:3000/admin/login) erreichbar.

---

## Nächste Schritte (Implementierung)

| Schritt | Inhalt |
|---------|--------|
| 4 | Hero-Sektion mit Animation |
| 5 | Leistungen-Karten |
| 6 | Ablauf-Timeline |
| 7 | Galerie (Vercel Blob) |
| 8 | Kontaktformular + Resend |
| 9 | Admin — Anfragen-Verwaltung |
| 10 | Admin — Drag-and-Drop Medien-Manager |
| 11 | Deployment & CI/CD auf Vercel |
