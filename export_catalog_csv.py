"""Export the bundled JSON catalogue to CSV for database/Power BI experiments."""
import csv, json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
data = json.loads((root / "products.json").read_text(encoding="utf-8"))
with (root / "products.csv").open("w", newline="", encoding="utf-8") as f:
    fields = ["id","name","gender","category","color","colors","sizes","price","popularity","vibe","image","description","material","pattern","fit","recordType","stockDemo"]
    w = csv.DictWriter(f, fieldnames=fields)
    w.writeheader()
    for p in data["products"]:
        row = p.copy()
        for k in ("colors","sizes"): row[k] = "|".join(row[k])
        w.writerow(row)
print(f"Exported {len(data['products']):,} demo products to products.csv")
