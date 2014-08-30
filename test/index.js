var assert = require('assert');
var Metalsmith = require('metalsmith');
var publish = require('..');

describe('metalsmith-publish', function () {
	it('should not publish files with metadata publish: draft', function (done) {
		var metalsmith = Metalsmith('test/fixtures/draft');
		metalsmith
			.use(publish({}))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				assert.equal(Object.keys(files).length, 0);
				done();
			});
	});

	it('should publish draft files when opts.draft == true', function (done) {
		var metalsmith = Metalsmith('test/fixtures/draft-publish');
		metalsmith
			.use(publish({ draft: true }))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				assert.equal(Object.keys(files).length, 1);
				done();
			});
	});

	it('should not publish files with metadata publish: private', function (done) {
		var metalsmith = Metalsmith('test/fixtures/private');
		metalsmith
			.use(publish({}))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				assert.equal(Object.keys(files).length, 0);
				done();
			});
	});

	it('should publish private files when opts.private == true', function (done) {
		var metalsmith = Metalsmith('test/fixtures/private-publish');
		metalsmith
			.use(publish({ private: true }))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				assert.equal(Object.keys(files).length, 1);
				done();
			});
	});

	it('should not publish files with future-dated metadata publish value', function (done) {
		var metalsmith = Metalsmith('test/fixtures/future');
		metalsmith
			.use(publish({}))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				assert.equal(Object.keys(files).length, 0);
				done();
			});
	});

	it('should use file[opts.futureMeta] when file.publish unspecified', function (done) {
		var metalsmith = Metalsmith('test/fixtures/future-meta');
		metalsmith
			.use(publish({}))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				assert.equal(Object.keys(files).length, 0);
				done();
			});
	});

	it('should publish future-dated files when opts.future == true', function (done) {
		var metalsmith = Metalsmith('test/fixtures/future-publish');
		metalsmith
			.use(publish({ future: true }))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				assert.equal(Object.keys(files).length, 1);
				done();
			});
	});

	it('should call opts.futureFn callback if available', function (done) {
		var metalsmith = Metalsmith('test/fixtures/future-alert');
		metalsmith
			.use(publish({ futureFn: cb }))
			.build(function (err, files) {
				if (err) {
					return done(err);
				}

				done();
			});

		function cb(_futureFiles, _metalsmith, _done) {
			assert.equal(Object.keys(_futureFiles).length, 1);
			assert.equal(_metalsmith, metalsmith);
			assert.equal(typeof _done, 'function');
			_done();
		}
	});
});
