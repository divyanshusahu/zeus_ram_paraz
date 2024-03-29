import boto3
from botocore.client import Config
import settings

def upld_fl(inputfilename, bucketfilename) :
    s3 = boto3.resource('s3')
    try :
        s3.meta.client.upload_file(Filename=inputfilename, Bucket=settings.BUCKET_NAME, Key=bucketfilename)
    except :
        return False
    return True

def dwnl_fl(filename) :
    s3 = boto3.resource('s3')
    save_path = '/work/input.scf'
    try :
        s3.Object(settings.BUCKET_NAME, filename).download_file(save_path)
    except :
        return False
    return save_path

def create_presigned_url(filename) :
    s3 = boto3.resource('s3', config=Config(signature_version='s3v4', region_name=settings.AWS_REGION))
    try :
        response = s3.meta.client.generate_presigned_url('get_object', Params={'Bucket':settings.BUCKET_NAME,'Key':filename}, ExpiresIn=3600)
    except :
        return False
    return response
