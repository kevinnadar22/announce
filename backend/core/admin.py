from django.contrib import admin
from .models import PressRelease, TranslatedText, Ministry, AudienceType, Category

class PressReleaseAdmin(admin.ModelAdmin):
    list_filter = ('active',)

# Register your models here.
admin.site.register(PressRelease, PressReleaseAdmin)
admin.site.register(TranslatedText)
admin.site.register(Ministry)
admin.site.register(AudienceType)
admin.site.register(Category)
