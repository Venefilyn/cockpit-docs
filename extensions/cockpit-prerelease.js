'use strict'

/**
 * Mark main branch (and asciidoc-guide during devel) as prerelease branches
 */
export function register () {
  this.once('contentClassified', ({ contentCatalog }) => {
    contentCatalog.getComponents().forEach((component) => {
      const prereleaseVersion = ["main", "asciidoc-guide"];
      component.versions.forEach((componentVersion) => {
        console.log(`${componentVersion.version}@${componentVersion.name} attributes (compiled)`);
        if (componentVersion.version in prereleaseVersion) {
          console.log(`Setting prerelease for ${componentVersion.version}@${componentVersion.name}`)
          componentVersion.prerelease = true;
        }
      })
    })
    this.updateVariables({ contentCatalog })
  })
}
