## only-package-manager

> Use only-package-manager to run the right package manager.

[![NPM](https://img.shields.io/npm/l/only-package-manager)](https://github.com/dhruwlalan/only-package-manager/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/only-package-manager)](https://www.npmjs.com/package/only-package-manager) [![npm](https://img.shields.io/npm/dt/only-package-manager)](https://www.npmjs.com/package/only-package-manager)

## Why

Currently there are three main nodejs package managers, namely - `npm`, `yarn` & `pnpm`.<br>
Some projects use `npm` or some uses `yarn` or `pnpm`. Having to remember the syntax of all three is quite confusing for me and might be for you.<br>

Therefor using `only-package-manager` I have to just remember **ONE** default syntax for all the basic & the mostly used commands and the CLI will take care of running the right command based on the package manager the project is using.

I made this project getting inspired by [@antfu](https://github.com/antfu)'s [`ni`](https://github.com/antfu/ni) project and wanted to make one with my own set of syntax & to practice TypeScript. So a Huge credit to Him🙌

## Installation

```
npm i -g only-package-manager
```

## Usage

##### Install all dependencies for a project.

```bash
$ opm
$ opm i                   # same as the above.
```

##### Install package/packages

```bash
$ opm i <package...>      # saved to dependencies.
$ opm i -d <package...>   # saved to devDependencies.
$ opm i -p <package...>   # saved to peerDependencies.
$ opm i -o <package...>   # saved to optionalDependencies.
$ opm i -e <package...>   # saved with the exact version specified.
$ opm i -g <package...>   # saved globally on npm.
```

> Note: currently all global commands are set to use only npm.

##### Remove package/packages

```bash
$ opm r <package...>      # removes locally installed package.
$ opm r -g <package...>   # removes globally installed package.
```

##### Run scripts defined in your package.json

```bash
$ opm run                 # Interactively select the script to run.
$ opm <command>           # runs the script named <command>.
$ opm run <command>       # same as the above.
```

##### List all the packages

```bash
$ opm list                # List all locally installed packages.
$ opm list -g             # List all globally installed packages in npm.
```

##### Clean Install / Frozen Install

```bash
$ opm ci
```

##### Run a security audit.

```bash
$ opm audit
$ opm audit fix           # automatically fix (only works on npm).
```

##### Check for outdated packages.

```bash
$ opm outdated            # Check for all outdated packages.
```

##### Update packages

```bash
$ opm up                  # Updates all packages, adhering to ranges specified in package.json.
$ opm up -l               # Updates all packages to their latest version.
$ opm up -g               # Updates all globally installed packages.
$ opm up <package>        # Updates <package>
$ opm up <package> -l     # Updates <package> to the latest version.
```
