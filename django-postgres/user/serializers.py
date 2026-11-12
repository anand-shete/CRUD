from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError as DjangoValidationError
from user.models import User

class UserReadSerializer(serializers.Serializer):
    """
    Serializer for Read all users
    """
    
    id = serializers.UUIDField(read_only=True)
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField(required=False, max_length=50)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)



class UserWriteSerializer(serializers.Serializer):
    """
    Serializer to validate creation of new user
    """
     
    id = serializers.UUIDField(read_only=True)
    username = serializers.CharField(max_length=255, trim_whitespace=False)
    email = serializers.EmailField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255, write_only=True)
        
        
    def validate_username(self, value):
        """
        example validation function for username
        """ 
        
        return value
    
    
    def validate_password(self, value):
        """
        Validation functions must be named `validate_<field>`  
        validadtion functions are executed with `serializer.is_valid()`
        """
        try:
            validate_password(value, user=None)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        
        return value
        
        
    def create(self, validated_data):
        """
        After validation, `create()` is executed for POST request
        """
        
        validated_data["password"] = make_password(validated_data["password"])
        return User.objects.create(**validated_data)
    
    
    
class UserUsernameUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        """
        Meta class must have `model` property
        """
        
        model = User
        
        # serizlier only update following fields for incoming data (POST, PUT, PATCH)
        # for outgoing data (GET), only displays following fields from db
        fields = ["username"]