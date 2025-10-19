
import { normalizeGeneSymbol } from './api.js';

// clear user input to prevent malicious content
export function sanitizeInput(userInput) {
  if (typeof userInput != 'string') {
    return '';
  }
  // <[^>]*>: Finds HTML tags like <script>, <img>, <div>
  // javascript:: Finds javascript:alert('hack')
  // data:: Finds data:text/html,<script>...
  // vbscript:: Finds VBScript code (old IE vulnerability)
  // on\w+\s*=: Finds event handlers like onclick=, onload=, onmouseover=
  // i: Makes it case-insensitive (matches ONCLICK too)
  const XSS_PATTERN = /<[^>]*>|javascript:|data:|vbscript:|on\w+\s*=/i;

  return userInput.trim().replace(XSS_PATTERN, '').substring(0, 50);
}

// Simple fuzzy matching for gene suggestions
export function findClosestGene(input, geneList) {
  const cleanInput = normalizeGeneSymbol(input);

  // Exact match first
  const exact = geneList.find(gene => gene.symbol === cleanInput);
  if (exact) return exact;

  // Partial match (starts with)
  const startsWith = geneList.find(gene =>
    gene.symbol.startsWith(cleanInput) || cleanInput.startsWith(gene.symbol)
  );
  if (startsWith) return startsWith;

  // Fuzzy match (basic Levenshtein distance)
  let bestMatch = null;
  let minDistance = Infinity;

  geneList.forEach(gene => {
    const distance = levenshteinDistance(cleanInput, gene.symbol);
    if (distance < minDistance && distance <= 2) {
      minDistance = distance;
      bestMatch = gene;
    }
  });

  return bestMatch;
}

// Simple Levenshtein distance implementation
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,     // deletion
        matrix[i][j - 1] + 1,     // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
}