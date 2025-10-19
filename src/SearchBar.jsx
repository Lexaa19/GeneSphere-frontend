import React from 'react';
import { useState } from "react";
import { sanitizeInput, findClosestGene } from './utils/validation';
import './styles/searchBar.css';

export default function SearchBar() {

    const [query, setQuery] = useState(""); // query is like a box that holds what the user typed
    const [genes, setGenes] = useState([]); // hold an empty array initially
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState([]); // hold an empty array initially
    const [loading, setLoading] = useState(false);
    const [foundGene, setFoundGene] = useState(null);


    // ADD FAKE DATA
    const fakeGenes = [
        { symbol: "TP53", name: "Tumor Protein P53" },
        { symbol: "EGFR", name: "Epidermal Growth Factor Receptor" },
        { symbol: "BRCA1", name: "Breast Cancer Gene 1" }
    ];

    const handleInputChange = (e) => {
        // 1. Get the value the user just typed
        const userInput = e.target.value;

        // Prevent XSS attacks and limit input length
        if (userInput.length > 20) {
            setError("Gene symbol too long (max 20 characters)");
            return;
        }

        const sanitizedInput = sanitizeInput(userInput);
        if (sanitizedInput !== userInput) {
            setError("Invalid characters removed from input");
        } else {
            setError("");
        }

        // 2. Update the query with what the user typed
        setQuery(sanitizedInput);

        // 3. Clear old messages (think about user experience)
        setSuggestions([]); // Clear suggestions
        setFoundGene(null); // Clear previous found gene when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh

        if (loading) {
            // If already searching, do nothing!
            return;
        }

        const sanitizedInput = sanitizeInput(query);
        console.log("User searched for:", sanitizedInput); // Test what the user types

        // ADD APIS HERE WHEN BACK END IS READY
        if (!sanitizedInput.trim()) {
            setError("Please enter a gene symbol");
            return;
        }

        // Searching for the gene
        setLoading(true);

        // Test with fake data
        setTimeout(() => {
            const foundGene = fakeGenes.find(gene =>
                gene.symbol.toLowerCase() === sanitizedInput.toLowerCase()
            );

            setLoading(false);

            if (foundGene) {
                setError(""); // Clear error
                setFoundGene(foundGene); // Store the found gene in the state
                console.log("Found gene:", foundGene);
                // Later you'll do something with the found gene
            } else {
                setFoundGene(null); // Clear any previous found gene
                const suggestion = findClosestGene(sanitizedInput, fakeGenes);
                if (suggestion) {
                    setError(`Gene "${sanitizedInput}" not found.`);
                    setSuggestions([suggestion]);
                } else {
                    setError(`Gene "${sanitizedInput}" not found. Try: TP53, EGFR, or BRCA1`);
                    setSuggestions([]); // Clear suggestions
                }
            }
        }, 1000);
    };

    const handleGeneSuggestionClick = (suggestedGene) => {
        // Update the search input with the suggestion
        setQuery(suggestedGene.symbol);

        // Clear suggestions and errors
        setSuggestions([]);

        // Clear errors
        setError("");
    };

  return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={query} // Show what the user is typing
                    onChange={handleInputChange}
                    placeholder="Search for genes, studies, or patients (e.g., BRCA1, TP53)"
                    className="search-input"
                />
                <button type="submit" disabled={loading} className="stats-btn">
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            <div className="search-results">
                {/* Conditional rendering so if loading is true, show loading message. 
                    Else, don't show anything 
                */}
                {loading && <p className="loading-message">Searching...</p>}
                
                {error && <div className="error-message">{error}</div>}
                
                {foundGene && (
                    <div className="success-message">
                        <h3>🎉 Gene Found!</h3>
                        <p><strong>Symbol:</strong> {foundGene.symbol}</p>
                        <p><strong>Name:</strong> {foundGene.name}</p>
                    </div>
                )}
                
                {suggestions.length > 0 && (
                    <div className="suggestions-container">
                        <p className="suggestions-title">Did you mean:</p>
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => handleGeneSuggestionClick(suggestion)}
                                className="suggestion-button"
                            >
                                {suggestion.symbol} - {suggestion.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}