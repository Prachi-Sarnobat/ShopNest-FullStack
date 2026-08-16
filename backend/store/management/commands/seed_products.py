from django.core.management.base import BaseCommand
from django.utils.text import slugify
from store.models import Category, Product


CATEGORIES = ["Electronics", "Household", "Accessories", "Wearables"]

PRODUCTS = [
    ("Wireless Earbuds Pro", "Electronics", 2499.00,
     "Active noise cancellation, 30-hour battery life with the charging case, and a snug in-ear fit."),
    ("Smart LED Desk Lamp", "Household", 1299.00,
     "Touch-dimmable desk lamp with adjustable color temperature and a USB charging port built into the base."),
    ("Portable Bluetooth Speaker", "Electronics", 1899.00,
     "Compact speaker with punchy bass, IPX6 water resistance, and 12 hours of playback on a single charge."),
    ("Fitness Tracker Band", "Wearables", 1599.00,
     "Tracks steps, heart rate, and sleep, with a 7-day battery and a bright always-on display."),
    ("Mechanical Keyboard Compact", "Electronics", 3299.00,
     "Hot-swappable mechanical switches, per-key RGB lighting, and a compact 65% layout for small desks."),
    ("Stainless Steel Water Bottle", "Household", 699.00,
     "Double-wall insulated bottle that keeps drinks cold for 24 hours or hot for 12, 750ml capacity."),
    ("USB-C Fast Charger 65W", "Accessories", 999.00,
     "GaN fast charger with two ports, compact enough to travel with, safely charges laptops and phones alike."),
    ("Smartwatch Series X", "Wearables", 4999.00,
     "AMOLED display, built-in GPS, blood oxygen monitoring, and five days of battery on a full charge."),
    ("Robot Vacuum Cleaner", "Household", 8999.00,
     "Maps your home automatically, empties into a self-cleaning base, and can be scheduled from an app."),
    ("Laptop Sleeve 14-inch", "Accessories", 799.00,
     "Padded, water-resistant sleeve with a soft interior lining, fits most 13 to 14-inch laptops."),
    ("Noise Cancelling Headphones", "Electronics", 5499.00,
     "Over-ear headphones with adaptive noise cancellation and 40 hours of battery life."),
    ("Smart Plug (Pack of 2)", "Household", 899.00,
     "Wi-Fi smart plugs that work with voice assistants, schedule your appliances from anywhere."),
]


class Command(BaseCommand):
    help = "Seed the database with sample categories and products so the store isn't empty."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete existing categories and products before seeding.",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            Product.objects.all().delete()
            Category.objects.all().delete()
            self.stdout.write(self.style.WARNING("Cleared existing products and categories."))

        category_map = {}
        for name in CATEGORIES:
            category, created = Category.objects.get_or_create(
                name=name,
                defaults={"slug": slugify(name)},
            )
            category_map[name] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created category: {name}"))

        created_count = 0
        for name, category_name, price, description in PRODUCTS:
            _, created = Product.objects.get_or_create(
                name=name,
                defaults={
                    "category": category_map[category_name],
                    "price": price,
                    "description": description,
                },
            )
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"Done. {created_count} new product(s) created, "
            f"{Product.objects.count()} total in the database."
        ))
        self.stdout.write(
            "Products were created without images — add photos later from "
            "/admin/store/product/ whenever you like, the store works fine without them."
        )
