# Generated by Django 5.0.4 on 2024-04-30 04:22

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ChatMessage",
            fields=[
                ("chat_id", models.AutoField(primary_key=True, serialize=False)),
                ("user_response", models.TextField()),
                ("ai_response", models.TextField()),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Employee",
            fields=[
                (
                    "Employee_id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "Attrition",
                    models.CharField(
                        default="No",
                        help_text="Attrition status: 'Yes' or 'No'",
                        max_length=3,
                    ),
                ),
                ("Age", models.IntegerField()),
                ("BusinessTravel", models.CharField(max_length=50)),
                ("DailyRate", models.IntegerField()),
                ("Department", models.CharField(max_length=100)),
                ("DistanceFromHome", models.IntegerField()),
                ("Education", models.IntegerField()),
                ("EducationField", models.CharField(max_length=50)),
                ("EmployeeCount", models.IntegerField()),
                ("EmployeeNumber", models.IntegerField()),
                ("EnvironmentSatisfaction", models.IntegerField()),
                ("Gender", models.CharField(max_length=10)),
                ("HourlyRate", models.IntegerField()),
                ("JobInvolvement", models.IntegerField()),
                ("JobLevel", models.IntegerField()),
                ("JobRole", models.CharField(max_length=100)),
                ("JobSatisfaction", models.IntegerField()),
                ("MaritalStatus", models.CharField(max_length=20)),
                ("MonthlyIncome", models.IntegerField()),
                ("MonthlyRate", models.IntegerField()),
                ("NumCompaniesWorked", models.IntegerField()),
                ("Over18", models.CharField(max_length=5)),
                ("OverTime", models.CharField(max_length=10)),
                ("PercentSalaryHike", models.IntegerField()),
                ("PerformanceRating", models.IntegerField()),
                ("RelationshipSatisfaction", models.IntegerField()),
                ("StandardHours", models.IntegerField()),
                ("StockOptionLevel", models.IntegerField()),
                ("TotalWorkingYears", models.IntegerField()),
                ("TrainingTimesLastYear", models.IntegerField()),
                ("WorkLifeBalance", models.IntegerField()),
                ("YearsAtCompany", models.IntegerField()),
                ("YearsInCurrentRole", models.IntegerField()),
                ("YearsSinceLastPromotion", models.IntegerField()),
                ("YearsWithCurrManager", models.IntegerField()),
                ("Name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Employee_Data",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("Attrition_prediction", models.BooleanField(default=False)),
                ("Appraisal_suggestion", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Transcript",
            fields=[
                (
                    "transcript_id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("title", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
