import { describe, it, expect } from 'vitest'
import { modules, getAllLessons, getLessonById, getModuleById, getNextLesson } from '../data/curriculum.js'

describe('curriculum data', () => {
    it('has 7 modules', () => {
        expect(modules).toHaveLength(7)
    })

    it('every module has at least one lesson', () => {
        modules.forEach(m => {
            expect(m.lessons.length).toBeGreaterThan(0)
        })
    })

    it('every lesson has required fields', () => {
        getAllLessons().forEach(lesson => {
            expect(lesson).toHaveProperty('id')
            expect(lesson).toHaveProperty('title')
            expect(lesson).toHaveProperty('objective')
            expect(lesson).toHaveProperty('content')
            expect(lesson).toHaveProperty('checkpoint')
        })
    })
})

describe('getAllLessons', () => {
    it('returns all lessons flattened across modules', () => {
        const lessons = getAllLessons()
        const totalExpected = modules.reduce((sum, m) => sum + m.lessons.length, 0)
        expect(lessons).toHaveLength(totalExpected)
    })

    it('attaches moduleId and moduleTitle to each lesson', () => {
        getAllLessons().forEach(lesson => {
            expect(lesson).toHaveProperty('moduleId')
            expect(lesson).toHaveProperty('moduleTitle')
        })
    })

    it('returns the same reference on repeated calls (pre-computed)', () => {
        const first = getAllLessons()
        const second = getAllLessons()
        expect(first).toBe(second)
    })
})

describe('getLessonById', () => {
    it('returns the correct lesson for a known id', () => {
        const allLessons = getAllLessons()
        const target = allLessons[0]
        const result = getLessonById(target.id)
        expect(result).toBeDefined()
        expect(result.id).toBe(target.id)
    })

    it('returns falsy for an unknown id', () => {
        expect(getLessonById('nonexistent-id-xyz')).toBeFalsy()
    })
})

describe('getModuleById', () => {
    it('returns the correct module for a known id', () => {
        const result = getModuleById(modules[0].id)
        expect(result).toBeDefined()
        expect(result.id).toBe(modules[0].id)
    })

    it('returns null/undefined for an unknown id', () => {
        expect(getModuleById('nonexistent-module')).toBeFalsy()
    })
})

describe('getNextLesson', () => {
    it('returns the next lesson id within the same module', () => {
        const firstModule = modules[0]
        if (firstModule.lessons.length < 2) return
        const first = firstModule.lessons[0]
        const second = firstModule.lessons[1]
        expect(getNextLesson(first.id)).toBe(second.id)
    })

    it('returns the first lesson of the next module at module boundary', () => {
        const lastLessonOfFirstModule = modules[0].lessons.at(-1)
        const firstLessonOfSecondModule = modules[1].lessons[0]
        expect(getNextLesson(lastLessonOfFirstModule.id)).toBe(firstLessonOfSecondModule.id)
    })

    it('returns null for the very last lesson', () => {
        const lastModule = modules.at(-1)
        const lastLesson = lastModule.lessons.at(-1)
        expect(getNextLesson(lastLesson.id)).toBeNull()
    })
})
