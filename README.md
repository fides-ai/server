# Spree Crawler

Node JS API services.

## Prerequisites
1. Install Node JS
2. Get `env-vars` secret file

## Environment
Set the following environment variables:
`PROJECT_ID` = `prod`  
`APP_ID` = `server` 

## Build

#### Node JS
1. `npm install` 
1. Run `source env-vars`
1. Test your server with `NODE_ENV=production npm start`

#### Build docker
1. `docker build . --tag us.gcr.io/fides-prod/fides-server:[VERSION]`  
*Replace VERSION with semver https://semver.org/ version convention [e.g. 1.0.1]*
1. Test your docker by running it locally: `source env-vars; docker-compose up`

### Build on GCloud

#### Setup your environment
1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts), which includes the gcloud command-line tool.
1. Install the kubectl command-line tool by running the following command: `gcloud components install kubectl`
1. Setting default project: `gcloud config set project [PROJECT_ID]
`
1. Setting a default compute zone:`gcloud config set compute/zone [COMPUTE_ZONE]`
1. Verify your settings by running the following command: `gcloud config list`

* 1. Make sure to authenticate with the user attached to your environment by running: `gcloud auth login`

See more in: https://cloud.google.com/kubernetes-engine/docs/quickstart

#### Creating a Kubernetes Engine cluster
`gcloud container clusters create fides-server-cluster --num-nodes=1 --disk-size=10 --machine-type=n1-standard-1 --enable-autorepair`

#### Get authentication credentials for the cluster
To authenticate for the cluster, run the following command:
`gcloud container clusters get-credentials fides-server-cluster`

### Register docker image
`gcloud docker -- push us.gcr.io/fides-prod/fides-server:[VERSION]`

This may take a while but once it's done, we should have the image listed on Compute > Container Engine > Container Registry. 

#### Create the deployment
1. `kubectl create -f .gcloud/deployment.yml`
1. Set environment variables: `kubectl set env deployment/fides-server VAR1=VALUE VAR2=VALUE ...`
1. Verify your installation: `kubectl describe deployments fides-server`

#### Exposing the deployment
After deploying the application, expose it to the Internet:
1. Create static ip: `gcloud compute addresses create fides-server-ip --region us-east4`
1. Get the reserved address with `gcloud compute addresses list`
1. Update `service.yml` with the IP created in the previous step
1. `kubectl create -f .gcloud/service.yml`

## Deploy

Run the following command:
1. `gcloud container clusters get-credentials fides-server-cluster`
1. `gcloud container builds submit --config=.gcloud/cloudbuild.yml --substitutions=_VERSION=[VERSION] .`  

Or (**much slower**)
1. Rebuild the docker images
1. Register the newly build docker image: `gcloud docker -- push us.gcr.io/fides-prod/fides-server:[VERSION]`
1. Update the deployment with the new image: `kubectl set image deployment/fides-server server=us.gcr.io/fides-prod/fides-server:[VERSION]`

## Cleanup
1. Remove all stopped containers: `docker rm $(docker ps -a -q)`
1. Remove all untagged images: `docker rmi $(docker images | grep "^<none>" | awk "{print $3}")`
1. Remove 

## Troubleshoot
1. `kubectl get pods`
1. `kubectl logs [POD_NAME]` 

### 403 errors
https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/kubectl

## Migration

1. Create a model `node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string`
2. Run migrations `node_modules/.bin/sequelize db:migrate`

see more in http://docs.sequelizejs.com/manual/tutorial/migrations.html.

## Usage
Run `npm start`
