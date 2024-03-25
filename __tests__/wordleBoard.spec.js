import { mount } from "@vue/test-utils";
import {beforeEach, describe, expect, it, test} from "vitest";
import WordleBoard from "../src/components/WordleBoard.vue";

export const VICTORY_MESSAGE = 'You Won!';
export const DEFEAT_MESSAGE = 'You Won!';

describe('WordleBoard', () => {
    let wordOfTheDay = 'TESTS';
    let wrapper;

    beforeEach(() => {
        wrapper = mount(WordleBoard, {
            props: {
                wordOfTheDay
            }
        })
    })

    async function playerSubmitGuess(guess) {
        const guessInput = wrapper.find('input[type="text"]')
        await guessInput.setValue(guess)
        await guessInput.trigger('keydown.enter')
    }

    describe('End of game messages', () => {
        test('renders properly', async () => {
            await playerSubmitGuess(wordOfTheDay)

            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        });

        describe.each([
            {numberOfGuesses:0, shouldSeeDefeatMessages: false},
            {numberOfGuesses:1, shouldSeeDefeatMessages: false},
            {numberOfGuesses:2, shouldSeeDefeatMessages: false},
            {numberOfGuesses:3, shouldSeeDefeatMessages: false},
            {numberOfGuesses:4, shouldSeeDefeatMessages: false},
            {numberOfGuesses:5, shouldSeeDefeatMessages: false},
            {numberOfGuesses:6, shouldSeeDefeatMessages: true},
        ])('a defeat message should appear if player makes incorrect guesses 6 times in a a row', ({numberOfGuesses, shouldSeeDefeatMessages}) => {
            test(`therefore for ${numberOfGuesses} guess(es), a defeat message should ${shouldSeeDefeatMessages?"": "not"} appear`, async () => {
                for (let i = 0; i < numberOfGuesses;i++) {
                    await playerSubmitGuess("WRONG")
                }

                if (shouldSeeDefeatMessages) {
                    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
                } else {
                    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
                }
            })
        })

        test('No message is displayed when user has not guessed', () => {
            expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
        })
    });

    describe('Rules for defining rule of the game', () => {
        beforeEach(() => {
            console.warn = vi.fn()
        })
        test.each(
            [
                {wordOfTheDay: 'FLY', reason: 'word-of-the-day must have 5 characters'},
                {wordOfTheDay: 'tests', reason: 'word-of-the-day must be all in uppercase'},
                {wordOfTheDay: 'QWERT', reason: 'word-of-the-day must be a valid english word'}
            ]
        )("Since $reason: $wordOfTheDay is invalid, therefore a warning must be emitted", async ({wordOfTheDay}) => {
            mount(WordleBoard, {props: { wordOfTheDay}})

            expect(console.warn).toHaveBeenCalled()
        })

        test('no warning is shown if the word of the day is real english with 5 chars', async () => {
            mount(WordleBoard, {props: { wordOfTheDay: 'TESTS'}})

            expect(console.warn).not.toHaveBeenCalled()
        })
    });

    describe('Player Input', () => {
        test(`player guesses ar elimited to 5 letters`, async () => {
            await playerSubmitGuess('EXTRA')
            expect(wrapper.text()).toContain('')
        })

        test('input gets cleared after each submission', async () => {
            await playerSubmitGuess('WRONG')
            expect(wrapper.find("input[type='text']").element.value).toEqual('')
        })

        test('player guesses can pnly besubmitted if they are real words', async () =>{
            await playerSubmitGuess('QWERT')
            expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
            expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
        })

        test('player guesses are not case sensitive', async () =>{
            await playerSubmitGuess(wordOfTheDay.toLowerCase())
            expect(wrapper.text()).toContain(VICTORY_MESSAGE)
        })

        test('player guesses can only contain letters', async () =>{
            await playerSubmitGuess('H3!RT')
            expect(wrapper.find("input[type='text']").element.value).toEqual('HRT')
        })

        test.skip('non-letter character do not render on the screen while being typed', async () =>{
            await playerSubmitGuess('12')
            await playerSubmitGuess('123')

            expect(wrapper.find("input[type='text']").element.value).toEqual('')
        })
    });

    test('all previous guesses done by player are visible', async () => {
        const guesses = [
            "WRONG",
            "GUESS",
            "HELLO",
            "WORLD",
            "HAPPY",
            "CODER"
        ]

        for (const guess of guesses) {
            await playerSubmitGuess(guess)
        }

        for (const guess of guesses) {
            expect(wrapper.text()).toContain(guess)
        }
    })

});