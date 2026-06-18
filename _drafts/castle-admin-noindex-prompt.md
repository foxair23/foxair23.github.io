# Castle Admin — Search Blocking & Login Wall Prompt

You are helping me make search indexing and security improvements to the Castle Garage Doors & Gates admin application hosted at `hq.castlegaragedoors.com`.

**Goal:** Block this subdomain from being indexed by search engines. It is an internal admin/scheduling tool and should never appear in Google search results.

Please implement all of the following:

---

## 1. Add noindex meta tag to all pages

Add the following to the `<head>` of every HTML page or layout template in the app:

```html
<meta name="robots" content="noindex, nofollow">
```

---

## 2. Add a robots.txt that blocks all crawlers

Create or update `robots.txt` at the root of the app so it is served at `https://hq.castlegaragedoors.com/robots.txt`:

```
User-agent: *
Disallow: /
```

---

## 3. Add X-Robots-Tag HTTP header (if supported by your hosting/framework)

If the app uses a framework or server that supports custom HTTP headers (Next.js, Express, Vercel, etc.), add this response header to all routes:

```
X-Robots-Tag: noindex, nofollow
```

---

## 4. Confirm no content is visible before login

Verify that unauthenticated users cannot see any operational, customer, or scheduling data before completing login. Any page that exposes data should redirect to the login screen if the user is not authenticated.

---

## 5. Do not break any existing functionality

These are indexing and security changes only. Do not modify any scheduling, booking, or business logic.

---

## Verification Checklist

After making changes, confirm:

- [ ] `robots.txt` is accessible at `hq.castlegaragedoors.com/robots.txt` and contains `Disallow: /`
- [ ] `noindex, nofollow` meta tag appears in page source on all pages
- [ ] `X-Robots-Tag: noindex, nofollow` header is present in HTTP responses (if applicable)
- [ ] Unauthenticated users are redirected to login before any data is visible
- [ ] No existing scheduling or booking functionality is broken
