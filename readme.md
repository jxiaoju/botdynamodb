# botdynamodb

This package is used in dynamodb demo for [https://www.npmjs.com/package/@zoomus/chatbot-cli](https://www.npmjs.com/package/@zoomus/chatbot-cli).This package is only for demo now,you can write your own database code in chatbot-cli.

## Installation
`npm i botdynamodb -S`


## How to write a custom database package for chatbot-cli

```js
//in dbexample.js
module.exports=function(option){
  //option which  is config of useDatabase in botConfig.js
  let {tables,port,region}=options;
  //wrap the table instance in each mode
  //can use await table1model.save(),await table1model.update() and so on
  return {
      table1model,
      table2model,
      ...
  }
};

//in botConfig.js
useDatabase: {
    lib: require('./dbexample'),
    option: {
      tables: {
        zoom: {
          tableName: 'zoomtable',
          hashKey: 'zoom_account_id',
          schema: {
            zoom_account_id: joi.string(),
            access_token: joi.string(),
            refresh_token: joi.string(),
            expires_date:joi.string()
          }
        }
      },
      port: process.env.DB_PORT || 8089,
      region: process.env.DB_REGION || 'us-east-1'
    }
}

// in your callback,you will auto get injected instance which named databaseModels

databaseModels.zoom.save({});

```

## botdynamodb api,only for demo

```js
await botdynamodb.tablemodelExample.save({
    [primaryKeyName]:primaryKey
});
await botdynamodb.tablemodelExample.update({
    [primaryKeyName]:primaryKey
});
await botdynamodb.tablemodelExample.delete({
    [primaryKeyName]:primaryKey
});
await botdynamodb.tablemodelExample.get({
    [primaryKeyName]:primaryKey
});
await botdynamodb.tablemodelExample.query(primaryKey);
await botdynamodb.tablemodelExample.scan();

```


