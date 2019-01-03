# Spree Crawler

Node JS API services.

## Prerequisites
1. Install Node JS
2. Get `env-vars` secret file

## Environment
Set the following environment variables:
`PROJECT_ID` = `prod`  
`APP_ID` = `server` 

## Build & Install

#### Node JS
1. `npm install` 
1. Run `source env-vars`
1. Test your server with `NODE_ENV=production npm start`

#### Build docker
1. `docker build . --tag us.gcr.io/prod/server:[VERSION]`  
*Replace VERSION with semver https://semver.org/ version convention [e.g. 1.0.1]*
1. Test your docker by running it locally: `source env-vars; docker-compose up`

#### Creating a Kubernetes Engine cluster
`gcloud container clusters create server-cluster --num-nodes=1 --disk-size=10 --machine-type=n1-standard-1 --enable-autorepair`

#### Get authentication credentials for the cluster
To authenticate for the cluster, run the following command:
`gcloud container clusters get-credentials server-cluster`

### Register docker image
`gcloud docker -- push us.gcr.io/prod/server:[VERSION]`

This may take a while but once it's done, we should have the image listed on Compute > Container Engine > Container Registry. 

#### Create the deployment
1. `kubectl create -f .gcloud/deployment.yml`
1. Set environment variables: `kubectl set env deployment/server VAR1=VALUE VAR2=VALUE ...`
1. Verify your installation: `kubectl describe deployments server`

#### Exposing the deployment
After deploying the application, expose it to the Internet:
1. Create static ip: `gcloud compute addresses create server-ip --region us-east1`
1. Get the reserved address with `gcloud compute addresses list`
1. Update `service.yml` with the IP created in the previous step
1. `kubectl create -f .gcloud/service.yml`

## Deploy

Run the following command:
1. `gcloud container clusters get-credentials server-cluster`
1. `gcloud container builds submit --config=.gcloud/cloudbuild.yml --substitutions=_VERSION=[VERSION] .`  

Or (**much slower**)
1. Rebuild the docker images
1. Register the newly build docker image: `gcloud docker -- push us.gcr.io/prod/server:[VERSION]`
1. Update the deployment with the new image: `kubectl set image deployment/server server=us.gcr.io/prod/server:[VERSION]`

## Cleanup
1. Remove all stopped containers: `docker rm $(docker ps -a -q)`
1. Remove all untagged images: `docker rmi $(docker images | grep "^<none>" | awk "{print $3}")`

## Troubleshoot
1. `kubectl get pods`
1. `kubectl logs [POD_NAME]` 

### 403 errors
https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/kubectl

## Seed Data
1. Change directory to src/config/database
2. Run `seed-setup`
3. Seed the database with the following command
    `NODE_ENV=<development|test|production> seed`

## Migration

1. Create a model `node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string`
2. Run migrations `node_modules/.bin/sequelize db:migrate`

see more in http://docs.sequelizejs.com/manual/tutorial/migrations.html.

## Usage
Run `npm start`
