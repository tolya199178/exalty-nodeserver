'use strict';
var config = require('./../config');
var Firebase = require('firebase');

module.exports = function(){
	var stripeFire = require("stripe-fire")(config.stripeKey);
	
	
	var userRef = config.fireBaseUrl + 'customers/';
	var subscriptionRef = config.fireBaseUrl + 'subscriptions/';
	var customers = stripeFire.customers(userRef, function(err, customer) {
		var email = customer.email;
		var userRef = config.fireBaseUrl + 'users/';
		userRef = new Firebase(userRef);
		var subscripRef = new Firebase(subscriptionRef);
		/**
		 *ger user
		 */
		userRef.orderByChild('email').equalTo(email).on('value', function(snapshot){
			var users = snapshot.val();
			var key = null;
			var user = {};
			for(var i in users){
				key = i;
				user = users[i];
			}			
			if(key == null || user.addedSubscription){
				//if added subscription
				return true;
			}else{
				//if not added subscription
				userRef.child(key).update({
					addedSubscription:true		
				});
				subscripRef.child(user.userId).set({
					plan: config.stripePlanId
				});
			}
		})		
	}, null, function(user) {
		var customerData = {};
		customerData.email = user.email; 
		customerData.description = 'Customer for' + user.email; 
		return customerData;
	});
	
	var cardRef = config.fireBaseUrl + 'cards/';
	customers.cards(cardRef, function(err, card) {
		console.log(card);
	}, null, function(cardData) {
		// Called before a create/update card request is sent to Stripe
		console.log(cardData);
		return cardData;
	});
	
	var subscriptionRef = config.fireBaseUrl + 'subscriptions/';
	customers.subscriptions(subscriptionRef, function(err, subscription) {
		console.log(subscription);
	}, null, function(subscriptionData) {
		// Called before a create/update subscription request is sent to Stripe
		return subscriptionData;
	});
}