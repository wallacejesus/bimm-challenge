
## Description

Technic challenge of Bimm Company

## Start Project

Create a .env file  in root of project.
On the .env file you can put the variables below, but it is optional
PORT - It is the web port
PORT_MONGODB - It is the port where will be used the mongo db
MONGODB_URL - Url to connect with mongo db

```bash
$ docker compose up -d
```

## Open graphql playground:
http://localhost:3000/graphql

**Note**: It will depend of variable created on the step of start project

## Examples of Graphql queries:
  ## Find a list of vehicles makes
  ```
  query{
    vehicles{
      makeId
      makeName
      vehicleTypes{
        typeId
        typeName
      }
    }
  }
  ```
  ## Find a specific vehicle make by makeID
  ```
  query{
    vehicle(makeId: "4877"){
      makeId
      makeName
      vehicleTypes{
        typeId
        typeName
      }
    }
  }
  ```