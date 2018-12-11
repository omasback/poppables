Contents
========

This contains all Poppables source code, data, and instrastructure defintions.

Source Code
-----------

This contains the lastest source code for the poppables.com Ruby on Rails app. There's information on setup and what's-where in the README.md file.


Database Dump
-------------

This is the latest snapshot of the poppables.com PostgreSQL database.


S3 Bucket Contents
------------------

This contains everything from the poppables.com S3 bucket, which in this case was used to host social share images for the site and a few videos used as placeholders when the user is selecting a game.


Infrastructure Script
---------------------

This contains a complete definition of all the AWS and Heroku infrastructure used to run the site. It could be used to recreate the site under a different AWS/Heroku account, and can also be referenced to see how the DNS, CDN and S3 Buckets were configured.


Instructions
============

Transfering the Heroku App
--------------------------

BIS should just need to set up a Heroku account and give the HYFN team an email address to which they can transfer ownership. Transferring ownership will not change anything else about the app or cause any interruption in service; it will continue to run under the same URL with the same services.

The Heroku app includes:
- The Rails application server itself
- The PosgreSQL database server
- The Memcached server
- The Redis server (used for certain game and anti-fraud functionality)
- Scheduling, logging and performance monitoring services.

Recreating the AWS Resources
----------------------------

There isn't an easy way to transfer the AWS assets, so they will need to be recreated under a BIS account. The full infrastructure is defined in the included Terraform configs. Summary and instructions for recreating below:

The services include:
- Route53 DNS - this doesn't need to run through AWS, any CNAME record pointing "www.poppables.com" to "www.poppables.com.herokudns.com" will work fine. No need to necessarily recreate this.
- S3 Bucket - a new S3 bucket will need to be created. Everything in the "S3 Bucket Contents" directory will need to be placed at the top level of this bucket. All files will need to be world-readable. Additionally, the value of the `AWS_S3_BUCKET_NAME` Heroku environment variable will need to be changed from `poppables` to whatever the name of the new bucket is.
- Cloudfront CDN Distributions - the app uses two Cloudfront distributions, one which sits in front of the app and one which sits in front of the S3 bucket. These are `CDN_HOST` and `BUCKET_CDN_HOST` respectively (in the Heroku environment variables.) To change these out you'll need to create two new CloudFront distributions and update the Heroku environment variables to point to their URLs. There are also some places where the bucket's Cloudflare URL is references directly in the code as well. You'll need to replace all instances of the URL 'dcyb5ui1o0ebh.cloudfront.net' with the URL of your new bucket CDN URL.
- IAM User - The `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` Heroku environment variables refer to an AWS IAM user account HYFN created specifically for this project. These should not be needed for this project, as the application itself does not need to interact with S3.


Simplifying things:

If you don't need a CDN in front of the app, we can likely remove the AWS dependency entirely, making things much simpler. This is the path we'd recommend and we can set it up that way if desired.


Other Services
--------------

### Sentry (error reporting)

Currently, there's an error reporting service (Sentry) that uses HYFN's Sentry account. You're welcome to leave as-is, remove the `SENTRY_DSN` environment variable to remove error reporting entirely, or create a Sentry account and update `SENTRY_DSN` to point to your account.

### ReCAPTCHA

The `RECAPTCHA_SECRET_KEY` and `RECAPTCHA_SITE_KEY` use a ReCAPTCHA that HYFN set up. These can be changed to use a ReCAPTCHA under a different account if desired.

### Facebook App

The Facebook app associated with this site is under a HYFN account and can be transferred if needed. HYFN will need the Facebook user id of the recipient.
