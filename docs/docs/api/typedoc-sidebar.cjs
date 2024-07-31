// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = { items: [
  {
    "type": "category",
    "label": "Classes",
    "items": [
      {
        "type": "doc",
        "id": "api/classes/Fetchtastic",
        "label": "Fetchtastic"
      },
      {
        "type": "doc",
        "id": "api/classes/ResponseError",
        "label": "ResponseError"
      }
    ]
  },
  {
    "type": "category",
    "label": "Type Aliases",
    "items": [
      {
        "type": "doc",
        "id": "api/type-aliases/CatcherCallback",
        "label": "CatcherCallback"
      },
      {
        "type": "doc",
        "id": "api/type-aliases/DataAssertionFn",
        "label": "DataAssertionFn"
      },
      {
        "type": "doc",
        "id": "api/type-aliases/FetchRequestHeader",
        "label": "FetchRequestHeader"
      },
      {
        "type": "doc",
        "id": "api/type-aliases/FetchtasticOptions",
        "label": "FetchtasticOptions"
      },
      {
        "type": "doc",
        "id": "api/type-aliases/HttpMethod",
        "label": "HttpMethod"
      },
      {
        "type": "doc",
        "id": "api/type-aliases/SearchParamInput",
        "label": "SearchParamInput"
      }
    ]
  },
  {
    "type": "category",
    "label": "Variables",
    "items": [
      {
        "type": "doc",
        "id": "api/variables/HttpMethods",
        "label": "HttpMethods"
      },
      {
        "type": "doc",
        "id": "api/variables/StatusCodes",
        "label": "StatusCodes"
      }
    ]
  },
  {
    "type": "category",
    "label": "Functions",
    "items": [
      {
        "type": "doc",
        "id": "api/functions/isHttpMethod",
        "label": "isHttpMethod"
      },
      {
        "type": "doc",
        "id": "api/functions/isStatusCode",
        "label": "isStatusCode"
      }
    ]
  }
]};
module.exports = typedocSidebar.items;