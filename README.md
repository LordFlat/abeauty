# AD Beauty — anastasia.valentyn.studio

Сайт бьюти-клиники AD Beauty (Anastasia Danitoiu, Evesham, UK).
Next.js 14 + Tailwind, деплой на Vercel.

## Как обновлять контент

### Добавить фото в галерею
1. Положи файл `.jpg` / `.png` / `.webp` в `public/gallery/<категория>/`
   (категории = папки: `brows`, `lips`, `lashes`, `nails`, `clinic`; новая папка = новая категория-фильтр).
2. Задеплой (см. ниже). Всё — фото появится в галерее автоматически.

### Изменить услуги / цены
Один файл: `content/treatments.json`.

Структура: `categories[]` → у каждой категории `treatments[]` (отдельные процедуры, каждая = своя страница `/treatments/<slug>`). Плюс отдельный блок `priceList[]` — большая таблица прайса внизу страницы Treatments.

Процедура (`treatments[]`):
- `slug` — адрес страницы (латиница), `name` — название, `subtitle` — подзаголовок,
- `cover` — заглавное фото (из `public/images/treatments/`),
- `gallery` — имя папки галереи для блока «примеры работ» (или `null`),
- `intro` — короткая фраза, `description` — описание, `benefits[]` — список плюсов, `note` — блок «Please note»,
- `prices[]` — строки прайса на странице услуги (`name`, `price`).

Полный прайс внизу — блок `priceList[]`: секции с `title`, опц. `note`, опц. `columns` (для колонки 6-pack) и `items[]` (`name`, `price`, опц. `pack6`).

Заглавные фото услуг лежат в `public/images/treatments/`. HIFU и IPL пока используют сгенерированные затычки (`hifu.jpg`, `ipl.jpg`) — заменить на реальные фото, когда будут.

### Отзывы
`content/reviews.json` — сейчас там ПЛЕЙСХОЛДЕРЫ. Заменить на реальные отзывы (Treatwell/Google) перед продвижением.

### Кнопка Book Now (Treatwell)
`src/lib/site.ts` → поле `bookingUrl`. Сейчас `null` (кнопка неактивна).
Вставить ссылку Treatwell в кавычках — все кнопки Book Now станут активными.

### Контакты
`src/lib/site.ts` — телефон, почта, адрес, соцсети.

## Деплой

```bash
vercel --prod
```

## Форма обратной связи
Письма шлёт Resend (`/api/enquiry` → `adanitoiu@gmail.com`).
Env-переменные на Vercel: `RESEND_API_KEY` (обязательно), `ENQUIRY_TO`, `ENQUIRY_FROM` (опционально).
Без ключа форма вежливо предложит написать на почту напрямую.

## Логотип
`public/images/logo-dark.png` / `logo-light.png` генерируются из `resourses/Logo-main.png`:

```bash
npm run logo
```
