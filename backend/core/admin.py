from django.contrib import admin
from .models import PressRelease, TranslatedText, Ministry, AudienceType, Category

# Register your models here.
admin.site.register(PressRelease)
admin.site.register(TranslatedText)
admin.site.register(Ministry)
admin.site.register(AudienceType)
admin.site.register(Category)
