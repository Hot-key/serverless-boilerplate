# serverless-boilerplate

pnpm + serverless framework v3 + turborepo + hasura boilerplate

## config

Update serverless config  

```yml
# app\turbo\generators\templates\serverless.yml

custom:
  domains:
    prod: {prod domain}
    staging: {staging domain}
    dev: {dev domain}
  customDomain:
    hostedZoneId: {hostedZoneId}

# I'm sorry. I'm poor at config iam role
# This role is dangerous, you need update role 
provider:
  iamRoleStatements:
    - Effect: "Allow"
      Action:
        - "*"
      Resource: "*"
```
