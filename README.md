# Hyperledger Fabric Provenance POC CI/CD Process

All the CI/CD configuration is prepared in Jenkins pipleline. 

![ConsoleOutPut](images/console.png)

## Environment Setup

### Step 1: Installing pre-requisites
To run Hypeledger Blockchain Platform, the below pre-requisites need to be installed on the platform on which you will be developing blockchain applications or operating Hyperledger Fabric.

Docker Engine	: Version 17.03 or higher <br/>
Docker-Compose	: Version 1.8 or higher <br/>
Node			: 8.9 or higher <br/>
npm				: v5.x <br/>
git				: 2.9.x or higher <br/>
Python			: 2.7.x <br/>


### Step 2: Install the CLI tools

There are a few useful CLI tools for Blockchain Platform developers. 

* composer-cli : Utility which contains all the essential operations.
* composer-rest-server : Utility for running a REST Server on your machine to expose your business networks as RESTful APIs.

## Step 3: Install Hyperledger Fabric

This step creates a local Hyperledger Fabric runtime to deploy business network application. In a directory of your choice, get the .tar.gz file that contains the tools to install Hyperledger Fabric:

	mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers
	curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
	tar -xvf fabric-dev-servers.tar.gz

Use the scripts downloaded and extracted to download a local Hyperledger Fabric runtime:

	cd ~/fabric-dev-servers
	./downloadFabric.sh
	