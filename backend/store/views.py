from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import RegisterSerilzer, UserSerialzer
from .models import Product, Category, Cart, CartItem, Order,OrderItem
from .serializer import (
    ProductSerialzer,
    CategorySerialzer,
    CartSerializer,
    CartItemSerializer
)
from rest_framework import status

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerialzer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_category(request):
    category = Category.objects.all()
    serializer = CategorySerialzer(category, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerialzer(
            product,
            context={'request': request}
        )
        return Response(serializer.data)

    except Product.DoesNotExist:
        return Response(
            {'error': 'Product not found'},
            status=404
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(
        user=request.user
    )

    serializer = CartSerializer(cart)

    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
@permission_classes(IsAuthenticated)
def add_to_cart(request):

    product_id = request.data.get('product_id')

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {'error': 'Product not found'},
            status=404
        )

    # Handle both authenticated and anonymous users
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(
            user=request.user
        )
    else:
        # For anonymous users, use session ID
        if 'cart_id' not in request.session:
            cart = Cart.objects.create(user=request.user)
            request.session['cart_id'] = cart.id
        else:
            cart_id = request.session.get('cart_id')
            try:
                cart = Cart.objects.get(id=cart_id, user__isnull=True)
            except Cart.DoesNotExist:
                cart = Cart.objects.create(user=None)
                request.session['cart_id'] = cart.id

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return Response(
        {'message': 'Product added to cart'},
        status=200
    )


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):

    cart_item_id = request.data.get('cart_item_id')

    try:
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(
                id=cart_item_id,
                cart__user=request.user
            )
        else:
            # For anonymous users, get from session cart
            cart_id = request.session.get('cart_id')
            cart_item = CartItem.objects.get(
                id=cart_item_id,
                cart__id=cart_id
            )

        cart_item.delete()

        return Response(
            {'message': 'Product removed from cart'},
            status=200
        )

    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'},
            status=404
        )


@csrf_exempt
@api_view(['POST'])
@permission_classes(IsAuthenticated)
def update_cart_quantity(request):

    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or quantity is None:
        return Response(
            {'error': 'Item ID and quantity are required'},
            status=400
        )

    try:
        if request.user.is_authenticated:
            item = CartItem.objects.get(
                id=item_id,
                cart__user=request.user
            )
        else:
            # For anonymous users, get from session cart
            cart_id = request.session.get('cart_id')
            item = CartItem.objects.get(
                id=item_id,
                cart__id=cart_id
            )

        quantity = int(quantity)

        if quantity < 1:
            item.delete()

            return Response(
                {'message': 'Cart item removed'},
                status=200
            )

        item.quantity = quantity
        item.save()

        serializer = CartItemSerializer(item)

        return Response(serializer.data)

    except CartItem.DoesNotExist:
        return Response(
            {'error': 'Cart item not found'},
            status=404
        )

    except ValueError:
        return Response(
            {'error': 'Quantity must be a number'},
            status=400
        )
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data = request.data
        name = data.get('name')
        phone = data.get('phone')
        payment_method = data.get('payment_method','COD')

        if not phone.isdigit() or len(phone) < 10:
            return Response({'error':'Invalid phone number'},status=400)

        cart, created = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error':'Cart is empty'},status=400)

        total = sum(item.product.price * item.quantity for item in cart.items.all())

        order = Order.objects.create(user=request.user, total_amount=total)

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        cart.items.all().delete()
        return Response({'message':'Order successfully','order_id':order.id})
    except Exception as e:
        return Response({'error':str(e)},status=500)

 
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerilzer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message":"user created successfully","user":UserSerialzer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

