import { describe, it, expect } from 'vitest'
import { citations, getCitation, getCitationsBySource } from '../data/citations.js'

describe('citations data', () => {
    it('is a non-empty object', () => {
        expect(typeof citations).toBe('object')
        expect(Object.keys(citations).length).toBeGreaterThan(0)
    })

    it('every citation has required fields', () => {
        Object.values(citations).forEach(c => {
            expect(c).toHaveProperty('id')
            expect(c).toHaveProperty('source')
            expect(c).toHaveProperty('document')
            expect(c).toHaveProperty('excerpt')
        })
    })

    it('citation id matches its key', () => {
        Object.entries(citations).forEach(([key, c]) => {
            expect(c.id).toBe(key)
        })
    })
})

describe('getCitation', () => {
    it('returns the correct citation for a known id', () => {
        const firstId = Object.keys(citations)[0]
        const result = getCitation(firstId)
        expect(result).toBeDefined()
        expect(result.id).toBe(firstId)
    })

    it('returns falsy for an unknown id', () => {
        expect(getCitation('c-nonexistent-xyz')).toBeFalsy()
    })
})

describe('getCitationsBySource', () => {
    it('returns citations for a known source', () => {
        const firstCitation = Object.values(citations)[0]
        const results = getCitationsBySource(firstCitation.source)
        expect(results.length).toBeGreaterThan(0)
        results.forEach(c => expect(c.source).toBe(firstCitation.source))
    })

    it('returns empty array for an unknown source', () => {
        expect(getCitationsBySource('nonexistent-source-xyz')).toHaveLength(0)
    })
})
