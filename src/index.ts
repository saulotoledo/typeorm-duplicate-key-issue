import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { Category } from './category.entity';

const connectionOptions: PostgresConnectionOptions = {
  "type": "postgres",
  "host": "127.0.0.1",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "database_test",
  "synchronize": true,
  "logging": true,
  "entities": ["*.entity.js"],
  "cli": {
      "entitiesDir": "./src"
  }
};

let parentCategory = new Category();
parentCategory.name = 'Parent Category';

let childCategory = new Category();
childCategory.name = 'Child Category';
childCategory.parent = parentCategory;

createConnection(connectionOptions).then((connection) => {
  let parentCategory = new Category();
  parentCategory.name = 'Parent Category';

  let childCategory = new Category();
  childCategory.name = 'Child Category';
  childCategory.parent = parentCategory;

  connection.manager.save(childCategory).then(() => {
    let newChildCategory = new Category();
    newChildCategory.name = 'New Child Category';
    newChildCategory.parent = childCategory.parent;

    connection.manager.save(newChildCategory); //<- Throws duplicate key error due to cascade
  });
});

