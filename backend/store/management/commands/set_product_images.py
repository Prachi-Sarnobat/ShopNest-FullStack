from django.core.management.base import BaseCommand
from store.models import Product


IMAGE_MAP = {
    "Wireless Earbuds Pro": "product/webp",
    "Smart LED Desk Lamp": "product/download_2.jpg",
    "Portable Bluetooth Speaker": "product/images.jpg",
    "Fitness Tracker Band": "product/SHOOP.webp",
    "Mechanical Keyboard Compact": "product/shopping_1.webp",
    "Stainless Steel Water Bottle": "product/shopping_2.webp",
    "USB-C Fast Charger 65W": "product/shopping_3.webp",
    "Smartwatch Series X": "product/shopping_4.webp",
    "Robot Vacuum Cleaner": "product/shopping_5.webp",
    "Laptop Sleeve 14-inch": "product/shopping.webp",
}


class Command(BaseCommand):
    help = "Assign existing images from media/product to products"

    def handle(self, *args, **options):
        updated = 0

        for product_name, image_path in IMAGE_MAP.items():
            try:
                product = Product.objects.get(name=product_name)
                product.image.name = image_path
                product.save(update_fields=["image"])

                self.stdout.write(
                    self.style.SUCCESS(
                        f"✓ {product_name} -> {image_path}"
                    )
                )
                updated += 1

            except Product.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(
                        f"Product not found: {product_name}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone. {updated} product images assigned."
            )
        )