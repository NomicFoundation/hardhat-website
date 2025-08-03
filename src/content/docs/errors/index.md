# Hardhat errors

This section contains a list of all the possible errors you may encounter when
using Hardhat and an explanation of each of them.

## Hardhat Core errors

### General errors

#### [HHE1: You are not inside a Hardhat project](#HHE1)

You are trying to run Hardhat outside of a Hardhat project.

You can learn how to use Hardhat by reading the [Getting Started guide](/hardhat-runner/docs/getting-started).

#### [HHE2: Duplicated plugin id](#HHE2)

While loading the plugins, two different plugins where found with the same id.

Please double check whether you have multiple versions of the same plugin installed.

#### [HHE3: No Hardhat config file found](#HHE3)

Hardhat couldn't find a config file in the current directory or any of its parents.

#### [HHE4: Invalid config path](#HHE4)

The config file doesn't exist at the provided path.

#### [HHE5: No config exported](#HHE5)

There is nothing exported from the config file.

#### [HHE6: Invalid config object](#HHE6)

The config file doesn't export a valid configuration object.

#### [HHE7: Configuration variable not found](#HHE7)

A configuration variable was expected to be set as an environment variable, but it wasn't.

#### [HHE8: Invalid URL](#HHE8)

Given value was not a valid URL.

#### [HHE9: Invalid BigInt](#HHE9)

Given value was not a valid BigInt.

#### [HHE10: Hardhat project already created](#HHE10)

Cannot create a new Hardhat project, the current folder is already associated with a project.

#### [HHE11: Not inside an interactive shell](#HHE11)

You are trying to initialize a project but you are not in an interactive shell.

Please re-run the command inside an interactive shell.

#### [HHE12: Unsupported operation](#HHE12)

You are trying to perform an unsupported operation.

Unless you are creating a task or plugin, this is probably a bug.

Please [report it](https://github.com/nomiclabs/hardhat/issues/new) to help us improve Hardhat.

#### [HHE13: Only ESM projects are supported](#HHE13)

You are trying to initialize a new Hardhat project, but your package.json does not have the property "type" set to "module".

Currently, Hardhat only supports ESM projects.

Please add the property "type" with the value "module" in your package.json to ensure that your project is recognized as an ESM project.

#### [HHE14: Global option already defined](#HHE14)

The global option is already defined by another plugin. Please ensure that global options are uniquely named to avoid conflicts.

#### [HHE15: Invalid config](#HHE15)

The configuration you provided is invalid. Please check the documentation to learn how to configure Hardhat correctly.

#### [HHE16: Template not found](#HHE16)

The template you provided is not found. Please check the documentation to learn which templates are available.

#### [HHE17: Workspace must be a directory](#HHE17)

The workspace you provided is not a directory. Please ensure that the workspace is a directory and try again.

#### [HHE18: Invalid hex string](#HHE18)

Given value was not a valid hex string.

#### [HHE19: Config variable format must include `\{variable\}`](#HHE19)

The config variable format must include the string `\{variable\}`, which will be replaced with the actual value of the variable.

#### [HHE20: Invalid fully qualified contract name](#HHE20)

A contract name was expected to be in fully qualified form, but it's not.

A fully qualified name should look like file.sol:Contract

### Internal errors

#### [HHE100: Invariant violation](#HHE100)

An internal invariant was violated. This is probably caused by a programming error in Hardhat or in one of the used plugins.

Please [report it](https://github.com/nomiclabs/hardhat/issues/new) to help us improve Hardhat.

#### [HHE101: Not implemented](#HHE101)

A code path that has not been implemented was unexpectedly triggered.

Please [report it](https://github.com/nomiclabs/hardhat/issues/new) to help us improve Hardhat.

### Plugin errors

#### [HHE200: Plugin not installed](#HHE200)

A plugin was included in the Hardhat config but has not been installed into "node_modules".

#### [HHE201: Plugin missing peer dependency](#HHE201)

A plugin's peer dependency has not been installed.

#### [HHE202: Dependency version mismatch](#HHE202)

A plugin's peer dependency expected version does not match the version of the installed package.

Please install a version of the peer dependency that meets the plugin's requirements.

#### [HHE203: Plugin dependency could not be loaded](#HHE203)

The loading of a plugin's dependent plugin failed.

### Hooks errors

#### [HHE300: Plugin hook factory is not a valid file URL](#HHE300)

The loading of a plugin's hook factory failed as the import path is not a valid file:// URL.

#### [HHE301: Unexpected hook parameter modification](#HHE301)

The parameter is not allowed to be modified

### Task definition errors

#### [HHE400: Invalid file action](#HHE400)

The setAction function was called with a string parameter that is not a valid file URL. A valid file URL must start with 'file://'.

Please ensure that you are providing a correct file URL.

#### [HHE401: Task missing action](#HHE401)

A task was defined without an action.

Please ensure that an action is defined for each task.

#### [HHE402: Invalid task definition](#HHE402)

A variadic argument must always be the last positional argument in a task definition.

#### [HHE403: Invalid task definition](#HHE403)

Required positional arguments must be defined before optional ones in a task definition.

#### [HHE404: Task not found](#HHE404)

The provided task name does not match any task.

#### [HHE405: Subtask without parent](#HHE405)

The parent task of the subtask being defined was not found. If you intend to only define subtasks, please first define the parent task as an empty task.

#### [HHE406: Task already defined](#HHE406)

The task is already defined. Please ensure that tasks are uniquely named to avoid conflicts.

#### [HHE407: Empty task id](#HHE407)

The task id cannot be an empty string or an empty array. Please ensure that the array of task names is not empty.

#### [HHE408: Task option already defined](#HHE408)

The task option is already defined as a global option by another plugin. Please ensure that task options are uniquely named to avoid conflicts.

#### [HHE409: Task override option already defined](#HHE409)

An attempt is being made to override an option that has already been defined. Please ensure that the option is not defined before trying to override it.

#### [HHE410: Empty task](#HHE410)

The task is empty. Please ensure that tasks have at least one action.

#### [HHE411: Invalid action URL](#HHE411)

The action URL is invalid. Please ensure that the URL is correct.

#### [HHE412: Invalid action](#HHE412)

The action of the task is not a function. Make sure that the file pointed to by the action URL exports a function as the default export.

#### [HHE413: Missing value for the task argument](#HHE413)

You tried to run a task, but one of the values of its arguments was missing.

Please double check how you invoked Hardhat or ran your task.

#### [HHE414: Invalid argument type](#HHE414)

One of your task arguments has an invalid type.

Please double check your task arguments.

#### [HHE415: Invalid option value](#HHE415)

One of the options for your task is invalid.

Please double check your arguments.

#### [HHE416: Unrecognized subtask](#HHE416)

The subtask for the task you provided is not recognized.

Please check you have the correct subtask.

### Arguments related errors

#### [HHE500: Invalid argument type](#HHE500)

One of your Hardhat or task arguments has an invalid type.

Please double check your arguments.

#### [HHE501: Reserved argument name](#HHE501)

One of your Hardhat or task arguments has a reserved name.

Please double check your arguments.

#### [HHE502: Argument name already in use](#HHE502)

One of your Hardhat or task argument names is already in use.

Please double check your arguments.

#### [HHE503: Invalid argument name](#HHE503)

One of your Hardhat or task argument names is invalid.

Please double check your arguments.

#### [HHE504: Invalid option value](#HHE504)

One of your Hardhat options is invalid.

Please double check your arguments.

#### [HHE505: Missing value for the task argument](#HHE505)

You tried to run a task, but one of the values of its arguments was missing.

Please double check how you invoked Hardhat or ran your task.

#### [HHE506: Argument was not consumed](#HHE506)

You tried to run a task, but one of your arguments was not consumed.

Please double check how you invoked Hardhat or ran your task.

#### [HHE507: Missing configuration file path](#HHE507)

A path to the configuration file is expected after the global option "--config", but none was provided.

Please double check your arguments.

#### [HHE508: The global option "--config" cannot be used with the "init" command](#HHE508)

The global option "--config" cannot be used with the "init" command.

Please double check your arguments.

#### [HHE509: Options grouping is not supported](#HHE509)

Options cannot be grouped together.

Please double check your arguments, and try providing the options separately.

#### [HHE510: Options repetition is not supported](#HHE510)

Some options cannot be repeated.

Please double check your arguments.

#### [HHE511: Invalid short argument name](#HHE511)

One of your Hardhat or task short argument names is invalid.

Please double check your arguments.

### Built-in tasks errors

#### [HHE600: Script doesn't exist](#HHE600)

Tried to use `hardhat run` to execute a nonexistent script.

Please double check your script's path.

### Network errors

#### [HHE700: Invalid URL for network or forking](#HHE700)

You are trying to connect to a network with an invalid network or forking URL.

Please check that you are sending a valid URL string for the network or forking `URL` parameter.

#### [HHE701: Invalid method parameters](#HHE701)

The JSON-RPC request parameters are invalid. You are trying to make an EIP-1193 request with object parameters, but only array parameters are supported. Ensure that the 'params' parameter is correctly specified as an array in your JSON-RPC request.

#### [HHE702: Invalid JSON-RPC response](#HHE702)

One of your JSON-RPC requests received an invalid response.

Please make sure your node is running, and check your internet connection and networks config.

#### [HHE703: Cannot connect to the network](#HHE703)

Cannot connect to the network.

Please make sure your node is running, and check your internet connection and networks config.

#### [HHE704: Network timeout](#HHE704)

One of your JSON-RPC requests timed out.

Please make sure your node is running, and check your internet connection and networks config.

#### [HHE705: Network not found](#HHE705)

The network you are trying to connect to is not found.

Please double check that the network is correctly defined in your networks config.

#### [HHE706: Invalid chain type](#HHE706)

The chain type does not match the network's chain type.

If you want to use a different chain type, please update your networks config.

#### [HHE707: Invalid config override](#HHE707)

The configuration override you provided is invalid.

#### [HHE708: Invalid global chain id](#HHE708)

Hardhat was set to use a chain id but connected to a chain with a different id

#### [HHE709: No remote account available](#HHE709)

No local account was set and there are accounts in the remote node

#### [HHE710: Missing "data" param when calling eth_sign](#HHE710)

You called "eth_sign" with incorrect parameters.

Please check that you are sending a "data" parameter.

#### [HHE711: Missing "address" param when calling personal_sign](#HHE711)

You called "personal_sign" with incorrect parameters.

Please check that you are sending an "address" parameter.

#### [HHE712: Invalid "data" param when calling eth_signTypedData_v4](#HHE712)

You called "eth_signTypedData_v4" with incorrect parameters.

Please check that you are sending a "data" parameter with a JSON string or object conforming to EIP712 TypedData schema.

#### [HHE713: Missing transaction parameter](#HHE713)

You are trying to send a transaction with a locally managed account, and some parameters are missing.

Please double check your transactions' parameters.

#### [HHE714: Missing fee price parameters](#HHE714)

You are trying to send a transaction with a locally managed account, and no fee price parameters were provided. You need to send gasPrice, or maxFeePerGas and maxPriorityFeePerGas.

Please double check your transactions' parameters.

#### [HHE715: Incompatible fee price parameters](#HHE715)

You are trying to send a transaction with a locally managed account, and its parameters are incompatible. You sent both gasPrice, and maxFeePerGas or maxPriorityFeePerGas.

Please double check your transactions' parameters.

#### [HHE716: Unrecognized account](#HHE716)

You are trying to send a transaction or sign some data with an account not managed by your Ethereum node nor Hardhat.

Please double check your accounts and the "from" parameter in your RPC calls.

#### [HHE717: Invalid HD path](#HHE717)

An invalid HD/BIP32 derivation path was provided in your config.

Read the [documentation](https://hardhat.org/hardhat-runner/docs/config#hd-wallet-config) to learn how to define HD accounts correctly.

#### [HHE718: Could not derive an HD key](#HHE718)

One of your HD keys could not be derived.

Try using another mnemonic or deriving less keys.

#### [HHE719: Invalid validation parameters](#HHE719)

The validation of parameters against the schemas failed.

#### [HHE720: Invalid network type](#HHE720)

The network manager only supports the network types 'http' and 'edr'.

#### [HHE721: Transaction to null address cannot have undefined data](#HHE721)

The transaction to the null address cannot have undefined data

#### [HHE722: Provider closed](#HHE722)

The provider your are trying to use has been closed. Please create a new one using hre.network.connect() and try again.

#### [HHE723: Incompatible EIP-7702 parameters](#HHE723)

You are trying to send a transaction with a locally managed
account, and its parameters are incompatible. You sent both gasPrice and authorizationList.

Please double check your transactions' parameters.

### Solidity tests errors

#### [HHE800: Build info not found for contract](#HHE800)

Build info not found for contract while compiling Solidity test contracts.

#### [HHE801: Runner timed out](#HHE801)

Runner timed out while running Solidity tests.

#### [HHE802: Unhandled EDR error in Solidity tests](#HHE802)

Unhandled EDR error while running Solidity tests.

### Solidity errors

#### [HHE900: Project file resolution error](#HHE900)

There was an error while resolving the project file.

Please double-check your configuration. If it keeps happening, please report it.

#### [HHE901: Npm file resolution error](#HHE901)

There was an error while resolving an npm module that you are trying to compile and generate artifacts for.

Please double-check your configuration. If it keeps happening, please report it.

#### [HHE902: Import resolution error](#HHE902)

There was an error while resolving an import.

Please double-check your import

#### [HHE903: Invalid or unreleased `solc` version](#HHE903)

The Solidity version in your config is invalid or hasn't been released yet.

If you are certain it has been released, run `npx hardhat clean --global` and try again.

#### [HHE904: `solc` download failed](#HHE904)

Couldn't download `solc`.

Please check your internet connection and try again.

#### [HHE905: Couldn't obtain `solc` version list](#HHE905)

Couldn't download `solc`'s version list.

Please check your internet connection and try again.

#### [HHE906: Downloaded `solc` checksum verification failed](#HHE906)

Hardhat downloaded a version of the Solidity compiler, and its checksum verification failed.

Please check your internet connection and try again.

If this error persists, run `npx hardhat clean --global`.

#### [HHE907: Failed to run native solc](#HHE907)

Hardhat successfully downloaded a native version of solc but it doesn't run.

If you are running MacOS, try installing Apple Rosetta.

If this error persists, run "npx hardhat clean --global".

#### [HHE908: Failed to run solcjs](#HHE908)

Hardhat successfully downloaded a WASM version of solc but it doesn't run.

If you are running MacOS, try installing Apple Rosetta.

If this error persists, run "npx hardhat clean --global".

#### [HHE909: Failed to create compilation job](#HHE909)

Hardhat failed to create a compilation job for a file in your project.

This happens when your files require incompatible versions of solc or you haven't configured a version that works with them

#### [HHE910: Compilation failed](#HHE910)

Your smart contracts failed to compile.

Please check Hardhat's output for more details.

#### [HHE911: Invalid solcjs compiler](#HHE911)

Hardhat successfully downloaded a WASM version of solc but it is invalid. The compile function is missing.

#### [HHE912: Build profile not defined](#HHE912)

The build profile you are trying to use is not defined in your Hardhat config.

### Compilation artifacts related errors

#### [HHE1000: Artifact not found](#HHE1000)

Tried to read a nonexistent artifact.

Please double check that your contracts have been compiled and double check your artifact's name.

#### [HHE1001: Multiple artifacts found](#HHE1001)

There are multiple artifacts that match the given contract name, and Hardhat doesn't know which one to use.

Please use the fully qualified name of the contract to disambiguate it.

### Hardhat node errors

#### [HHE1100: Invalid node network type](#HHE1100)

The node only supports the 'edr' network type.

### Hardhat test plugin errors

#### [HHE1200: Cannot determine a test runner for files](#HHE1200)

Cannot determine a test runner for the test files. This may be because the files are not correctly included in the test paths defined by the test plugins in the Hardhat configuration. If they are correctly included, this likely indicates an issue with a plugin failing to detect the files.

### Hardhat coverage errors

#### [HHE1300: Source file not instrumented for coverage](#HHE1300)

The source file could not be instrumented for coverage.

#### [HHE1301: Import path already defined in compilation sources](#HHE1301)

The import path is already defined in the compilation sources

## Hardhat Ignition errors

### General errors

#### [HHE10000: Internal Hardhat Ignition invariant was violated](#HHE10000)

An internal Hardhat Ignition invariant was violated.

#### [HHE10001: Unsupported ethers.js value](#HHE10001)

Unsupported ethers.js value

### Internal errors

#### [HHE10100: An internal error to Hardhat Ignition has occurred](#HHE10100)

An internal error to Hardhat Ignition has occurred

#### [HHE10101: Invalid variable name](#HHE10101)

One of your Hardhat Ignition template variables has an invalid name

#### [HHE10102: Variable tag not found in template](#HHE10102)

One of your Hardhat Ignition template variables has a tag that is not present in the template

#### [HHE10103: Template value includes variable tag](#HHE10103)

One of your Hardhat Ignition template variables has a value that includes a variable tag

#### [HHE10104: No etherscan API key configured](#HHE10104)

You are trying to run verification during a Hardhat Ignition deploy, but there is no Etherscan API Key set.

#### [HHE10105: Cannot reset deployment on ephemeral Hardhat network](#HHE10105)

The reset flag can only used against a persistent network. You are trying to reset a deployment against an in-memory network.

#### [HHE10106: No Ignition modules found](#HHE10106)

Ignition was unable to find the module requested for deployment.

#### [HHE10107: Could not parse JSON parameters](#HHE10107)

Ignition failed to parse the JSON parameters for deployment. Review the JSON and try again.

#### [HHE10108: The deployment-id contains banned characters](#HHE10108)

The deployment-id being used for the Hardhat Ignition deployment contains banned characters. Deployment ids can only contain alphanumerics, dashes or underscores.

#### [HHE10109: Neither the `viem` or `ethers` Ignition extension plugin is installed.](#HHE10109)

Please install either `@nomicfoundation/hardhat-ignition-viem` or `@nomicfoundation/hardhat-ignition-ethers` to use Ignition in your Hardhat tests

#### [HHE10110: Hardhat Ignition was unable to display an unknown transaction type](#HHE10110)

Hardhat Ignition was unable to display an unknown transaction type

#### [HHE10111: Parameter exceeds maximum safe integer size](#HHE10111)

Parameter exceeds maximum safe integer size

#### [HHE10112: Module validation failed.](#HHE10112)

Hardhat Ignition found problems while validating the module. Please review the module and try again.

#### [HHE10113: Parsing of deployment parameters failed.](#HHE10113)

Parsing of deployment parameters failed.

#### [HHE10114: Visualization template directory not found](#HHE10114)

Visualization template directory not found

#### [HHE10115: Ignition module not found](#HHE10115)

Hardhat Ignition was not able to find an Ignition Module at the given path.

#### [HHE10116: Ignition module outside of module directory](#HHE10116)

Ignition modules must be located within the module directory.

#### [HHE10117: Test error in Hardhat Ignition Viem's test helper](#HHE10117)

Test error in Hardhat Ignition Viem's test helper.

#### [HHE10118: Hardhat Ignition unable to find artifact path for the contract name](#HHE10118)

Hardhat Ignition unable to find artifact path for the contract name

#### [HHE10119: Only one Ignition extension plugin allowed](#HHE10119)

Both the ethers and viem Ignition extension plugins were found, but only one can be used at a time.

Please only include one of the plugins in your Hardhat configuration.

#### [HHE10120: Hardhat Ignition deployment error](#HHE10120)

Hardhat Ignition was not able to successfully complete a deployment.

Please review the error message and try again.

#### [HHE10121: No default Viem wallet client found](#HHE10121)

Hardhat Ignition will use the default wallet client to create Viem contract instances for deployed contracts. No wallet clients were found.

### Module errors

#### [HHE10200: Invalid module id type](#HHE10200)

Module id must be a string

#### [HHE10201: Invalid module id](#HHE10201)

Module ids can only have alphanumerics and underscore, and they must start with an alphanumeric.

#### [HHE10202: Invalid module definition function](#HHE10202)

Module definition function must be a function.

#### [HHE10203: Async module definition function](#HHE10203)

Async callbacks are not allowed in 'buildModule'.

#### [HHE10204: Duplicate module ids](#HHE10204)

Please make sure all module ids are unique.

### Serialization errors

#### [HHE10300: Invalid future id](#HHE10300)

Unable to lookup future during deserialization

#### [HHE10301: Invalid future type](#HHE10301)

Invalid FutureType as serialized argument

#### [HHE10302: Lookahead value not found](#HHE10302)

Lookahead value missing

### Execution errors

#### [HHE10400: Dropped transaction](#HHE10400)

One of the transactions sent by Hardhat Ignition was dropped

#### [HHE10401: Invalid JSON-RPC response](#HHE10401)

Hardhat Ignition received an invalid JSON-RPC response for the given method

#### [HHE10402: Waiting for confirmations](#HHE10402)

Waiting for confirmations for transactions sent from the sender

#### [HHE10403: Waiting for nonce](#HHE10403)

Waiting for confirmations for transactions sent from the sender

#### [HHE10404: Invalid nonce](#HHE10404)

The next nonce for the sender is not what Hardhat Ignition expected

#### [HHE10405: Base fee exceeds gas limit](#HHE10405)

The configured base fee exceeds the block gas limit

#### [HHE10406: Max fee per gas exceeds gas limit](#HHE10406)

The calculated max fee per gas exceeds the configured limit

#### [HHE10407: Insufficient funds for transfer](#HHE10407)

Sender account has insufficient funds for transfer

#### [HHE10408: Insufficient funds for deploy](#HHE10408)

Sender account has insufficient funds for deploy

#### [HHE10409: Gas estimation failed](#HHE10409)

Gas estimation failed

#### [HHE10410: Transaction lost](#HHE10410)

An error occurred while trying to send a transaction

### Reconciliation errors

#### [HHE10500: Invalid execution status](#HHE10500)

Unsupported execution status

### Wipe errors

#### [HHE10600: Uninitialized deployment](#HHE10600)

Cannot wipe future as the deployment hasn't been intialialized yet

#### [HHE10601: No state for future](#HHE10601)

Cannot wipe future as it has no previous execution recorded

#### [HHE10602: Dependent futures](#HHE10602)

Cannot wipe future as there are dependent futures that have previous executions recorded

### Validation errors

#### [HHE10700: Invalid default sender](#HHE10700)

The default sender is not part of the configured accounts

#### [HHE10701: Missing emitter](#HHE10701)

The emitter must be provided when reading an event from a SendDataFuture

#### [HHE10702: Module validation failed](#HHE10702)

Module validation failed

#### [HHE10703: Invalid constructor arguments length](#HHE10703)

Invalid constructor arguments length

#### [HHE10704: Invalid function arguments length](#HHE10704)

Invalid function arguments length

#### [HHE10705: Invalid static call](#HHE10705)

Function is not 'pure' or 'view' and should not be statically called

#### [HHE10706: Indexed event argument](#HHE10706)

Indexed argument of event is not stored in the receipt

#### [HHE10707: Invalid overload name](#HHE10707)

Invalid overload name

#### [HHE10708: Overload not found](#HHE10708)

Overload not found

#### [HHE10709: Overload name used for non-overloaded contract](#HHE10709)

Overload name used for non-overloaded contract

#### [HHE10710: Overload name required](#HHE10710)

Overload name required

#### [HHE10711: Invalid overload given](#HHE10711)

Invalid overload given

#### [HHE10712: Event argument not found](#HHE10712)

Event argument not found

#### [HHE10713: Invalid event argument index](#HHE10713)

Invalid event argument index

#### [HHE10714: Function argument not found](#HHE10714)

Function argument not found

#### [HHE10715: Invalid function argument index](#HHE10715)

Invalid function argument index

#### [HHE10716: Missing libraries](#HHE10716)

The following libraries are missing

#### [HHE10717: Conflicting library names](#HHE10717)

The library names clash with each other

#### [HHE10718: Invalid library name](#HHE10718)

Invalid library name

#### [HHE10719: Invalid library](#HHE10719)

Invalid library

#### [HHE10720: Ambiguous library name](#HHE10720)

The library name is ambiguous

#### [HHE10721: Invalid library address](#HHE10721)

Invalid address for library

#### [HHE10722: Negative account index](#HHE10722)

Account index cannot be a negative number

#### [HHE10723: Account index too high](#HHE10723)

Requested account index is greater than the total number of available accounts

#### [HHE10724: Invalid artifact](#HHE10724)

Artifact for contract is invalid

#### [HHE10725: Missing module parameter](#HHE10725)

Module parameter requires a value but was given none

#### [HHE10726: Invalid module parameter type](#HHE10726)

Module parameter must be of the expected type

### Status errors

#### [HHE10800: Uninitialized deployment](#HHE10800)

Cannot get status for nonexistant deployment

### Deploy errors

#### [HHE10900: Chain ID changed](#HHE10900)

The deployment's chain cannot be changed between runs.

### Verify errors

#### [HHE11000: Uninitialized deployment](#HHE11000)

Cannot verify contracts for nonexistant deployment

#### [HHE11001: No contracts deployed](#HHE11001)

Cannot verify deployment as no contracts were deployed

#### [HHE11002: Unsupported chain](#HHE11002)

Verification not natively supported for the requested chain

### Strategies errors

#### [HHE11100: Invalid strategy name, must be either 'basic' or 'create2'](#HHE11100)

Invalid strategy, must be either 'basic' or 'create2'

#### [HHE11101: Missing strategy config](#HHE11101)

No strategy config passed for strategy

#### [HHE11102: Missing strategy config parameter](#HHE11102)

Missing required strategy configuration parameter

#### [HHE11103: Invalid strategy config parameter](#HHE11103)

Strategy configuration parameter is invalid

#### [HHE11104: CreateX contract not deployed](#HHE11104)

The CreateX contract is not deployed on the current network

### List transactions errors

#### [HHE11200: Uninitialized deployment](#HHE11200)

Cannot list transactions for nonexistant deployment

### Track transactions errors

#### [HHE11300: Deployment directory not found](#HHE11300)

The deployment directory was not found

#### [HHE11301: Uninitialized deployment](#HHE11301)

Cannot track transaction for nonexistant deployment

#### [HHE11302: Transaction not found](#HHE11302)

The transaction hash you provided was not found on the network.

#### [HHE11303: Matching nonce not found](#HHE11303)

The transaction you provided doesn't seem to belong to your deployment.

#### [HHE11304: Known transaction](#HHE11304)

The transaction hash that you provided was already present in your deployment.

#### [HHE11305: Insufficient confirmations](#HHE11305)

The transaction you provided doesn't have enough confirmations yet.

## Hardhat Ethers errors

### General errors

#### [HHE20000: Method not implemented](#HHE20000)

Method not implemented

#### [HHE20001: Event not supported](#HHE20001)

Event not supported

#### [HHE20002: Account index out of range](#HHE20002)

Account index out of range

#### [HHE20003: Broadcasted transaction hash mismatch](#HHE20003)

Broadcasted transaction hash mismatch

#### [HHE20004: Cannot get account](#HHE20004)

Cannot get account

#### [HHE20005: Invalid block tag](#HHE20005)

Invalid block tag

#### [HHE20006: Invalid artifact for contract factory creation](#HHE20006)

Invalid artifact for contract factory creation

#### [HHE20007: Invalid abstract contract for contract factory creation](#HHE20007)

Invalid abstract contract for contract factory creation

#### [HHE20008: Invalid address to link contract](#HHE20008)

Invalid address to link contract

#### [HHE20009: Library is not one of the contract libraries](#HHE20009)

Library is not one of the contract libraries

#### [HHE20010: Ambiguous library name](#HHE20010)

Ambiguous library name

#### [HHE20011: Reference to same library](#HHE20011)

Reference to same library

#### [HHE20012: Missing links for library](#HHE20012)

Missing links for library

#### [HHE20013: Unsupported type for deep copy](#HHE20013)

Unsupported type for deep copy

#### [HHE20014: Remote accounts are not supported](#HHE20014)

Remote accounts are not supported

#### [HHE20015: Invalid "accounts" property in your Hardhat configuration file](#HHE20015)

The "accounts" property in your Hardhat configuration file is not set correctly. Please double check it and try again.

#### [HHE20016: Private key for the address could not be found](#HHE20016)

The private key for the address could not be found. Please double check your private keys and try again.

## Hardhat Mocha errors

### General errors

#### [HHE30000: Running tests twice in an ESM project](#HHE30000)

You have run your tests twice programmatically and your project is an ESM project (you have `"type": "module"` in your `package.json`, or some of your files have the `.mjs` extension). This is not supported by Mocha yet (https://github.com/mochajs/mocha/issues/2706).

## Hardhat Viem errors

### General errors

#### [HHE40000: Network not found](#HHE40000)

No network with the specified chain id was found. You can override the chain by passing it as a parameter to the client getter:

```ts
import { someChain } from "viem/chains";
const client = await hre.viem.getPublicClient({
  chain: someChain,
  ...
});
```

You can find a list of supported networks here: https://github.com/wevm/viem/blob/main/src/chains/index.ts

#### [HHE40001: Unsupported Development Network](#HHE40001)

The chain ID corresponds to a development network, but we were unable to identify it as either Hardhat or Anvil.

Please ensure you're using one of the supported networks.

#### [HHE40002: Default Wallet Client Not Found](#HHE40002)

A default wallet client could not be found for the specified chain ID. This issue may occur if no accounts were configured for the selected network.

To resolve this, make sure to add an account to the specified network in the Hardhat config. Alternatively, you can set a custom wallet client by passing it as a parameter in the relevant function:

```ts
const networkConnection = await hre.network.connect(...);
const walletClient = await networkConnection.viem.getWalletClient(address);

await networkConnection.viem.deployContract(contractName, constructorArgs, { walletClient });
await networkConnection.viem.sendDeploymentTransaction(contractName, constructorArgs, { walletClient });
await networkConnection.viem.getContractAt(contractName, address, { walletClient });
```

#### [HHE40003: Error Linking Contract](#HHE40003)

An error occurred while linking the contract libraries.

Please check Hardhat's output for more details.

#### [HHE40004: Invalid Confirmations Value](#HHE40004)

Invalid confirmations value. The confirmations value provided is invalid.

#### [HHE40005: Deployment Transaction Error](#HHE40005)

The deployment transaction was mined but its receipt doesn't contain a contract address.

## Hardhat Keystore errors

### General errors

#### [HHE50000: Invalid password or corrupted keystore file](#HHE50000)

The password you provided is incorrect or the keystore file is corrupted.

## Hardhat Network Helpers errors

### General errors

#### [HHE60000: Only hex-encoded strings prefixed with "0x" are accepted](#HHE60000)

Only hex-encoded strings prefixed with "0x" are accepted

#### [HHE60001: Cannot converted into an RPC quantity](#HHE60001)

The value cannot be converted into an RPC quantity

#### [HHE60002: Invalid hex string](#HHE60002)

The value is not a valid hex string

#### [HHE60003: Invalid transaction hash](#HHE60003)

The value is not a valid transaction hash

#### [HHE60004: Invalid address](#HHE60004)

The value is not a valid address

#### [HHE60005: Invalid checksum address](#HHE60005)

The address has an invalid checksum

#### [HHE60006: Block number smaller than the current block number](#HHE60006)

The block number is smaller than the current block number

#### [HHE60007: The evm_snapshot value should be a string](#HHE60007)

The value returned by evm_snapshot should be a string

#### [HHE60008: The evm_revert value should be a boolean](#HHE60008)

The value returned by evm_revert should be a boolean

#### [HHE60009: Trying to restore an invalid snapshot.](#HHE60009)

Trying to restore an invalid snapshot.

#### [HHE60010: Invalid input, expected a non-negative number](#HHE60010)

Invalid input, expected a non-negative number

#### [HHE60011: Cannot convert negative number to RPC quantity](#HHE60011)

Cannot convert negative number to RPC quantity

#### [HHE60012: Anonymous functions cannot be used as fixtures](#HHE60012)

Anonymous functions cannot be used as fixtures

#### [HHE60013: Error while reverting snapshot](#HHE60013)

Error while reverting snapshot

#### [HHE60014: Hardhat network helpers can only be used with the Hardhat Network](#HHE60014)

Hardhat network helpers can only be used with the Hardhat Network

#### [HHE60015: Hardhat network helpers can only be used with the Hardhat Network - version info](#HHE60015)

Hardhat network helpers can only be used with the Hardhat Network

## Hardhat Chai Matchers errors

### General errors

#### [HHE70000: Unknown comparison operation](#HHE70000)

Unknown comparison operation

#### [HHE70001: Expected string or addressable](#HHE70001)

Expected string or addressable

#### [HHE70002: Assertion doesn't have an error message](#HHE70002)

Assertion doesn't have an error message. Please open an issue to report this.

#### [HHE70003: Matcher cannot be chained after](#HHE70003)

The matcher cannot be chained after another matcher. Please open an issue to report this.

#### [HHE70004: Error while decoding data](#HHE70004)

There was an error decoding data

#### [HHE70005: Expected a valid transaction hash](#HHE70005)

Expected a valid transaction hash

#### [HHE70006: Expected the revert reason to be a string or a regular expression](#HHE70006)

Expected the revert reason to be a string or a regular expression

#### [HHE70007: First argument must be a contract](#HHE70007)

First argument must be a contract

#### [HHE70008: Expected the custom error name to be a string](#HHE70008)

Expected the custom error name to be a string

#### [HHE70009: Contract doesn't have a custom error with the specified name](#HHE70009)

Contract doesn't have a custom error with the specified name

#### [HHE70010: Invalid arguments length for the .revertedWithCustomError matcher](#HHE70010)

Invalid arguments length for the .revertedWithCustomError matcher

#### [HHE70011: [.withArgs] should never happen, please submit an issue to the Hardhat repository](#HHE70011)

[.withArgs] should never happen, please submit an issue to the Hardhat repository

#### [HHE70012: Should not get an indexed event when the assertion type is not event](#HHE70012)

Should not get an indexed event when the assertion type is not event

#### [HHE70013: Expected the given panic code to be a number-like value](#HHE70013)

Expected the given panic code to be a number-like value

#### [HHE70014: The number of accounts is different than the number of expected balance changes](#HHE70014)

The number of accounts is different than the number of expected balance changes

#### [HHE70015: First argument must be a contract instance](#HHE70015)

First argument must be a contract instance

#### [HHE70016: Given contract instance is not an ERC20 token](#HHE70016)

Given contract instance is not an ERC20 token

#### [HHE70017: Invalid transaction](#HHE70017)

Invalid transaction

#### [HHE70018: Contract target must be a string](#HHE70018)

Contract target must be a string

#### [HHE70019: Invalid arguments length for the .emit matcher](#HHE70019)

Invalid arguments length for the .emit matcher

#### [HHE70020: Contract runner's provider shouldn't be null](#HHE70020)

Contract runner's provider shouldn't be null

#### [HHE70021: Do not combine .not. with .withArgs()](#HHE70021)

Do not combine .not. with .withArgs()

#### [HHE70022: withArgs can only be used in combination with a previous .emit or .revertedWithCustomError assertion](#HHE70022)

withArgs can only be used in combination with a previous .emit or .revertedWithCustomError assertion

#### [HHE70023: withArgs called with both .emit and .revertedWithCustomError, but these assertions cannot be combined](#HHE70023)

withArgs called with both .emit and .revertedWithCustomError, but these assertions cannot be combined

## Hardhat Verify errors

### General errors

#### [HHE80000: Network not supported](#HHE80000)

The network is not supported by hardhat-verify. To see the list of supported networks, run:

```sh
npx hardhat verify --list-networks
```

To add support for a new network, see https://hardhat.org/verify-custom-networks

#### [HHE80001: Explorer request failed](#HHE80001)

The request to the explorer failed.

- Verify that the URL is correct.
- Ensure the service is up and reachable.
- Check your network connection and try again.

#### [HHE80002: Explorer request status code error](#HHE80002)

The request to the explorer returned a non-success status code.

- Verify that the URL is correct.
- Ensure the service is up and reachable.
- Check your network connection and try again.

#### [HHE80003: Unsupported solidity compiler version](#HHE80003)

The specified Solidity compiler version is not supported by the Etherscan API. Only versions 0.4.11 and above are supported.
For a full list of supported versions, visit: https://etherscan.io/solcversions

#### [HHE80004: Deployed bytecode not found](#HHE80004)

No bytecode was found at the specified address. This usually means the contract is not deployed or was deployed to a different network.
Please verify the address and selected network, and try again.

#### [HHE80005: Compiler version mismatch](#HHE80005)

The Solidity compiler version used to compile the deployed contract does not match any of the versions configured in your Hardhat project.

This mismatch may indicate:

- You're not on the same commit that was used to deploy the contract.
- The compiler version in your Hardhat config is incorrect.
- The address provided is not the deployed contract.
- The selected network is incorrect.

#### [HHE80006: Contract not found](#HHE80006)

The specified contract is not present in your project's artifacts. Please ensure the contract is compiled and the name is correct.

#### [HHE80007: Build info not found](#HHE80007)

The specified contract is present in your project, but its build info is missing. Please ensure the contract is compiled by Hardhat and that it is written in Solidity.

#### [HHE80008: Build info compiler version mismatch](#HHE80008)

The compiler version in the build info does not match the version encoded in the deployed bytecode.
Possible causes:

- Compiler settings were changed after deployment.
- The contract address is incorrect.
- The selected network is incorrect.

#### [HHE80009: Deployed bytecode mismatch](#HHE80009)

The bytecode at the specified address did not match the expected contract.

Possible causes:

- Your artifacts are outdated or missing; try running `npx hardhat compile --force --buildProfile production`.
- The contract code was modified after deployment.
- Compiler settings (optimizer, EVM version, etc.) changed after deployment.
- The provided address is incorrect.
- The selected network is incorrect.

#### [HHE80010: Multiple contract matches](#HHE80010)

The deployed bytecode matches multiple compiled contracts. Specify the exact contract using the `--contract` flag. For example:

```sh
npx hardhat verify --contract contracts/Example.sol:ExampleContract <other args>
```

#### [HHE80011: Invalid library address](#HHE80011)

The address provided for a linked library is invalid. Please make sure the address is a valid Ethereum address.

#### [HHE80012: Library not found in contract](#HHE80012)

A library was specified using the "--libraries" option, but the selected contract does not use it.

If the contract uses external libraries, verify that the provided name matches the fully qualified name (FQN) of one of them, such as:

```
contracts/Math.sol:SafeMath
```

#### [HHE80013: Library name is ambiguous](#HHE80013)

The specified library name matches multiple libraries used by the contract.

To resolve the ambiguity, provide the fully qualified library name in the format:

```
path/to/LibraryFile.sol:LibraryName
```

#### [HHE80014: Duplicated library entry](#HHE80014)

The same library was specified more than once using both its short name and fully qualified name (FQN) in the `--libraries` option.

Only one form should be used for each library. Remove one of the entries and try again.

#### [HHE80015: Library address mismatch](#HHE80015)

Some libraries have conflicting addresses between what you provided and what was detected in the deployed bytecode.

Please ensure each library address is correct. You can remove entries from your input to use autodetection instead.

#### [HHE80016: Missing library addresses](#HHE80016)

One or more libraries required by the contract could not be detected from the deployed bytecode.

This usually happens when a library is only referenced in the contract's constructor. To resolve this, provide the missing library addresses using the "--libraries" option.

#### [HHE80017: Invalid constructor argument type](#HHE80017)

One of the arguments passed to the contract's constructor has an invalid JavaScript type.

This error occurs when you supply a value whose runtime type doesn't match the expected Solidity type. For example, you must pass a JS string for a Solidity string parameter.

Please verify that each constructor argument is the correct JS type.

#### [HHE80018: Invalid constructor argument count](#HHE80018)

The number of arguments provided to the contract's constructor doesn't match the number of parameters defined in its ABI.

This error occurs when you supply a different number of arguments than the constructor expects. For example, if the constructor expects two parameters but you provided three.

Please verify that you pass the exact number of arguments required by the constructor.

#### [HHE80019: Constructor argument value out of bounds](#HHE80019)

One of the arguments passed to the contract's constructor is outside the allowed range for its Solidity type (for example, passing 256 to a uint8 parameter).

This error occurs when a value exceeds the maximum or minimum allowed for the specified Solidity type.

Please ensure all argument values fit within the valid range for their respective Solidity types.

#### [HHE80020: Constructor arguments encoding failed](#HHE80020)

The constructor arguments provided for the contract could not be encoded correctly.
Please review the provided arguments and ensure they match the expected arguments defined in the contract's ABI.

#### [HHE80021: Missing bytecode at address](#HHE80021)

The explorer responded that the specified address does not contain bytecode. This usually means the contract was deployed recently and the explorer's backend has not yet indexed it.

Please wait a short time (e.g., 30-60 seconds) and try again. If you're running this from a script, wait for at least five confirmations before verifying.

#### [HHE80022: Contract already verified](#HHE80022)

The block explorer responded that the contract is already verified.

This typically occurs if you used the "--force" flag and the explorer does not support re-verification, or if the contract was previously verified with a full match.

#### [HHE80023: Contract verification request failed](#HHE80023)

The block explorer returned an error when attempting to verify the contract's source code.

Please check the returned message for details.

#### [HHE80024: Contract verification status polling failed](#HHE80024)

The block explorer returned a failure status when checking the verification status. Verification may still succeed; please check manually.

#### [HHE80025: Unexpected API response during contract verification](#HHE80025)

The block explorer API returned a message that doesn't match the expected format. This may indicate a change in the API or an issue with the request.

Please report this issue to the Hardhat team.

#### [HHE80026: Contract verification failed](#HHE80026)

Unable to verify the contract on the block explorer.

If your contract uses libraries whose addresses cannot be detected automatically, make sure you are providing the correct address for each undetectable library.

#### [HHE80027: Block explorer not configured](#HHE80027)

Block explorer information is missing in your chain descriptor configuration.

To enable contract verification, add an entry for the verification provider in the blockExplorers field of the relevant chain descriptor.
You can override the default chain descriptor by providing your own chainDescriptors object in the Hardhat config, with the following structure:

```
chainDescriptors: {
  <chainId>: {
    name: <name>,
    blockExplorers: {
      blockscout: { name: "Blockscout", url: <blockscout-url> apiUrl: <blockscout-api-url> };
      etherscan: { name: "Etherscan", url: <etherscan-url> apiUrl: <etherscan-api-url> };
    }
  }
}
```

#### [HHE80028: Address is not a contract](#HHE80028)

The block explorer responded that the address does not contain a contract. This usually means the address is incorrect, the contract was not deployed on the selected network, or there is a temporary issue with the block explorer not updating its index.
Please verify the address and network, and try again later if necessary.

#### [HHE80029: Block explorer API key is empty](#HHE80029)

The provided API key for the block explorer is empty. This can happen in the following cases:

- No "apiKey" field is configured in the hardhat config.
- The "apiKey" is explicitly set to an empty string in the Hardhat config.
- The "apiKey" is assigned to a config variable that resolves to an empty string at runtime.

To resolve this, set a valid non-empty API key in your Hardhat config, then try again.

### Validation errors

#### [HHE80100: Invalid address](#HHE80100)

The value is not a valid address

#### [HHE80101: Mutually exclusive constructor arguments](#HHE80101)

The parameters constructorArgs and constructorArgsPath are mutually exclusive. Please provide only one of them.

#### [HHE80102: Invalid constructor arguments module](#HHE80102)

The module specified by the constructorArgsPath parameter must default export an array of constructor arguments.

Example:

```ts
export default ["arg1", "arg2", ...];
```

#### [HHE80103: Module not found](#HHE80103)

The specified module could not be found. Please check the path and try again.

#### [HHE80104: Module syntax error](#HHE80104)

The specified module has a syntax error. Please fix the error and try again.

#### [HHE80105: Import module failed](#HHE80105)

The specified module could not be imported.

#### [HHE80106: Invalid libraries module](#HHE80106)

The module specified by the librariesPath parameter must default export a record of libraries.

Example:

```ts
export default { lib1: "0x...", lib2: "0x...", ... };
```

#### [HHE80107: Invalid verification provider](#HHE80107)

The specified verification provider is not supported. Please use one of the supported providers.
