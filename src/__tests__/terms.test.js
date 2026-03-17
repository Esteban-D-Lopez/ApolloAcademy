import { describe, it, expect } from 'vitest'
import { terms, categories, searchTerms, getTermsByCategory } from '../data/terms.js'

describe('terms data', () => {
    it('has terms defined', () => {
        expect(terms.length).toBeGreaterThan(0)
    })

    it('every term has required fields', () => {
        terms.forEach(term => {
            expect(term).toHaveProperty('id')
            expect(term).toHaveProperty('name')
            expect(term).toHaveProperty('definition')
            expect(term).toHaveProperty('type')
            expect(term).toHaveProperty('category')
        })
    })

    it('all term ids are unique', () => {
        const ids = terms.map(t => t.id)
        expect(new Set(ids).size).toBe(ids.length)
    })
})

describe('categories', () => {
    it('is a non-empty array of strings', () => {
        expect(Array.isArray(categories)).toBe(true)
        expect(categories.length).toBeGreaterThan(0)
        categories.forEach(c => expect(typeof c).toBe('string'))
    })

    it('every term category exists in the categories list', () => {
        terms.forEach(term => {
            expect(categories).toContain(term.category)
        })
    })
})

describe('searchTerms', () => {
    it('returns terms matching the query in name or definition', () => {
        const results = searchTerms('fee')
        expect(results.length).toBeGreaterThan(0)
        results.forEach(t => {
            const combined = (t.name + ' ' + t.definition).toLowerCase()
            expect(combined).toContain('fee')
        })
    })

    it('returns empty array for a nonsense query', () => {
        expect(searchTerms('xyzzy_nonsense_query_12345')).toHaveLength(0)
    })

    it('is case-insensitive', () => {
        const lower = searchTerms('apollo')
        const upper = searchTerms('APOLLO')
        expect(lower.length).toBe(upper.length)
    })
})

describe('getTermsByCategory', () => {
    it('returns only terms in the requested category', () => {
        const cat = categories[0]
        const results = getTermsByCategory(cat)
        expect(results.length).toBeGreaterThan(0)
        results.forEach(t => expect(t.category).toBe(cat))
    })

    it('returns empty array for an unknown category', () => {
        expect(getTermsByCategory('Nonexistent Category XYZ')).toHaveLength(0)
    })
})
