

## Features

Hyperledger Fabric is a permissioned blockchain infrastructure. It is a more resilient, extensible and scalable blockchain platform suitable for enterprises.

The primary difference between a permissioned blockchain network and an unpermissioned blockchain network is whether the participants in the network have an ability to restrict who can participate in the consensus mechanism of the blockchain’s network.

A blockchain creates trust, traceability, and immutability through a peer-to-peer network. All transactions in the network, such as payments or event tracking in a supply chain, are confirmed by participants in the network. Thus, no central authority alone controls the validity of these events. These acknowledgments given by the participants lead to a consensus in the network, with which the data on the blockchain is continually persisted. So the majority of the participants decide whether a transaction is valid, instead of a single player. 

## Screenshots

![ConsoleOutPut](images/screenshot-1.png)

# Provenance POC CI/CD Process

All the CI/CD configuration is prepared in Jenkins pipleline. 

## Jenkins Setup 

Before we begin integrating Hyperledger Fabric project pipeline, we need to install the below listed plugins:

1.) Node.js plugin, for node.js installations under jenkins user.  <br/>
2.) Gihub plugin, for integrating with Github.  <br/>
3.) Pipeline plugin, for congiguring pipeline stages.  <br/>

Note: After the plugins installation, we have to add new node.js installations in jenkins global tool configuration section.

![ConsoleOutPut](images/Jenkins-setup-1.png)

![ConsoleOutPut](images/Jenkins-setup-2.png)

## Hyperledger Fabric Environment Setup

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

## Checkout Code

Note : The Jenkins GitHub plugin provides support for receiving push notifications from Github post-commit hooks and using those notifications to trigger jobs within Jenkins. It can set-up the post-commit hooks in GitHub.

## Static Code Analysis <"TBD">

### Step 3: Install Hyperledger Fabric

This step creates a local Hyperledger Fabric runtime to deploy business network application. 

	mkdir ~/fabric-dev-servers
	cd ~/fabric-dev-servers
	curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
	tar -xvf fabric-dev-servers.tar.gz
	cd ~/fabric-dev-servers
	./downloadFabric.sh
	
## Build BNA (Business Network Archive)
	
Before a business network definition can be deployed it must be packaged into a Business Network Archive (.bna) file. The composer archive create command is used to create a business network archive file from a business network definition folder on disk.

## Start Fabric Instance
 
Launch the network using the startFabric.sh shell script. This command will spin up various Fabric entities and launch a smart contract container for chaincode written in Golang or node.js.
 
## Deploy Business Networks

Once the business network archive file has been created it can be deployed to a runtime using the composer runtime install command followed by a composer network start command. In Hyperledger Fabric , peers enforce the concepts of administrators and members. Administrators have permission to install Hyperledger Fabric chaincode for a new business network onto peers. Members do not have permission to install chaincode. In order to deploy a business network to a set of peers, you must provide an identity that has administrative rights to all of those peers.

To make that identity and its certificates available, you must create a Peer Admin business network card using the certificate and private key associated with the peer admin identity. The peer administrator for this network is called PeerAdmin, and the identity is automatically imported for you when you use the sample scripts for starting the network. 

## Unit Testing <"TBD">

![ConsoleOutPut](images/console.png)

## Pipeline Script