function lintObjectContent(content) {
  const repl = {
    '[{': '[\n{',
    '{[': '{\n[',
    ',]': ',\n]',
    '}]': '}\n]',
    ']}': ']\n}'
  };
  return content.replaceAll(/(\[{|{\[|,]|}]|]\})/g, (match) => repl[match]);
};

module.exports = lintObjectContent;