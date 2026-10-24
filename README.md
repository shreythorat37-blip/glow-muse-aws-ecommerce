# Glow Muse — AI Fashion E-Commerce Project

A responsive fashion storefront prototype with separate men’s/women’s catalogues, category-oriented stock imagery, colour/size selectors, wishlist, cart, demo checkout, recommendation UI, rule-based shopping assistant, and colour-sampling visual search.

## Included catalogue
- `products.json`: **100,000 product records** in a compact JSON file.
- Every record has an ID, audience, category, style name, colour variants, size variants, price, stock demo value, and category/audience-oriented image URL.
- **Important data honesty:** all 100,000 records are generated synthetic demonstration data (`recordType: synthetic_demo`), not actual seller listings, verified products, or live stock. Price, size/colour options, and stock are illustrative. The images are stock-image references and may be reused within their category. Do not represent these records as live inventory.
- The storefront loads `products.json` with `fetch`; run through VS Code Live Server or another local HTTP server, not by double-clicking `index.html`.
- The shop renders 24 cards at a time and has a Load More button, so it does not inject 100,000 cards into the page at once. Search/filter runs against the full catalogue in the browser.

## Run in VS Code (Windows)
1. Extract the ZIP.
2. Open the extracted `Glow-Muse-AWS-Ecommerce` folder in VS Code.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` → **Open with Live Server**.
5. Keep `products.json`, `app.js`, `styles.css`, `trends.html`, and `index.html` in the same folder.

## Project files
- `index.html` — storefront
- `app.js` — product UI and demo features
- `styles.css` — responsive styling
- `products.json` — 100,000-record synthetic catalogue
- `database/schema.sql` — PostgreSQL starter schema and search indexes
- `scripts/export_catalog_csv.py` — export JSON catalogue to CSV
- `fashion.html`, `trends.html`, `fashionvideo.mp4` — project pages/media

## Database import / CSV
Run from the project folder:
```bash
python scripts/export_catalog_csv.py
```
This creates `products.csv` (it is intentionally not duplicated in the ZIP to keep the package small). Import the CSV/JSON into PostgreSQL, DynamoDB, or another database as part of your database module. `database/schema.sql` is a relational starter schema; JSONB stores sizes and colour arrays.

## AWS architecture path
For a deployed architecture: static frontend on S3 + CloudFront or Amplify; product records in DynamoDB or RDS; images in S3; API Gateway + Lambda for product/order APIs; Cognito for authentication; CloudWatch for logs/metrics; and Bedrock/OpenSearch only behind a backend if you later add real AI/search. Do not put AWS secret keys in browser JavaScript. The current cart, wishlist, recommendations, image colour detection, and checkout are local/demo features; there is no live payment, real order API, real inventory reservation, or production AI API configured.

## Data sources / future real-data option
The included 100k file is synthetic and is not copied from a commercial retailer. For a real-data extension, review the dataset card and licence/terms before downloading or redistributing any external data. A potential research dataset is [Qdrant/H&M e-commerce products](https://huggingface.co/datasets/Qdrant/hm_ecommerce_products), listed as about 105k rows with CC BY 4.0 in its dataset card. Its fields use H&M-specific categories and colour groups, so map and validate them rather than forcing every item into a gender/category guess. Cite the dataset and preserve its licence/attribution if you use it.

## Important limitations
- Images load from Unsplash over the internet; an offline session may show blank product images.
- Category-level imagery is selected by audience and category but is not a verified image of every exact named style.
- No real size-specific stock, payment gateway, login, order database, or AWS credentials are included.
- Demo product rows must not be presented as real stock.


### Product image matching
The catalogue assigns stock-photo URLs by gender, category and garment type. Men's polo/T-shirts are mapped separately from women's tops, and category pools are separated for bottoms, outerwear, ethnic wear, activewear, footwear and accessories. The synthetic 100,000-record catalogue reuses curated stock photos; it does not represent 100,000 unique verified product images. Internet access is required for remote images.


### Product image matching
Product titles containing **hoodie**, **shirt**, **jeans**, **sneakers**, **watch**, or **clock** use an image selected for that item type. Other catalogue records retain gender/category-specific stock image assignments. This is demo catalogue imagery, not a guarantee of exact colour, pattern, or retail-SKU correspondence; stock images may be reused and require internet access.
