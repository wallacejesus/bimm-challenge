
## Description

Technic challenge of Bimm Company

## Start Project

```bash
$ docker compose up -d
```

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