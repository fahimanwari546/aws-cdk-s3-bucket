import cloudfront = require("@aws-cdk/aws-cloudfront");
import s3 = require("@aws-cdk/aws-s3");
import s3deploy = require("@aws-cdk/aws-s3-deployment");
import { Stack, App, StackProps } from "@aws-cdk/core";
import * as origins from "@aws-cdk/aws-cloudfront-origins";


export class StaticSiteStack extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);
  
  
  // Make bucket
  const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
    websiteIndexDocument: 'index.html',
    publicReadAccess: true,
    versioned: true,
  });

  // Deplyement
  
  new s3deploy.BucketDeployment(this, 'DeployWebsite', {
    sources: [s3deploy.Source.asset('./build')],
    destinationBucket: websiteBucket,
  });

// }
       // create a CDN to deploy your website

      new cloudfront.Distribution(this, "MyDistribution", {
        defaultBehavior: {
          origin: new origins.S3Origin(websiteBucket),
        },
        defaultRootObject: "index.html",
      });

  }
}