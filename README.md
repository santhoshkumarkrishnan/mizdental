# MIZ Dental Clinic — Website

A single-page, SEO-friendly site built with HTML, Bootstrap 5 (grid/utilities) and a custom design system on top.

## Before you publish — must-do checklist

1. **Phone / WhatsApp number**
   Search the project for `XXXXXXXXXX` and `91XXXXXXXXXX` and replace with the real number:
   - `js/main.js` → `CLINIC_WHATSAPP_NUMBER` (digits only, with country code, e.g. `919876543210`)
   - `index.html` → every `tel:+91XXXXXXXXXX` link
   - `index.html` → the JSON-LD `"telephone"` field near the top of `<head>`

2. **Domain**
   Replace `https://www.mizdentalclinic.in/` in `index.html` (canonical, Open Graph, JSON-LD) and in `sitemap.xml` / `robots.txt` with your actual domain once you buy one.

3. **Real photos**
   The hero and clinic sections currently use a graphic/icon treatment instead of stock photos (since I didn't have real ones). Once you have real photos of the clinic, Dr. Zahar Unnissa, and the space, they'll upgrade the site a lot — happy to wire them in.

4. **Real reviews**
   The Reviews section has 3 clearly-marked placeholder cards. Swap in 3–6 real quotes from your Google Business reviews (with permission), or embed a Google Reviews widget.

5. **Instagram feed**
   Right now there's a "Follow us" card linking out to @mizdental. To show live posts embedded on the site, you'd need a third-party embed tool (e.g. SnapWidget, Elfsight, or Instagram's own Basic Display API) since Instagram doesn't allow free direct embedding without one. Let me know if you want this wired in.

## SEO already set up

- Descriptive `<title>` and meta description targeting "dentist HRBR Layout / Kalyan Nagar Bengaluru"
- Open Graph + Twitter card tags
- `Dentist` structured data (JSON-LD) — real address, coordinates, hours, price range
- Semantic HTML5 (`header`, `section`, `footer`, proper heading hierarchy)
- `sitemap.xml` + `robots.txt`
- Fast-loading: no heavy images, system-friendly fonts, minimal JS

### Next SEO steps (outside this codebase)
- Create/claim a Google Business Profile if you haven't (helps local "near me" ranking far more than the website alone)
- Host on a fast platform (Netlify/Vercel/GitHub Pages all work well with this static setup)
- Once real photos exist, compress them (WebP) and add descriptive `alt` text

## Structure

```
index.html      Main page (all sections)
css/style.css   Design system + all styling
js/main.js      Nav, booking modal → WhatsApp handoff, scroll reveals
robots.txt
sitemap.xml
```

## Local preview

Just open `index.html` in a browser — no build step needed.
