#!/usr/bin/env python3
"""QA the Germany prospects CSV against the required schema and anti-hallucination rules."""

from __future__ import annotations

import csv
import re
import sys
from collections import Counter
from pathlib import Path

CSV_PATH = Path("/workspace/data/real-estate-prospects/germany.csv")

HEADERS = [
    "country",
    "city",
    "company_name",
    "type",
    "contact_name",
    "contact_role",
    "email",
    "phone",
    "website",
    "linkedin_company",
    "linkedin_contact",
    "investment_focus",
    "geographic_focus",
    "buyer_origin_relevance",
    "italy_interest",
    "amalfi_coast_relevance",
    "estimated_ticket",
    "luxury_real_estate",
    "hospitality_interest",
    "fit_score",
    "priority",
    "verification_status",
    "source_1",
    "source_2",
    "notes",
    "last_verified",
]

TYPES = {
    "luxury_agency",
    "private_office",
    "family_office",
    "real_estate_investor",
    "real_estate_fund",
    "private_equity_real_estate",
    "hospitality_investor",
    "private_capital",
    "international_property_advisor",
    "other_relevant",
}
BUYER_ORIGIN = {"strong", "moderate", "weak", "unclear"}
YES_NO_UNCLEAR = {"yes", "no", "unclear"}
LUX_HOSP = {"yes", "no", "unclear"}
VERIFICATION = {"verified", "partially_verified", "needs_review"}
PRIORITY = {"A", "B", "C"}

EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$")
URL_RE = re.compile(r"^https://[^\s]+$")
DATE_RE = re.compile(r"^20\d{2}-\d{2}-\d{2}$")


def priority_for_score(score: int) -> str:
    if score >= 8:
        return "A"
    if score >= 6:
        return "B"
    return "C"


def main() -> int:
    errors: list[str] = []
    if not CSV_PATH.exists():
        print(f"MISSING: {CSV_PATH}", file=sys.stderr)
        return 1

    with CSV_PATH.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames != HEADERS:
            errors.append(f"header mismatch: {reader.fieldnames}")
        rows = list(reader)

    if not rows:
        errors.append("no data rows")

    keys = []
    emails = []
    websites = []
    for i, row in enumerate(rows, start=2):
        loc = f"row {i} ({row.get('company_name')})"
        if row.get("country") != "Germany":
            errors.append(f"{loc}: country must be Germany")
        if not row.get("company_name"):
            errors.append(f"{loc}: empty company_name")
        if row.get("type") not in TYPES:
            errors.append(f"{loc}: invalid type {row.get('type')!r}")
        if row.get("buyer_origin_relevance") not in BUYER_ORIGIN:
            errors.append(f"{loc}: invalid buyer_origin_relevance")
        if row.get("italy_interest") not in YES_NO_UNCLEAR:
            errors.append(f"{loc}: invalid italy_interest")
        if row.get("amalfi_coast_relevance") not in BUYER_ORIGIN:
            errors.append(f"{loc}: invalid amalfi_coast_relevance")
        if row.get("luxury_real_estate") not in LUX_HOSP:
            errors.append(f"{loc}: invalid luxury_real_estate")
        if row.get("hospitality_interest") not in LUX_HOSP:
            errors.append(f"{loc}: invalid hospitality_interest")
        if row.get("verification_status") not in VERIFICATION:
            errors.append(f"{loc}: invalid verification_status")
        if row.get("priority") not in PRIORITY:
            errors.append(f"{loc}: invalid priority")
        try:
            score = int(row.get("fit_score", ""))
        except ValueError:
            errors.append(f"{loc}: fit_score not an int")
            score = 0
        else:
            if not 1 <= score <= 10:
                errors.append(f"{loc}: fit_score out of range")
            expected = priority_for_score(score)
            if row.get("priority") != expected:
                errors.append(f"{loc}: priority {row.get('priority')} does not match fit_score {score} (expected {expected})")
        email = (row.get("email") or "").strip()
        if email:
            if not EMAIL_RE.match(email):
                errors.append(f"{loc}: invalid email {email!r}")
            emails.append(email.lower())
        for field in ("website", "source_1", "source_2", "linkedin_company", "linkedin_contact"):
            val = (row.get(field) or "").strip()
            if val and not URL_RE.match(val):
                errors.append(f"{loc}: {field} is not an https URL: {val!r}")
        if not (row.get("source_1") or "").strip():
            errors.append(f"{loc}: missing source_1")
        if row.get("priority") == "A" and not (row.get("source_2") or "").strip():
            errors.append(f"{loc}: Priority A missing source_2")
        if not DATE_RE.match(row.get("last_verified") or ""):
            errors.append(f"{loc}: last_verified not YYYY-MM-DD")
        keys.append((row.get("company_name", "").strip().lower(), row.get("city", "").strip().lower(), row.get("contact_name", "").strip().lower()))
        websites.append((row.get("website") or "").strip().rstrip("/").lower())

    dup_keys = [k for k, n in Counter(keys).items() if n > 1]
    if dup_keys:
        errors.append(f"duplicate company/city/contact keys: {dup_keys}")

    n = len(rows)
    n_email = sum(1 for r in rows if (r.get("email") or "").strip())
    n_a = sum(1 for r in rows if r.get("priority") == "A")
    n_b = sum(1 for r in rows if r.get("priority") == "B")
    n_c = sum(1 for r in rows if r.get("priority") == "C")
    n_verified = sum(1 for r in rows if r.get("verification_status") == "verified")

    print(f"path={CSV_PATH}")
    print(f"rows={n}")
    print(f"priority_A={n_a} priority_B={n_b} priority_C={n_c}")
    print(f"with_email={n_email}")
    print(f"verified={n_verified}")
    if errors:
        print("QA FAILED:", file=sys.stderr)
        for e in errors:
            print(f" - {e}", file=sys.stderr)
        return 1
    print("QA PASSED")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
