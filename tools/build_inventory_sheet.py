# Builds the owner inventory workbook (Products / How to use / To confirm) from catalog.js.
# Usage: node -e "global.window={};require('./catalog.js');require('fs').writeFileSync('catalog.json',JSON.stringify(window.BBU_CATALOG))"
#        python3 tools/build_inventory_sheet.py catalog.json CLOTHING_REVIEW.csv bbu-inventory.xlsx
# Then upload the .xlsx to Google Drive (it converts to a Google Sheet).
import json, csv, sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.utils import get_column_letter

C = json.load(open(sys.argv[1])); review_csv = sys.argv[2]; out = sys.argv[3]
SITE = "https://daoddoneout.github.io/bikini-bottoms-up/"
CATS = {c["id"]: c["label"] for col in C["categories"].values() for c in col}
DEPT = {"Women": "Women", "Men": "Men", "Youth": "Kids", None: ""}

F = "Arial"
hdr_font = Font(name=F, bold=True, color="FFFFFF", size=10)
hdr_fill = PatternFill("solid", fgColor="065A5F")
edit_fill = PatternFill("solid", fgColor="FFFBE6")      # cells the owner edits
lock_fill = PatternFill("solid", fgColor="EEF3F2")      # reference only
body = Font(name=F, size=10)
thin = Side(style="thin", color="D5DEDB")
wrap = Alignment(wrap_text=True, vertical="center")
center = Alignment(horizontal="center", vertical="center")

wb = Workbook()
ws = wb.active; ws.title = "Products"
# header names are what the website reads; keep them as they are
cols = [
  ("Photo", 13, False), ("ID", 17, False), ("Name", 34, True), ("Price (GYD)", 12, True),
  ("Sizes", 16, True), ("Sold-out sizes", 14, True), ("Sold out", 10, True), ("Show on site", 11, True),
  ("Stock", 8, True), ("Category", 20, True), ("Department", 12, True), ("Brand", 16, True),
  ("Label", 18, True), ("Note", 30, True), ("Description", 44, True), ("Page", 11, False),
]
for i, (h, w, _) in enumerate(cols, 1):
    c = ws.cell(row=1, column=i, value=h); c.font = hdr_font; c.fill = hdr_fill; c.alignment = center
    ws.column_dimensions[get_column_letter(i)].width = w
ws.row_dimensions[1].height = 30
col = {h: i for i, (h, _, _) in enumerate(cols, 1)}

for r, p in enumerate(C["products"], 2):
    vals = {
      "Photo": '=_xlfn.IMAGE("%s%s")' % (SITE, p["images"][0]["src"]),
      "ID": p["id"], "Name": p["name"],
      "Price (GYD)": p["price"] if isinstance(p.get("price"), (int, float)) else None,
      "Sizes": ", ".join(p.get("sizes") or []),
      "Sold-out sizes": ", ".join(p.get("soldSizes") or []),
      "Sold out": "Yes" if p.get("stock") == 0 else "No",
      "Show on site": "Yes",
      "Stock": p["stock"] if isinstance(p.get("stock"), int) and p["stock"] > 0 else None,
      "Category": CATS[p["category"]],
      "Department": DEPT.get(p.get("department"), ""),
      "Brand": p.get("brand") or "", "Label": p.get("tag") or "",
      "Note": p.get("note") or "", "Description": p.get("description") or "",
      "Page": "Swimwear" if p["collection"] == "swim" else "Clothing",
    }
    for h, (_, _, editable) in zip([c[0] for c in cols], [(c[0], c[1], c[2]) for c in cols]):
        cell = ws.cell(row=r, column=col[h], value=vals[h])
        cell.font = body; cell.border = Border(bottom=thin)
        cell.alignment = center if h in ("Photo", "Price (GYD)", "Sold out", "Show on site", "Stock") else wrap
        cell.fill = edit_fill if editable else lock_fill
        if h in ("Sizes", "Sold-out sizes", "ID", "Name", "Brand", "Label", "Note", "Description"):
            cell.number_format = "@"          # keep sizes like 2, 10, 36x32 as text
    ws.cell(row=r, column=col["Price (GYD)"]).number_format = "#,##0"
    ws.row_dimensions[r].height = 62
last = len(C["products"]) + 1
ws.freeze_panes = "C2"
ws.auto_filter.ref = f"A1:{get_column_letter(len(cols))}{last}"

L = lambda h: get_column_letter(col[h])
def dv(formula, h, prompt):
    v = DataValidation(type="list", formula1=formula, allow_blank=True, showDropDown=False)
    v.error = "Pick an option from the list."; v.errorTitle = "Not on the list"; v.showErrorMessage = True
    v.prompt = prompt; v.showInputMessage = False
    ws.add_data_validation(v); v.add(f"{L(h)}2:{L(h)}1000")
dv('"Yes,No"', "Sold out", "Yes hides the Add to bag button")
dv('"Yes,No"', "Show on site", "No hides the item from the website")
dv('"Women,Men,Kids"', "Department", "")
dv('"' + ",".join(CATS.values()) + '"', "Category", "")
price = DataValidation(type="whole", operator="between", formula1="0", formula2="10000000", allow_blank=True)
price.error = "Type the price as a whole number, e.g. 5000. Leave it empty if not decided."; price.errorTitle = "Price"; price.showErrorMessage = True
ws.add_data_validation(price); price.add(f"{L('Price (GYD)')}2:{L('Price (GYD)')}1000")
stock = DataValidation(type="whole", operator="between", formula1="0", formula2="100000", allow_blank=True)
stock.error = "Type how many are in stock as a whole number, or leave it empty."; stock.showErrorMessage = True
ws.add_data_validation(stock); stock.add(f"{L('Stock')}2:{L('Stock')}1000")
# highlight hidden or sold-out rows
grey = PatternFill("solid", fgColor="E3E3E3"); rose = PatternFill("solid", fgColor="F9DCDC")
ws.conditional_formatting.add(f"A2:{get_column_letter(len(cols))}1000", FormulaRule(formula=[f'${L("Show on site")}2="No"'], fill=grey, font=Font(name=F, color="777777")))
ws.conditional_formatting.add(f"A2:{get_column_letter(len(cols))}1000", FormulaRule(formula=[f'${L("Sold out")}2="Yes"'], fill=rose))

# ---------- How to use ----------
hw = wb.create_sheet("How to use")
lines = [
 ("Updating the Bikini Bottoms Up website", "title"),
 ("The website reads the Products tab. Changes appear on the site within about 5 minutes. Refresh the page to see them.", ""),
 ("", ""),
 ("Yellow cells you can change", "h"),
 ("Name: the product name customers see.", ""),
 ("Price (GYD): numbers only, e.g. 5000. Leave empty if the price is not decided; the item then shows \"Price to be confirmed\" and can't be ordered.", ""),
 ("Sizes: the sizes you have, separated by commas, e.g. S, M, L. Write them exactly as you want customers to see them.", ""),
 ("Sold-out sizes: sizes that have sold, separated by commas. They show as \"sold out\" on the item.", ""),
 ("Sold out: Yes when the item is completely sold. It stays on the site marked Sold out and can't be ordered.", ""),
 ("Show on site: No hides the item from the website completely. Change it back to Yes to show it again.", ""),
 ("Stock: optional. How many you have; customers can't add more than this to their bag.", ""),
 ("Category, Department: pick from the dropdown. This controls which page and filter the item appears under.", ""),
 ("Brand, Label, Note, Description: optional text. Label is the small tag on the photo, e.g. \"Top only\".", ""),
 ("", ""),
 ("Please don't", "h"),
 ("Change the ID column. It links each row to its photos. If an ID changes, the website ignores that row.", ""),
 ("Rename, reorder or delete the column headers in row 1.", ""),
 ("Delete a row to remove an item. Set Show on site to No instead, so it can come back later.", ""),
 ("", ""),
 ("Good to know", "h"),
 ("New products need photos, so send those to Richard. A new row added here without photos won't appear on the site.", ""),
 ("Grey rows are hidden from the site. Pink rows are sold out.", ""),
 ("If this sheet can't be reached, the website shows the last product list built into it, so the shop keeps working.", ""),
 ("The To confirm tab lists open questions about items. It is not shown on the website.", ""),
]
hw.column_dimensions["A"].width = 110
for i, (t, kind) in enumerate(lines, 1):
    c = hw.cell(row=i, column=1, value=t); c.alignment = Alignment(wrap_text=True, vertical="top")
    c.font = Font(name=F, size=16, bold=True, color="065A5F") if kind == "title" else Font(name=F, size=12, bold=True) if kind == "h" else Font(name=F, size=11)

# ---------- To confirm ----------
tc = wb.create_sheet("To confirm")
rows = list(csv.reader(open(review_csv)))
heads = ["ID", "Name", "Price", "Sizes", "Brand", "Type", "To confirm", "Original photo", "Done"]
widths = [17, 34, 9, 14, 16, 20, 70, 26, 8]
for i, (h, w) in enumerate(zip(heads, widths), 1):
    c = tc.cell(row=1, column=i, value=h); c.font = hdr_font; c.fill = hdr_fill; c.alignment = center
    tc.column_dimensions[get_column_letter(i)].width = w
for r, row in enumerate(rows[1:], 2):
    row = (row + [""] * 8)[:8]
    for i, v in enumerate(row, 1):
        c = tc.cell(row=r, column=i, value=v); c.font = body; c.alignment = wrap; c.number_format = "@"
    tc.cell(row=r, column=9, value="No").font = body
tc.freeze_panes = "C2"; tc.auto_filter.ref = f"A1:I{len(rows)}"
d = DataValidation(type="list", formula1='"Yes,No"', allow_blank=True); tc.add_data_validation(d); d.add("I2:I1000")

wb.save(out)
print("rows", last - 1, "review", len(rows) - 1)
