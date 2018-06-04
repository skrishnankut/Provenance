
/**
 * Create Produce
 * @param {org.acme.model.productpedigree.CreateProduce} createProduce - the createProduce transaction
 * @transaction
 */
/*

function createProduce (farmerId, produceType) {
	var produce;
  timestamp = new Date(); 
	grId = produceType +  " # " + farmerId  + " # " + timestamp;
	produce.GRId = grId;
	produce.farmerId = farmerId;
	produce.produceType = produceType;
	produce.dateOfProduce = timestamp.getDate() + "-" + (timestamp.getMonth() + 1) + "-" + timestamp.getFullYear();

  return getAssetRegistry('org.acme.model.productpedigree.Produce')
   .then(function(productRegistry) {
     return produceRegistry.update(produce);
  })
}
*/

/**
 * Farmer Sells Produce To Manufacturer
 * @param {org.acme.model.productpedigree.FarmerSellsProduceToManufacturer }  farmerSellsProduceToManufacturer - the farmerSellsProduceToManufacturer transaction
 * @transaction
 */
function farmerSellsProduceToManufacturer (farmerSellsProduceToManufacturer)  {
  var manu = trackProductQualityPedigree.manu;
  var farmer = trackProductQualityPedigree.farmer;
  var GRId = trackProductQualityPedigree.GRId;
   
}



/**
 * Manufacturer Sells Product To Retailer
 * @param {org.acme.model.productpedigree.ManufacturerSellsProductToRetailer } manufacturerSellsProductToRetailer - the manufacturerSellsProductToRetailer transaction
 * @transaction
 */
function manufacturerSellsProductToRetailer (manufacturerSellsProductToRetailer)  {
  var manu = trackProductQualityPedigree.manu;
  var retailer = trackProductQualityPedigree.retailer;
  var batchId = trackProductQualityPedigree.batchId;
  console.log("*********************"+manu);
//	updateProductLedger(manu, retailer, batchId);
  
}

/**
 * Retailer Sells Product To Consumer
 * @param {org.acme.model.productpedigree.RetailerSellsProductToConsumer } retailerSellsProductToConsumer - the retailerSellsProductToConsumer transaction
 * @transaction
 */
function retailerSellsProductToConsumer (retailerSellsProductToConsumer)  {
  var consumer = trackProductQualityPedigree.consumer;
  var retailer = trackProductQualityPedigree.retailer;
  var batchId = trackProductQualityPedigree.batchId; 
//	updateProductLedger(manu, retailer, batchId);
}


function updateProductLedger(manu, retailer, batchId) {
//productLedgerEntryObject = createProductLedgerEntryWrapper();
ledgerKeeper = getLedgerKeeper();
ledgerKeerer.getProductLedger().productLedgerEntries.push(productLedgerEntryObject);

}

/**
 * Track Quality Pedigree of Product
 * @param {org.acme.model.productpedigree.TrackProductQualityPedigree} trackProductQualityPedigree - the trackProductQualityPedigree transaction
 * @transaction
 */
function trackProductQualityPedigree (trackProductQualityPedigree) {
  var prod = trackProductQualityPedigree.prod;

  var classTypeSeparator  = ' || ';
  var objectTypeSeparator  = ' | ';
  var keyvalueSeparator  = ' : ';
  var qualityPassQuestion = ' Quality passed?   '

 prod.productQPedigreeStatement = 'This is the Quality of Product << ' + prod.name + '  of BATCH << ' + prod.barcode + ' : ' + prod.dateOfManuf +  '  >> \n in its lifecycle from Produce to Production. This product was sold by  ' ;
 
  prod.productQPedigreeStatement += 'Retailer   -> ' + prod.retailer.name + '  in county : ' + prod.retailer.county  + ' and state ' + prod.retailer.state + '! \n' ;

   var ing1 = prod.ingredient1;
  var ing2 = prod.ingredient2;

  var ingredientQualityStmt = ing1.name + "Ingredient " +  qualityPassQuestion   + keyvalueSeparator + ing1.qualityCheckInformation.qualitycheckpassed + objectTypeSeparator;
  ingredientQualityStmt +=  ing2.name + "Ingredient " +   qualityPassQuestion   + keyvalueSeparator + ing2.qualityCheckInformation.qualitycheckpassed + objectTypeSeparator + "\n ";


  var cooperativeQualityStmt =ing1.cooperative.name + " Cooperative " +  qualityPassQuestion  + keyvalueSeparator + ing1.cooperative.qualityCheckInformation.qualitycheckpassed + objectTypeSeparator;
  cooperativeQualityStmt += ing2.cooperative.name + " Cooperative " + qualityPassQuestion  + keyvalueSeparator + ing2.cooperative.qualityCheckInformation.qualitycheckpassed + objectTypeSeparator + "\n ";

  var productManufQualityStmt = prod.manufacturer.name + " Manufacturer " +    qualityPassQuestion + keyvalueSeparator + prod.manufacturer.qualityCheckInformation.qualitycheckpassed + objectTypeSeparator + "\n ";

  var productQualityStmt = "Product " + qualityPassQuestion + prod.qualityCheckInformation.qualitycheckpassed + objectTypeSeparator; 

  prod.productQPedigreeStatement += ingredientQualityStmt + cooperativeQualityStmt + productManufQualityStmt + productQualityStmt;

  return getAssetRegistry('org.acme.model.productpedigree.Product')
   .then(function(productRegistry) {
     return productRegistry.update(prod);
  })
}

/**
 * Check if Product is fully Organic
 * @param {org.acme.model.productpedigree.IsProductOrganic} isProductOrganic - the isProductOrganic transaction
 * @transaction
 */
function isProductOrganic (isProductOrganic) {
  var prod = isProductOrganic.prod;

  prod.organic = false;
  ing1 = prod.ingredient1;
  ing2 = prod.ingredient2;
  if (true == (ing1.organic && ing2.organic)) {
    prod.organic = true;
  }

  return getAssetRegistry('org.acme.model.productpedigree.Product')
   .then(function(productRegistry) {
     return productRegistry.update(prod);
  })
}

/**
 * Change the Product Name
 * @param {org.acme.model.productpedigree.DoProduct} doProduct - the doProduct transaction
 * @transaction
 */
function doProduct (doProduct) {
  var prod = doProduct.prod;
  prod.name = "New Bread";
   return getAssetRegistry('org.acme.model.productpedigree.Product')
   .then(function(productRegistry) {
     return productRegistry.update(prod);
  })
}

/**
 * Change the Produce Name
 * @param {org.acme.model.productpedigree.ChangeProduce} changeProduce - the changeProduce transaction
 * @transaction
 */
function changeProduce (changeProduce) {
  var ing = changeProduce.ingredient;
  ing.name = changeProduce.produceName;
   return getAssetRegistry('org.acme.model.productpedigree.Produce')
   .then(function(produceRegistry) {
     return produceRegistry.update(ing);
  })
}

  
/**
 * Reconcile Product Product
 * @param {org.acme.model.productpedigree.ReconcilePPQuantities} reconcilePPQuantities - the reconcilePPQuantities transaction
 * @transaction
 */
function reconcilePPQuantities(reconcilePPQuantities) {
  
  var finishedProduct = reconcilePPQuantities.prod;
  
  var ing_milk = finishedProduct.ingredient1;
  var ing_wheat = finishedProduct.ingredient2;
  var quantity = finishedProduct.quantity;
  var milkQuantity = finishedProduct.ing1Qnty;
  var wheatQuantity = finishedProduct.ing2Qnty;
  
  var milkQuantityOk = false;
  var wheatQuantityOk = false;
  
  finishedProduct.quantityAuditResults = "Not Available";
  
  //milk Quantity Check
  if  (milkQuantity < (0.34* quantity)) finishedProduct.quantityAuditResults = "Milk Quantity Lower than permitted range!"
  else if (milkQuantity > (0.35* quantity)) finishedProduct.quantityAuditResults = "Milk Quantity Higher than permitted range!"
  else 
  if ( (milkQuantity >= (0.34* quantity)) && (milkQuantity <= (0.35* quantity)) )
    finishedProduct.quantityAuditResults = "Milk Quantity in Range" + " |||  " ;
  
  //wheat Quantity Check
 if  (wheatQuantity < (0.59* quantity)) finishedProduct.quantityAuditResults += "Wheat Quantity Lower than permitted range!"
  else if (wheatQuantity > (0.60* quantity)) finishedProduct.quantityAuditResults += "Wheat Quantity Higher than permitted range!"
  else  
  if ( (wheatQuantity >= (0.59* quantity)) && (wheatQuantity <= (0.60* quantity)) )
    finishedProduct.quantityAuditResults += "Wheat Quantity in Range";
  
    return getAssetRegistry('org.acme.model.productpedigree.Product')
   .then(function(productRegistry) {
     return productRegistry.update(finishedProduct);
  })
} 

/**
 * Traverse  Back Product Pedigree Journey
 * @param {org.acme.model.productpedigree.TraverseBackProductPedigreeJourney} traverseBackProductPedigreeJourney - the traverseBackProductPedigreeJourney transaction
 * @transaction
 */

function traverseBackProductPedigreeJourney (traverseBackProductPedigreeJourney) {
    var prod = traverseBackProductPedigreeJourney.prod;
     
  var introLine = " The journey of Product,  " + prod.name + ", from Farm -> Cooperatives -> Manufacturer -> Retailer printed below  -> \n"
  
  var journeyPath = introLine;  
  
  journeyPath += printProduceJourneyPath(prod.ingredient1);
  journeyPath += "\n From Farm to Cooperative  ----->>> \n  "
  journeyPath += printCooperativeJourneyPath(prod.ingredient1.cooperative);  

  journeyPath += "\n"
  
  journeyPath += printProduceJourneyPath(prod.ingredient2);
  journeyPath += "\n From Farm to Cooperative  ----->>> \n  "
  journeyPath += printCooperativeJourneyPath(prod.ingredient2.cooperative);  

  journeyPath += "\n From Cooperative to Manufacturer  ----->>> \n  "  
  journeyPath += printManufacturerJourneyPath(prod.manufacturer);

  journeyPath += "\n From Manufacturer to Retailer ----->>> \n  "  
  journeyPath += printRetailerJourneyPath(prod.retailer);

  prod.journeyPath = journeyPath;
  
  return getAssetRegistry('org.acme.model.productpedigree.Product')
   .then(function(productRegistry) {
     return productRegistry.update(prod);
  })  
 
}

// function printJourneyPath(itemType, itemName, itemId, itemDate, itemCountry, itemState, itemSuburb) {
function printProduceJourneyPath(item, moreInfoToPrint, nextItem) {
 
  var separator = " : ";
  var attribSeparator = " -- "  ;
  var itemJourneyPath = "";
  
  itemJourneyPath += "Produce  Type is " + separator + item.type + attribSeparator;
  itemJourneyPath += "Produce  Name is " + separator + item.name + attribSeparator;
  itemJourneyPath += "Produce  Batch is " + separator + item.pcode + separator + item.dateOfProduce + attribSeparator;
  itemJourneyPath += "Produce  Location is " + separator + item.state + separator + item.country + separator + " from " + item.farmName + " farm " +  attribSeparator;

 // if (nextItem != null)   itemJourneyPath += printJourneyPath(nextItem);
  return itemJourneyPath;
}

// function printJourneyPath(itemType, itemName, itemId, itemDate, itemCountry, itemState, itemSuburb) {
function printCooperativeJourneyPath(item) {
 
  var separator = " : ";
  var attribSeparator = " -- "  ;
  var itemJourneyPath = "";
  
  itemJourneyPath += "Cooperative  Category is " + separator + item.category + attribSeparator;
  itemJourneyPath += "Cooperative  Name is " + separator + item.name + attribSeparator;
  itemJourneyPath += "Cooperative  Location is " + separator + item.county + separator + item.state + separator + item.country +  attribSeparator;

 // if (nextItem != null)   itemJourneyPath += printJourneyPath(nextItem);
  return itemJourneyPath;
}

function printManufacturerJourneyPath(item) {
 
  var separator = " : ";
  var attribSeparator = " -- "  ;
  var itemJourneyPath = "";
  
  itemJourneyPath += "Manufacturer Name is " + separator + item.name + attribSeparator;
  itemJourneyPath += "Manufacturer  Location is " + separator + item.county + separator + item.state + separator + item.country +  attribSeparator;

 // if (nextItem != null)   itemJourneyPath += printJourneyPath(nextItem);
  return itemJourneyPath;
}

function printRetailerJourneyPath(item) {
 
  var separator = " : ";
  var attribSeparator = " -- "  ;
  var itemJourneyPath = "";
  
  itemJourneyPath += "Retailer Name is " + separator + item.name + attribSeparator;
  itemJourneyPath += "Retailer  Location is " + separator + item.county + separator + item.state + separator + item.country +  attribSeparator;

 // if (nextItem != null)   itemJourneyPath += printJourneyPath(nextItem);
  return itemJourneyPath;
}


