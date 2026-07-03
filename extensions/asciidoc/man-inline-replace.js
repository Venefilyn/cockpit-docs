
// AsciiDoctor.js version of cockpit/doc/extensions/man-inline-macro.rb
//
// Replaces all mentions of man:manpage[volnum] with an Antora coordinate xref.
// We cannot use Ruby based AsciiDoctor extensions and hence have to write a JS
// based one. But as a bonus it means this can be specific to replacing content.
//
// Usage:
//
//   man:gittutorial[7]

export function register (registry) {
  registry.preprocessor(function () {
    var self = this
    self.process(function (doc, reader) {
        const lines = reader.lines.map(l => {
          return l.replaceAll(/(?<!\:)man:(.*?)\[(\d)\]/g, (match, page, volnum) => {
            if(page.startsWith("cockpit"))
              return `xref:man:${page}.${volnum}.adoc[${page}](${volnum})`
            else
              return `${page}(${volnum})`
          })
        });
        reader.lines = lines;
        return reader;
    })
  })
}
