Grid
==================

Grid is a Front-end project created with [Limelight Generator](https://github.com/piotrkulpinski/generator-limelight), a [Yeoman](http://yeoman.io) generator for scaffolding web projects.

## Getting started

The following software needs to be installed if you want to use develop & build project created with Limelight Generator. These installations need to be done just once so you can skip this section if you have the software already installed.

### Node.js

Install [Node.js](http://nodejs.org/) so you can work with `npm`, Node package manager.

### Gulp
Then install [Gulp](http://gulpjs.com/)'s command line interface (CLI) globally:

```bash
npm install -g gulp-cli
```

### Bower
For managing certain dependencies like Bootstrap, you will need [Bower](http://bower.io/), another package manager. Install it from the command line too:

```bash
npm install -g bower
```

Also make sure that [git](http://git-scm.com/) is installed as some bower packages require it to be fetched and installed. On Windows ensure that Git is installed in your PATH by selecting *Run Git from the Windows Command Prompt* option during installation (check this [screenshot](http://wiki.team-mediaportal.com/@api/deki/files/3808/=Git_Setup_-_Run_from_Windows_Command_Prompt.PNG)).

## Usage

### Project Structure

The file structure in generated project looks like this:

- **dist** - distribution files are automatically generated here, this is where you check your work in a browser.
- **gulpfile.js** - atomic Gulp tasks configuration
- **node_modules** - Node.js modules for various Gulp tasks, usually you don’t have to do anything about this folder
- **src** - source files, development is done here
  - **assets** - static asset files (images, videos, fonts, etc.) - everything from this directory will be copied to dist folder
  - **bower_components** - 3rd party libraries managed via [Bower](http://bower.io/)
  - **styles** - Sass files
    - `main.scss` - main file where other stylesheets are imported
    - **common** - common styles for most of pages
    - **modules** - styles for atomic site modules; this is where most of your styles will go
    - **setup** - various configurations and preprocesor helpers
    - **utils** - utility styles and small helper modules
    - **vendor** - styles overwriting/replacing library ones
  - **scripts**
    - **modules** - styles for atomic site modules; this is where most of your scripts will go
    - `main.js` - main JS file in project
    - `plugins.js` - place for importing Bower dependencies
  - **templates** - Twig templates
    - **layouts** - Twig layout files
    - **partials** - Twig partials
    - `*.twig` - separate twig page templates
- `index.html` - project index with project pages listed
- `bower.json` - Bower dependencies in the project
- `package.json` - npm packages dependencies
- `.yo-rc.json` - Yeoman generator configuration file
- `.bowerrc` - configuration file for Bower
- `.editorconfig` - [EditorConfig](http://editorconfig.org/) configuration file to achieve consistent coding style
- `.gitattributes` - [Git](http://git-scm.com/) configuration file to force Unix line ending in all text files
- `.gitignore` - default Git ignore files and folders
- `.jshitrc` - [JSHint](http://www.jshint.com/) configuration

On a typical project, you will work in `src` folder and check your work in `dist` folder so you don’t have to touch other files. For more info about working with styles structure go to [Writing styles section](#writing-styles).

### Getting Started

If you are joining an existing project which was set up using Limelight Generator (assuming that you have all [prerequisites](#prerequisites) installed), all you need to do is to clone the existing repository and install Bower and npm dependencies.

Let's imagine you have cloned/unpacked Grid project into `grid` directory.

First, change the directory to your cloned project:

```
cd grid
```

After that install Bower depedencies:

```
bower install
```

Then install npm dependencies:

```
npm install
```

Finally, (re)generate preview files in the dist folders:

```
gulp build
```

If everything went ok, the preview files will be generated and you will be able to check your work in the `dist` folder.

Now the project is set up and you can continue like described in the [Development](#3-development) section.

### Development

When you have the basic setup done, you can start development. To re-compile Twig / Sass file in real time you can use default task. Type

```
gulp
```

and this will start a task that will watch for changes in files and recompile them as needed. Additionally, development server will be started and BrowserSync scripts injected.

To rebuild the whole project, use the gulp build task again

```
gulp build
```

## Tips & Tricks

### Writing Styles

The following approach is recommended when creating styles:

1. Use `main.scss` only for importing other stylesheets. Do not write styles directly in this file!
2. Use variables and mixins files to store your variables and mixins.
3. Organize your styles as separate, highly reusable modules (think if something can be refactored before writing new code). A good practice is to name file the same as main class used for that module, for example if you create a module representing an article with `.article` as a main CSS class followed by `.article__title`, `.article___meta`, etc. and with `.article_featured` modifier that will have slightly different color scheme, you will do everyone a favour by placing it in `styles/modules/_article.scss` file instead of ~~`styles/modules/_text.scss`~~.
4. If you find yourself overwriting/replacing default library styles, put them into **vendor** folder. A good examples of that are replacing library custom select or lightbox styles with your own or overwriting some Bootstrap styles that were not configurable.
5. Don't be afraid to comment the code. If you're forced to use some hack, put an explanation or source somewhere near as a comment.
6. By default [autoprefixer](https://github.com/postcss/autoprefixer) is enabled in project, which means that you don't need to write prefixes for the standard CSS3 properties. It uses [Can I Use](http://caniuse.com/) database. However, please note that some popular properties (like `-webkit-appearance` or `-webkit-font-smoothing` are not a part of standard and need to be written with prefixes by you).
