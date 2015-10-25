;
(function() {

	// Dependancies ===============

	var Q = require('q'),
		Redis = require('redis');

	// Export ====================

	module.exports = RedisHelper;

	// Wrapper ====================

	function RedisHelper(options) {
		this.options = options;
		this.connection = null;
		this.connected = false;
	}

	RedisHelper.prototype.connect = function() {
		var self = this;
		return Q.promise(function(resolve, reject) {
			self.connection = Redis.createClient(self.options);
			if (self.options.password)
			self.connection.auth(self.options.password, function(err) {
				self.connection.end();
				self.connected = false;
				if (err) throw err;
			});
			self.connection.on('end', function() {
				self.connected = false;
			});
			self.connection.on('error', function(err) {
				self.connection.end();
				self.connected = false;
			});
			resolve(self.connection);
		});
	};

	RedisHelper.prototype.client = function() {
		if (!this.connected) {
			console.log('connected');
			return this.connect();
		} else {
			console.log('connecting');
			var self = this;
			return Q.promise(function(resolve, reject) {
				resolve(self.connection);
			});
		}
	};

}());
