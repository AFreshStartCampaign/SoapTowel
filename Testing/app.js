var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/afs';

var showCampaignByOrganizationId = function(db, organization_id, callback) {
  var cursor =db.collection('campaign').find({"organizationid" : organization_id});
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
       console.dir(doc);
    } else {
       callback();
    }
  });
};

var showDonationByCampaignId = function(db, campaign_id, callback) {
  var cursor =db.collection('donation').find("campaignid": campaign_id } );
  cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
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
      console.dir(doc);
    } else {
      callback();
    }
  });
};



MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
/*
  // show campaign from organizationid == #
  var oganization_id = 1;
  showCampaignByOrganizationId(db, oganization_id, function() {
    db.close();
  });

  // show donations for campaign id == #
  var campaign_id = 10;
  showDonationByCampaignId(db, campaign_id, function() {
    db.close();
  });

	// get donation by ID number
	var donation_id = 2;
  getDonationById(db, donation_id, function() {
    db.close();
  });
*/
  // show donations for campaign id == #
  var campaign_id = 10;
  showDonationByCampaignId(db, campaign_id, function() {
    db.close();
  });

});