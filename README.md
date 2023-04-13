# NmftaUi

Front end skeleton for NMFTA websites. 

## Setup

Install node modules with `npm i`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Linting

Before pushing code, format the repo with [ESLint](https://eslint.org), [HTMLHint](https://htmlhint.com), and 
[Prettier](https://prettier.io) to maintain code consistency and promote good practices. 

Run `tidy-up` to automatically fix linting errors, although manual fixes will probably be needed. Check code performance after linting in case of breaking changes. 

Run `check-tidy` to view all the linting errors and warnings.

For more targeted linting

Run `ng lint` to check linting in *.ts files. Add `--fix` for auto corrections.

Run `npx htmlhint "**/*.html"` to check linting in all HTML files.

Run `npx prettier --write .` to format all HTML and CSS/SCSS files.

ESLint will show errors in all *.ts files in real time (except *.spec.ts) when code does not conform to the settings, but sometimes the tracking fails due to bugs, so run 
the linter just in case. 

HTMLHint will show errors in all *.html files in real time (except index.html) for a few coding conventions.

Prettier is used only for HTML and CSS/SCSS files to cover indents, line breaks, or spacing in those files (except index.html). Prettier does not
show errors in real time, so ALWAYS run Prettier.

## Best Practices

- Maintain separation of concerns as much as possible. Ex. Each template should have all elements nested within a single outer parent element. Make separate files and import modules.
- Always use existing global CSS/SCSS classes and bootstrap classes in HTML before writing custom CSS.
- Avoid deprecated Angular code, especially ngModel in forms because it will be phased out in an upcoming version.
- Use provided Angular features as much as possible, as they are often more performative. Ex. Use Angular Animations instead of CSS for animating.
- Avoid code that work outside of the Angular lifecycle to avoid side effects, like JS DOM methods. Ex. Use TemplateRef instead of document.getElementById 
