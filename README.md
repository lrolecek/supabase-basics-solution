# Supabase - základy

Dokumentace pro JS knihovnu:
https://supabase.com/docs/reference/javascript/introduction

Getting started pro React:
https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

## Vytvoření projektu / databáze

1. Po přihlášeí do administrace Supabase vytvoříme nový projekt.
1. Nastavíme heslo k databázi → někam si ho uložíme. Nezapomenout!
1. Vybereme region - oblast, ve které bude ležet náš server. Vybíráme co nejblíž k místu, které je nejblíž našim uživatelům.
1. Zobrazí se nám konfigurace, ze které budeme potřebovat
   - `Project URL` - endpoint, kam se posilají dotazy
   - `API Key` - klíč, který musíme poslat při připojení k databázi

## Vytvoření tabulek v DB

1. Půjdeme do **Table editor** a přidáme novou tabulku.
1. **Enable Row Level Security (RLS)**
   - když to není zapnuté, kdokoliv může číst a zapisovat data
   - když je to zapnuté, nikdo nemůže nic. Musíme vytvořit tzv. "Policy", kterou to dovolíme.
1. Přidáme sloupce do tabulky.
1. Po vytvoření tabulky můžeme v Table editoru přidat ručně data nebo je naimportovat.

## Připojení k databázi v Reactu

Přidáme do projektu  balíček Supabase.
```bash
npm install @supabase/supabase-js
```

Potom v kódu:
```jsx
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://<project>.supabase.co", "<your-anon-key>");
```

Proměnnou `supabase` pak používáme k veškeré komunikaci s databází.

## Čtení dat

```jsx
const { data, error } = await supabase
  .from("products")
  .select();
```

Výběr dat můžeme ovlivňovat různými pomocí
[filtrů](https://supabase.com/docs/reference/javascript/using-filters)
a [modifikátorů](https://supabase.com/docs/reference/javascript/using-modifiers).

```jsx
const { data, error } = await supabase
  .from("products")
  .select('name', 'price')
  .eq('category', 'pracka')
  .gte('price', 500)
  .ilike('name', '%Zanussi%')
  .is('new', null)
  .order('price', {ascending: false})
  .limit(1)
  .single()
```

*Ne všechny uvedené filtry a modifikátory dávají smysl takto pohromadě. Je to jen (neuplná) ukázka toho, co lze použít.*

## Přidávání nových dat

```jsx
const { error } = await supabase
  .from('products')
  .insert({ id: 1, name: 'Pracka 9000', price: 899 })
```
Vloží nový produkt. Většinou neuvádíme **id**, protože ho databáze přiděluje sama (pokud jsme si to tak nastavili).

## Aktualizace existujících dat

```jsx
const { error } = await supabase
  .from('products')
  .update({ name: 'Pracka 8000' })
  .eq('id', 1)
```
Nastaví nové jméno pro produkt s ID=1.

## Mazání dat

```jsx
const { error } = await supabase
  .from('products')
  .delete()
  .eq('id', 1)
```
Smaže produkt s ID=1.
