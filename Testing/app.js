var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/afs';

//////////// MongoDB CRUD functions

////////////  CREATE
/*
// Create campaign
db.campaign.insert(
{  
  _campaignid: 10,
  name: "Spring Drive",
  start: ISODate(),
  end: ISODate(),
  organizationid: 1,
  description: "Spring shelter drive",
  furfilled: 0,
  received: [1,2,3],
  request: [{"soap": 5, "towel" : 7, "shirts" : 10}]
}
*/

// Add donation
/*
{
  _donationid: 1,
  campaignid: 10,
  userid: "andyshi@sbcglobal",
  shelterid: 100,
  organizationid: 1,
  item: "soap",
  count: 4,
  date: ISODate()
}
*/

////////////  READ
var showCampaignByOrganizationId = function(db, organization_id, callback) {
  var cursor = db.collection('campaign').find({"organizationid" : organization_id});
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
       console.log(doc);
    } else {
       callback();
    }
  });
};

var showDonationByCampaignId = function(db, campaign_id, callback) {
  var cursor = db.collection('donation').find({"campaignid": campaign_id } );
  cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.log(doc);
      } else {
         callback();
      }
   });
};

var getDonationById = function(db, donation_id, callback) {
  var cursor =db.collection('donation').find({"_donationid" : donation_id});
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.log(doc);
    } else {
      callback();
    }
  });
};

//////////// UPDATE
//////////// DELETE
/*
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
  console.log("\n\nshow campaign from organizationid == #");
  var oganization_id = 1;
  showCampaignByOrganizationId(db, oganization_id, function() {
    db.close();
  });
});

*/
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("\n\nget donation by ID number");
  var donation_id = 2;
  getDonationById(db, donation_id, function() {
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("\n\nshow donations for campaign id == #");
  var campaign_id = 10;
  showDonationByCampaignId(db, campaign_id, function() {
    db.close();
  });
});