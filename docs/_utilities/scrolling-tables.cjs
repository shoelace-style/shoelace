/**
 * Turns headings into clickable, deep linkable anchors. The provided doc should be a document object provided by JSDOM.
 * The same document will be returned with the appropriate DOM manipulations.
 */
module.exports = function (doc, options) {
  const tables = [...doc.querySelectorAll('table')];

  options = {
    className: 'table-scroll', // the class name to add to the table's container
    ...options
  };

  tables.forEach(table => {
    const div = doc.createElement('div');
    div.classList.add(options.className);
    table.insertAdjacentElement('beforebegin', div);
    div.append(table);
  });

  return doc;
};
