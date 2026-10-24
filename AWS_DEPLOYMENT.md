# Glow Muse — AWS deployment plan

This is a student-project deployment guide. The bundled frontend is still a prototype: cart, wishlist, AI-style recommendations, colour sampling, and checkout are browser-local demonstrations. Follow these steps only when ready to build the backend; do not expose credentials in `app.js`.

## Suggested architecture

1. **Frontend hosting:** Amazon S3 static website assets with CloudFront, or AWS Amplify Hosting.
2. **Product images:** Amazon S3 bucket with public read access only through an intentional CDN policy; avoid public write access.
3. **Product API:** Amazon API Gateway routes to AWS Lambda functions.
4. **Product storage:** DynamoDB for product/variant lookup and orders, or Amazon RDS PostgreSQL if relational joins and reporting are priorities. The included `database/schema.sql` is a relational starter.
5. **Authentication:** Amazon Cognito for sign-up/sign-in before introducing real accounts.
6. **Monitoring/security:** CloudWatch logs/metrics, IAM least-privilege roles, HTTPS, input validation, and AWS Budgets alerts.
7. **AI extensions (optional):** Call Amazon Bedrock or a search service from a Lambda/backend, never directly with secret credentials from browser JavaScript.

## Safe implementation sequence

- Deploy the static frontend and verify that `index.html`, `app.js`, `styles.css`, and `products.json` are served from the same origin.
- For a database-backed version, replace the browser's `fetch('products.json')` catalogue loader with a paginated API endpoint such as `GET /products?gender=Men&category=Tops&limit=24&cursor=...`.
- Add API routes for cart/order persistence only after adding authentication and server-side validation.
- Store real variant inventory by product ID + size + colour. Decrement stock transactionally during order placement; do not use the included `stockDemo` field as real inventory.
- Integrate a payment provider only through its documented backend checkout flow. Never store card details in this project.
- Configure CORS, API authorization, rate limits, logging, and alerts before public release.

## Dataset note

The included `products.json` is 100,000 **synthetic demonstration records**. It is useful for UI, pagination, filtering, database import, and performance experiments, but is not real seller inventory. See `README.md` and `DATASET_NOTES.txt`.
