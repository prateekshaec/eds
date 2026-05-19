export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];

  // First row = quote text, Second row = author
  const quoteText = rows[0]?.textContent.trim();
  const authorText = rows[1]?.textContent.trim();

  // Clear the block and rebuild with semantic HTML
  block.textContent = '';

  // Create the blockquote
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quoteText;

  // Create the author citation
  const cite = document.createElement('cite');
  cite.textContent = `— ${authorText}`;

  // Add them to the block
  block.append(blockquote, cite);
}
