import boto3
import os

AWS_ACCESS_KEY = "AKIAXYKJRRMJBWVKVH54"
AWS_SECRET_KEY = "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"
AWS_REGION = "ap-south-1"  # Mumbai
BUCKET_NAME = "medsec-upload-bucket"

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)


def upload_file(file, filename):
    s3.upload_fileobj(file, BUCKET_NAME, filename)
    return f"https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{filename}"