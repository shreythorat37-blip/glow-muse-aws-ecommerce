# Glow Muse – AI-Powered E-Commerce Fashion Website

**Student:** Shrey Thorat  
**Project Type:** Individual Project

## 1\. Project Overview

**Glow Muse** is an AI-powered fashion e-commerce web application designed to provide users with a modern, interactive, and personalized online shopping experience.

The application provides a fashion storefront where users can browse products, search and filter items, select colours and sizes, manage their cart and wishlist, and securely authenticate using Amazon Cognito.

The project has been deployed using AWS cloud services to demonstrate cloud storage, content delivery, authentication, serverless computing, database management, and monitoring.

## 2\. Key Features

* Modern fashion e-commerce interface
* Men's and women's fashion sections
* Product search and filtering
* Product sorting
* Colour and size selection
* Shopping cart
* Wishlist
* Product recommendation interface
* AI-style shopping assistant
* Visual search using image colour detection
* Fashion trends section
* User registration and login
* Cloud-based backend API
* Serverless AWS architecture
* Responsive web interface

## 3\. AWS Cloud Architecture

The project uses a serverless AWS architecture.

```text
User
  ↓
Amazon CloudFront
  ↓
Amazon S3
  ↓
Glow Muse Website

Glow Muse Website
  ↓
AWS Lambda
  ↓
Amazon DynamoDB

User
  ↓
Amazon Cognito
  ↓
Authenticated Application

AWS Lambda
  ↓
Amazon CloudWatch
  ↓
Monitoring \& Logs
```

## 4\. AWS Services Used

|AWS Service|Purpose|
|-|-|
|**Amazon S3**|Stores and hosts the frontend application files|
|**Amazon CloudFront**|Provides content delivery for the web application|
|**Amazon Cognito**|Handles user registration, login, and authentication|
|**AWS Lambda**|Provides the serverless backend API|
|**Amazon DynamoDB**|Stores application and product-related data|
|**Amazon CloudWatch**|Provides monitoring and execution logs|
|**AWS IAM**|Manages permissions and access control|

## 5\. Backend API

The backend is implemented using an AWS Lambda Web Function named:

```text
glow-muse-api
```

### Health/Test Endpoint

```text
/hello-world
```

Successful response:

```json
{
  "status": "success",
  "message": "Hello from Glow Muse API"
}
```

### Products Endpoint

```text
/products
```

This endpoint communicates with the `GlowMuseProducts` DynamoDB table and returns product information to the frontend.

## 6\. DynamoDB Tables

The application database is designed using Amazon DynamoDB.

* `GlowMuseProducts`
* `GlowMuseUsers`
* `GlowMuseCart`
* `GlowMuseWishlist`
* `GlowMuseOrders`
* `GlowMuseReviews`

## 7\. Authentication

User authentication is implemented using **Amazon Cognito**.

The authentication system provides:

* User registration
* Email-based login
* Secure authentication
* Session management
* Sign-out functionality

## 8\. Frontend Technologies

The frontend is developed using:

* HTML5
* CSS3
* JavaScript
* Responsive web design

Main application files include:

|File|Description|
|-|-|
|`index.html`|Main Glow Muse storefront|
|`app.js`|Application logic and interactive features|
|`auth.js`|Authentication integration|
|`styles.css`|Website styling and responsive design|
|`fashion.html`|Fashion catalogue page|
|`trends.html`|Fashion trends page|
|`schema.sql`|Database schema|

## 

## 

## 9\. Project Structure

```text
Glow-Muse-AWS-Ecommerce/
│
├── index.html
├── app.js
├── auth.js


├── styles.css
├── fashion.html
├── trends.html
├── schema.sql
│
├── database/
├── scripts/
│
├── AWS\_DEPLOYMENT.md
├── PROJECT\_REPORT.md
└── README.md
```

## 10\. Deployment

The application is deployed on AWS using:

```text
Frontend
   ↓
Amazon S3
   ↓
Amazon CloudFront
   ↓
User Browser
```

Backend communication:

```text
User Browser
   ↓
AWS Lambda
   ↓
Amazon DynamoDB
```

Authentication:

```text
User
   ↓
Amazon Cognito
   ↓
Authenticated Application
```

## 11\. Security

The project follows AWS security practices by using:

* AWS IAM permissions
* Amazon Cognito authentication
* Private S3 bucket configuration
* CloudFront distribution
* Controlled Lambda permissions
* DynamoDB access through AWS IAM

AWS credentials and secret access keys are not stored in the frontend source code.

## 12\. Testing

The deployed backend was tested using the Lambda Web Function endpoint.

The `/hello-world` endpoint successfully returned a JSON response, confirming that the Lambda Web Function and endpoint are operational.

The `/products` endpoint was also tested for communication with the DynamoDB database.

Amazon CloudWatch was used to monitor Lambda execution and troubleshoot deployment issues.

## 13\. Future Enhancements

Future versions of Glow Muse can include:

* Real-time AI fashion recommendations
* AWS Bedrock integration
* Advanced semantic product search
* Real payment gateway integration
* Real-time inventory management
* Order tracking
* Personalized user dashboards
* Advanced analytics
* Automated CI/CD deployment

## 14\. Project Information

**Project Name:** Glow Muse – AI-Powered E-Commerce Fashion Website  
**Student Name:** Shrey Thorat  
**Project Type:** Individual Project  
**Cloud Platform:** Amazon Web Services (AWS)

## 15\. GitHub Repository

**GitHub:**  
https://github.com/shreythorat37-blip/glow-muse-aws-ecommerce

## 16\. Conclusion

Glow Muse demonstrates the development and deployment of a modern cloud-based e-commerce application using Amazon Web Services.

The project combines frontend development with AWS services including Amazon S3, Amazon CloudFront, Amazon Cognito, AWS Lambda, Amazon DynamoDB, Amazon CloudWatch, and AWS IAM.

The implementation demonstrates practical knowledge of cloud deployment, serverless architecture, authentication, database management, API development, and cloud monitoring.



## 17\. Project Data



The project uses a products.json file containing the product catalogue data and associated product image information used by the application.



Due to GitHub's individual file upload size limitation, the products.json file is not included in this GitHub repository. The file is maintained separately and is used as part of the local project/application environment.



This does not affect the source code and AWS implementation presented in this repository.

