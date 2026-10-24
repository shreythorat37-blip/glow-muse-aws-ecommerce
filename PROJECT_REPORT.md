# Project Summary: Glow Muse — AI-Powered Fashion E-Commerce Website Using AWS

## Aim
Build a responsive fashion shopping prototype that demonstrates gender-aware cataloguing, product filtering, variant selection, cart/wishlist behaviour, and AI-inspired discovery workflows. The long-term deployment design uses AWS-managed hosting, APIs, and data services.

## Main modules
1. **Catalogue:** 100,000 synthetic demo records, separated by Men/Women and seven fashion categories.
2. **Product variants:** illustrative sizes and colour options; selected variants are stored in the browser cart.
3. **Search and filtering:** text search, audience/category/colour filters, and sorting.
4. **Cart and wishlist:** browser-local persistence through localStorage.
5. **Style recommendation:** rule-based scoring using the chosen vibe, budget, and local interactions.
6. **Shopping assistant:** rule-based query matching, not a connected large language model.
7. **Visual discovery:** estimates the dominant colour in an uploaded image and filters the catalogue by colour; this is not trained visual recognition.
8. **Trends panel:** simple popularity/interaction-based ranking.
9. **Database starter:** PostgreSQL schema with indexes and JSONB size/colour fields.
10. **AWS deployment design:** S3/CloudFront or Amplify, API Gateway/Lambda, DynamoDB or RDS, Cognito, and CloudWatch.

## Data quality and limitations
The bundled 100,000 rows are generated synthetic data. Names, prices, colours, sizes, and stock counts are illustrative. Image URLs are external stock-image references selected by audience and category; they are not verified images for each exact product listing. The current prototype does not have live stock, real checkout/payment, account authentication, a deployed AWS backend, or a production AI model.

## Testing checklist
- Open through VS Code Live Server; do not use `file://` because the app loads `products.json` with `fetch`.
- Confirm the product count reaches 100,000 after the catalogue loads.
- Test Men/Women filters and each category.
- Search for men's polo/oxford shirts and women's tops/ethnic wear separately.
- Change size and colour, add to bag, and confirm the selected variant appears in the bag.
- Test wishlist, sort, load-more, visual colour sampling, and demo checkout.
- Test on mobile viewport and with the network offline to note that external images need internet access.
