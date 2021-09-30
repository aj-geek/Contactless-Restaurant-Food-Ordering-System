from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.http import HttpResponse
import csv



from base.models import Product, Order, OrderItem, DeliveryAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime
from django.core.mail import EmailMessage
from django.conf import settings



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:

        # Order Creating
        order = Order.objects.create(
            user=user,
            paymentMethod= data['paymentMethod'],
            taxPrice = data['taxPrice'],
            extraPrice = data['extra'],
            totalPrice = data ['totalPrice'],
        )

        # Mode of order

        delivery = DeliveryAddress.objects.create(
            order = order,
            address = data['deliveryAddress']['address'],
            phone = data['deliveryAddress']['phone'],
            orderMode = data['deliveryAddress']['orderMode'],
        )


        # Cart Items

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product = product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )


            product.countInStock -= int(item.qty)
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Denied, Authorization required'}, 
                status=HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order doesnot exist'}, 
                status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sendMail(request, pk):
    user = request.user
    try:
        mail = EmailMessage('Your order with YumCafe',
        f'Your order {pk} is successfully placed.' 
        , settings.EMAIL_HOST_USER , [user] ,)
        mail.fail_silently=False
        mail.send()
        return Response('Sent')
    except:
        return Response('Something went Wrong')



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Paid!!')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToServed(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('Order Ready')

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrdersAsExcel(request):
    response = HttpResponse(content_type='text/csv')

    writer = csv.writer(response)
    writer.writerow(['Order Id', 'Order Date', 'Order Total', 'Order Tax', 'Extra Charges'])

    
    for order in Order.objects.all().values_list('_id', 'createdAt', 'totalPrice', 'taxPrice', 'extraPrice'):
        writer.writerow(order)

    response['Content-Disposition'] = 'attachment; filename="orders.csv"'
    return response
