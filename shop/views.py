from django.db.models import query
from rest_framework import generics, mixins, viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import *
from .models import *

class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

class CategoryViewset(viewsets.ViewSet):
    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Category.objects.get(id=pk)
        serializer = CategorySerializer(queryset)

        serializer_data = serializer.data
        products = Product.objects.filter(category_id =serializer_data['id'])
        product_serializer = ProductSerializer(products, many=True)
        serializer_data['product_category'] = product_serializer.data
        return Response(serializer_data)

class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            queryset = Profile.objects.get(prouser = request.user)
            serializer = ProfileSerializer(queryset)
            response_message = {
                'error':False,
                'data':serializer.data
            }
        except:
            response_message = {
                'error':True,
                'message':'something went wrong'
            }
        return Response(response_message)

class RegisterView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'error':False,
                'message':f"user is created for {serializer.data['username']}",
                "data":serializer.data
            })
        return Response({
            'error':True,
            'message':'Username already exists'
        })

 