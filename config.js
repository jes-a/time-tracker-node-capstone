'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds125469.mlab.com:25469/job-tracker-node-capstore';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://admin:admin@ds125469.mlab.com:25469/job-tracker-node-capstore';
exports.PORT = process.env.PORT || 8080;