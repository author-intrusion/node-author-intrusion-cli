/**
 * Main entry point for the command-line interface (CLI).
 */
/// <reference path="refs.ts" />

import runner = require("node-author-intrusion-service");

// Set up and parse the command line arguments.
var lint_help = "Parse the source file and display any warnings or errors.";
function lint_yargs(yargs) {
    yargs
        .option(
        "project",
        {
            "alias": "p",
            "type": "string"
        })
        .option(
        "format",
        {
            "alias": "f",
            "type": "string"
        })
        .help("help")
        .demand(2)
    .argv;
}

// Combine everything together for the final option object.
var argv = require('yargs')
    .usage("$0 command")
    .help("help")
    .showHelpOnFail(true, "Specify --help for available options")
    .demand(1)
    .command("lint", lint_help, lint_yargs)
    .command("find-project", "Retrieves the project file relative to this file.")
    .argv;

// Grab the first elements in the argv, that will be the virtual command we are
// running. Once we have that, pass it into the appropriate function.
var commandName = argv._.splice(0, 1)[0];

runner.run(commandName, argv);
