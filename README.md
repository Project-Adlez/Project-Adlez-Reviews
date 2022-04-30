![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

# Atelier Reviews

This is a node/express application that provides a REST API for the Atelier ecommerce frontend.

The database schema are contained in `/PostgreSQL`

The node server is contained entirely in root folder and enters on `index.js`


## Install

Ensure the database is prepared - [PSQL](**TODO**)

```
npm install
```

copy `example.env` to `.env` and configure the variables within.

## Run the App

```
npm start
```

# API Endpoints

All Queries take parameters as Query strings unless it is in the endpoint\
All responses should return status code `200 OK`

### `GET /reviews`
Retrieve a list of reviews

#### Parameters
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| product_id| integer | Identifies which product to provide reviews for.          |
| page      | Integer | Selects the page of results to return. Default 1.         |
| page_size | Integer | Specifies how many results per page to return. Default 5. |

#### Response
```json
{
    "product_id": "65633",
    "page": 0,
    "count": "3",
    "results": [
        {
            "review_id": 378623,
            "rating": 2,
            "summary": "Dolorum nihil ratione omnis quia placeat odit blanditiis labore adipisci.",
            "recommend": true,
            "response": "null",
            "body": "Optio et cum et quaerat consectetur voluptatum et quidem sit. Veniam eum illum corporis quasi eligendi in velit. Soluta qui est et ut laboriosam et. Et deleniti nesciunt sed corporis ut omnis.",
            "date": "1610968654313",
            "reviewer_name": "Jeremie_Langworth",
            "helpfulness": 1,
            "photos": null
        },
        {
            "review_id": 378625,
            "rating": 1,
            "summary": "Voluptatem sint iste vel placeat.",
            "recommend": false,
            "response": "null",
            "body": "Facilis vitae qui sed quidem ex culpa. Temporibus molestias aperiam laborum consequuntur. Id delectus molestiae reprehenderit sit qui ut laborum vel. Iusto enim reiciendis quam quia. Impedit ea voluptas neque rem ut et veniam et. Iste et quasi similique deserunt.",
            "date": "1604879159688",
            "reviewer_name": "Madie.Bruen32",
            "helpfulness": 4,
            "photos": null
        },
        {
            "review_id": 378626,
            "rating": 3,
            "summary": "Maiores reiciendis velit rerum veritatis pariatur quia.",
            "recommend": true,
            "response": "null",
            "body": "Doloribus aut nihil. Nam cumque voluptatibus ipsum velit quis sit dolores dolores enim. Hic non assumenda corrupti praesentium dolor et.",
            "date": "1595053184992",
            "reviewer_name": "Lionel99",
            "helpfulness": 1,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80"
                }
            ]
        }
    ]
}
```

### `GET /reviews/meta`
Returns compiled meta-review data.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Selects the product to return                     |

#### Response
```json
{
    "product_id": 65633,
    "ratings": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 1
    },
    "recommended": {
        "false": 0,
        "true": 1
    },
    "characteristics": [
        {
            "id": 219374,
            "name": "Size",
            "avg": 2.888888888888889
        },
        {
            "id": 219375,
            "name": "Width",
            "avg": 3
        },
        {
            "id": 219376,
            "name": "Comfort",
            "avg": 2.888888888888889
        },
        {
            "id": 219377,
            "name": "Quality",
            "avg": 3.555555555555556
        }
    ]
}
```

### `PUT /reviews/:product_id/helpful`
Rates a review as helpful.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Selects the product to rate                       |


### `PUT /reviews/:product_id/report`
Reports a view and hides it from future GET requests. Note - This does NOT remove it from the database, but only removes it from being accessed via API get requests.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Selects the product to report                     |
