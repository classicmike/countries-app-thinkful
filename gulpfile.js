var requireDir = require('require-dir');
//require all the tasks in the gulp directory
var tasks = requireDir('./gulp/tasks', { recurse: true });

//get out the config that are located in each file.
var config = require('./gulp/config');

// lists out all of the tasks that are required for the project
tasks.clean(config.clean, config.destination);
tasks.connect(config.connect);
tasks.copy(config.copy, config.destination);
tasks.usemin(config.usemin, config.indexFile, config.destination);
tasks.images(config.images.config);
tasks.build(config.build);