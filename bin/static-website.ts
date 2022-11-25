import cdk = require("@aws-cdk/core");
import { StaticSiteStack } from "../lib/static-website-stack";


const app = new cdk.App();

new StaticSiteStack(app, 'StaticSiteStack', {
  env: {
    region: 'us-east-1',
  },
})
app.synth();