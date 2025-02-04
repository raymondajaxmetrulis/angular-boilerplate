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

Run `npm run tidy-up` to automatically fix linting errors, although manual fixes will probably be needed. Check code performance after linting in case of breaking changes. 

Run `npm run check-tidy` to view all the linting errors and warnings.

For more targeted linting

Run `ng lint` to check linting in *.ts files. Add `--fix` for auto corrections.

Run `npx htmlhint '**/*.html'` to check linting in all HTML files.

Run `npx prettier --write .` to format all HTML files, CSS/SCSS files, and certain JSON files like the translation files in locales.

ESLint will show errors in all *.ts files in real time (except *.spec.ts) when code does not conform to the settings, but sometimes the tracking fails due to bugs, so run 
the linter just in case. 

HTMLHint will show errors in all *.html files in real time (except index.html) for a few coding conventions.

Prettier is used only for HTML and CSS/SCSS files to cover indents, line breaks, or spacing in those files (except index.html). Prettier does not
show errors in real time, so ALWAYS run Prettier.

## Translation

Translation is done at runtime with [i18Next](https://www.i18next.com/) and [angular-i18next](https://www.npmjs.com/package/angular-i18next). 

Use `i18nextEager` pipe to translate the chained object string from the files stored in the "locales" folder.

For each component that needs translation, the names of the subfolders within locales must be listed in the providers of that component's module.

For example, to use the translation files available within /locales/translation and /locales/error, format the module like so:

```
@NgModule({
  imports: [
    ...
    I18NextModule
  ],
  exports: [
    ...
  ],
  declarations: [
    ...
  ],
  providers: [
    {
      provide: I18NEXT_NAMESPACE,
      useValue: ['translation', 'error']
    }
  ]
})
```

## Best Practices

Below are some practices to follow that are not easily covered by linting or prettier.

- Maintain separation of concerns as much as possible. Ex. Each template should have all elements nested within a single outer parent element. Make separate files and import modules.
- Does not matter what the files and folders are named as long as the naming conventions are consistent.

### Styling

- Always use existing global CSS/SCSS classes and bootstrap classes in HTML before writing custom CSS.
- If rewriting CSS/SCSS styling, remove unused classes.

### Angular

- Avoid deprecated Angular code, especially ngModel in forms because it will be phased out in an upcoming version.
- Use provided Angular features as much as possible, as they are often more performative. Ex. Use Angular Animations instead of CSS for animating.
- Avoid code that works outside of the Angular lifecycle to avoid side effects, like JS DOM methods. Ex. Use TemplateRef instead of document.getElementById 
- When iterating large collections of data with an ngFor loop, especially data from a REST API and/or with an immutable data structure, use a trackBy attribute to avoid mismatched data and large performance dips. Read more [here](https://dltlabs.medium.com/when-why-and-how-to-use-trackby-9a65eb7a5593)

### Translation 

- Avoid nesting JSON objects more than three times.
- Single words and short phrases should generally have title case capitalization, even if they are global. A lowercase pipe can be used to avoid translations with different capitalizations.
- The keys of nested JSON objects should be prefixed with an underscore. All keys should be all lowercase with each word or acronym separated by an underscore.
- Duplicate translations are fine as long as they are not in the same translation file.
