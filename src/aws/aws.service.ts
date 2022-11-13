import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { PromiseResult } from 'aws-sdk/lib/request';
import * as path from 'path';

@Injectable()
export class AwsService {
    private readonly awsS3: AWS.S3;
    public readonly S3_BUCKET_NAME: string;

    constructor(private readonly configService: ConfigService) {
        this.awsS3 = new AWS.S3({
            region: this.configService.get("AWS_S3_REGION"),
            endpoint: new AWS.Endpoint('https://kr.object.ncloudstorage.com'),
            accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
        });
        this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
    }

    async uploadFileToS3(
        folder: string,
        file: Express.Multer.File,
    ): Promise<{
        key: string;
        s3Object: Promise<PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>>;
        contentType: string;
    }> {
        try {
            const key = `${folder}/${Date.now()}_${path.basename(
                file.originalname,
            )}`.replace(/ /g, '');
            const s3Object = this.awsS3
                .putObject({
                    Bucket: this.S3_BUCKET_NAME,
                    Key: key,
                    Body: file.buffer,
                    ACL: 'public-read',
                    ContentType: file.mimetype,
                })
                .promise();
            return { key, s3Object, contentType: file.mimetype };
        } catch (error) {
            throw new BadRequestException(`Failed to delete file : ${error}`);
        }
    }

    async deleteS3Object(
        key: string,
        callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
    ): Promise<{ success: true }> {
        try {
            await this.awsS3
                .deleteObject(
                    {
                        Bucket: this.S3_BUCKET_NAME,
                        Key: key,
                    },
                    callback,
                )
                .promise();
            return { success: true };
        } catch (error) {
            throw new BadRequestException(`Failed to delete file : ${error}`);
        }
    }

    public getAwsS3FileUrl(objectKey: string) {
        return `https://kr.object.ncloudstorage.com/${this.S3_BUCKET_NAME}/${objectKey}`;
    }
}
