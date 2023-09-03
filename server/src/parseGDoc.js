async function parseGDoc(doc) {
  elements = doc?.body?.content;
  if(elements === undefined) 
    console.log("COULD NOT PARSE DOC - CHECK CREDENTIALS AND LINK");
  return read_structural_elements(elements)
}


function read_structural_elements(elements) {
  // Recurses through a list of Structural Elements to read a document's text where text may be
  //       in nested elements.
  let text = ''
  for (const value of elements) { 
    if (Object.hasOwn(value, 'paragraph')) {
      elements = value['paragraph']['elements']
      for (const elem of elements) {
        if(Object.hasOwn(elem,'textRun')) {
          text += elem.textRun.content; 
        }
      }

    }
    else if (Object.hasOwn(value, 'table')) {
      // The text in table cells are in nested Structural Elements and tables may be
      // nested.
      let table = value['table']
      for (const row of table['tableRows']) {
        let cells = row['tableCells']
        for (const cell of cells)
            text += read_structural_elements(cell['content'])
      }
    }
    else if (Object.hasOwn(value, 'tableOfContents')) {
      //  The text in the TOC is also in a Structural Element.
      let toc = value['tableOfContents']
      text += read_structural_elements(toc['content'])
    }
  }
  // console.log(text)
  return text;
}

module.exports = parseGDoc; 