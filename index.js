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
			debug('Connecting');
			self.connection = Redis.createClient(self.options);
			if (self.options.password)
				debug('Authorizing');
			self.connection.auth(self.options.password, function(err) {
				self.connection.end();
				self.connected = false;
				if (err) throw err;
			});
			self.connection.on('end', function() {
				debug('Connection Ended');
				self.connected = false;
			});
			self.connection.on('error', function(err) {
				debug('Query Error [' + err.message + ']');
				self.connection.end();
				self.connected = false;
			});
			return self.connection;
		});
	};

	RedisHelper.prototype.client = function() {
		if (!this.connected) {
			return this.connect();
		} else {
			var self = this;
			return Q.promise(function(resolve, reject) {
				resolve(self.connection);
			});
		}
	};

}());